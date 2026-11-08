# fakta-unik-render

Render pipeline for the Fakta Unik (Unique Facts) videos: Remotion motion
graphics plus ffmpeg assembly, run on GitHub Actions free runners.

The VM that produces these videos has its RAM blocked by the host, so the
heavy steps (Remotion render and ffmpeg assembly) run here instead. Light
steps (fact research, scripting, TTS narration, AI clips, subtitles) still
run on the VM. Finished videos come back as workflow artifacts and are
uploaded to Google Drive from there.

## How a render works

1. Package a video's materials (AI clips, narration, subtitles, config)
   into a zip and upload it to Google Drive.
2. Dispatch the `render-video` workflow with the Drive file ID and the
   video's slug, composition, duration and resolution.
3. The runner downloads the materials, renders the motion segments with
   Remotion, assembles everything with ffmpeg, burns in the subtitles and
   uploads the finished MP4 as an artifact.
4. Download the artifact, verify it and upload it to Google Drive.

## Layout

- `.github/workflows/render-video.yml` — the render workflow.
- `render/render_video.sh` — the parameterized renderer.
- `remotion/` — the Remotion project (compositions live in `src/`).
