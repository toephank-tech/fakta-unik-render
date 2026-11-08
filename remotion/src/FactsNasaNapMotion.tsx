import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #171: A 26-Minute Nap Boosts Your Performance by 34%
// (priority queue rank 29, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Night palette: dark navy / moonlight blue / gold.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// FACTS (all verified 2026-11-07 before scripting):
// - Rosekind et al. 1995, J. Sleep Research: 21 Boeing 747 pilots,
//   overnight trans-Pacific routes; 40-min rest opportunity; slept avg
//   25.8 min (~26); fell asleep in avg 5.6 min. Performance +34%,
//   alertness up to +54% (EEG microsleeps) vs the no-rest group.
// - Benefit lasted through descent and landing (NASA memorandum summary).
// - 26 min was the study's average, NOT a universal rule: general
//   guidance is a 10-20 min power nap (Sleep Foundation; Brooks & Lack
//   2006 found the 10-min nap most effective).
// - Past ~30 min the brain enters deep sleep; waking mid-deep-sleep
//   causes sleep inertia (groggy/foggy, 15-30 min to clear).
// - Best window 1-3 PM; avoid naps after 3 PM (Sleep Foundation / Mayo
//   Clinic) — late naps steal night sleep.
// - Coffee nap: Hayashi et al. 2003 — 200 mg caffeine before a 20-min
//   nap beat nap alone; SMALL studies, so the script hedges.
// - Payoff: the nap did NOT erase the pilots' sleep debt — it kept
//   tired pilots sharp when it mattered most.

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

