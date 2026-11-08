import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #1: Your Brain Runs on Just 20 Watts
// (priority queue rank 33, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Brain/energy palette: deep indigo / gold / teal /
// violet / coral.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: MALE Rumpled Armchair (avocado_v2:vdc_22255), speed 95,
// atempo 1.05x — FIRST male voice under the alternating-voice rule
// (user, 2026-11-07). Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-07 before scripting):
// - Brain ~20 W: Britannica (2026-06-17) "consuming only about 20 watts
//   of power — less electricity than many household light bulbs."
//   Dim incandescent bulbs are 15-25 W, so "same power as a dim light
//   bulb" is an honest analogy, not a literal circuit claim.
// - 2% of body weight, ~20% of resting energy: Britannica; Kovac EMBO Rep
//   2010 (PMC2816633): brain "consumes 20% of the body's chemical energy,
//   even though it accounts for only 2% of the body's mass."
// - Whole resting body ~100 W, brain 20 W of it (Kovac 2010).
// - Most energy goes to neuron signalling: Attwell & Laughlin budget —
//   neural signalling + postsynaptic effects ~80% of brain ATP (PNAS 2021,
//   PMC8364152); synaptic transmission alone ~45% of total brain energy.
// - EEG reads brain electricity from the scalp in microvolts (typically
//   10-100 uV): synchronized firing of large neuron populations, summed
//   postsynaptic potentials of cortical pyramidal cells (IEEE / Emotiv).
// - Thinking hard barely raises the bill: Kovac 2010 citing Raichle et al
//   2001 (PNAS 98:676-682) — brain shows no difference in total energy
//   budget between "resting" and "busy" states.
// - Brain never switches off: NREM sleep ~85% of waking brain energy;
//   REM sleep as expensive as wakefulness (Curr Opin Neurobiol 2017,
//   PMC5732842).
// - PAYOFF — per gram as hungry as heart muscle, 16x resting muscle:
//   Kovac 2010: "The brain guzzles up — per unit weight — as much energy
//   as the heart muscle, about 16 times more energy than the skeletal
//   muscle at rest."

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

