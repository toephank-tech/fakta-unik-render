import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #56: Your Nerve Signals Race at 400 km/h
// (priority queue rank 31, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Electric-nerve palette: dark navy / electric blue /
// gold / teal / red.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: Helio (avocado_v2:MAI_03) — recorded BEFORE the user
// changed the voice rule (2026-11-07 ~13:09 WIB) to alternating
// Measured Clock / Rumpled Armchair. Per the follow-up instruction,
// #56 keeps Helio; the rotation starts with the NEXT video.
// FACTS (all verified 2026-11-07 before scripting):
// - Fastest myelinated fibers: up to 120 m/s = 432 km/h (Wikipedia,
//   "Nerve conduction velocity"). Script says "around 400 km/h" —
//   conservative rounding, hedged to the FASTEST signals only.
// - Erlanger-Gasser: A-alpha 80-120 m/s, A-beta 30-70 m/s (touch),
//   A-delta 5-30 m/s (fast sharp pain), C fibers 0.5-2 m/s (slow pain).
// - Saltatory conduction: signal jumps node to node at nodes of Ranvier.
// - Reflex arc bypasses the brain; spinal reflex ~20-50 ms vs ~200 ms
//   voluntary (Wikipedia "Reflex arc"; ScienceABC).
// - MS: demyelination slows/blocks conduction (PMC review 2010).
// - F1: typical race top speed 340-360 km/h; record 372.5 km/h (Bottas,
//   Mexico 2016). Nerve max 432 km/h beats even the record.
// - PAYOFF: 120 / 0.5 = 240x — script says "more than 200 times".

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

