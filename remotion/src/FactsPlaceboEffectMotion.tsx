import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #114: Your Belief Alone Can Kill Pain (placebo effect)
// (priority queue rank 37, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Palette: deep navy / aqua / gold / teal / coral.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: FEMALE Measured Clock (avocado_v2:vdc_6534), speed 95,
// atempo adaptive up to 1.05x. Dramatic pauses after hook (S1) and before
// payoff (S9).
// FACTS (all verified 2026-11-07 before scripting):
// - Beecher 1955 (JAMA, "The Powerful Placebo"): 15 trials, 1,082 patients,
//   reported 35.2% ± 2.2% responded. CONTESTED — no no-treatment control,
//   so spontaneous recovery could not be ruled out; modern reviews say the
//   "one-third" notion should be abandoned. Script says "claimed about a
//   third" + "that number is now disputed".
// - Levine, Gordon & Fields 1978 (Lancet): dental post-surgery patients,
//   placebo presented as painkiller — 39% felt real relief; naloxone (an
//   opioid blocker) REVERSED the relief. Effect ~8 mg morphine in that
//   setting. Proof the brain releases its OWN opioids.
// - de la Fuente-Fernandez et al. 2001 (Science): 6 Parkinson's patients,
//   PET scan — placebo injection triggered substantial dopamine release in
//   the striatum. Small study (n=6, shown on the motion card).
// - LIMIT: Hrobjartsson & Gotzsche Cochrane 2010 (202 trials, 60
//   conditions): no important clinical effects in general; small effects on
//   patient-reported pain (SMD -0.28) and nausea (SMD -0.25); no effect on
//   objective outcomes. Placebo does NOT cure disease.
// - Kaptchuk et al. 2010 (PLoS ONE): open-label placebo, 80 IBS patients,
//   3 weeks, pills openly labeled "placebo" — 59% adequate relief vs 35%
//   with no treatment. Small single-center trial, self-reported outcomes.
// - NOCEBO (payoff): SAMSON trial (NEJM 2020), 60 people who had stopped
//   statins over side effects; blinded monthly bottles (statin / identical
//   dummy / empty). Symptom scores 0-100: no tablets 8.0, dummy 15.4,
//   statin 16.3. About 90% of statin symptoms also appeared on dummy pills.

const BG = "#0a1226";
const AQUA = "#4cc9f0";
const TEAL = "#7fd4c1";
const GOLD = "#f4c95d";
const CORAL = "#ff8a7a";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || AQUA, fontWeight: 700, textAlign: "center" }}>
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

