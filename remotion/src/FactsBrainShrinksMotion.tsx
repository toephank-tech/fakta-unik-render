import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #111: Your Brain Shrinks When You're Dehydrated
// (priority queue rank 35, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Water palette: deep navy / aqua / teal / gold /
// coral for the warning beats.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: FEMALE Measured Clock (avocado_v2:vdc_6534), speed 95,
// atempo 1.05x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-07 before scripting; NONE reused from #3):
// - Duning et al. 2005 (Neurology, 10 subjects): 16 h without fluid ->
//   total brain volume DOWN 0.55% (~8 mL of ~1,450 mL). After 1.5 L
//   water, volume UP 0.72% (~10.4 mL); rehydration scan 20-30 min later.
// - AJNR 2015 (15 healthy adults, 12 h dehydration, 1 h rehydration
//   with 1 L water): brain tissue fluid -1.63%; whole brain -0.36%,
//   cortex -0.19%, white matter -0.59%, hypothalamus/thalamus -0.30%.
//   On rehydration: tissue fluid +0.43%, whole brain +0.87%,
//   cortex +1.50%. Cortical thickness also fell and reversed.
// - Mechanism: blood osmolality rises -> water leaves brain cells by
//   osmosis -> cells shrink, ventricles expand to fill the space.
// - Streitbuerger et al. 2012 (PLoS ONE, 6 volunteers, VBM): GM volume
//   decrease (temporal, sub-gyral parietal, left inferior orbito-frontal,
//   extra-nuclear; caudate nucleus, right cerebellar posterior lobe),
//   WM decrease (parietal, tempo-parietal), ventricular system expanded
//   (both lateral, third, fourth ventricles). Paper notes similar degrees
//   of WM shrinkage / ventricular expansion are seen in mild cognitive
//   impairment or Alzheimer's disease progression — a scan confound,
//   NOT "dehydration causes Alzheimer's".
// - Freund et al. (ultramarathon runners, cited AJNR 2015): reversible
//   6% cortical volume reduction with 2 months of daily running.
// - Healthy aging brain volume loss ~0.1-0.3% per year (Fisher 2008;
//   Fotenos et al., cited Nakamura 2014). One dry night (-0.55%) is
//   roughly 2-5 years of normal aging shrinkage in MAGNITUDE — but
//   TEMPORARY and reversible, unlike aging atrophy (no cells die).
// - Nakamura et al. 2014 (12 subjects, 16-h protocol + 1.5 L over
//   90 min): brain volume +0.36% dehydrated -> rehydrated (p=0.0001).

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

