#!/usr/bin/env bash
# render_video.sh — parameterized V3-combo renderer for GitHub Actions.
#
# Pipeline (matches unique_facts_shorts SKILL.md + the #47 assemble scripts):
#   1. Remotion: render the motion composition in 900-frame chunks, --concurrency=1
#   2. Join the chunks, cut one 10.000s motion segment per motion scene
#   3. Pre-convert every AI clip to the target resolution / 30 fps
#   4. Pass 1: concat FILTER re-encode (never the concat demuxer for the
#      final assembly — the demuxer -c copy path once produced a missing
#      scene + black tail on this pipeline)
#   5. Pass 2: burn ASS subtitles with the `ass` filter + mux final_mix audio
#   6. QC with ffprobe (fail hard) + a warn-only per-scene movement check,
#      write qc_report.txt next to the finished MP4
#
# Inputs come from two places: the workflow_dispatch values (--comp --slug
# --duration --width --height --mode) and config.json inside the materials
# zip (written by package.sh on the VM). The two must agree; a mismatch
# fails fast so a wrong dispatch never renders the wrong video.
#
# Usage:
#   bash render_video.sh --workdir DIR --remotion-dir DIR --comp ID --slug SLUG \
#     --duration 90|180 --width W --height H --mode full|smoke \
#     [--output NAME.mp4] [--outdir DIR] [--chunk-frames 900]
#
# Exit codes: 0 = rendered + QC passed; 1 = any step or QC check failed.
set -euo pipefail

# ---------------- arguments ----------------
WORKDIR=""; REMOTION_DIR=""; COMP=""; SLUG=""; DURATION=""; WIDTH=""; HEIGHT=""
MODE="full"; OUTPUT=""; OUTDIR=""; CHUNK_FRAMES=900
FPS=30; SCENE_SECONDS=10

while [[ $# -gt 0 ]]; do
  case "$1" in
    --workdir)      WORKDIR="$2"; shift 2 ;;
    --remotion-dir) REMOTION_DIR="$2"; shift 2 ;;
    --comp)         COMP="$2"; shift 2 ;;
    --slug)         SLUG="$2"; shift 2 ;;
    --duration)     DURATION="$2"; shift 2 ;;
    --width)        WIDTH="$2"; shift 2 ;;
    --height)       HEIGHT="$2"; shift 2 ;;
    --mode)         MODE="$2"; shift 2 ;;
    --output)       OUTPUT="$2"; shift 2 ;;
    --outdir)       OUTDIR="$2"; shift 2 ;;
    --chunk-frames) CHUNK_FRAMES="$2"; shift 2 ;;
    *) echo "ERROR: unknown argument: $1" >&2; exit 2 ;;
  esac
done

for v in WORKDIR REMOTION_DIR SLUG DURATION WIDTH HEIGHT OUTDIR; do
  if [[ -z "${!v}" ]]; then echo "ERROR: --$(echo "$v" | tr 'A-Z_' 'a-z-') is required" >&2; exit 2; fi
done
# COMP is optional: full-AI videos have no Remotion comp — pass --comp none
# (or omit it) and the Remotion render step is skipped entirely.
[[ -z "$COMP" ]] && COMP="none"
[[ "$MODE" == "full" || "$MODE" == "smoke" ]] || { echo "ERROR: --mode must be full|smoke" >&2; exit 2; }

BUILD="$OUTDIR/build"
mkdir -p "$OUTDIR" "$BUILD/conv" "$BUILD/seg" "$BUILD/chunks"
QC_REPORT="$OUTDIR/qc_report.txt"
: > "$QC_REPORT"

log() { echo "[$(date +%H:%M:%S)] $*"; }
fail() { echo "ERROR: $*" >&2; echo "FAIL: $*" >> "$QC_REPORT"; exit 1; }

# ffprobe helpers
probe_duration() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }
within() { # within VALUE TARGET TOL  -> exit 0 when |VALUE-TARGET| <= TOL
  awk -v v="$1" -v t="$2" -v tol="$3" 'BEGIN { d = v - t; if (d < 0) d = -d; exit (d <= tol) ? 0 : 1 }'
}
check_duration() { # check_duration FILE EXPECTED TOL LABEL
  local d; d="$(probe_duration "$1")"
  if ! within "$d" "$2" "$3"; then fail "$4: duration $d s, expected $2 s (+/- $3) — $1"; fi
  log "$4 OK: ${d}s"
}

log "== render_video.sh start: slug=$SLUG comp=$COMP ${WIDTH}x${HEIGHT} ${DURATION}s mode=$MODE =="
free -m | tee -a "$QC_REPORT"

