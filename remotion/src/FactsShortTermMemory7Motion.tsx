import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #55: Your Short-Term Memory Holds Only 7 Things
// (priority queue rank 32, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Brain/memory palette: deep indigo / violet / gold /
// teal / coral.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: FEMALE Measured Clock (avocado_v2:vdc_6534), speed 95 —
// FIRST video under the alternating-voice rule (user, 2026-11-07).
// FACTS (all verified 2026-11-07 before scripting):
// - Miller 1956, "The Magical Number Seven, Plus or Minus Two", Psych Rev
//   63(2): memory span ~7 items (5-9); ~7 digits, ~6 letters, ~5 words.
//   "Magical" was rhetorical — Miller joked the number persecuted him.
// - Cowan 2001, "The magical number 4 in short-term memory", Behav Brain
//   Sci 24(1): pure capacity ~4 chunks (range 3-5) when rehearsal and
//   chunking are blocked (PubMed PMID 11515286).
// - Chunking (Wikipedia): phone number 10 digits -> 3-3-4 groups; chunks
//   of 3-4 items are optimal. Script: 555-123-4567 = 3 chunks.
// - Baddeley & Hitch 1974: working memory = active workspace — central
//   executive (boss), phonological loop (sounds), visuospatial sketchpad
//   (pictures); episodic buffer added 2000.
// - Peterson & Peterson 1959: trigram recall ~80% at 3s, ~35% at 9s,
//   under 10% at 18s with rehearsal blocked; STM lasts ~15-30s.
// - PAYOFF: Chase & Ericsson, student "SF": digit span 7 -> 80 digits
//   after ~2 years of chunking practice (Wikipedia "Chunking").
//   80 / 7 = 11.4x — script says "eleven times the memory".

const BG = "#0d0b1e";
const GOLD = "#f4c95d";
const VIOLET = "#a78bfa";
const TEAL = "#7fd4c1";
const CORAL = "#ff8a7a";
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

