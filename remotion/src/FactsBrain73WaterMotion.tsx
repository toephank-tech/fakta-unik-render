import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #3: Your Brain Is 73% Water
// (priority queue rank 34, Tier A)
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
// NARRATION VOICE: MALE Rumpled Armchair (avocado_v2:vdc_22255), speed 95,
// atempo 1.05x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-07 before scripting):
// - Brain ~73% water: most-cited figure (USGS); typical adult range
//   73-75%; gray matter higher (~80%+), white matter lower (~70%,
//   fatty myelin); varies with age and measurement method.
// - Whole body ~60% water (USGS / Medical News Today).
// - Ganio et al. 2011 (Br J Nutr, 26 young men, mean 1.59% body-mass
//   loss): more errors on visual vigilance, slower visual working-memory
//   response latency, more fatigue and tension/anxiety. NO exact "focus
//   drops X%" claim — none is stated anywhere in the video.
// - Armstrong et al. 2012 (J Nutr, young women, 1.36% loss): degraded
//   mood, lower concentration, more headaches, greater perceived task
//   difficulty.
// - Meta-analysis: dehydration impairs attention, executive function and
//   motor coordination, greater when body-mass loss exceeds 2%.
// - Thirst is a LATE signal: by the time you feel thirsty you have
//   typically already lost ~1-2% of body water.
// - CSF ~99% water, 100-150 mL in a healthy adult; cushions brain and
//   spinal cord; the brain floats in it — effective weight drops from
//   ~1,400 g to ~50 g.
// - Georgia Tech (Wittbrodt / Millard-Stafford, Physiol Rep, 13
//   volunteers, attention + motor task in fMRI): exercise + water ~8%
//   worse than control; exercise WITHOUT water ~16% worse. Script hedges
//   "in one lab test" + "a focus task".
// - Same study fMRI: a dehydrated brain activates MORE intensely, and
//   areas not normally involved light up — it works harder for the
//   same job.
// - PAYOFF — Kempton et al. 2009 (Hum Brain Mapp): after 90-min
//   thermal-exercise dehydration, 2.2% body-mass loss -> ventricular
//   system EXPANDED (largest change left lateral ventricle). Duning et
//   al. 2005: 16 h fluid restriction -> total brain volume DOWN,
//   reversed by rehydration. Streitbuerger 2012 (PLoS ONE, VBM):
//   significant GM/WM volume decrease + ventricular expansion.

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

