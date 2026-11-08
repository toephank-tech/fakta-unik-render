import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #41: You Will Spend 26 Years of Your Life Asleep
// (priority queue rank 27, Tier A)
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
// - One third of life asleep; 8h x 365 x 79y = 230,680 hours = ~26.3 years
//   (Good Sleep Hub; NeuroLaunch). Assumptions stated in the script.
// - Sleep need by age, NSF (Hirshkowitz 2015, reaffirmed June 2026):
//   newborns 14-17h, adults 7-9h, older adults 7-8h.
// - What sleep does (one line each, callbacks to #103/#42/#168): memory
//   consolidation, glymphatic waste clearance, immune support.
// - Lifetime milestones are pure arithmetic from the 1/3 rule:
//   30y -> 10y asleep, 60y -> 20y, 79y -> ~26y.
// - Work: ~90,000 hours over a lifetime (40h x 50wk x 45y) = ~10.3 years.
//   26 / 10.3 = ~2.5x, so "more than twice as long asleep as at work".
// - TV: Nielsen, >4h/day; in a 65-year life that is ~9 years watching TV.

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

const TRACK = 760; // px width of a 100% bar (26 years)

export const FactsLifetimeSleepMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the math — 8h x 365 x 79y = ~230,000 hours ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);
  const third2 = Math.min(1, s2 / 180); // 1/3 bar fills over 6s
  const count2 = Math.min(230000, Math.floor((s2 / 210) * 230000)); // counter to 230k by 7s

  // ---- S4 (300-600): three jobs of sleep appear one by one ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const card4 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s4 - d) / 60)));

  // ---- S6 (600-900): lifetime milestones — TRUE proportions ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const barA6 = Math.min(1, s6 / 120);
  const barB6 = Math.min(1, Math.max(0, (s6 - 60) / 120));
  const barC6 = Math.min(1, Math.max(0, (s6 - 120) / 120));
  // scale: 26y = TRACK (760px); 10y = 760*10/26 = 292px; 20y = 585px
  const wA6 = barA6 * (TRACK * 10 / 26);
  const wB6 = barB6 * (TRACK * 20 / 26);
  const wC6 = barC6 * TRACK;

  // ---- S8 (900-1200): sleep vs work vs TV — TRUE proportions ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const barS8 = Math.min(1, s8 / 120);
  const barW8 = Math.min(1, Math.max(0, (s8 - 60) / 120));
  const barT8 = Math.min(1, Math.max(0, (s8 - 120) / 120));
  // scale: 26y = TRACK; work ~10y = 292px; TV ~9y = 263px
  const wS8 = barS8 * TRACK;
  const wW8 = barW8 * (TRACK * 10 / 26);
  const wT8 = barT8 * (TRACK * 9 / 26);

  // ---- S9 (1200-1500): PAYOFF — more than 2x work ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);
  const years9 = Math.min(26, (s9 / 150) * 26); // counter 0 -> 26 by 5s

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the math: 8 hours x 365 nights x 79 years */}
      {frame < 300 && (
        <Center>
          <Kicker>DO THE MATH</Kicker>
          <div style={{ fontSize: 52, fontWeight: 800, color: MOON, marginTop: 36, textAlign: "center", lineHeight: 1.35 }}>
            8 HOURS × 365 NIGHTS
            <br />
            × 79 YEARS
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: MOON, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            {count2.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 8, textAlign: "center" }}>
            HOURS ASLEEP
          </div>
          <div style={{ position: "relative", width: 860, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 40, overflow: "hidden" }}>
            <div style={{ width: third2 * (860 / 3), height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 860, fontSize: 28, color: GREY, marginTop: 12 }}>
            <span>0%</span>
            <span style={{ color: TEAL }}>ONE THIRD — 33%</span>
            <span>100% OF LIFE</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            ONE THIRD
            <br />
            OF YOUR LIFE
          </div>
          <Sub>Eight hours a night, every night, for seventy-nine years.</Sub>
        </Center>
      )}

      {/* S4 — three jobs of sleep */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>NOT WASTED TIME</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36, width: 860 }}>
            {["🧠 BRAIN FILES AWAY MEMORIES", "🌊 BRAIN FLUSHES OUT WASTE", "🛡️ IMMUNE SYSTEM RECHARGES"].map((label, i) => (
              <div key={label} style={{ backgroundColor: "#1c1c30", borderRadius: 16, padding: "20px 28px", textAlign: "center", opacity: card4[i], transform: `translateY(${(1 - card4[i]) * 24}px)` }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: i === 2 ? GOLD : MOON }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            YOUR BODY WORKS
            <br />
            THE NIGHT SHIFT
          </div>
          <Sub>While you sleep, your brain and immune system are busy.</Sub>
        </Center>
      )}

      {/* S6 — lifetime milestones: TRUE proportions (26y = full track) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>YOUR LIFE, IN YEARS ASLEEP</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>BY AGE 30</span>
                <span style={{ color: TEAL }}>10 YEARS ASLEEP</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wA6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>BY AGE 60</span>
                <span style={{ color: BLUE }}>20 YEARS ASLEEP</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wB6, height: 44, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>BY AGE 79</span>
                <span style={{ color: GOLD }}>26 YEARS ASLEEP</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wC6, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            THE CLOCK
            <br />
            NEVER STOPS
          </div>
          <Sub>Ten years gone by thirty. Twenty by sixty. Twenty-six by seventy-nine.</Sub>
        </Center>
      )}

      {/* S8 — sleep vs work vs TV: TRUE proportions (26y = full track) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>WHAT FILLS A LIFETIME?</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>SLEEP</span>
                <span style={{ color: GOLD }}>26 YEARS</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wS8, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>WORK — A WHOLE CAREER</span>
                <span style={{ color: BLUE }}>ABOUT 10 YEARS</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wW8, height: 44, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>TELEVISION</span>
                <span style={{ color: TEAL }}>ABOUT 9 YEARS</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wT8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            NOTHING ELSE
            <br />
            COMES CLOSE
          </div>
          <Sub>Work: about 90,000 hours. TV: about nine years. Sleep beats both.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Work ~90,000 hours lifetime · TV ~9 years (Nielsen)
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: more than twice as long asleep as at work */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: MOON, marginTop: 28, textAlign: "center", lineHeight: 1, transform: `scale(${pulse9})` }}>
            {years9.toFixed(0)}<span style={{ fontSize: 64, color: GOLD }}> YEARS</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 10, textAlign: "center" }}>
            ASLEEP — IN THE DARK
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            MORE THAN 2× WORK
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 28, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            SLEEP IS NOT
            <br />
            LOST TIME
          </div>
          <Sub>Twenty-six years asleep — the time that makes all the rest possible.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