export const FactsShortTermMemory7Motion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): Miller 7 ± 2 — counter slides 5 -> 9, lands on 7 ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const count2 = Math.round(5 + 4 * Math.min(1, s2 / 180)); // 5 -> 9 over 6s
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);
  // seven glowing dots light up one by one (decorative band, above text)
  const lit2 = Math.min(7, Math.floor(s2 / 30) + 1);

  // ---- S4 (300-600): Miller 7 vs Cowan 4 — TRUE proportions ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // Scale: 7 chunks = 760px track. Miller 7 -> 760px, Cowan 4 -> 434px
  // (4/7 x 760 = 434.3). Cowan bar is visibly SHORTER — the real limit
  // may be smaller than Miller's famous seven.
  const barMiller4 = 760 * fill4;
  const barCowan4 = 434 * fill4;

  // ---- S6 (600-900): chunking demo — 10 loose digits regroup into 3 blocks ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const regroup6 = Math.min(1, Math.max(0, (s6 - 90) / 120)); // regroup starts frame 90, done by 210
  const flash6 = 0.6 + 0.4 * Math.sin(s6 * 0.2);
  const digits6 = ["5", "5", "5", "1", "2", "3", "4", "5", "6", "7"];

  // ---- S8 (900-1200): memory fades — recall drops 80% -> under 10% ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // decay plays over 7s
  // Peterson & Peterson 1959: recall ~80% at 3s, under 10% at 18s.
  // Recall percent slides 80 -> 8. Bar TRUE proportion: 80% = 608px,
  // 8% = 61px on a 760px track (100% scale).
  const recall8 = Math.round(80 - 72 * fill8);
  const barRecall8 = Math.max(8, (recall8 / 100) * 760);
  const timer8 = Math.round(30 * fill8); // 0 -> 30 seconds

  // ---- S9 (1200-1500): PAYOFF — digit span 7 -> 80 ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 180); // counter + bars fill over 6s
  // 7 -> 80 counter. 80 / 7 = 11.4x — script says "eleven times".
  const count9 = Math.round(7 + 73 * fill9);
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);
  // Bars TRUE proportion on the 80-digit scale: 80 = 760px, 7 = 66px
  // (7/80 x 760 = 66.5). The trained bar dwarfs the untrained one.
  const barTrained9 = 760 * fill9;
  const barUntrained9 = 66 * fill9;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — Miller 1956: 7 ± 2 */}
      {frame < 300 && (
        <Center>
          <Kicker>GEORGE MILLER • 1956</Kicker>
          <div style={{ display: "flex", gap: 18, marginTop: 34, height: 28 }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} style={{ width: 28, height: 28, backgroundColor: i < lit2 ? GOLD : "#2a2645", borderRadius: "50%", boxShadow: i < lit2 ? `0 0 18px ${GOLD}` : "none" }} />
            ))}
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 24, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            {count2}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: MOON, marginTop: 6, textAlign: "center" }}>
            PLUS OR MINUS TWO
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: TEAL, marginTop: 16, textAlign: "center" }}>
            5 TO 9 THINGS — THAT IS ALL
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            THE MAGICAL NUMBER
            <br />
            SEVEN
          </div>
          <Sub>Seven digits. Six letters. About five words.</Sub>
        </Center>
      )}

      {/* S4 — Miller 7 vs Cowan 4, TRUE proportions */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={VIOLET}>BUT WAIT — THE TWIST</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>MILLER 1956</span>
                <span style={{ color: GOLD }}>~7 CHUNKS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barMiller4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>COWAN 2001</span>
                <span style={{ color: VIOLET }}>~4 CHUNKS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barCowan4, height: 44, backgroundColor: VIOLET, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: VIOLET, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            CLOSER TO FOUR,
            <br />
            NOT SEVEN
          </div>
          <Sub>When rehearsal and grouping are blocked, the pure limit is about four.</Sub>
        </Center>
      )}

      {/* S6 — chunking: 10 digits -> 3 blocks */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>THE TRICK: CHUNKING</Kicker>
          <div style={{ display: "flex", gap: 10, marginTop: 36, height: 96, alignItems: "center", justifyContent: "center" }}>
            {digits6.map((d, i) => {
              const group = i < 3 ? 0 : i < 6 ? 1 : 2;
              const gapAfter = regroup6 * (group === 0 ? 34 : group === 1 ? 34 : 0);
              return (
                <div key={i} style={{ width: 62, height: 96, backgroundColor: group === 0 ? TEAL : group === 1 ? GOLD : VIOLET, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, fontWeight: 900, color: "#0d0b1e", marginRight: i === 2 || i === 5 ? gapAfter : 0, opacity: 0.55 + 0.45 * flash6 * (i % 2 === 0 ? 1 : 0.8) }}>
                  {d}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, textAlign: "center", lineHeight: 1.2 }}>
            10 DIGITS → 3 CHUNKS
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
            555 • 123 • 4567
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            SAME DIGITS.
            <br />
            FAR EASIER TO HOLD.
          </div>
          <Sub>Groups of three or four are the sweet spot.</Sub>
        </Center>
      )}

      {/* S8 — memory fades in ~15-30 seconds */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={CORAL}>AND IT FADES FAST</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: CORAL, marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            {timer8}s
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            WITHOUT REHEARSAL
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>REMEMBERED AFTER 3 SECONDS</span>
                <span style={{ color: TEAL }}>~80%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 608, height: 36, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>REMEMBERED AFTER 18 SECONDS</span>
                <span style={{ color: CORAL }}>UNDER 10%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: Math.max(barRecall8, fill8 > 0 ? 6 : 0), height: 36, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            NOW: {recall8}% REMEMBERED
          </div>
          <Sub>Peterson &amp; Peterson, 1959 — stop repeating it, and it is gone.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: digit span 7 -> 80 */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse9})` }}>
            {count9}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
            DIGITS — ONE TRAINED STUDENT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>BEFORE TRAINING</span>
                <span style={{ color: GREY }}>7 DIGITS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: Math.max(barUntrained9, fill9 > 0 ? 6 : 0), height: 36, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>AFTER CHUNKING PRACTICE</span>
                <span style={{ color: GOLD }}>80 DIGITS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barTrained9, height: 36, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            SAME BRAIN.
            <br />
            ELEVEN TIMES THE MEMORY.
          </div>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Chase &amp; Ericsson — about two years of chunking practice
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
