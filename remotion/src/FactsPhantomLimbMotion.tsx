import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #113: Your Brain Feels a Limb That Isn't There
// (priority queue rank 39, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Phantom palette: deep indigo / violet / gold / teal.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: FEMALE Measured Clock (avocado_v2:vdc_6534), speed 95,
// atempo 1.00x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-08 before scripting):
// - Phantom sensation: commonly cited 60-80% of amputees; Buchanan &
//   Mandel 1986 (n=716): sensation 84.1%, pain 62.4%. Script says "up to
//   eight in ten" — safe, inside every cited range.
// - Sensation vs pain are DIFFERENT: most feel non-painful sensations
//   (tingling, itching, pressure, movement); phantom pain is a subset.
//   Limakatso meta-analysis: pooled phantom-pain prevalence ~64%.
// - Cortical remapping: Ramachandran et al. 1992 (Science 258:1159-60),
//   building on Pons et al. 1991 (monkeys): after arm amputation the hand
//   area of somatosensory cortex is taken over by neighbouring face /
//   upper-arm inputs — the hand sits between face and arm on Penfield's
//   homunculus. Touching the face can evoke a precisely localised
//   sensation in the phantom hand. Changes seen as early as 4 weeks.
// - Mirror therapy: Ramachandran's mirror box; Chan et al. 2007 (NEJM)
//   RCT, 22 lower-limb amputees, 15 min/day x 4 weeks: mirror-group pain
//   fell from a median of 30 to about 5 on a 100-point scale. Finn et al.
//   2017 (Front. Neurol. 8:267) upper-limb RCT, n=15, also positive. BUT
//   Barbin et al. 2016 systematic review (20 studies): low level of
//   evidence, "cannot recommend as a first intention treatment". Script
//   states both the small-trial result AND "evidence mixed".
// - CONGENITAL PHANTOMS (payoff): Melzack et al. 1997 (Brain 120:1603-20):
//   phantoms in at least 20% of people born limb-deficient, 50% of those
//   amputated before age 6. Brugger et al. 2000 (PNAS 97:6167): a woman
//   born with no arms or legs felt detailed phantom limbs. The brain's
//   body map is in part genetically specified — innate, not purely
//   learned. Script hedges: "some people" (most congenital amputees do
//   NOT report phantoms, Reilly & Sirigu 2011).

const BG = "#0d0a24";
const VIOLET = "#a78bfa";
const AQUA = "#4cc9f0";
const TEAL = "#7fd4c1";
const GOLD = "#f4c95d";
const GREY = "#c9c9cf";
const MOON = "#e6e2ff";
const CORAL = "#ff8a7a";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || VIOLET, fontWeight: 700, textAlign: "center" }}>
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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8fa8d4", fontWeight: 700 }}>
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

