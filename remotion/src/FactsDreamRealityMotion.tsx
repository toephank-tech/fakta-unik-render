import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #172: Your Brain Can't Tell Dreams From Reality
// (priority queue rank 30, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dream palette: dark navy / moonlight blue / gold.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// CAREFUL PHRASING: no claim the brain "believes" dreams are real; every
// claim is hedged to the mechanism (reduced prefrontal activity + no
// external sensory input during the dream).
// FACTS (all verified 2026-11-07 before scripting):
// - Muzur, Pace-Schott & Hobson 2002, Trends Cogn Sci: deactivation of the
//   dorsolateral prefrontal cortex during REM sleep explains the diminution
//   of self-awareness in dreaming. Hobson et al. 1998 (PET): limbic /
//   paralimbic activation in REM + dorsolateral prefrontal deactivation.
// - Dang-Vu et al. 2005 (PET/fMRI review): pons, thalamus, temporo-
//   occipital and limbic/paralimbic areas (incl. amygdala, hippocampus)
//   activate in REM; dorsolateral prefrontal + inferior parietal quiet.
//   Dreams "are nevertheless taken as real by the dreamer."
// - Hobson AIM model: in REM the brain processes internally generated
//   data; eyes closed, no new outside input; dream built from memory.
// - Amygdala fires with striking intensity in REM and responds to imagined
//   threats with the same intensity as real ones (Dang-Vu 2005).
// - Lucid dreaming = prefrontal reactivation: Voss et al. 2009 — higher
//   frontal gamma (~40 Hz) in lucid vs non-lucid REM; 6 trained lucid
//   dreamers, SMALL sample, preliminary. Dresler et al. 2012 (fMRI):
//   prefrontal cortex, precuneus, parietal regions activate in lucid REM.
// - PAYOFF: Saunders et al. 2016, Consciousness and Cognition —
//   meta-analysis of 34 studies (n=24,282): 55% [49%, 62%] have had at
//   least one lucid dream in a lifetime; 23% frequent (>=1/month).

const BG = "#0b0b1e";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const RED = "#ff7a7a";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

function Sub(props: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 32, color: GREY, marginTop: 24, textAlign: "center", lineHeight: 1.45 }}>
      {props.children}
    </div>
  );
}

function Badge(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#9a8fc4", fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

// Content is centered in the UPPER portion: big bottom padding keeps every
// line of text above the subtitle zone (y < 1280).
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 640px" }}>
      {props.children}
    </div>
  );
}

