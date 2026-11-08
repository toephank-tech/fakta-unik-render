import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #115: Your Adult Brain Still Grows New Neurons
// (priority queue rank 36, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Neural palette: deep navy / aqua / gold / teal /
// coral for the debate beats.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: MALE Rumpled Armchair (avocado_v2:vdc_22255), speed 95,
// atempo 1.05x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-07 before scripting; NONE reused from #52,
// which was about the TOTAL neuron count — this video is about NEW neurons
// being BORN in adulthood):
// - Old dogma "born with all the neurons you will ever have" overturned.
//   Eriksson et al. 1998 (Nature Medicine 4:1313-1317): first direct proof
//   in adult humans — BrdU marker in cancer patients, newborn cells with
//   mature neuronal marker NeuN in the dentate gyrus of the hippocampus.
// - Spalding et al. 2013 (Cell 153:1219-1227): carbon-14 "bomb pulse"
//   dating of neuronal DNA (1955-1963 nuclear-test fallout) — about 700
//   new neurons per day in EACH hippocampus, 1.75% annual turnover of the
//   renewing fraction; about one-third of hippocampal neurons exchange;
//   rate fairly steady into old age, modest decline with aging.
// - WHERE: subgranular zone (SGZ) of the dentate gyrus. NOT everywhere.
//   Olfactory bulb: rodents get thousands daily from the subventricular
//   zone; in HUMANS, carbon-14 dating (Bergmann/Frisen, Neuron 2012)
//   found olfactory bulb neurons as old as the person — NO detectable
//   olfactory bulb neurogenesis in humans. Humans are unique here.
// - EXERCISE: van Praag et al. 1999 (mice): running wheel roughly DOUBLED
//   surviving new neurons in the dentate gyrus. Humans: Erickson et al.
//   2011 (PNAS, RCT, 120 sedentary older adults 55-80): 40 min brisk
//   walking, 3 days/week, 1 year -> hippocampus +2% (left +2.12%, right
//   +1.97%); stretching control SHRANK ~1.4%; authors: reversed 1-2 years
//   of age-related loss; higher BDNF linked to bigger gains. Human
//   neurogenesis cannot be measured directly — volume is a proxy.
// - THE DEBATE (payoff, presented honestly as unsettled): Sorrells et al.
//   2018 (Nature) found adult hippocampal neurogenesis drops sharply in
//   the first year of life and is virtually undetectable after age 7.
//   Boldrini et al. 2018 (Cell Stem Cell) found abundant immature neurons
//   in healthy hippocampi aged 14-79. Newest: Dumitru et al. 2025
//   (Science) — single-nucleus RNA sequencing found proliferating neural
//   progenitors and newborn-neuron signatures from childhood into late
//   adulthood.

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

export const FactsBrainNewNeuronsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 1998 breakthrough — dogma overturned ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210);
  const year2 = Math.round(1900 + 98 * fill2); // 1900 -> 1998
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): carbon-14 bomb pulse — 700 new neurons/day ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // counter grows over 7s
  const count4 = Math.round(700 * fill4);
  const bombYear4 = Math.round(1955 + 8 * fill4); // 1955 -> 1963
  // Scale: 2% = 760px track. Annual turnover 1.75% -> 665px.
  const barTurnover4 = Math.max(665 * fill4, fill4 > 0 ? 6 : 0);
  const pulse4 = 1 + 0.04 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): mice vs humans — olfactory bulb ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210); // bars grow over 7s
  // Qualitative comparison (no exact human count exists — carbon dating
  // found essentially none): mice bar full 760px, humans bar 15px.
  const barMice6 = Math.max(760 * fill6, fill6 > 0 ? 6 : 0);
  const barHuman6 = Math.max(15 * fill6, fill6 > 0 ? 6 : 0);
  const bob6 = 8 * Math.sin(s6 * 0.09);

  // ---- S8 (900-1200): walking +2% vs stretching -1.4% ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // bars grow over 7s
  // Scale: 2% = 760px track. Walking +2% -> 760px; stretching -1.4% -> 532px.
  const barWalk8 = Math.max(760 * fill8, fill8 > 0 ? 6 : 0);
  const barStretch8 = Math.max(532 * fill8, fill8 > 0 ? 6 : 0);
  const pulse8 = 1 + 0.05 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — two labs disagree, newest evidence says real ----
  const s9 = frame - 1200;
  const resolve9 = s9 >= 120 ? 1 : 0; // 2025 resolution flips at frame ~120
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 1998: Eriksson overturns the old dogma */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>THE OLD DOGMA SAID: NO NEW NEURONS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #4cc9f0, #1d6fa8 60%, #14486e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, transform: `scale(${pulse2})` }}>
              🧠
            </div>
            <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, marginTop: 20, textAlign: "center", lineHeight: 1 }}>
              {year2}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              THE YEAR THE DOGMA FELL
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            NEW NEURONS FOUND
            <br />
            IN ADULT BRAINS
          </div>
          <Sub>Scientists found newborn brain cells in the memory center — the hippocampus.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Eriksson et al. 1998 — Nature Medicine
          </div>
        </Center>
      )}

      {/* S4 — Spalding 2013: carbon-14 bomb pulse, 700 new neurons/day */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE WILDEST MEASUREMENT</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: AQUA, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse4})` }}>
            {count4}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            NEW NEURONS A DAY — EACH HIPPOCAMPUS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span style={{ color: MOON }}>ANNUAL TURNOVER</span>
              <span style={{ color: GOLD }}>1.75%</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: barTurnover4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>~1 IN 3 HIPPOCAMPAL NEURONS RENEW</span>
              <span>☢ {bombYear4}</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: AQUA, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            DATED WITH
            <br />
            NUCLEAR FALLOUT
          </div>
          <Sub>Carbon-14 from 1955–1963 bomb tests became a timestamp inside brain-cell DNA.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Spalding et al. 2013 — Cell
          </div>
        </Center>
      )}

      {/* S6 — mice vs humans: the smell center */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={CORAL}>BUT NOT EVERYWHERE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🐭 MICE — SMELL CENTER</span>
                <span style={{ color: TEAL }}>THOUSANDS DAILY</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barMice6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🧑 HUMANS — SMELL CENTER</span>
                <span style={{ color: CORAL }}>ALMOST NONE</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barHuman6, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>CARBON DATING: HUMAN SMELL NEURONS AS OLD AS THE PERSON</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2, transform: `translateY(${bob6}px)` }}>
            HUMANS
            <br />
            ARE DIFFERENT
          </div>
          <Sub>New neurons grow mainly in the memory center — the dentate gyrus.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Bergmann &amp; Frisén 2012 — Neuron
          </div>
        </Center>
      )}

      {/* S8 — Erickson 2011: walking +2% vs stretching -1.4% */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={TEAL}>YOU CAN BOOST IT</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🚶 WALKING GROUP</span>
                <span style={{ color: TEAL }}>+2%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWalk8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🧘 STRETCHING GROUP</span>
                <span style={{ color: CORAL }}>−1.4%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barStretch8, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SCALE: 2% = FULL BAR</span>
              <span>40 MIN × 3/WEEK</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            ONE YEAR OF WALKING
            <br />
            GREW THE HIPPOCAMPUS
          </div>
          <Sub>40 minutes, three times a week — the stretching group shrank instead.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Erickson et al. 2011 — PNAS, 120 people
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: two labs disagree, newest evidence says real */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div style={{ backgroundColor: "#2a1620", border: "3px solid #ff8a7a", borderRadius: 24, padding: "22px 28px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: CORAL }}>SORRELLS 2018</div>
              <div style={{ fontSize: 32, color: MOON, marginTop: 6 }}>“ALMOST NO NEW NEURONS”</div>
            </div>
            <div style={{ backgroundColor: "#12262b", border: "3px solid #7fd4c1", borderRadius: 24, padding: "22px 28px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: TEAL }}>BOLDRINI 2018</div>
              <div style={{ fontSize: 32, color: MOON, marginTop: 6 }}>“FOUND THEM INTO OLD AGE”</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: resolve9, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse9})` }}>
            2025: NEW NEURONS
            <br />
            FOUND — EVEN IN OLD AGE
          </div>
          <Sub>Same human brain, opposite conclusions — the newest evidence says the new neurons are real.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Sorrells 2018 Nature • Boldrini 2018 Cell Stem Cell • Dumitru 2025 Science
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