export const FactsPhantomLimbMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): up to 8 in 10 still feel the missing limb ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // bar + counter grow over 7s
  // Scale: 100% = 760px track. 80% -> 608px.
  const bar2 = Math.max(608 * fill2, fill2 > 0 ? 6 : 0);
  const count2 = Math.round(8 * fill2);
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);
  const chip1 = s2 >= 90 ? 1 : 0;
  const chip2 = s2 >= 140 ? 1 : 0;
  const chip3 = s2 >= 190 ? 1 : 0;

  // ---- S4 (300-600): homunculus — face next to hand, face moves in ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // Face block widens into the hand block after frame ~120.
  const invade4 = s4 >= 120 ? Math.min(1, (s4 - 120) / 150) : 0;
  const faceW4 = 240 + 180 * invade4;
  const handW4 = 240 - 180 * invade4;
  const pulse4 = 1 + 0.04 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): timeline 1991 monkeys -> 1992 humans -> 4 weeks ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const node1 = s6 >= 30 ? 1 : 0;
  const node2 = s6 >= 110 ? 1 : 0;
  const node3 = s6 >= 190 ? 1 : 0;
  const bob6 = 8 * Math.sin(s6 * 0.09);

  // ---- S8 (900-1200): mirror therapy does not work for everyone ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const card1 = s8 >= 30 ? 1 : 0;
  const card2 = s8 >= 110 ? 1 : 0;
  const pulse8 = 1 + 0.05 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — the map came first ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const big9 = s9 >= 90 ? 1 : 0;
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — up to 8 in 10 still feel the missing limb */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>AFTER AN AMPUTATION</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1, transform: `scale(${pulse2})` }}>
              {count2} IN 10
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              STILL FEEL THE MISSING LIMB
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>👻 PHANTOM SENSATION</span>
                <span style={{ color: GOLD }}>UP TO 80%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: bar2, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 18 }}>
              <div style={{ backgroundColor: "#1a1440", border: "3px solid #a78bfa", borderRadius: 999, padding: "14px 26px", fontSize: 30, fontWeight: 900, color: VIOLET, opacity: chip1 }}>TINGLING</div>
              <div style={{ backgroundColor: "#1a1440", border: "3px solid #4cc9f0", borderRadius: 999, padding: "14px 26px", fontSize: 30, fontWeight: 900, color: AQUA, opacity: chip2 }}>ITCHING</div>
              <div style={{ backgroundColor: "#1a1440", border: "3px solid #f4c95d", borderRadius: 999, padding: "14px 26px", fontSize: 30, fontWeight: 900, color: GOLD, opacity: chip3 }}>MOVEMENT</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            UP TO 80%
          </div>
          <Sub>Most amputees feel the limb is still there — years after it is gone.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Buchanan &amp; Mandel 1986, 716 amputees
          </div>
        </Center>
      )}

      {/* S4 — homunculus: face sits next to hand, face signals move in */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>YOUR BRAIN’S BODY MAP</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
              <div style={{ width: faceW4, height: 150, borderRadius: 24, backgroundColor: "#6d28d9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${pulse4})` }}>
                <div style={{ fontSize: 56 }}>🙂</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>FACE</div>
              </div>
              <div style={{ width: Math.max(handW4, 60), height: 150, borderRadius: 24, backgroundColor: invade4 > 0.5 ? "#3d2b00" : "#1a1440", border: "3px solid #f4c95d", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 56 }}>✋</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: GOLD }}>HAND</div>
              </div>
              <div style={{ width: 180, height: 150, borderRadius: 24, backgroundColor: "#1a1440", border: "3px solid #4cc9f0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 56 }}>💪</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: AQUA }}>ARM</div>
              </div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, marginTop: 24, textAlign: "center" }}>
              {invade4 > 0.5 ? "THE FACE’S SIGNALS MOVE INTO THE HAND’S PATCH" : "ON THE BRAIN’S MAP, THEY ARE NEIGHBOURS"}
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            NEIGHBOURS
            <br />
            ON THE MAP
          </div>
          <Sub>When the hand goes silent, the face’s signals take over its patch of cortex.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Ramachandran et al. 1992 — Science
          </div>
        </Center>
      )}

      {/* S6 — timeline: monkeys 1991 -> humans 1992 -> 4 weeks */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>HOW WE KNOW</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #a78bfa", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: node1 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: VIOLET }}>🐒 1991 — MONKEYS FIRST</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>The deprived cortex is taken over by neighbours</div>
            </div>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #4cc9f0", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: node2 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: AQUA }}>🧑 1992 — THEN IN PEOPLE</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>A touch on the face is felt in the phantom hand</div>
            </div>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #f4c95d", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: node3 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: GOLD }}>⏱️ AS EARLY AS 4 WEEKS</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>The rewiring starts fast after amputation</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2, transform: `translateY(${bob6}px)` }}>
            MAPPED IN MONKEYS,
            <br />
            FOUND IN PEOPLE
          </div>
          <Sub>Pons et al. 1991 • Ramachandran et al. 1992</Sub>
        </Center>
      )}

      {/* S8 — mirror therapy: real relief for some, none for others */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={CORAL}>BUT IT DOES NOT WORK FOR EVERYONE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #f4c95d", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: card1 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: GOLD }}>🪞 HELPS SOME</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>In one small trial, pain fell from 30 to 5 out of 100</div>
            </div>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #8fa8d4", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: card2 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: GREY }}>🚫 NO CHANGE FOR OTHERS</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>Later reviews call the evidence mixed</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            EVIDENCE:
            <br />
            MIXED
          </div>
          <Sub>Mirror therapy is real hope — not a cure for everyone.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Chan et al. 2007 • Barbin et al. 2016 review
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: the map came first */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #a78bfa, #6d28d9 60%, #4c1d95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, transform: `scale(${pulse9})` }}>
              🧠
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 24, textAlign: "center" }}>
              BORN WITHOUT A LIMB — STILL FEELS ONE
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: big9, textAlign: "center", lineHeight: 1.2 }}>
            THE MAP
            <br />
            CAME FIRST
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: TEAL, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            MELZACK 1997 — PHANTOMS IN PEOPLE BORN WITHOUT A LIMB
          </div>
          <Sub>Your brain’s map of your body is partly built in — before experience.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