export const FactsDreamRealityMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the inner skeptic goes quiet — reality-check switch OFF ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const switch2 = Math.min(1, Math.max(0, (s2 - 30) / 120)); // knob slides OFF over 4s
  const dim2 = 1 - 0.55 * switch2; // front-of-brain glow dims as switch turns off
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.1);

  // ---- S4 (300-600): the rest of the brain is wide awake — three regions light up ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const lit4 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s4 - d) / 60)));
  const glow4 = 0.6 + 0.4 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): nightmare fear — dream threat vs real danger, SAME response ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210); // bars grow over 7s
  // Finding: amygdala responds to imagined threats with the SAME intensity
  // as real ones — so both bars are EQUAL height: 600px on a 760px track.
  const barDream6 = 600 * fill6;
  const barReal6 = 600 * fill6;
  const alarm6 = 1 + 0.08 * Math.sin(s6 * 0.25); // alarm pulse

  // ---- S8 (900-1200): gamma spike ~40 Hz — oscillating wave bars ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const waveBars8 = Array.from({ length: 24 }, (_, i) => {
    const ph = s8 * 0.35 - i * 0.55;
    return 26 + 130 * (0.5 + 0.5 * Math.sin(ph));
  });
  const count8 = Math.round(40 * Math.min(1, s8 / 150)); // counter climbs to 40 Hz

  // ---- S9 (1200-1500): PAYOFF — 55% have had a lucid dream (TRUE proportion) ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 210); // bar fills over 7s
  // 0-100% scale on a 760px track: 1% = 7.6px. 55% -> 418px (TRUE proportion).
  const barW9 = 418 * fill9;
  const count9 = Math.round(55 * fill9);
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the inner skeptic goes quiet */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR INNER SKEPTIC</Kicker>
          <div style={{ fontSize: 100, fontWeight: 900, color: MOON, marginTop: 36, textAlign: "center", lineHeight: 1.05, transform: `scale(${pulse2})` }}>
            PREFRONTAL
            <br />
            CORTEX
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 44 }}>
            <span style={{ fontSize: 36, fontWeight: 800, color: TEAL }}>ON</span>
            <div style={{ position: "relative", width: 220, height: 96, backgroundColor: "#1c1c30", borderRadius: 999, border: "3px solid #3a3a55" }}>
              <div style={{ position: "absolute", top: 10, left: 10 + 104 * switch2, width: 76, height: 76, backgroundColor: switch2 > 0.5 ? "#55556e" : TEAL, borderRadius: "50%", opacity: dim2 }} />
            </div>
            <span style={{ fontSize: 36, fontWeight: 800, color: switch2 > 0.5 ? RED : GREY }}>OFF</span>
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: switch2 > 0.5 ? RED : GREY, marginTop: 20, textAlign: "center" }}>
            {switch2 > 0.5 ? "REALITY CHECK: OFF" : "REALITY CHECK: ON"}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            IT GOES QUIET
            <br />
            IN REM SLEEP
          </div>
          <Sub>Brain scans show the skeptic quiets down while you dream.</Sub>
        </Center>
      )}

      {/* S4 — the rest of the brain is wide awake */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>MEANWHILE, THE REST LIGHTS UP</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36, width: 860 }}>
            {[
              { label: "VISUAL AREAS — LIGHT UP", color: BLUE },
              { label: "MEMORY CENTERS — FIRE", color: TEAL },
              { label: "AMYGDALA — BURNS BRIGHT", color: RED },
            ].map((row, i) => (
              <div key={row.label} style={{ backgroundColor: "#1c1c30", borderRadius: 16, padding: "22px 28px", textAlign: "center", opacity: lit4[i], transform: `translateY(${(1 - lit4[i]) * 24}px)`, border: `3px solid ${row.color}`, boxShadow: lit4[i] > 0.9 ? `0 0 ${Math.round(24 * glow4)}px ${row.color}` : "none" }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: row.color }}>{row.label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            YOUR BRAIN IS
            <br />
            WIDE AWAKE
          </div>
          <Sub>Only the logic center rests. Everything else is firing.</Sub>
        </Center>
      )}

      {/* S6 — nightmare fear: same amygdala response */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={RED}>WHY NIGHTMARES FEEL REAL</Kicker>
          <div style={{ fontSize: 96, fontWeight: 900, color: RED, marginTop: 28, textAlign: "center", lineHeight: 1.1, transform: `scale(${alarm6})` }}>
            FEAR CENTER
            <br />
            ON ALARM
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>DREAM THREAT</span>
                <span style={{ color: RED }}>SAME</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barDream6, height: 36, backgroundColor: RED, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>REAL DANGER</span>
                <span style={{ color: RED }}>SAME</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barReal6, height: 36, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            SAME INTENSITY,
            <br />
            DREAM OR REAL
          </div>
          <Sub>Your amygdala answers a dream threat like a real one.</Sub>
        </Center>
      )}

      {/* S8 — gamma spike ~40 Hz */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>THE LUCID MOMENT</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 190, marginTop: 36 }}>
            {waveBars8.map((h, i) => (
              <div key={i} style={{ width: 26, height: h, backgroundColor: i % 2 === 0 ? GOLD : BLUE, borderRadius: 13 }} />
            ))}
          </div>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            {count8} Hz
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            FAST GAMMA WAVES
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            THE SKEPTIC
            <br />
            SWITCHES BACK ON
          </div>
          <Sub>Small study — 6 trained lucid dreamers (Voss et al. 2009).</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: 55% have had a lucid dream */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse9})` }}>
            {count9}%
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
            OF PEOPLE HAVE HAD
            <br />
            A LUCID DREAM
          </div>
          <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 40, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: barW9, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 760, fontSize: 28, color: GREY, marginTop: 12 }}>
            <span>0%</span>
            <span style={{ color: GOLD }}>55 OF EVERY 100 PEOPLE</span>
            <span>100%</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            THE SKEPTIC WOKE UP
            <br />
            INSIDE THE DREAM
          </div>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Saunders et al. 2016, Consciousness and Cognition
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