export const FactsBrainShrinksMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): Duning 2005 — 16 h, no water: -0.55% (~8 mL) ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // bars grow over 7s
  // Scale: 1% = 760px track. Loss 0.55% -> 418px, gain 0.72% -> 547px.
  const barLoss2 = Math.max(418 * fill2, fill2 > 0 ? 6 : 0);
  const barGain2 = Math.max(547 * fill2, fill2 > 0 ? 6 : 0);
  const vol2 = Math.round(1450 - 8 * fill2);
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): AJNR 2015 — 12 h: tissue fluid -1.63% ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // Scale: 2% = 760px track. Fluid -1.63% -> 620px, WM -0.59% -> 224px,
  // whole brain -0.36% -> 137px, cortex -0.19% -> 72px.
  const barFluid4 = Math.max(620 * fill4, fill4 > 0 ? 6 : 0);
  const barWm4 = Math.max(224 * fill4, fill4 > 0 ? 6 : 0);
  const barBrain4 = Math.max(137 * fill4, fill4 > 0 ? 6 : 0);
  const barCortex4 = Math.max(72 * fill4, fill4 > 0 ? 6 : 0);

  // ---- S6 (600-900): recovery — 1.5 L water, ~30 min: +0.72% ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210); // bars grow over 7s
  // Scale: 1% = 760px. Gain 0.72% -> 547px.
  const barGain6 = Math.max(547 * fill6, fill6 > 0 ? 6 : 0);
  const vol6 = Math.round(1442 + 10 * fill6);
  const clock6 = Math.round(30 * fill6);
  const bob6 = 8 * Math.sin(s6 * 0.09);

  // ---- S8 (900-1200): one dry night vs one year of aging ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // bars grow over 7s
  // Scale: 1% = 760px. One dry night 0.55% -> 418px; one year of aging
  // 0.1-0.3% -> 76px to 228px (mid 0.2% -> 152px).
  const barNight8 = Math.max(418 * fill8, fill8 > 0 ? 6 : 0);
  const barAgeLow8 = Math.max(76 * fill8, fill8 > 0 ? 6 : 0);
  const barAgeHigh8 = Math.max(228 * fill8, fill8 > 0 ? 6 : 0);
  const pulse8 = 1 + 0.05 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — a dehydrated brain can LOOK diseased ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 180); // animation over 6s
  // Brain circle shrinks 300 -> 276px (-8% visual, illustrative of the
  // MRI-measured volume loss); the scan label flips at frame ~120.
  const brainSize9 = 300 - 24 * fill9;
  const label9 = s9 < 120 ? "HEALTHY BRAIN" : "LOOKS LIKE EARLY DISEASE";
  const labelColor9 = s9 < 120 ? TEAL : CORAL;
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — Duning 2005: 16 hours, no water, -0.55% (~8 mL) */}
      {frame < 300 && (
        <Center>
          <Kicker color={CORAL}>16 HOURS, NO WATER</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: CORAL, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            −0.55%
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            OF BRAIN VOLUME — GONE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>AFTER 16 H WITHOUT WATER</span>
                <span style={{ color: CORAL }}>−0.55%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barLoss2, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>AFTER DRINKING 1.5 L</span>
                <span style={{ color: TEAL }}>+0.72%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barGain2, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SCALE: 1% = FULL BAR</span>
              <span>10 VOLUNTEERS</span>
            </div>
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: AQUA, marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            {vol2} mL
          </div>
          <div style={{ fontSize: 34, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            DOWN FROM 1,450 mL — ABOUT 8 mL LOST
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            MEASURED
            <br />
            ON MRI
          </div>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Duning et al. 2005 — Neurology
          </div>
        </Center>
      )}

      {/* S4 — AJNR 2015: 12 h without water, tissue fluid -1.63% */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE WATER LEAVES EVERYWHERE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>BRAIN TISSUE FLUID</span>
                <span style={{ color: CORAL }}>−1.63%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barFluid4, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>WHITE MATTER</span>
                <span style={{ color: GOLD }}>−0.59%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWm4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>WHOLE BRAIN</span>
                <span style={{ color: AQUA }}>−0.36%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barBrain4, height: 44, backgroundColor: AQUA, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>CORTEX</span>
                <span style={{ color: TEAL }}>−0.19%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barCortex4, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SCALE: 2% = FULL BAR</span>
              <span>12 HOURS WITHOUT WATER</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            WHITE MATTER
            <br />
            SHRANK MOST
          </div>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            AJNR 2015 — 15 healthy adults
          </div>
        </Center>
      )}

      {/* S6 — recovery: 1.5 L water, ~30 min, +0.72% */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>IT COMES BACK FAST</Kicker>
          <div style={{ marginTop: 36, transform: `translateY(${bob6}px)`, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #7fd4c1, #2e8f7d 60%, #1c5a4e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 96 }}>
              🧠
            </div>
            <div style={{ fontSize: 120, fontWeight: 900, color: TEAL, marginTop: 16, textAlign: "center", lineHeight: 1 }}>
              {vol6} mL
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
              GROWING BACK — FROM 1,442 mL
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span style={{ color: MOON }}>AFTER 1.5 L OF WATER</span>
              <span style={{ color: TEAL }}>+0.72%</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: barGain6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SCALE: 1% = FULL BAR</span>
              <span>⏱ {clock6} MIN</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            IN ABOUT
            <br />
            HALF AN HOUR
          </div>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Duning 2005 — scan 20–30 min after drinking
          </div>
        </Center>
      )}

      {/* S8 — one dry night vs one year of aging */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={GOLD}>ONE NIGHT VS. ONE YEAR</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>ONE DRY NIGHT</span>
                <span style={{ color: CORAL }}>−0.55%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barNight8, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>ONE YEAR OF AGING</span>
                <span style={{ color: GREY }}>−0.1 TO −0.3%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barAgeHigh8, height: 44, backgroundColor: "#5a7ba6", borderRadius: 999 }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: barAgeLow8, height: 44, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SCALE: 1% = FULL BAR</span>
              <span>HEALTHY AGING</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            YEARS OF AGING
            <br />
            IN ONE NIGHT
          </div>
          <Sub>Same size of change — but this one is only water leaving cells. No cells die.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Aging rate 0.1–0.3%/year — Fisher 2008 • Fotenos et al.
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: a dehydrated brain can LOOK like early disease */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ width: brainSize9, height: brainSize9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #4cc9f0, #1d6fa8 60%, #14486e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 110 }}>
              🧠
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, color: labelColor9, marginTop: 24, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse9})` }}>
              {label9}
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            SAME BRAIN.
            <br />
            DIFFERENT SCAN.
          </div>
          <Sub>Dehydration can make a healthy brain measure like early memory disease — until you drink water.</Sub>
          <div style={{ fontSize: 56, fontWeight: 900, color: AQUA, marginTop: 28, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            DRINK WATER —
            <br />
            THE ILLUSION VANISHES
          </div>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Streitbürger et al. 2012 — PLoS ONE
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