export const FactsBrain73WaterMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): brain 73% water vs body 60% — TRUE proportions ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // bars grow over 7s
  // Scale: 100% = 760px track. Brain 73% -> 555px, body 60% -> 456px.
  // Gray matter ~80% -> 608px, white matter ~70% -> 532px.
  const barBrain2 = Math.max(555 * fill2, fill2 > 0 ? 6 : 0);
  const barBody2 = Math.max(456 * fill2, fill2 > 0 ? 6 : 0);
  const barGray2 = Math.max(608 * fill2, fill2 > 0 ? 6 : 0);
  const barWhite2 = Math.max(532 * fill2, fill2 > 0 ? 6 : 0);
  const count2 = Math.round(73 * fill2);
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): under 2% loss is already enough ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // Scale: 2% body-mass loss = 760px track. Men 1.59% -> 604px,
  // women 1.36% -> 517px. Threshold line at 760px = 2%.
  const barMen4 = Math.max(604 * fill4, fill4 > 0 ? 6 : 0);
  const barWomen4 = Math.max(517 * fill4, fill4 > 0 ? 6 : 0);
  // chips pop in one by one (frames 60 / 110 / 160)
  const chipA4 = s4 >= 60 ? 1 : 0;
  const chipB4 = s4 >= 110 ? 1 : 0;
  const chipC4 = s4 >= 160 ? 1 : 0;

  // ---- S6 (600-900): CSF — the brain floats ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210); // bars grow over 7s
  // Scale: 100% = 760px. CSF 99% water -> 752px.
  const barCsf6 = Math.max(752 * fill6, fill6 > 0 ? 6 : 0);
  // floating brain: gentle bob + weight counter 1400 -> 50 g
  const bob6 = 10 * Math.sin(s6 * 0.09);
  const weight6 = Math.round(1400 - (1400 - 50) * fill6);
  const ripple6 = 1 + 0.03 * Math.sin(s6 * 0.15);

  // ---- S8 (900-1200): a thirsty brain works harder ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // bars grow over 7s
  // RELATIVE effort bars (no fake numbers): hydrated = 380px baseline,
  // dehydrated = 684px (1.8x the lit area — extra regions light up).
  const barHyd8 = Math.max(380 * fill8, fill8 > 0 ? 6 : 0);
  const barDry8 = Math.max(684 * fill8, fill8 > 0 ? 6 : 0);
  // travelling pulse dots along the dehydrated bar (decorative, inside bar)
  const dotX8 = 40 + 600 * ((s8 % 90) / 90);
  const pulse8 = 1 + 0.05 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — the brain shrinks, ventricles swell ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill9 = Math.min(1, s9 / 180); // animation over 6s
  // Brain circle shrinks 300 -> 276px (-8% visual, illustrative of the
  // MRI-measured volume loss); ventricle circle grows 90 -> 150px.
  const brainSize9 = 300 - 24 * fill9;
  const ventSize9 = 90 + 60 * fill9;
  const count9 = (2.2 * fill9).toFixed(1);
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — brain 73% water vs body 60%, TRUE proportions */}
      {frame < 300 && (
        <Center>
          <Kicker>WETTER THAN THE REST OF YOU</Kicker>
          <div style={{ fontSize: 140, fontWeight: 900, color: AQUA, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            {count2}%
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            OF YOUR BRAIN IS WATER
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>YOUR BRAIN</span>
                <span style={{ color: AQUA }}>73%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barBrain2, height: 44, backgroundColor: AQUA, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>YOUR WHOLE BODY</span>
                <span style={{ color: GREY }}>~60%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barBody2, height: 44, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: MOON }}>GRAY MATTER ~80% • WHITE MATTER ~70%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 26, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barGray2, height: 26, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
              <div style={{ position: "relative", width: 760, height: 26, backgroundColor: "#16233f", borderRadius: 999, marginTop: 8, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWhite2, height: 26, backgroundColor: "#5a7ba6", borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: AQUA, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            ALMOST THREE
            <br />
            QUARTERS WATER
          </div>
          <Sub>On average — it varies a little with age and brain region.</Sub>
        </Center>
      )}

      {/* S4 — under 2% loss is already enough (Ganio 2011 / Armstrong 2012) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={CORAL}>UNDER 2% IS ALREADY ENOUGH</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>MEN IN THE STUDY</span>
                <span style={{ color: CORAL }}>1.59% LOSS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barMen4, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>WOMEN IN THE STUDY</span>
                <span style={{ color: GOLD }}>1.36% LOSS</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWomen4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>0%</span>
              <span>1% BODY-WEIGHT LOSS</span>
              <span>2% THRESHOLD</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 36, justifyContent: "center" }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#0a1226", backgroundColor: CORAL, borderRadius: 999, padding: "12px 26px", opacity: chipA4 }}>
              MOOD ↓
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#0a1226", backgroundColor: GOLD, borderRadius: 999, padding: "12px 26px", opacity: chipB4 }}>
              FOCUS ↓
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "#0a1226", backgroundColor: AQUA, borderRadius: 999, padding: "12px 26px", opacity: chipC4 }}>
              HEADACHE
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            MISTAKES UP.
            <br />
            MEMORY SLOWER.
          </div>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Ganio 2011 • Armstrong 2012
          </div>
        </Center>
      )}

      {/* S6 — CSF: the brain floats in 99% water */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>YOUR BRAIN FLOATS</Kicker>
          <div style={{ marginTop: 36, transform: `translateY(${bob6}px) scale(${ripple6})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #7fd4c1, #2e8f7d 60%, #1c5a4e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 96 }}>
              🧠
            </div>
            <div style={{ fontSize: 120, fontWeight: 900, color: TEAL, marginTop: 16, textAlign: "center", lineHeight: 1 }}>
              {weight6} g
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, marginTop: 6, textAlign: "center" }}>
              IT FEELS LIKE — DOWN FROM 1,400 g
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 34, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span style={{ color: MOON }}>CEREBROSPINAL FLUID</span>
              <span style={{ color: TEAL }}>99% WATER</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: barCsf6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>ONLY 100–150 mL OF IT</span>
              <span>IT CUSHIONS EVERY STEP</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            A WATER BED
            <br />
            FOR YOUR BRAIN
          </div>
        </Center>
      )}

      {/* S8 — a thirsty brain works harder (Georgia Tech fMRI) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={GOLD}>IT HAS TO WORK HARDER</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>HYDRATED BRAIN</span>
                <span style={{ color: TEAL }}>NORMAL EFFORT</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barHyd8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>THIRSTY BRAIN</span>
                <span style={{ color: CORAL }}>EXTRA AREAS FIRING</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barDry8, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
                <div style={{ position: "absolute", left: dotX8, top: 12, width: 20, height: 20, backgroundColor: "#ffffff", borderRadius: "50%", boxShadow: `0 0 14px #ffffff` }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            EXTRA AREAS
            <br />
            LIGHT UP
          </div>
          <Sub>Same job — but the brain has to recruit help it does not normally need.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Georgia Tech fMRI — Wittbrodt et al.
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: the brain shrinks, ventricles swell (MRI) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 60, marginTop: 36 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: brainSize9, height: brainSize9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #4cc9f0, #1d6fa8 60%, #14486e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 110 }}>
                🧠
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
                BRAIN SHRINKS
              </div>
            </div>
            <div style={{ fontSize: 90, fontWeight: 900, color: CORAL }}>→</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: ventSize9, height: ventSize9, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #ff8a7a, #c94f42 60%, #8f2f26)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, fontWeight: 900, color: "white" }}>
                CSF
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
                VENTRICLES SWELL
              </div>
            </div>
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse9})` }}>
            {count9}%
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
            BODY-WEIGHT LOSS DID THIS ON MRI
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: AQUA, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            DRINK WATER —
            <br />
            IT BOUNCES BACK
          </div>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Kempton 2009 • Duning 2005 — reversible on rehydration
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
