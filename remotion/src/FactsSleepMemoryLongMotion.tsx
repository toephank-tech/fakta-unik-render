import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 4 (#103): You Learn While You Sleep (LONG version of Ep.103 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep night indigo / glowing blue / gold (sleep-learning theme).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - Hippocampus = memory inbox, ~16h recording capacity (Walker).
// - Sleep before learning: 40% less learned after an all-nighter (Yoo et al. 2007).
// - Spindles 12-15 Hz; 90-min nap -> 21% more word pairs (Mander et al., Sleep 2020).
// - Motor skill: +20% finger-tapping speed after sleep vs +2% awake (Walker 2002).
// - REM overnight therapy: keeps the lesson, softens the sting (Walker & van der Helm 2009).
// - TMR: rose smell in deep sleep boosted recall; REM/wake cue did nothing (Rasch 2007).
// - Adults 60+ have ~70% less deep sleep than young adults (NIH / Walker).
// - Sharp-wave ripples 150-250 Hz; replay compressed 10-20x (Buzsaki 2015; Nadasdy 1999).
// - Reverse replay caught in rats (Foster & Wilson 2006).

const BG = "#0b0e26";
const BLUE = "#6db3ff";
const INDIGO = "#9d8cff";
const GOLD = "#f4c95d";
const CORAL = "#ff8a7a";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 26, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

// Content lives in the UPPER portion only: y 70-520, well above the
// landscape subtitle zone (y ~560-720 at MarginV 360, font 60).
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 140px 560px" }}>
      {props.children}
    </div>
  );
}

function Stamp(props: { children: React.ReactNode; color?: string; visible: boolean }) {
  return (
    <div style={{ fontSize: 44, fontWeight: 900, color: props.color || GOLD, marginTop: 18, opacity: props.visible ? 1 : 0, textAlign: "center", lineHeight: 1.2 }}>
      {props.children}
    </div>
  );
}