# ---------------- read config.json ----------------
CONFIG="$WORKDIR/config.json"
[[ -f "$CONFIG" ]] || fail "config.json not found in $WORKDIR (materials zip layout wrong?)"
eval "$(python3 - "$CONFIG" <<'PYEOF'
import json, shlex, sys
cfg = json.load(open(sys.argv[1]))
def q(v): return shlex.quote(str(v))
print(f"CFG_SLUG={q(cfg['slug'])}")
print(f"CFG_COMP={q(cfg['comp'])}")
print(f"CFG_WIDTH={cfg['width']}")
print(f"CFG_HEIGHT={cfg['height']}")
print(f"CFG_FPS={cfg['fps']}")
print(f"CFG_DURATION={cfg['duration']}")
print(f"CFG_SCENE_COUNT={cfg['scene_count']}")
print(f"CFG_SCENE_SECONDS={cfg.get('scene_seconds', 10)}")
print(f"CFG_AUDIO={q(cfg['audio'])}")
print(f"CFG_SUBS={q(cfg['subs'])}")
print(f"CFG_OUTPUT={q(cfg['output'])}")
scenes = sorted(cfg['scenes'], key=lambda s: s['n'])
parts = []
for s in scenes:
    if s['type'] == 'ai':
        parts.append(f"{s['n']}:ai:{s['file']}")
    elif s['type'] == 'motion':
        parts.append(f"{s['n']}:motion:{s['motion_index']}")
    else:
        raise SystemExit(f"unknown scene type: {s['type']}")
print("CFG_SCENES=" + q(" ".join(parts)))
# sanity: scenes must cover 1..N exactly once, motion_index 1..M in order
ns = [s['n'] for s in scenes]
assert ns == list(range(1, len(scenes) + 1)), f"scene numbers must cover 1..{len(scenes)}: {ns}"
mi = [s['motion_index'] for s in scenes if s['type'] == 'motion']
assert mi == list(range(1, len(mi) + 1)), f"motion_index must be 1..{len(mi)} in order: {mi}"
assert cfg['duration'] == len(scenes) * cfg.get('scene_seconds', 10), "duration != scene_count * scene_seconds"
PYEOF
)"

# ---------------- cross-check dispatch inputs vs config ----------------
[[ "$COMP" == "$CFG_COMP" ]]     || fail "dispatch comp ($COMP) != config comp ($CFG_COMP)"
[[ "$SLUG" == "$CFG_SLUG" ]]     || fail "dispatch slug ($SLUG) != config slug ($CFG_SLUG)"
[[ "$DURATION" == "$CFG_DURATION" ]] || fail "dispatch duration ($DURATION) != config duration ($CFG_DURATION)"
[[ "$WIDTH" == "$CFG_WIDTH" ]]   || fail "dispatch width ($WIDTH) != config width ($CFG_WIDTH)"
[[ "$HEIGHT" == "$CFG_HEIGHT" ]] || fail "dispatch height ($HEIGHT) != config height ($CFG_HEIGHT)"
[[ "$CFG_FPS" == "30" ]]         || fail "config fps is $CFG_FPS; this pipeline only supports 30 fps"
[[ "$CFG_SCENE_SECONDS" == "10" ]] || fail "config scene_seconds is $CFG_SCENE_SECONDS; this pipeline only supports 10s scenes"
[[ -z "$OUTPUT" ]] && OUTPUT="$CFG_OUTPUT"
[[ -f "$WORKDIR/$CFG_AUDIO" ]] || fail "audio file missing: $WORKDIR/$CFG_AUDIO"
[[ -f "$WORKDIR/$CFG_SUBS" ]]  || fail "subtitle file missing: $WORKDIR/$CFG_SUBS"

# Subtitle sanity: PlayRes must match the target resolution, and a double
# backslash (\\N) in the ASS file shows up as a stray backslash on screen.
PLAYRES_X="$(grep -m1 '^PlayResX:' "$WORKDIR/$CFG_SUBS" | cut -d: -f2 | tr -d ' ')"
PLAYRES_Y="$(grep -m1 '^PlayResY:' "$WORKDIR/$CFG_SUBS" | cut -d: -f2 | tr -d ' ')"
[[ "$PLAYRES_X" == "$WIDTH" && "$PLAYRES_Y" == "$HEIGHT" ]] \
  || fail "subs.ass PlayRes is ${PLAYRES_X}x${PLAYRES_Y} but target is ${WIDTH}x${HEIGHT}"