export const FactsNasaNapMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the 1995 NASA study — 21 pilots, 40 min rest, 26 min asleep ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // bar fills over 7s
  // Rest window 40 min on an 860px track: 1 min = 21.5px.
  // Slept 26 min: width 26*21.5 = 559px (65% of the window — TRUE proportion).
  const barW2 = 559 * fill2;
  const count2 = Math.round(26 * fill2);
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): the boost lasted to landing — TRUE % bars ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // 0-100% scale on a 760px track: 1% = 7.6px.
  // Performance +34% -> 258px; alertness +54% -> 410px.
  const barPerf4 = 258 * fill4;
  const barAlert4 = 410 * fill4;
  const check4 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s4 - d) / 60)));

  // ---- S6 (600-900): the 30-minute cliff — sleep inertia ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 150); // zones fill over 5s
  // 0-60 min scale on an 860px track: 1 min = 14.33px.
  // Sweet spot 10-20 min: offset 143px, width 143px.
  // Danger zone 30-60 min: offset 430px, width 430px.
  const greenX6 = 143;
  const greenW6 = 143 * fill6;
  const redX6 = 430;
  const redW6 = 430 * fill6;

  // ---- S8 (900-1200): the coffee nap — small studies ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const step8 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s8 - d) / 60)));
  const wave8 = 0.5 + 0.5 * Math.sin(s8 * 0.15); // caffeine wave pulse

  // ---- S9 (1200-1500): PAYOFF — sleep debt NOT erased ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);
  const rank9 = [0, 60, 120].map((d) => Math.min(1, Math.max(0, (s9 - d) / 60)));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the 1995 NASA study */}
      {frame < 300 && (
        <Center>
          <Kicker>THE NASA STUDY • 1995</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 60, marginTop: 36 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: MOON, lineHeight: 1, transform: `scale(${pulse2})` }}>
                21
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: BLUE, marginTop: 8 }}>PILOTS</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, lineHeight: 1 }}>
                {count2}
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: GOLD, marginTop: 8 }}>MINUTES ASLEEP</div>
            </div>
          </div>
          <div style={{ position: "relative", width: 860, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: barW2, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 860, fontSize: 28, color: GREY, marginTop: 12 }}>
            <span>0 MIN</span>
            <span style={{ color: GOLD }}>26 OF 40 MIN REST</span>
            <span>40 MIN</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            ASLEEP IN UNDER
            <br />
            SIX MINUTES
          </div>
          <Sub>21 long-haul pilots, given 40 minutes to rest mid-flight.</Sub>
        </Center>
      )}

      {/* S4 — the boost lasted through landing: TRUE % bars */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>WHAT THE NAP DELIVERED</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>PERFORMANCE</span>
                <span style={{ color: GOLD }}>+34%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barPerf4, height: 36, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>ALERTNESS</span>
                <span style={{ color: GOLD }}>+54%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barAlert4, height: 36, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 36, width: 860 }}>
            {["✓  CRUISE", "✓  DESCENT", "✓  LANDING"].map((label, i) => (
              <div key={label} style={{ backgroundColor: "#1c1c30", borderRadius: 16, padding: "16px 28px", textAlign: "center", opacity: check4[i], transform: `translateY(${(1 - check4[i]) * 24}px)` }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: i === 2 ? GOLD : MOON }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            THE BOOST LASTED
            <br />
            TO LANDING
          </div>
          <Sub>Compared with the pilots who stayed awake.</Sub>
        </Center>
      )}

      {/* S6 — the 30-minute cliff: sleep inertia */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE 30-MINUTE CLIFF</Kicker>
          <div style={{ fontSize: 100, fontWeight: 900, color: MOON, marginTop: 36, textAlign: "center", lineHeight: 1 }}>
            10–20 MIN
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: TEAL, marginTop: 8, textAlign: "center" }}>
            THE SWEET SPOT
          </div>
          <div style={{ position: "relative", width: 860, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: greenX6, top: 0, width: greenW6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: redX6, top: 0, width: redW6, height: 44, backgroundColor: RED, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 860, fontSize: 28, color: GREY, marginTop: 12 }}>
            <span>0 MIN</span>
            <span style={{ color: TEAL }}>SWEET SPOT</span>
            <span style={{ color: RED }}>DEEP SLEEP →</span>
            <span>60 MIN</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            SLEEP INERTIA:
            <br />
            GROGGY &amp; FOGGY
          </div>
          <Sub>Past 30 minutes, your brain sinks into deep sleep.</Sub>
        </Center>
      )}

      {/* S8 — the coffee nap */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>THE COFFEE NAP</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36, width: 860 }}>
            {["1.  DRINK A COFFEE  ☕", "2.  NAP FOR ~20 MINUTES  😴", "3.  WAKE UP AS CAFFEINE KICKS IN  ⚡"].map((label, i) => (
              <div key={label} style={{ backgroundColor: i === 2 ? "#3a2f10" : "#1c1c30", borderRadius: 16, padding: "20px 28px", textAlign: "center", opacity: step8[i], transform: `translateY(${(1 - step8[i]) * 24}px)`, border: `3px solid rgba(244, 201, 93, ${i === 2 ? 0.3 + 0.7 * wave8 : 0.3})` }}>
                <span style={{ fontSize: 36, fontWeight: 900, color: i === 2 ? GOLD : MOON }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            A DOUBLE SHOT
            <br />
            OF ALERTNESS
          </div>
          <Sub>From small studies — caffeine peaks just as you wake.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: sleep debt NOT erased */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1.1, transform: `scale(${pulse9})` }}>
            SLEEP DEBT:
            <br />
            STILL THERE
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 20, textAlign: "center" }}>
            THE NAP NEVER ERASED IT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28, width: 860 }}>
            {["✕  SLEEP DEBT — NOT ERASED", "✓  SHARPNESS — RESTORED", "✓  SAFETY — PROTECTED"].map((label, i) => (
              <div key={label} style={{ backgroundColor: i === 0 ? "#33161d" : "#1c1c30", borderRadius: 12, padding: "12px 24px", textAlign: "center", opacity: rank9[i] }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: i === 0 ? RED : GREY }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 28, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            REST IS A SAFETY TOOL,
            <br />
            NOT A WEAKNESS
          </div>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Rosekind et al. 1995, J. Sleep Research
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