export const FactsNerveSpeedMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): headline speed — counter climbs to 400 km/h ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const count2 = Math.round(400 * Math.min(1, s2 / 210)); // counter climbs over 7s
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);
  // racing dashes streaking past (decorative band, above text, never crossing it)
  const dash2 = (s2 * 14) % 300;

  // ---- S4 (300-600): fiber speed bars — TRUE proportions ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // Scale: 120 m/s = 760px track (1 m/s = 6.33px). Touch A-beta 70 -> 443px,
  // sharp pain A-delta 30 -> 190px, slowest C fibers use upper bound 2 m/s
  // -> 13px (label shows the full 0.5-2 m/s range; the 0.5 lower bound
  // would be 3px and invisible, so the visible bar is the 2 m/s end).
  const barTouch4 = 443 * fill4;
  const barPain4 = 190 * fill4;
  const barSlow4 = 13 * fill4;

  // ---- S6 (600-900): reflex arc — pulse races hand -> cord -> muscle, brain bypassed ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse6 = (s6 % 150) / 150; // pulse loops along the arc every 5s
  const count6 = Math.round((20 + 30 * Math.min(1, s6 / 150)) * 10) / 10; // 20 -> 50 ms
  const flash6 = 0.6 + 0.4 * Math.sin(s6 * 0.2);

  // ---- S8 (900-1200): race — F1 car vs your nerves, TRUE proportions ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // bars grow over 7s
  // Scale: 400 km/h = 760px track (1 km/h = 1.9px). F1 360 -> 684px,
  // nerves 400 -> 760px. Nerve bar is LONGER — your nerves win.
  const barF18 = 684 * fill8;
  const barNerve8 = 760 * fill8;

  // ---- S9 (1200-1500): PAYOFF — 200x speed gap ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 180); // counter + bars fill over 6s
  // 200x counter (conservative: true gap is 240x, script says "more than 200").
  const count9 = Math.round(200 * fill9);
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);
  // Fastest bar full 760px (120 m/s); slowest bar TRUE proportion 0.5 m/s
  // on the same 120 m/s scale = 3px — drawn as a thin glowing line.
  const barFast9 = 760 * fill9;
  const barSlow9 = 3 * fill9;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — headline: 400 km/h */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR FASTEST NERVE SIGNALS</Kicker>
          <div style={{ display: "flex", gap: 14, marginTop: 30, height: 10 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 90 - ((dash2 + i * 60) % 300) * 0.18, height: 10, backgroundColor: BLUE, borderRadius: 5, opacity: 0.9 - i * 0.15 }} />
            ))}
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 24, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            {count2}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: MOON, marginTop: 6, textAlign: "center" }}>
            KM/H
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: TEAL, marginTop: 16, textAlign: "center" }}>
            120 METRES EVERY SECOND
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            FASTER THAN
            <br />
            A RACE CAR
          </div>
          <Sub>Only your fastest, myelinated fibers — not every nerve.</Sub>
        </Center>
      )}

      {/* S4 — fiber speeds, TRUE proportions */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>NOT EVERY SIGNAL IS A RACE CAR</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>TOUCH</span>
                <span style={{ color: TEAL }}>70 m/s</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barTouch4, height: 36, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>SHARP PAIN</span>
                <span style={{ color: GOLD }}>30 m/s</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barPain4, height: 36, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>SLOWEST FIBERS</span>
                <span style={{ color: RED }}>0.5–2 m/s</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: Math.max(barSlow4, fill4 > 0 ? 4 : 0), height: 36, backgroundColor: RED, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            SAME BODY,
            <br />
            WILDLY DIFFERENT SPEEDS
          </div>
          <Sub>Bars to scale — 120 metres a second is the full track.</Sub>
        </Center>
      )}

      {/* S6 — reflex arc: hand -> spinal cord -> muscle, brain bypassed */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>YOUR FASTEST FIBERS RUN YOUR REFLEXES</Kicker>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginTop: 40, width: 860 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 200 }}>
              <div style={{ fontSize: 84, lineHeight: 1 }}>✋</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 10 }}>HAND</div>
            </div>
            <div style={{ position: "relative", flex: 1, height: 12, backgroundColor: "#1c1c30", borderRadius: 999, overflow: "visible" }}>
              <div style={{ position: "absolute", left: `${pulse6 * 100}%`, top: -14, width: 40, height: 40, marginLeft: -20, backgroundColor: GOLD, borderRadius: "50%", boxShadow: `0 0 ${Math.round(20 * flash6)}px ${GOLD}` }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 220 }}>
              <div style={{ fontSize: 84, lineHeight: 1 }}>🦴</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 10 }}>SPINAL CORD</div>
            </div>
            <div style={{ position: "relative", flex: 1, height: 12, backgroundColor: "#1c1c30", borderRadius: 999, overflow: "visible" }}>
              <div style={{ position: "absolute", left: `${((pulse6 + 0.5) % 1) * 100}%`, top: -14, width: 40, height: 40, marginLeft: -20, backgroundColor: TEAL, borderRadius: "50%", boxShadow: `0 0 ${Math.round(20 * flash6)}px ${TEAL}` }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 200 }}>
              <div style={{ fontSize: 84, lineHeight: 1 }}>💪</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 10 }}>MUSCLE</div>
            </div>
          </div>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, marginTop: 36, textAlign: "center", lineHeight: 1 }}>
            {count6} ms
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            THE WHOLE LOOP
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: RED, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            NO BRAIN NEEDED
          </div>
          <Sub>The signal never goes up to your brain to decide.</Sub>
        </Center>
      )}

      {/* S8 — race: F1 vs your nerves, TRUE proportions */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>ON A RACETRACK, YOUR NERVES WIN</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🏎️ FORMULA 1 CAR</span>
                <span style={{ color: BLUE }}>360 km/h</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barF18, height: 44, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>⚡ YOUR FASTEST NERVES</span>
                <span style={{ color: GOLD }}>~400 km/h</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barNerve8, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            YOUR NERVES WIN
            <br />
            BY A CLEAR MARGIN
          </div>
          <Sub>F1 top speed 340–360 km/h; record 372.5 km/h — still slower.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: 200x gap */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse9})` }}>
            {count9}×
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
            FASTER — FASTEST VS SLOWEST
            <br />
            SIGNAL IN YOUR BODY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>FASTEST — 120 m/s</span>
                <span style={{ color: GOLD }}>FULL BAR</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barFast9, height: 36, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>SLOWEST — 0.5 m/s</span>
                <span style={{ color: RED }}>A SLIVER</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: Math.max(barSlow9, fill9 > 0 ? 4 : 0), height: 36, backgroundColor: RED, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            SAME BODY.
            <br />
            TWO HUNDRED TIMES APART.
          </div>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            True gap is 240× (120 ÷ 0.5) — "more than 200" is conservative
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
