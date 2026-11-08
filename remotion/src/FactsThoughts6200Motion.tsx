import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #117: Your Brain Makes Thousands of Thoughts a Day
// (priority queue rank 41, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Thoughts palette: deep navy / gold / aqua / coral.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: FEMALE Measured Clock (avocado_v2:vdc_6534), speed 95,
// atempo 1.000x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-08 before scripting):
// - "60,000-70,000 thoughts per day" has NO primary source. Discover
//   Magazine investigated: the trail leads to a 2003 blog post, and the
//   NSF attribution cannot be found (the NSF funds research, it does not
//   do it). PolicyViz traced the 60,000 variant to a 2013 Forbes article
//   citing Dr. Fred Luskin of Stanford; Luskin replied "I have no idea
//   where that quote came from."
// - The "80% negative / 95% repetitive" figures are ALSO unsourced myths
//   from the same chain — no study behind them.
// - REAL measurement: Tseng & Poppenk 2020, Nature Communications 11,
//   3480 (Queen's University, Canada). fMRI "thought worms": median ~6.5
//   thought transitions per minute; estimated average ~6,200 thoughts per
//   day (assuming ~8 hours sleep). 184 participants.
// - 6.5 per minute = one new thought roughly every 9 seconds (60/6.5 =
//   9.2s). Over 90 seconds = ~9.75, script says "about ten times".
// - Inner speech: Hurlburt & Heavey DES (beeper study) — inner speech in
//   ~26% of sampled moments (median 20%; some people 0%, some 75%).
// - Unsymbolized thinking: ~22% of sampled moments were thoughts with no
//   words, no images, no symbols (Hurlburt DES).
// - No inner voice at all: real phenomenon (anendophasia; Nedergaard &
//   Lupyan 2024, Psychological Science). Some DES participants reported
//   inner speech in 0% of samples. NO population percentage claimed.
// - Neuroticism / mental noise: Tseng & Poppenk found higher resting
//   transition rate correlated with higher trait neuroticism — first
//   neural confirmation of the "mental noise" theory (Robinson & Tamir
//   2005). Presented as correlation, not cause.

const BG = "#0b1026";
const NAVY = "#16233f";
const GOLD = "#f4c95d";
const AQUA = "#4cc9f0";
const CORAL = "#ff8a7a";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const MOON = "#e6e2ff";

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

