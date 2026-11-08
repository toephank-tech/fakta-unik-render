import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #44: Sleepwalking — Your Body Can Walk Around While Your Brain Sleeps
// (priority queue rank 25, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Night palette: dark navy / moonlight blue / gold.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE percentages on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// FACTS (all verified 2026-11-07 before scripting):
// - Sleepwalking happens in N3 deep NREM sleep, first third of the night,
//   NOT during REM/dreaming (Mayo Clinic; MedlinePlus; Wikipedia). Acting
//   out dreams is REM Behaviour Disorder, a different condition. During REM
//   the body is paralysed (muscle atonia); in N3 there is no paralysis.
// - CHILDREN vs ADULTS: 5-30% of children (Ohayon review), adults 2-5%.
//   Script: "up to three in ten children" (30%, top of range, hedged "up
//   to"), "two to five in a hundred adults" (2-5%). Most grow out of it.
// - TIMING + TRIGGERS: usually 1-2 hours after falling asleep, first
//   third of the night (Mayo). Triggers: sleep deprivation, fever, stress,
//   alcohol (Sleep Foundation).
// - EYES OPEN, NO MEMORY: glassy-eyed stare, can navigate around furniture
//   and through doorways (Mayo; Interesting Engineering); difficult to wake
//   and remember nothing (Cleveland Clinic).
// - MYTH DEBUNK: waking a sleepwalker will NOT cause a heart attack, coma
//   or brain damage (BBC; UAMS; Nova Scotia Health). Best practice: gently
//   guide back to bed, do not startle/shake (Cleveland Clinic; Sleep
//   Foundation).
// - SPLIT BRAIN: sleep-state dissociation — motor/limbic circuits show
//   wake-like activation while cortical networks stay in deep sleep (EEG
//   studies, PMC/Nature); cingulate + motor cortex light up, prefrontal
//   cortex stays muted (Interesting Engineering).
// - PAYOFF — DRIVING: Hoque & Chesson 2009, J Clin Sleep Med
//   (PMC2762721): a woman drove her car 10 miles from home and was found
//   asleep behind the wheel by police.

const BG = "#0b0b1e";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
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

const TRACK = 760; // px width of a 100% bar