if grep -q '\\\\N' "$WORKDIR/$CFG_SUBS"; then
  fail "subs.ass contains a double backslash (\\\\N) — fix it on the VM before rendering"
fi
log "config OK: $CFG_SCENE_COUNT scenes, audio=$CFG_AUDIO, subs=$CFG_SUBS, output=$OUTPUT"

# ---------------- choose the scenes to render ----------------
# Full mode: every scene. Smoke mode: first AI scene + first motion scene
# (in config order) = 20 s end-to-end, proving Remotion + ffmpeg + ass burn.
# Full-AI videos have no motion scenes, so smoke renders the first TWO AI
# scenes instead (still 20 s, still proving ffmpeg + ass burn + audio mux).
SCENE_LIST="$CFG_SCENES"
EXPECTED_DURATION="$DURATION"
if [[ "$MODE" == "smoke" ]]; then
  FIRST_AI=""; SECOND_AI=""; FIRST_MOTION=""
  for entry in $CFG_SCENES; do
    n="${entry%%:*}"; rest="${entry#*:}"; type="${rest%%:*}"
    if [[ "$type" == "ai" ]]; then
      if [[ -z "$FIRST_AI" ]]; then FIRST_AI="$entry";
      elif [[ -z "$SECOND_AI" ]]; then SECOND_AI="$entry"; fi
    fi
    if [[ "$type" == "motion" && -z "$FIRST_MOTION" ]]; then FIRST_MOTION="$entry"; fi
  done
  if [[ -n "$FIRST_MOTION" ]]; then
    # V3 combo: first AI scene + first motion scene (20s), config order kept.
    [[ -n "$FIRST_AI" && -n "$FIRST_MOTION" ]] \
      || fail "smoke mode needs at least one AI scene and one motion scene in config.json"
    n_ai="${FIRST_AI%%:*}"; n_mo="${FIRST_MOTION%%:*}"
    if (( n_ai < n_mo )); then SCENE_LIST="$FIRST_AI $FIRST_MOTION"; else SCENE_LIST="$FIRST_MOTION $FIRST_AI"; fi
  else
    # Full-AI video (no motion scenes): first TWO AI scenes (20s).
    [[ -n "$FIRST_AI" && -n "$SECOND_AI" ]] \
      || fail "smoke mode needs at least two AI scenes in config.json"
    SCENE_LIST="$FIRST_AI $SECOND_AI"
  fi
  EXPECTED_DURATION=20
  log "smoke mode: rendering scenes [$SCENE_LIST] only (20s)"
fi

# Which motion scenes are needed (motion_index values, 1-based in comp order)
MOTION_NEEDED=""
for entry in $SCENE_LIST; do
  rest="${entry#*:}"; type="${rest%%:*}"; val="${rest#*:}"
  [[ "$type" == "motion" ]] && MOTION_NEEDED="$MOTION_NEEDED $val"
done
MOTION_NEEDED="$(echo "$MOTION_NEEDED" | xargs)"  # trim
TOTAL_MOTION_SCENES="$(echo "$CFG_SCENES" | tr ' ' '\n' | grep -c ':motion:' || true)"
log "motion scenes needed (motion_index): ${MOTION_NEEDED:-none} of $TOTAL_MOTION_SCENES total"