export const FactsThoughts6200Motion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the famous number has no source ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const shake2 = s2 >= 60 ? 4 * Math.sin(s2 * 0.9) : 0; // numbers wobble once debunked
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): the real number — about 6,200 a day ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // counter + bars grow over 7s
  const count4 = Math.round(6200 * fill4);
  // TRUE proportions: 60,000 = full 760px track; 6,200 = 6200/60000 = 10.3% -> 78px.
  const barMyth4 = 760 * fill4;
  const barReal4 = Math.max(78 * fill4, fill4 > 0 ? 6 : 0);
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): inner speech only ~26% of sampled moments ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210);
  const count6 = Math.round(26 * fill6);
  // TRUE proportion: 26% of 760px track = 198px.
  const bar6 = Math.max(198 * fill6, fill6 > 0 ? 6 : 0);
  // Four thought bubbles: roughly 1 in 4 lights up (26% ~= 1 in 4).
  const lit6 = Math.floor(s6 / 45) % 4;

  // ---- S8 (900-1200): worriers switch thoughts faster — mental noise ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // Calm mind: one dot gliding slowly (loop 240 frames). Worried mind:
  // three dots jittering fast (loop 45 frames) — visibly noisier.
  const calm8 = ((s8 % 240) / 240) * 640;
  const jitter8 = [0, 1, 2].map((k) => ((s8 * 5 + k * 15) % 45) / 45 * 640);
  const pulse8 = 1 + 0.04 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — about ten new thoughts in 90 seconds ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const big9 = s9 >= 90 ? 1 : 0;
  const count9 = Math.min(10, Math.floor(s9 / 21)); // ticks 0 -> 10 over ~7s
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 60,000? 70,000? No source. */}
      {frame < 300 && (
        <Center>
          <Kicker color={CORAL}>THE NUMBER EVERYONE QUOTES</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36, transform: `translateX(${shake2}px) scale(${pulse2})` }}>
            <div style={{ fontSize: 130, fontWeight: 900, color: MOON, lineHeight: 1 }}>60,000</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: GREY, marginTop: 6 }}>OR EVEN</div>
            <div style={{ fontSize: 130, fontWeight: 900, color: MOON, lineHeight: 1 }}>70,000</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: GREY, marginTop: 10 }}>THOUGHTS A DAY?</div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: CORAL, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.15 }}>
            NO STUDY
            <br />
            BEHIND IT
          </div>
          <Sub>The trail ends at a blog post — not a lab.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Discover Magazine • PolicyViz 2024
          </div>
        </Center>
      )}

      {/* S4 — the real number: about 6,200 thoughts a day */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE REAL NUMBER</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1, transform: `scale(${pulse4})` }}>
              {count4.toLocaleString("en-US")}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              THOUGHTS A DAY — MEASURED, NOT GUESSED
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>😮 THE MYTH: 60,000</span>
                <span style={{ color: CORAL }}>100%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: NAVY, borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barMyth4, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🔬 MEASURED: 6,200</span>
                <span style={{ color: GOLD }}>~10%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: NAVY, borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barReal4, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, textAlign: "center" }}>
              ABOUT 6½ NEW THOUGHTS EVERY MINUTE
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            “THOUGHT WORMS”
          </div>
          <Sub>Brain scans tracked one thought ending and the next beginning.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Tseng &amp; Poppenk 2020 • Nature Communications
          </div>
        </Center>
      )}

      {/* S6 — inner speech only ~26% of sampled moments */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>NOT EVERY THOUGHT IS WORDS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ fontSize: 150, fontWeight: 900, color: TEAL, lineHeight: 1 }}>
              {count6}%
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              OF RANDOM MOMENTS HAD INNER SPEECH
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>💬 INNER SPEECH</span>
                <span style={{ color: TEAL }}>~26%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: NAVY, borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: bar6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", marginTop: 8 }}>
                <span>0%</span>
                <span>about 1 moment in 4</span>
                <span>100%</span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 6 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ width: 84, height: 84, borderRadius: "50%", backgroundColor: i === lit6 ? TEAL : NAVY, border: "3px solid #7fd4c1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>
                  {i === lit6 ? "💬" : ""}
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            ONLY ABOUT
            <br />1 IN 4
          </div>
          <Sub>Most thoughts are not words at all.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Hurlburt &amp; Heavey — beeper sampling study
          </div>
        </Center>
      )}

      {/* S8 — worriers switch thoughts faster: mental noise */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={GOLD}>WORRIERS THINK FASTER</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>😌 CALM MIND</span>
                <span style={{ color: AQUA }}>STEADY</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: NAVY, borderRadius: 999, marginTop: 10 }}>
                <div style={{ position: "absolute", left: calm8, top: 6, width: 32, height: 32, borderRadius: "50%", backgroundColor: AQUA, boxShadow: "0 0 20px #4cc9f0" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>😟 WORRIED MIND</span>
                <span style={{ color: CORAL }}>NOISY</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: NAVY, borderRadius: 999, marginTop: 10 }}>
                {jitter8.map((x, k) => (
                  <div key={k} style={{ position: "absolute", left: x, top: 6, width: 32, height: 32, borderRadius: "50%", backgroundColor: CORAL, boxShadow: "0 0 20px #ff8a7a" }} />
                ))}
              </div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, textAlign: "center" }}>
              MORE SWITCHING, MORE MENTAL NOISE
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            “MENTAL
            <br />
            NOISE”
          </div>
          <Sub>Higher neuroticism tracks with a faster thought-switching rate.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Tseng &amp; Poppenk 2020 • Robinson &amp; Tamir 2005
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: about ten new thoughts in these 90 seconds */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ fontSize: 120, transform: `scale(${pulse9})`, lineHeight: 1 }}>🧠</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 24, textAlign: "center" }}>
              IN THESE 90 SECONDS, YOUR BRAIN JUMPED TO
            </div>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1, marginTop: 12 }}>
              {count9} NEW THOUGHTS
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: big9, textAlign: "center", lineHeight: 1.2 }}>
            AND YOU CHOSE
            <br />
            ALMOST NONE
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: TEAL, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            MOST THOUGHTS JUST ARRIVE
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