function Label(props: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

// One slow pulse per second: quick swell, slow relax.
function pulse(frame: number) {
  const phase = (frame % 30) / 30;
  return 1 + 0.06 * Math.pow(Math.max(0, Math.sin(phase * Math.PI * 2)), 2);
}

export const FactsSleepMemoryLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): hippocampus inbox, ~16h capacity ----
  // TRUE proportion: 16 of 24 hours = 67% of the bar (733 of 1100).
  const s2 = frame;
  const fill2 = Math.min(1, s2 / 210);

  // ---- S4 (300-600): brain hits save — hippocampus -> cortex ----
  const s4 = frame - 300;
  const flow4 = (s4 % 60) / 60;

  // ---- S6 (600-900): 90-min nap, +21% word pairs ----
  // TRUE proportion: nap bar = 121% of wake bar (968 vs 800).
  const s6 = frame - 600;
  const fill6 = Math.min(1, s6 / 210);
  const wake6 = 800 * fill6;
  const nap6 = 968 * fill6;

  // ---- S8 (900-1200): REM overnight therapy ----
  const s8 = frame - 900;
  const fade8 = Math.min(1, s8 / 210); // the sting fades, the lesson stays

  // ---- S10 (1200-1500): rose cue works only in deep sleep ----
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 180);

  // ---- S12 (1500-1800): 70% less deep sleep at 60+ ----
  // TRUE proportion: 60+ bar = 30% of young bar (330 of 1100).
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);
  const young12 = 1100 * fill12;
  const old12 = 330 * fill12;

  // ---- S14 (1800-2100): 7-9 hours, deepest filing early ----
  const s14 = frame - 1800;
  const fill14 = Math.min(1, s14 / 210);
  const cycles14 = Math.min(5, Math.floor(s14 / 45));

  // ---- S16 (2100-2400): replay compressed 10-20x ----
  // TRUE proportion: compressed bar = 1/20 of the full bar (50 of 1000).
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);
  const shrink16 = 1000 - 950 * fill16;

  // ---- S18 (2400-2700): closing — the night shift ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — hippocampus inbox, ~16 hours */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR MEMORY INBOX</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            16 <span style={{ fontSize: 56 }}>HOURS</span>
          </div>
          <Label>OF NEW LEARNING — THEN IT NEEDS SLEEP</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 733 * fill2, height: 40, backgroundColor: BLUE, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 733, top: 0, width: 4, height: 40, backgroundColor: "#ffffff", opacity: 0.85 }} />
          </div>
          <Stamp visible={s2 >= 60}>THE HIPPOCAMPUS FILLS UP — SLEEP EMPTIES IT</Stamp>
        </Center>
      )}

      {/* S4 — brain hits save: hippocampus -> cortex */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>WHILE YOU SLEEP, YOUR BRAIN HITS SAVE</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 24 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 110, borderRadius: 20, backgroundColor: INDIGO, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#0b0e26" }}>HIPPOCAMPUS</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginTop: 6 }}>TEMPORARY STORE</div>
            </div>
            <div style={{ position: "relative", width: 260, height: 60 }}>
              <div style={{ position: "absolute", left: 0, top: 28, width: 260, height: 4, backgroundColor: "#55556e" }} />
              {[0, 1, 2].map((i) => {
                const x = ((flow4 * 260 + i * 87) % 260);
                return (
                  <div key={i} style={{ position: "absolute", left: x, top: 17, width: 26, height: 26, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 14px #f4c95d" }} />
                );
              })}
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 110, borderRadius: 20, backgroundColor: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#0b0e26" }}>CORTEX</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginTop: 6 }}>LONG-TERM STORE</div>
            </div>
          </div>
          <Stamp visible={s4 >= 60}>REPLAY MOVES MEMORIES TO KEEP THEM</Stamp>
        </Center>
      )}

      {/* S6 — 90-min nap, +21% word pairs (TRUE: nap bar 121% of wake bar) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>ONE 90-MINUTE NAP</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            +21%
          </div>
          <Label>MORE WORD PAIRS LEARNED AFTER THE NAP</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>AWAKE</div>
              <div style={{ width: wake6, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GOLD, textAlign: "right" }}>NAP</div>
              <div style={{ width: nap6, height: 34, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
          </div>
          <Stamp visible={s6 >= 60}>MORE SPINDLES, MORE REMEMBERED</Stamp>
        </Center>
      )}

      {/* S8 — REM overnight therapy: lesson stays, sting fades */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>REM SLEEP: OVERNIGHT THERAPY</Kicker>
          <div style={{ display: "flex", gap: 60, marginTop: 24 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 130, borderRadius: 20, backgroundColor: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#0b0e26" }}>LESSON</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: GOLD, marginTop: 10 }}>STAYS</div>
            </div>
            <div style={{ textAlign: "center", opacity: 1 - 0.7 * fade8 }}>
              <div style={{ width: 220, height: 130, borderRadius: 20, backgroundColor: CORAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#0b0e26" }}>STING</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: CORAL, marginTop: 10 }}>FADES</div>
            </div>
          </div>
          <Stamp visible={s8 >= 60}>YESTERDAY FEELS SMALLER AFTER A GOOD NIGHT</Stamp>
        </Center>
      )}

      {/* S10 — rose cue works only in deep sleep */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE ROSE-SMELL TRICK</Kicker>
          <div style={{ display: "flex", gap: 60, marginTop: 24 }}>
            {[
              { name: "DEEP SLEEP", ok: true },
              { name: "REM", ok: false },
              { name: "AWAKE", ok: false },
            ].map((p) => (
              <div key={p.name} style={{ textAlign: "center", opacity: fill10 > 0 ? 1 : 0 }}>
                <div style={{ width: 220, height: 130, borderRadius: 20, backgroundColor: p.ok ? TEAL : "#1c2340", border: p.ok ? "none" : "4px solid #55556e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, fontWeight: 900, color: p.ok ? "#0b0e26" : GREY }}>
                  {p.ok ? "\u2713" : "\u2715"}
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, color: p.ok ? TEAL : MOON, marginTop: 10 }}>{p.name}</div>
              </div>
            ))}
          </div>
          <Stamp color={TEAL} visible={s10 >= 60}>ONLY DEEP SLEEP BOOSTED RECALL</Stamp>
        </Center>
      )}

      {/* S12 — 70% less deep sleep at 60+ (TRUE: old bar 30% of young bar) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={CORAL}>BUT THE SYSTEM FADES WITH AGE</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            &minus;70%
          </div>
          <Label>DEEP SLEEP BY AGE 60, VS YOUNG ADULTS</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>AGE 20</div>
              <div style={{ width: young12, height: 34, backgroundColor: BLUE, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CORAL, textAlign: "right" }}>AGE 60+</div>
              <div style={{ width: old12, height: 34, backgroundColor: CORAL, borderRadius: 999 }} />
            </div>
          </div>
          <Stamp color={CORAL} visible={s12 >= 60}>DEEP SLEEP IS THE FILING SHIFT</Stamp>
        </Center>
      )}

      {/* S14 — 7-9 hours, deepest filing early */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker>HOW MUCH SLEEP DOES LEARNING NEED?</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            7&ndash;9 <span style={{ fontSize: 56 }}>HOURS</span>
          </div>
          <Label>A NIGHT, FOR MOST ADULTS</Label>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: i < cycles14 ? (i < 2 ? GOLD : TEAL) : "#1c2340", border: "4px solid #55556e", opacity: fill14 }} />
            ))}
          </div>
          <Stamp color={TEAL} visible={s14 >= 60}>DEEPEST FILING EARLY IN THE NIGHT</Stamp>
        </Center>
      )}

      {/* S16 — replay compressed 10-20x (TRUE: 50 of 1000 = 1/20) */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker>THAT COMPRESSION IS THE POINT</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: INDIGO, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            10&ndash;20&times;
          </div>
          <Label>FASTER THAN REAL LIFE</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 50, top: 0, width: shrink16, height: 40, backgroundColor: INDIGO, borderRadius: 999 }} />
          </div>
          <Stamp color={INDIGO} visible={s16 >= 60}>SECONDS OF LIFE, SQUEEZED INTO A BLINK</Stamp>
        </Center>
      )}

      {/* S18 — closing: the night shift */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker>TONIGHT IS NOT WASTED TIME</Kicker>
          <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: GOLD, transform: `scale(${pulse18})`, boxShadow: "0 0 50px rgba(244,201,93,0.6)", marginTop: 22 }} />
          <Label>IT IS YOUR BRAIN&apos;S NIGHT SHIFT</Label>
          <Stamp visible={s18 >= 60}>WAKE UP SMARTER THAN YOU WENT TO BED</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