export const FactsPlaceboEffectMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): Beecher 1955 — the famous 35% claim, now disputed ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210);
  // TRUE proportion: 35.2% of a 760px track = 268px.
  const bar2 = Math.max(268 * fill2, fill2 > 0 ? 6 : 0);
  const pct2 = Math.round(35.2 * fill2 * 10) / 10;
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): Levine 1978 — 39% relief, naloxone erased it ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210);
  const count4 = Math.round(39 * fill4);
  // TRUE proportion: 39% of a 760px track = 296px.
  const bar4 = Math.max(296 * fill4, fill4 > 0 ? 6 : 0);
  const pulse4 = 1 + 0.04 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): the limit — symptoms, not cures ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210);
  // Small effects only: pain SMD -0.28 and nausea SMD -0.25 on a 1.0 scale
  // (760px track): pain 213px, nausea 190px; disease effect: flat 0px.
  const barPain6 = Math.max(213 * fill6, fill6 > 0 ? 6 : 0);
  const barNausea6 = Math.max(190 * fill6, fill6 > 0 ? 6 : 0);
  const bob6 = 8 * Math.sin(s6 * 0.09);

  // ---- S8 (900-1200): Kaptchuk 2010 — open-label placebo, 59% vs 35% ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210);
  // TRUE proportions on a 760px track: 59% = 448px, 35% = 266px.
  const barOpen8 = Math.max(448 * fill8, fill8 > 0 ? 6 : 0);
  const barNone8 = Math.max(266 * fill8, fill8 > 0 ? 6 : 0);
  const pulse8 = 1 + 0.05 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — nocebo, the dark twin ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 210);
  // TRUE proportions on a 760px track: ~90% of statin symptoms also on
  // dummy pills = 684px; statin itself = full 760px (reference).
  const barDummy9 = Math.max(684 * fill9, fill9 > 0 ? 6 : 0);
  const barStatin9 = Math.max(760 * fill9, fill9 > 0 ? 6 : 0);
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — Beecher 1955: the famous 35% claim, now disputed */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>THE FAMOUS 1955 CLAIM</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            {pct2}%
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            OF PATIENTS “HELPED” BY PLACEBO
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span style={{ color: MOON }}>BEECHER 1955 — 15 TRIALS</span>
              <span style={{ color: GOLD }}>35.2%</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: bar2, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>1,082 PATIENTS</span>
              <span>NO NO-TREATMENT CONTROL</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            THAT NUMBER IS
            <br />
            NOW DISPUTED
          </div>
          <Sub>Without a no-treatment group, natural recovery could not be ruled out.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Beecher 1955 — JAMA, “The Powerful Placebo”
          </div>
        </Center>
      )}

      {/* S4 — Levine 1978: 39% relief, naloxone erased it */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE PROOF: YOUR OWN OPIOIDS</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: AQUA, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse4})` }}>
            {count4}%
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            FELT REAL RELIEF FROM A FAKE PAINKILLER
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span style={{ color: MOON }}>PLACEBO RESPONDERS</span>
              <span style={{ color: AQUA }}>39%</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: bar4, height: 44, backgroundColor: AQUA, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>DENTAL PATIENTS AFTER SURGERY</span>
              <span>≈ 8 MG MORPHINE</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            NALOXONE
            <br />
            ERASED THE RELIEF
          </div>
          <Sub>A drug that blocks opioids switched the relief off — belief had switched it on.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Levine, Gordon &amp; Fields 1978 — The Lancet
          </div>
        </Center>
      )}

      {/* S6 — the limit: symptoms, not cures */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={CORAL}>BUT KNOW THE LIMIT</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>😖 PAIN — SMALL EFFECT</span>
                <span style={{ color: TEAL }}>YES</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barPain6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🤢 NAUSEA — SMALL EFFECT</span>
                <span style={{ color: TEAL }}>YES</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barNausea6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🦠 CURING THE DISEASE</span>
                <span style={{ color: CORAL }}>NO EFFECT</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 0, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>202 TRIALS • 60 CONDITIONS</span>
              <span>SCALE: EFFECT SIZE 1.0 = FULL BAR</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2, transform: `translateY(${bob6}px)` }}>
            SYMPTOMS,
            <br />
            NOT CURES
          </div>
          <Sub>Placebo eases how you feel — it does not remove the disease itself.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Hróbjartsson &amp; Gøtzsche 2010 — Cochrane review
          </div>
        </Center>
      )}

      {/* S8 — Kaptchuk 2010: open-label placebo, 59% vs 35% */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={TEAL}>EVEN WHEN YOU KNOW IT’S FAKE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>💊 OPEN-LABEL PLACEBO</span>
                <span style={{ color: TEAL }}>59%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barOpen8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🚫 NO PILLS AT ALL</span>
                <span style={{ color: GREY }}>35%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barNone8, height: 44, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>80 IBS PATIENTS • 3 WEEKS</span>
              <span>SMALL STUDY</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            THE RITUAL ALONE
            <br />
            HELPED THEM FEEL BETTER
          </div>
          <Sub>The bottle said “placebo” — and still, nearly six in ten felt better.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Kaptchuk et al. 2010 — PLoS ONE
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: nocebo, the dark twin */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={CORAL}>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>💊 REAL STATIN — SIDE EFFECTS</span>
                <span style={{ color: CORAL }}>100%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barStatin9, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🫙 DUMMY PILL — SAME SYMPTOMS</span>
                <span style={{ color: GOLD }}>~90%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barDummy9, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SAMSON TRIAL • 60 PEOPLE</span>
              <span>EXPECT HARM → FEEL HARM</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp9, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse9})` }}>
            THE DARK TWIN:
            <br />
            NOCEBO
          </div>
          <Sub>Expect harm, and your brain can create real symptoms — even from a dummy pill.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            SAMSON trial 2020 — New England Journal of Medicine
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