# ---------------- step 1: Remotion render (chunked, --concurrency=1) ----------------
# The motion comp is one continuous timeline: motion scene k occupies frames
# (k-1)*300 .. k*300-1 (30 fps x 10 s). Render in CHUNK_FRAMES blocks so peak
# memory stays low; chunk 0 always covers the first motion scene.
if [[ -n "$MOTION_NEEDED" ]]; then
  if [[ "$MODE" == "smoke" ]]; then
    MAX_FRAME=299
  else
    MAX_FRAME=$(( TOTAL_MOTION_SCENES * 300 - 1 ))
  fi
  cd "$REMOTION_DIR"
  CHUNK_I=0; START=0
  while (( START <= MAX_FRAME )); do
    END=$(( START + CHUNK_FRAMES - 1 ))
    (( END > MAX_FRAME )) && END=$MAX_FRAME
    CHUNK="$BUILD/chunks/motion_chunk_${CHUNK_I}.mp4"
    log "Remotion chunk $CHUNK_I: frames $START-$END -> $CHUNK"
    npx remotion render "$COMP" "$CHUNK" --frames="${START}-${END}" --concurrency=1
    check_duration "$CHUNK" "$(awk -v s="$START" -v e="$END" 'BEGIN { printf "%.3f", (e - s + 1) / 30 }')" 0.15 "remotion chunk $CHUNK_I"
    CHUNK_I=$(( CHUNK_I + 1 ))
    START=$(( END + 1 ))
  done
  cd - > /dev/null

  # ---------------- step 2: join chunks, cut motion segments ----------------
  if (( CHUNK_I > 1 )); then
    : > "$BUILD/chunks/list.txt"
    for (( i = 0; i < CHUNK_I; i++ )); do
      echo "file '$BUILD/chunks/motion_chunk_${i}.mp4'" >> "$BUILD/chunks/list.txt"
    done
    # Chunks are byte-identical encoder output from one Remotion render, so
    # the concat demuxer is safe here (the demuxer bug on this pipeline was
    # about joining heterogeneous AI + motion segments in the FINAL assembly).
    ffmpeg -y -v error -f concat -safe 0 -i "$BUILD/chunks/list.txt" -c copy "$BUILD/motion_full.mp4"
  else
    cp "$BUILD/chunks/motion_chunk_0.mp4" "$BUILD/motion_full.mp4"
  fi
  check_duration "$BUILD/motion_full.mp4" \
    "$(awk -v m="$MAX_FRAME" 'BEGIN { printf "%.3f", (m + 1) / 30 }')" 0.2 "joined motion"

  for entry in $SCENE_LIST; do
    n="${entry%%:*}"; rest="${entry#*:}"; type="${rest%%:*}"; val="${rest#*:}"
    [[ "$type" == "motion" ]] || continue
    SSTART=$(( (val - 1) * 10 ))
    log "cut motion segment scene $n (motion_index $val, ${SSTART}s) -> seg/seg_s${n}.mp4"
    ffmpeg -y -v error -ss "$SSTART" -t 10 -i "$BUILD/motion_full.mp4" \
      -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -an "$BUILD/seg/seg_s${n}.mp4"
    check_duration "$BUILD/seg/seg_s${n}.mp4" 10 0.05 "motion seg s${n}"
  done
fi

# ---------------- step 3: pre-convert AI clips ----------------
for entry in $SCENE_LIST; do
  n="${entry%%:*}"; rest="${entry#*:}"; type="${rest%%:*}"; val="${rest#*:}"
  [[ "$type" == "ai" ]] || continue
  [[ -f "$WORKDIR/$val" ]] || fail "AI clip missing: $WORKDIR/$val (scene $n)"
  log "pre-convert AI clip scene $n ($val) -> conv/s${n}.mp4"
  ffmpeg -y -v error -i "$WORKDIR/$val" \
    -vf "fps=30,scale=${WIDTH}:${HEIGHT}" -r 30 \
    -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -an "$BUILD/conv/s${n}.mp4"
  check_duration "$BUILD/conv/s${n}.mp4" 10 0.15 "AI clip s${n}"
done

# ---------------- step 4: pass 1 — concat FILTER re-encode ----------------
INPUTS=(); FILTER=""; IDX=0
for entry in $SCENE_LIST; do
  n="${entry%%:*}"; rest="${entry#*:}"; type="${rest%%:*}"
  if [[ "$type" == "ai" ]]; then SRC="$BUILD/conv/s${n}.mp4"; else SRC="$BUILD/seg/seg_s${n}.mp4"; fi
  [[ -f "$SRC" ]] || fail "segment missing for scene $n: $SRC"
  INPUTS+=(-i "$SRC")
  FILTER+="[${IDX}:v]fps=30,scale=${WIDTH}:${HEIGHT},setsar=1,setpts=PTS-STARTPTS[v${IDX}];"
  IDX=$(( IDX + 1 ))
done
LABELS=""; for (( j = 0; j < IDX; j++ )); do LABELS+="[v${j}]"; done
FILTER+="${LABELS}concat=n=${IDX}:v=1:a=0[vout]"
log "pass 1: concat filter, $IDX inputs -> silent.mp4 (threads 1)"
ffmpeg -y -v error -threads 1 "${INPUTS[@]}" \
  -filter_complex "$FILTER" -map "[vout]" \
  -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p -an "$BUILD/silent.mp4"
check_duration "$BUILD/silent.mp4" "$EXPECTED_DURATION" 0.15 "pass 1 silent"

# ---------------- step 5: pass 2 — burn ASS subtitles + mux audio ----------------
FINAL="$OUTDIR/$OUTPUT"
log "pass 2: ass burn + audio -> $FINAL (threads 2)"
ffmpeg -y -v error -threads 2 \
  -i "$BUILD/silent.mp4" -i "$WORKDIR/$CFG_AUDIO" \
  -filter_complex "[0:v]ass=$WORKDIR/$CFG_SUBS[vout]" \
  -map "[vout]" -map 1:a \
  -c:v libx264 -crf 18 -preset fast -pix_fmt yuv420p \
  -c:a aac -b:a 192k -shortest -movflags +faststart "$FINAL"