export const FactsSleepwalkingMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): sleep stages — N3 deep sleep is where it happens ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);
  const stages2 = ["N1", "N2", "N3", "REM"].map((_, i) => Math.min(1, Math.max(0, (s2 - i * 40) / 60)));

  // ---- S4 (300-600): kids vs adults — TRUE 30% vs 2-5% ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const barKids4 = Math.min(1, s4 / 120);
  const barAdult4 = Math.min(1, Math.max(0, (s4 - 90) / 120));
  const kidsW4 = barKids4 * TRACK * 0.3; // up to 30% — TRUE (~228px)
  const adultW4 = barAdult4 * TRACK * 0.05; // 5% (top of 2-5%) — TRUE (~38px)

  // ---- S6 (600-900): eyes open, but not awake — checklist + moving pupil ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pupil6 = 18 * Math.sin(s6 * 0.08); // pupil drifts left-right
  const check6 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s6 - d) / 60)));

  // ---- S8 (900-1200): split brain — movement awake, thinking asleep ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const glow8 = 0.6 + 0.4 * Math.sin(s8 * 0.14); // awake half pulses
  const dim8 = 0.45 + 0.15 * Math.sin(s8 * 0.07); // asleep half stays dim
  const split8 = Math.min(1, s8 / 90); // divider draws in

  // ---- S9 (1200-1500): PAYOFF — drove 10 miles asleep ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const road9 = (s9 * 6) % 160; // road dashes scroll
  const carBob9 = 4 * Math.sin(s9 * 0.25); // car gently bobs
  const miles9 = Math.min(10, (s9 / 150) * 10); // odometer counts 0 -> 10 by 5s into the scene

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — sleep stages: it happens in N3, not in dreams */}
      {frame < 300 && (
        <Center>
          <Kicker>NOT WHILE YOU DREAM</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: 860 }}>
            {[
              { label: "N1 — LIGHT SLEEP", pct: "5%", w: 0.05, color: GREY },
              { label: "N2 — LIGHT SLEEP", pct: "45%", w: 0.45, color: GREY },
              { label: "N3 — DEEP SLEEP", pct: "25%", w: 0.25, color: GOLD },
              { label: "REM — DREAMING", pct: "25%", w: 0.25, color: BLUE },
            ].map((row, i) => (
              <div key={row.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                  <span style={{ color: i === 2 ? GOLD : GREY }}>{row.label}</span>
                  <span style={{ color: i === 2 ? GOLD : GREY }}>{row.pct}</span>
                </div>
                <div style={{ position: "relative", height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                  <div style={{ width: stages2[i] * TRACK * row.w, height: 40, backgroundColor: row.color, borderRadius: 999, transform: i === 2 ? `scaleY(${pulse2})` : undefined, transformOrigin: "center" }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            STAGE N3 —
            <br />
            DEEP SLEEP
          </div>
          <Sub>Sleepwalking strikes in deep sleep — not while you dream.</Sub>
        </Center>
      )}

      {/* S4 — kids vs adults: up to 30% vs 2-5% (TRUE %) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>IT IS MOSTLY A KIDS' THING</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>CHILDREN — EVER SLEEPWALK</span>
                <span style={{ color: GOLD }}>UP TO 30%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: kidsW4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>up to three in ten children, at least once</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>ADULTS — EVER SLEEPWALK</span>
                <span style={{ color: BLUE }}>2–5%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: Math.max(adultW4, barAdult4 > 0 ? 8 : 0), height: 44, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>only two to five in a hundred adults</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            MOSTLY KIDS —
            <br />
            MOST GROW OUT OF IT
          </div>
          <Sub>It peaks around age eleven or twelve, then fades away.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Ohayon et al. — children 5–30%, adults 2–5%
          </div>
        </Center>
      )}

      {/* S6 — eyes open, but not awake */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>EYES OPEN — BUT NOT AWAKE</Kicker>
          <div style={{ position: "relative", width: 300, height: 130, marginTop: 36 }}>
            <div style={{ width: 300, height: 130, borderRadius: "50%", backgroundColor: "#1c1c30", border: "4px solid #3a3a52", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 150 + pupil6 - 45, top: 20, width: 90, height: 90, borderRadius: "50%", backgroundColor: BLUE }} />
              <div style={{ position: "absolute", left: 150 + pupil6 - 20, top: 45, width: 40, height: 40, borderRadius: "50%", backgroundColor: "#0b0b1e" }} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36, width: 860 }}>
            {["✓ DODGE FURNITURE", "✓ OPEN DOORS", "✓ EVEN TALK"].map((label, i) => (
              <div key={label} style={{ backgroundColor: "#1c1c30", borderRadius: 16, padding: "18px 28px", textAlign: "center", opacity: check6[i], transform: `translateY(${(1 - check6[i]) * 24}px)` }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: i === 2 ? GOLD : MOON }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            REMEMBERS
            <br />
            NOTHING
          </div>
          <Sub>In the morning, the whole night is simply gone.</Sub>
        </Center>
      )}

      {/* S8 — split brain: movement awake, thinking asleep */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>HALF AWAKE, HALF ASLEEP</Kicker>
          <div style={{ display: "flex", gap: 28, marginTop: 40 }}>
            <div style={{ width: 400, backgroundColor: "#1c1c30", borderRadius: 24, padding: "30px 24px", textAlign: "center", opacity: glow8, border: "3px solid #f4c95d" }}>
              <div style={{ fontSize: 64 }}>🏃</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: GOLD, marginTop: 10 }}>MOVEMENT</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: GOLD, marginTop: 6 }}>AWAKE</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10, lineHeight: 1.35 }}>motor centres light up, ready to move</div>
            </div>
            <div style={{ width: 400, backgroundColor: "#1c1c30", borderRadius: 24, padding: "30px 24px", textAlign: "center", opacity: dim8, border: "3px solid #3a3a52" }}>
              <div style={{ fontSize: 64 }}>💭</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: BLUE, marginTop: 10 }}>THINKING</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: BLUE, marginTop: 6 }}>ASLEEP</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10, lineHeight: 1.35 }}>planning and awareness stay switched off</div>
            </div>
          </div>
          <div style={{ position: "relative", width: 760, height: 8, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 40, overflow: "hidden" }}>
            <div style={{ width: split8 * TRACK, height: 8, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            ONE BRAIN,
            <br />
            TWO STATES
          </div>
          <Sub>Part of the brain wakes up — the rest stays in deep sleep.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            EEG studies show sleep and wake signals at the same time
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: drove 10 miles asleep */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", width: 860, height: 220, marginTop: 36, backgroundColor: "#12122a", borderRadius: 24, overflow: "hidden", border: "3px solid #3a3a52" }}>
            <div style={{ position: "absolute", top: 100, left: -road9, display: "flex", gap: 120 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ width: 60, height: 10, backgroundColor: GOLD, borderRadius: 5 }} />
              ))}
            </div>
            <div style={{ position: "absolute", left: 330, top: 30 + carBob9, fontSize: 110 }}>🚗</div>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 12, textAlign: "center", fontSize: 26, color: GREY, letterSpacing: 4 }}>
              NIGHT DRIVE — DRIVER ASLEEP
            </div>
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: MOON, marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            {miles9.toFixed(0)} MILES
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 12, textAlign: "center" }}>
            DRIVEN WHILE FAST ASLEEP
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 32, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            ASLEEP BEHIND
            <br />
            THE WHEEL
          </div>
          <Sub>Police found her parked — with no memory of the drive.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Hoque &amp; Chesson, 2009 — a documented case
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
