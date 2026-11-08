import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #167: Your Nightmares Train You to Face Danger
// (threat simulation theory) — priority queue rank 22, Tier A
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / cold-blue palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE percentages on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative dots live in their own
// band and never cross text lines.
// THEORY FRAMING: the script says "one leading theory says…" throughout;
// S6 states the honest counterpoint (theory, debated; dreams also do
// memory + emotions). No medical advice — S9 carries one neutral line
// about talking to a doctor for frequent distressing nightmares.

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const RED = "#ff5d5d";
const GREY = "#c9c9cf";

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
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 480px" }}>
      {props.children}
    </div>
  );
}

const TRACK = 760; // px width of a 100% bar

export const FactsNightmaresMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): Revonsuo 2000 — 66.4% of dream reports had a threat ----
  // TRUE percentages (Revonsuo & Valli 2000, 592 dreams): 66.4% -> 505px,
  // 33.6% -> 255px of 760px.
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const threat2 = Math.min(1, s2 / 120); // threat bar grows to 66.4%
  const safe2 = Math.min(1, Math.max(0, (s2 - 90) / 120)); // no-threat bar grows after
  const threatW2 = threat2 * TRACK * 0.664; // 66.4% — TRUE percentage
  const safeW2 = safe2 * TRACK * 0.336; // 33.6% — TRUE percentage
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): threat types — aggression 42% most common (TRUE %) ----
  // Aggression 42% -> 319px of 760px (Revonsuo & Valli 2000). The other two
  // rows are QUALITATIVE (study says "also quite frequent" / "rare", no exact
  // %) — labelled FREQUENT / RARE, no fake numbers.
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const agg4 = Math.min(1, s4 / 120);
  const acc4 = Math.min(1, Math.max(0, (s4 - 80) / 120));
  const cat4 = Math.min(1, Math.max(0, (s4 - 160) / 120));
  const aggW4 = agg4 * TRACK * 0.42; // 42% — TRUE percentage
  const accW4 = acc4 * TRACK * 0.6; // qualitative FREQUENT
  const catW4 = cat4 * TRACK * 0.18; // qualitative RARE
  const dots4 = Array.from({ length: 10 }).map((_, i) => ({
    x: 60 + ((i * 173) % 700),
    y: 20 + ((i * 97) % 70),
    speed: 0.9 + (i % 3) * 0.4,
    size: 12 + ((i * 17) % 16),
  }));

  // ---- S6 (600-900): honest counterpoint — BUT IT'S A THEORY ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const mem6 = Math.min(1, Math.max(0, (s6 - 90) / 90)); // memory card slides in
  const emo6 = Math.min(1, Math.max(0, (s6 - 150) / 90)); // emotions card slides in
  const debate6 = s6 >= 200 ? 1 : 0; // STILL DEBATED stamp pops in late

  // ---- S8 (900-1200): Geneva study — 18 volunteers EEG + 89 diary ----
  // Counts are real (Sterpenich et al. 2019): 18 EEG subjects, 89 diary
  // participants. Direction is qualitative (less fear-region activation
  // awake, more prefrontal control) — no fake %.
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fearUp8 = Math.min(1, s8 / 120); // fear-in-dreams arrow fills
  const calm8 = Math.min(1, Math.max(0, (s8 - 100) / 120)); // calmer-awake arrow fills
  const warn8 = s8 >= 200 ? 1 : 0; // threshold caveat pops in late
  const drift8 = Array.from({ length: 10 }).map((_, i) => ({
    x: 40 + ((i * 149) % 680),
    y: 10 + ((i * 61) % 60),
    speed: 0.8 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 14),
  }));

  // ---- S9 (1200-1500): PAYOFF — nightmares as a safe training ground ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.1);
  const shield9 = Math.min(1, s9 / 120); // shield ring draws in

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — Revonsuo 2000: 66.4% of dream reports had a threat (TRUE %) */}
      {frame < 300 && (
        <Center>
          <Kicker>THE THEORY — YEAR 2000</Kicker>
          <div style={{ fontSize: 52, fontWeight: 900, color: "white", marginTop: 28, textAlign: "center", lineHeight: 1.2 }}>
            REVONSUO'S
            <br />
            THREAT SIMULATION THEORY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DREAMS WITH A THREAT</span>
                <span style={{ color: GOLD }}>66.4%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: threatW2, height: 44, backgroundColor: GOLD, borderRadius: 999, transform: `scaleY(${pulse2})` }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>of 592 dream reports — at least one threat</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DREAMS WITH NO THREAT</span>
                <span style={{ color: TEAL }}>33.6%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: safeW2, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>the rest — no threatening event at all</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp2, textAlign: "center" }}>
            2 OUT OF 3 DREAMS
          </div>
          <Sub>Danger shows up in dreams far more than in waking life.</Sub>
        </Center>
      )}

      {/* S4 — threat types: aggression 42% most common (TRUE %) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>WHAT THREATENS YOU IN DREAMS?</Kicker>
          <div style={{ position: "relative", width: 940, height: 100, overflow: "hidden", marginTop: 16 }}>
            {dots4.map((d, i) => {
              const x = ((d.x + s4 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? RED : GOLD, boxShadow: "0 0 12px rgba(255,93,93,0.7)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 10, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>CHASED OR ATTACKED</span>
                <span style={{ color: GOLD }}>42%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: aggW4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>ACCIDENTS &amp; FAILURES</span>
                <span style={{ color: TEAL }}>FREQUENT</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: accW4, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>CATASTROPHES &amp; DISEASE</span>
                <span style={{ color: BLUE }}>RARE</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: catW4, height: 44, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center" }}>
            AGGRESSION WINS — 42%
          </div>
          <Sub>Being chased or attacked is the number-one dream threat.</Sub>
        </Center>
      )}

      {/* S6 — honest counterpoint: BUT IT'S A THEORY */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={RED}>⚠ BUT IT'S A THEORY</Kicker>
          <div style={{ fontSize: 64, fontWeight: 900, textAlign: "center", lineHeight: 1.15, color: "white", marginTop: 28, opacity: stamp6 }}>
            NOT PROVEN.
            <br />
            STILL DEBATED.
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 40, opacity: mem6 }}>
            <div style={{ width: 400, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 56 }}>🧠</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: BLUE, marginTop: 8 }}>MEMORY</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 8, lineHeight: 1.35 }}>Dreams also help you store memories</div>
            </div>
            <div style={{ width: 400, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center", opacity: emo6 }}>
              <div style={{ fontSize: 56 }}>💙</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: TEAL, marginTop: 8 }}>EMOTIONS</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 8, lineHeight: 1.35 }}>And process feelings from the day</div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: RED, marginTop: 36, opacity: debate6, textAlign: "center" }}>
            ONE JOB? OR MANY?
          </div>
          <Sub>Scientists still argue about what dreams are really for.</Sub>
        </Center>
      )}

      {/* S8 — Geneva study: 18 EEG volunteers + 89 diary participants */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>THE GENEVA TEST</Kicker>
          <div style={{ position: "relative", width: 940, height: 100, overflow: "hidden", marginTop: 16 }}>
            {drift8.map((d, i) => {
              const x = ((d.x + s8 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.75 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? TEAL : BLUE, boxShadow: "0 0 12px rgba(127,212,193,0.6)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 10 }}>
            <div style={{ width: 400, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: GOLD }}>18</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6, lineHeight: 1.35 }}>volunteers tracked with EEG while they slept</div>
            </div>
            <div style={{ width: 400, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 64, fontWeight: 900, color: GOLD }}>89</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 6, lineHeight: 1.35 }}>people kept a dream diary for a week</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 36, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800, alignItems: "center" }}>
              <span style={{ color: GREY }}>FEAR FELT IN DREAMS</span>
              <span style={{ color: RED }}>▲ MORE</span>
            </div>
            <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: fearUp8 * TRACK, height: 44, backgroundColor: RED, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800, alignItems: "center" }}>
              <span style={{ color: GREY }}>FEAR REACTION WHEN AWAKE</span>
              <span style={{ color: TEAL }}>▼ CALMER</span>
            </div>
            <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: calm8 * TRACK, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp8, textAlign: "center" }}>
            FEAR IN DREAMS → CALMER AWAKE
          </div>
          <div style={{ fontSize: 30, color: RED, marginTop: 18, opacity: warn8, textAlign: "center", fontWeight: 700 }}>
            BUT — FULL TERROR LOSES THE BENEFIT
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: nightmares as a safe training ground */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", marginTop: 30, width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `10px solid ${GOLD}`, opacity: shield9, transform: `scale(${0.85 + 0.15 * shield9})` }} />
            <div style={{ fontSize: 140, transform: `scale(${pulse9})` }}>🛡️</div>
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 30, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            YOUR NIGHTMARES
            <br />
            MAY BE REHEARSALS
          </div>
          <Sub>Your brain may be using bad dreams as a safe training ground — so the real thing feels a little less frightening.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Frequent, distressing nightmares? Talking to a doctor can help.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