# ---------------- step 6: QC ----------------
{
  echo "QC report — $SLUG ($MODE mode)"
  echo "comp: $COMP | ${WIDTH}x${HEIGHT} 30fps | expected: ${EXPECTED_DURATION}s"
  echo "output: $OUTPUT"
  free -m
} >> "$QC_REPORT"

DUR="$(probe_duration "$FINAL")"
if ! within "$DUR" "$EXPECTED_DURATION" 0.15; then
  fail "QC duration: $DUR s, expected $EXPECTED_DURATION s"
fi
VINFO="$(ffprobe -v error -count_frames -select_streams v:0 \
  -show_entries stream=codec_name,width,height,r_frame_rate,nb_read_frames \
  -of csv=p=0 "$FINAL")"
IFS=',' read -r VCODEC VW VH VFPS VFRAMES <<< "$VINFO"
ACODEC="$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$FINAL")"
[[ "$VW" == "$WIDTH" && "$VH" == "$HEIGHT" ]] \
  || fail "QC resolution: ${VW}x${VH}, expected ${WIDTH}x${HEIGHT}"
[[ "$VFPS" == "30/1" ]] || fail "QC fps: $VFPS, expected 30/1"
EXPECTED_FRAMES=$(( EXPECTED_DURATION * 30 ))
if ! within "$VFRAMES" "$EXPECTED_FRAMES" 5; then
  fail "QC frame count: $VFRAMES, expected $EXPECTED_FRAMES"
fi
[[ -n "$ACODEC" ]] || fail "QC: no audio stream in $FINAL"
{
  echo "duration: ${DUR}s (expected ${EXPECTED_DURATION}s)"
  echo "video: $VCODEC ${VW}x${VH} fps=$VFPS frames=$VFRAMES (expected $EXPECTED_FRAMES)"
  echo "audio: $ACODEC"
  echo "size: $(du -h "$FINAL" | cut -f1)"
} >> "$QC_REPORT"

# Movement check (warn-only): each 10s scene block must actually move.
# Compare a frame at block+1s vs block+9s; PSNR < 5 dB (or identical frames)
# means the scene is effectively static.
{
  echo "movement check (PSNR frame+1s vs frame+9s per scene; warn if < 5 dB):"
} >> "$QC_REPORT"
for entry in $SCENE_LIST; do
  n="${entry%%:*}"
  T0=$(( (n - 1) * 10 ))
  # In smoke mode the assembled clip only contains the chosen scenes, so the
  # block offset is the position in SCENE_LIST, not the scene number.
  if [[ "$MODE" == "smoke" ]]; then
    POS=0
    for e2 in $SCENE_LIST; do
      [[ "${e2%%:*}" == "$n" ]] && break
      POS=$(( POS + 1 ))
    done
    T0=$(( POS * 10 ))
  fi
  F1="$BUILD/qc_f1.png"; F2="$BUILD/qc_f2.png"
  ffmpeg -y -v error -ss $(( T0 + 1 )) -i "$FINAL" -frames:v 1 "$F1"
  ffmpeg -y -v error -ss $(( T0 + 9 )) -i "$FINAL" -frames:v 1 "$F2"
  PSNR_OUT="$(ffmpeg -i "$F1" -i "$F2" -lavfi psnr -f null - 2>&1 | grep -o 'average:[0-9.]*\|average:inf' | head -1)"
  PSNR_VAL="${PSNR_OUT#average:}"
  if [[ "$PSNR_VAL" == "inf" ]]; then
    echo "  scene $n: WARN identical frames (PSNR inf) — static scene?" >> "$QC_REPORT"
  elif awk -v p="$PSNR_VAL" 'BEGIN { exit (p < 5) ? 0 : 1 }'; then
    echo "  scene $n: WARN low movement (PSNR ${PSNR_VAL} dB)" >> "$QC_REPORT"
  else
    echo "  scene $n: movement OK (PSNR ${PSNR_VAL} dB)" >> "$QC_REPORT"
  fi
done

echo "PASS" >> "$QC_REPORT"
log "== DONE: $FINAL (${DUR}s, ${VW}x${VH}, $VFRAMES frames) — QC report: $QC_REPORT =="
cat "$QC_REPORT"