export const FactsBrain20WattsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2% of weight, 20% of energy — TRUE proportions ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // bars grow over 7s
  // Scale: 100% = 760px track. Weight 2% -> 15px, energy 20% -> 152px.
  // The energy bar is TEN TIMES the weight bar — that is the point.
  const barWeight2 = Math.max(15 * fill2, fill2 > 0 ? 6 : 0);
  const barEnergy2 = Math.max(152 * fill2, fill2 > 0 ? 6 : 0);
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): where the power goes — signalling ~80% ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // Scale: 100% = 760px. Signalling ~80% -> 608px, housekeeping ~20% -> 152px
  // (Attwell & Laughlin / PNAS 2021: signalling + postsynaptic ~80% of ATP).
  const barSignal4 = 608 * fill4;
  const barHouse4 = 152 * fill4;
  // travelling pulse dots along the signalling bar (decorative, inside bar)
  const dotX4 = 40 + 560 * ((s4 % 90) / 90);

  // ---- S6 (600-900): EEG — brain waves in microvolts ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210); // scale marker slides in over 7s
  // EEG trace: 24 vertical bars oscillating like a brain wave (continuous motion)
  const trace6 = Array.from({ length: 24 }, (_, i) => {
    const v = Math.sin(i * 0.9 + s6 * 0.18) * 0.5 + Math.sin(i * 0.35 - s6 * 0.11) * 0.5;
    return 14 + 46 * (0.5 + 0.5 * v);
  });
  // Scale 0-100 uV on a 760px track: marker at 50 uV (middle) = 380px
  const marker6 = 380 * fill6;

  // ---- S8 (900-1200): sleep — NREM ~85%, REM ~100% of waking ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // bars grow over 7s
  // Scale: waking 100% = 760px. Deep (NREM) sleep ~85% -> 646px.
  // Dream (REM) sleep ~100% -> 760px (Curr Opin Neurobiol 2017).
  const barAwake8 = 760 * fill8;
  const barNrem8 = 646 * fill8;
  const barRem8 = 760 * fill8;
  const pulse8 = 1 + 0.04 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — per gram: brain = heart, 16x muscle ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 180); // bars fill over 6s
  // Scale: brain per gram = 760px. Heart per gram = same, 760px.
  // Resting muscle per gram = 1/16 -> 47.5px ~ 48px (Kovac 2010).
  const barBrain9 = 760 * fill9;
  const barHeart9 = 760 * fill9;
  const barMuscle9 = Math.max(48 * fill9, fill9 > 0 ? 6 : 0);
  const count9 = Math.round(16 * fill9);
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 2% of weight, 20% of energy, TRUE proportions */}
      {frame < 300 && (
        <Center>
          <Kicker>TINY ORGAN • HUGE APPETITE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>SHARE OF BODY WEIGHT</span>
                <span style={{ color: GREY }}>2%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWeight2, height: 44, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>SHARE OF ENERGY AT REST</span>
                <span style={{ color: GOLD }}>20%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barEnergy2, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 140, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            10×
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            TEN TIMES ITS FAIR SHARE
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            2% OF YOU.
            <br />
            20% OF YOUR ENERGY.
          </div>
          <Sub>About one fifth of everything your body burns at rest.</Sub>
        </Center>
      )}

      {/* S4 — where the power goes: signalling ~80%, TRUE proportions */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={VIOLET}>WHERE DOES IT GO?</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>NEURONS TALKING TO EACH OTHER</span>
                <span style={{ color: VIOLET }}>~80%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barSignal4, height: 44, backgroundColor: VIOLET, borderRadius: 999 }} />
                <div style={{ position: "absolute", left: dotX4, top: 12, width: 20, height: 20, backgroundColor: "#ffffff", borderRadius: "50%", boxShadow: `0 0 14px #ffffff` }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>HOUSEKEEPING THE CELLS</span>
                <span style={{ color: GREY }}>~20%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barHouse4, height: 44, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: VIOLET, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            SIGNALLING IS
            <br />
            THE BIG BILL
          </div>
          <Sub>Signals racing across trillions of connections — that is what 20 watts buys.</Sub>
        </Center>
      )}

      {/* S6 — EEG: brain waves in microvolts */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>WE CAN READ IT</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 36, height: 110, width: 760, justifyContent: "center" }}>
            {trace6.map((h, i) => (
              <div key={i} style={{ width: 18, height: h, backgroundColor: i % 3 === 0 ? TEAL : "#2e6f63", borderRadius: 9 }} />
            ))}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 10, textAlign: "center" }}>
            YOUR BRAIN WAVES — LIVE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span style={{ color: MOON }}>EEG SIGNAL STRENGTH</span>
              <span style={{ color: TEAL }}>10–100 µV</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 760, height: 44, background: "linear-gradient(90deg, #1c5a4e, #2e8f7d, #7fd4c1)" }} />
              <div style={{ position: "absolute", left: marker6, top: 0, width: 6, height: 44, backgroundColor: "#ffffff" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9a8fc4", fontWeight: 700 }}>
              <span>0 µV</span>
              <span>50 µV</span>
              <span>100 µV</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            MILLIONTHS
            <br />
            OF A VOLT
          </div>
          <Sub>Electrodes on your scalp pick up the electricity of thought.</Sub>
        </Center>
      )}

      {/* S8 — sleep: NREM ~85%, REM ~100% of waking, TRUE proportions */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={CORAL}>EVEN ASLEEP</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>AWAKE</span>
                <span style={{ color: MOON }}>100%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barAwake8, height: 40, backgroundColor: MOON, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>DEEP SLEEP</span>
                <span style={{ color: CORAL }}>~85%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barNrem8, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>DREAM SLEEP</span>
                <span style={{ color: GOLD }}>~100%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barRem8, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            IT NEVER
            <br />
            SWITCHES OFF
          </div>
          <Sub>Dreaming burns just as much power as being awake.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: per gram, brain = heart, 16x resting muscle */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse9})` }}>
            {count9}×
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            MORE THAN RESTING MUSCLE — GRAM FOR GRAM
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>YOUR BRAIN</span>
                <span style={{ color: GOLD }}>16 UNITS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barBrain9, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>YOUR HEART</span>
                <span style={{ color: CORAL }}>16 UNITS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barHeart9, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>RESTING MUSCLE</span>
                <span style={{ color: GREY }}>1 UNIT</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: Math.max(barMuscle9, fill9 > 0 ? 6 : 0), height: 40, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            A 20-WATT ENGINE
            <br />
            THAT NEVER STOPS
          </div>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Per gram of tissue — Kováč, EMBO Reports 2010
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
