import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #47: Your Body Is Made of 37 Trillion Cells
// LONG-FORM SAMPLE (one-off): 180s landscape 1920x1080, 30fps, 5400 frames.
// MOTION segments for the V3 combo: 9 EVEN scenes x 300 frames = 2700 frames.
// AI-video scenes are the ODD scenes (S1,S3,...,S17); this comp covers
// S2,S4,S6,S8,S10,S12,S14,S16,S18. Every scene has continuous real movement,
// NOT animated text cards. Cell palette: deep indigo / teal / coral / gold.
// LANDSCAPE RULES (new for long-form):
// - All on-screen text stays ABOVE y ~ 950 (landscape subtitles sit near the
//   bottom, MarginV 80, font 56) — the Center wrapper is padded so content
//   never reaches the lower strip.
// - TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
//   in their scene (frame <= 60). Decorative elements never cross text lines.
// FACTS (all verified 2026-11-07 before scripting):
// - ~37 trillion cells: Bianconi 2013 (37.2 +/- 0.81T); Sender 2016 revised
//   to ~30T (reference man); Hatton 2023 PNAS ~36T male / ~28T female /
//   ~17T child. Presented as an ESTIMATE, never exact for everyone.
// - RBCs ~25 trillion, ~84% of all cells but only ~4% of body mass
//   (Sender 2016). By MASS, muscle and fat dominate (Sender 2016 Fig 3).
// - ~200 different cell types (standard textbook figure).
// - Smallest: sperm head ~5 micrometres. Largest: ovum ~120 micrometres,
//   just visible to the naked eye. Longest: neuron, over a metre.
//   Egg ~24x wider than sperm head, thousands of times bigger in volume.
// - DNA ~2 metres in every nucleated cell.
// - Turnover: Sender & Milo 2021 Nature Medicine — ~330 billion cells/day
//   (~1% of all cells), ~4 million/second, 86% blood cells. Cell COUNT
//   turns over in ~80-100 days (SciAm Apr 2021) — hedged "by number".
// - Some brain / eye-lens cells last a lifetime (NIGMS). Average cell age
//   7-10 years (Spalding/Frisen, Karolinska, Cell 2005).
// - Bacteria ~38 trillion, roughly 1:1 with human cells (Sender 2016).

const BG = "#0d0b1e";
const GOLD = "#f4c95d";
const TEAL = "#7fd4c1";
const CORAL = "#ff8a7a";
const VIOLET = "#a78bfa";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 28, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

function Sub(props: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 30, color: GREY, marginTop: 20, textAlign: "center", lineHeight: 1.45 }}>
      {props.children}
    </div>
  );
}

function Badge(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", top: 56, left: 0, right: 0, textAlign: "center", fontSize: 24, letterSpacing: 5, color: "#9a8fc4", fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

// Content is centered in the UPPER portion: big bottom padding keeps every
// line of text above the landscape subtitle zone (y < ~950).
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "90px 120px 300px" }}>
      {props.children}
    </div>
  );
}

function BarRow(props: { label: string; value: string; width: number; color: string; height?: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
        <span style={{ color: MOON }}>{props.label}</span>
        <span style={{ color: props.color }}>{props.value}</span>
      </div>
      <div style={{ position: "relative", width: 1100, height: props.height || 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 8, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: Math.max(props.width, props.width > 0 ? 6 : 0), height: props.height || 40, backgroundColor: props.color, borderRadius: 999 }} />
      </div>
    </div>
  );
}

export const Facts37TrillionCellsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the count — Hatton 2023, TRUE proportions ----
  // Scale: 36T = 1100px. Male 36T -> 1100px, female 28T -> 856px, child 17T -> 520px.
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0;
  const fill2 = Math.min(1, s2 / 210);
  const count2 = (37.2 * fill2).toFixed(1);
  const barMale2 = 1100 * fill2;
  const barFemale2 = 856 * fill2;
  const barChild2 = 520 * fill2;
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): RBCs 84% of cells, 4% of mass — TRUE proportions ----
  // Scale: 100% = 1100px. 84% -> 924px, 4% -> 44px.
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0;
  const fill4 = Math.min(1, s4 / 210);
  const barCount4 = 924 * fill4;
  const barMass4 = Math.max(44 * fill4, fill4 > 0 ? 6 : 0);

  // ---- S6 (600-900): ~200 cell types — counter + living dot field ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0;
  const fill6 = Math.min(1, s6 / 210);
  const count6 = Math.round(200 * fill6);
  const dots6 = Array.from({ length: 24 }, (_, i) => {
    const v = 0.5 + 0.5 * Math.sin(i * 1.7 + s6 * 0.15);
    return 10 + 14 * v;
  });

  // ---- S8 (900-1200): egg 120 um vs sperm head 5 um — TRUE proportions ----
  // Scale: 120 um = 1100px. 5 um -> 46px.
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0;
  const fill8 = Math.min(1, s8 / 210);
  const barEgg8 = 1100 * fill8;
  const barSperm8 = Math.max(46 * fill8, fill8 > 0 ? 6 : 0);

  // ---- S10 (1200-1500): longest cell — a neuron over a metre ----
  const s10 = frame - 1200;
  const stamp10 = s10 >= 60 ? 1 : 0;
  const fill10 = Math.min(1, s10 / 210);
  const line10 = 1100 * fill10;
  const pulseDot10 = 40 + 1020 * ((s10 % 90) / 90);

  // ---- S12 (1500-1800): turnover 330 billion/day ----
  const s12 = frame - 1500;
  const stamp12 = s12 >= 60 ? 1 : 0;
  const fill12 = Math.min(1, s12 / 210);
  const count12 = Math.round(330 * fill12);
  const barBlood12 = 946 * fill12; // 86% of turnover = 946px of 1100
  const barGut12 = 154 * fill12; // remaining ~14% = 154px

  // ---- S14 (1800-2100): cell count turns over in 80-100 days ----
  const s14 = frame - 1800;
  const stamp14 = s14 >= 60 ? 1 : 0;
  const fill14 = Math.min(1, s14 / 210);
  const count14 = Math.round(100 * fill14);
  const barDays14 = 1100 * fill14;
  const zoneStart14 = 880; // 80 days of 100 = 880px

  // ---- S16 (2100-2400): average cell age 7-10 years ----
  // Scale: 80 years = 1100px. 7y -> 96px, 10y -> 138px (range band).
  const s16 = frame - 2100;
  const stamp16 = s16 >= 60 ? 1 : 0;
  const fill16 = Math.min(1, s16 / 210);
  const bandLeft16 = 96 * fill16;
  const bandWidth16 = Math.max((138 - 96) * fill16, fill16 > 0 ? 6 : 0);
  const pulse16 = 1 + 0.04 * Math.sin(s16 * 0.12);

  // ---- S18 (2400-2700): PAYOFF — 37 trillion cells, rebuilt constantly ----
  const s18 = frame - 2400;
  const stamp18 = s18 >= 60 ? 1 : 0;
  const fill18 = Math.min(1, s18 / 180);
  const count18 = (37.2 * fill18).toFixed(1);
  const perSec18 = Math.round(4 * fill18 * 10) / 10;
  const pulse18 = 1 + 0.05 * Math.sin(s18 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the count, TRUE proportions (Hatton 2023) */}
      {frame < 300 && (
        <Center>
          <Kicker>HOW MANY CELLS ARE YOU?</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 24, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            {count2} T
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            TRILLION CELLS — GIVE OR TAKE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 32, width: 1180 }}>
            <BarRow label="REFERENCE MAN" value="~36 TRILLION" width={barMale2} color={GOLD} />
            <BarRow label="REFERENCE WOMAN" value="~28 TRILLION" width={barFemale2} color={TEAL} />
            <BarRow label="10-YEAR-OLD CHILD" value="~17 TRILLION" width={barChild2} color={CORAL} />
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: GOLD, marginTop: 30, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            AN ESTIMATE — NOT A HEADCOUNT
          </div>
          <Sub>Counted tissue by tissue. The famous 37.2 trillion comes from Bianconi, 2013.</Sub>
        </Center>
      )}

      {/* S4 — RBCs: 84% of cells, 4% of mass, TRUE proportions */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={CORAL}>ONE CELL TYPE RUNS THE SHOW</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 36, width: 1180 }}>
            <BarRow label="SHARE OF ALL YOUR CELLS" value="84%" width={barCount4} color={CORAL} />
            <BarRow label="SHARE OF YOUR BODY MASS" value="~4%" width={barMass4} color={GREY} />
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: CORAL, marginTop: 26, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            25 T
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            TRILLION RED BLOOD CELLS
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: CORAL, marginTop: 30, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            84% OF THE CELLS.
            <br />
            4% OF THE WEIGHT.
          </div>
          <Sub>By number they dominate. By weight, muscle and fat win.</Sub>
        </Center>
      )}

      {/* S6 — about 200 cell types */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>NOT ONE KIND — TWO HUNDRED</Kicker>
          <div style={{ display: "flex", gap: 14, marginTop: 30, height: 40, width: 1100, justifyContent: "center", alignItems: "center" }}>
            {dots6.map((d, i) => (
              <div key={i} style={{ width: d, height: d, backgroundColor: i % 3 === 0 ? TEAL : i % 3 === 1 ? GOLD : CORAL, borderRadius: "50%" }} />
            ))}
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: TEAL, marginTop: 16, textAlign: "center", lineHeight: 1 }}>
            {count6}
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            DIFFERENT KINDS OF CELLS
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: TEAL, marginTop: 30, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            ONE BODY • 200 JOBS
          </div>
          <Sub>Skin cells, bone cells, nerve cells — each one built for a single job.</Sub>
        </Center>
      )}

      {/* S8 — egg 120 um vs sperm head 5 um, TRUE proportions */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={VIOLET}>SMALLEST VS LARGEST</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 36, width: 1180 }}>
            <BarRow label="HUMAN EGG" value="~120 µm" width={barEgg8} color={VIOLET} />
            <BarRow label="SPERM HEAD" value="~5 µm" width={barSperm8} color={GREY} />
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: VIOLET, marginTop: 34, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            24× WIDER
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 10, textAlign: "center" }}>
            THE EGG IS BIG ENOUGH TO SEE WITH YOUR NAKED EYE
          </div>
          <Sub>The sperm head is barely wider than a speck of dust.</Sub>
        </Center>
      )}

      {/* S10 — longest cell: a neuron over a metre */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={GOLD}>THE LONGEST CELL OF ALL</Kicker>
          <div style={{ position: "relative", width: 1100, height: 60, marginTop: 44 }}>
            <div style={{ position: "absolute", left: 0, top: 26, width: line10, height: 8, backgroundColor: GOLD, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: pulseDot10, top: 18, width: 24, height: 24, backgroundColor: "#ffffff", borderRadius: "50%", boxShadow: "0 0 16px #ffffff" }} />
            <div style={{ position: "absolute", left: 0, top: 44, fontSize: 26, color: "#9a8fc4", fontWeight: 700 }}>SPINE</div>
            <div style={{ position: "absolute", right: 0, top: 44, fontSize: 26, color: "#9a8fc4", fontWeight: 700 }}>TOES</div>
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 26, textAlign: "center", lineHeight: 1 }}>
            &gt;1 m
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            ONE SINGLE NERVE CELL, END TO END
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: GOLD, marginTop: 30, opacity: stamp10, textAlign: "center", lineHeight: 1.2 }}>
            OVER 1 METRE LONG
          </div>
          <Sub>A signal races down it — spine to toes — in a fraction of a second.</Sub>
        </Center>
      )}

      {/* S12 — turnover: 330 billion cells a day */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={CORAL}>REBUILT EVERY DAY</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: CORAL, marginTop: 24, textAlign: "center", lineHeight: 1 }}>
            {count12} B
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            CELLS REPLACED EVERY SINGLE DAY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 32, width: 1180 }}>
            <BarRow label="BLOOD CELLS" value="86%" width={barBlood12} color={CORAL} />
            <BarRow label="GUT LINING + THE REST" value="~14%" width={barGut12} color={TEAL} />
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: CORAL, marginTop: 30, opacity: stamp12, textAlign: "center", lineHeight: 1.2 }}>
            ≈1% OF YOU, EVERY DAY
          </div>
          <Sub>Sender &amp; Milo, Nature Medicine 2021 — about 80 grams of cells a day.</Sub>
        </Center>
      )}

      {/* S14 — cell count turns over in 80-100 days */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={TEAL}>A NEW YOU — BY NUMBER</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: TEAL, marginTop: 24, textAlign: "center", lineHeight: 1 }}>
            {count14}
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            DAYS TO TURN OVER YOUR CELL COUNT
          </div>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 32, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: zoneStart14, top: 0, width: 220, height: 40, backgroundColor: "#2e8f7d" }} />
            <div style={{ position: "absolute", left: 0, top: 0, width: barDays14, height: 40, backgroundColor: TEAL, borderRadius: 999, opacity: 0.85 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9a8fc4", fontWeight: 700, width: 1100, marginTop: 10 }}>
            <span>DAY 0</span>
            <span>80–100 DAYS</span>
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: TEAL, marginTop: 28, opacity: stamp14, textAlign: "center", lineHeight: 1.2 }}>
            BY NUMBER — NOT BY BRAIN
          </div>
          <Sub>Your brain cells are not on this schedule. They mostly stay for life.</Sub>
        </Center>
      )}

      {/* S16 — average cell age 7-10 years, TRUE scale (80y = 1100px) */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={VIOLET}>HOW OLD ARE YOUR CELLS?</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: VIOLET, marginTop: 24, textAlign: "center", lineHeight: 1, transform: `scale(${pulse16})` }}>
            7–10
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            YEARS — THE AVERAGE AGE OF YOUR CELLS
          </div>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 32 }}>
            <div style={{ position: "absolute", left: bandLeft16, top: 0, width: bandWidth16, height: 40, backgroundColor: VIOLET, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9a8fc4", fontWeight: 700, width: 1100, marginTop: 10 }}>
            <span>BORN</span>
            <span>7–10 YEARS</span>
            <span>80 YEARS</span>
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: VIOLET, marginTop: 28, opacity: stamp16, textAlign: "center", lineHeight: 1.2 }}>
            A DIFFERENT PERSON
            <br />
            THAN A DECADE AGO — ALMOST
          </div>
          <Sub>Retrospective birth dating, Karolinska Institute — Cell, 2005.</Sub>
        </Center>
      )}

      {/* S18 — PAYOFF: 37 trillion cells, rebuilt 4 million at a time */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 24, textAlign: "center", lineHeight: 1, transform: `scale(${pulse18})` }}>
            {count18} T
          </div>
          <div style={{ fontSize: 38, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
            CELLS — REBUILT {perSec18} MILLION AT A TIME, EVERY SECOND
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: GOLD, marginTop: 32, opacity: stamp18, textAlign: "center", lineHeight: 1.2 }}>
            STILL,
            <br />
            UNMISTAKABLY YOU
          </div>
          <Sub>Thirty-seven trillion cells. One you.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
