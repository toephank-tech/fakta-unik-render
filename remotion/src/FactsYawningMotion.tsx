import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #39: Yawning Is Contagious — Even Reading This Can
// Make You Yawn (priority queue rank 20, Tier S last)
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

export const FactsYawningMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): contagion bars — ~55% caught a yawn vs ~21% smiled ----
  // TRUE percentages (Provine 1986): 55% -> 418px, 21% -> 160px of 760px.
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const yawn2 = Math.min(1, s2 / 120); // yawn bar grows to 55%
  const smile2 = Math.min(1, Math.max(0, (s2 - 90) / 120)); // smile bar grows after
  const yawnW2 = yawn2 * TRACK * 0.55; // 55% — TRUE percentage
  const smileW2 = smile2 * TRACK * 0.21; // 21% — TRUE percentage
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): social gradient — friends/family MOST, acquaintances, strangers LEAST ----
  // Qualitative gradient (Norscia & Palagi 2011: most/least, no exact % published
  // in the script) — widths labelled MOST / LESS / LEAST, no fake numbers.
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fam4 = Math.min(1, s4 / 120);
  const acq4 = Math.min(1, Math.max(0, (s4 - 80) / 120));
  const str4 = Math.min(1, Math.max(0, (s4 - 160) / 120));
  const famW4 = fam4 * TRACK;
  const acqW4 = acq4 * TRACK * 0.6;
  const strW4 = str4 * TRACK * 0.3;
  const dots4 = Array.from({ length: 10 }).map((_, i) => ({
    x: 60 + ((i * 173) % 700),
    y: 20 + ((i * 97) % 70),
    speed: 0.9 + (i % 3) * 0.4,
    size: 12 + ((i * 17) % 16),
  }));

  // ---- S6 (600-900): myth-bust — low oxygen ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const cross6 = Math.min(1, Math.max(0, (s6 - 90) / 90)); // red cross-out line draws across
  const false6 = s6 >= 200 ? 1 : 0; // NO EFFECT stamp pops in late
  const shake6 = s6 >= 200 && s6 < 230 ? Math.sin(s6 * 1.2) * 6 : 0;

  // ---- S8 (900-1200): pregnancy timeline — 11 weeks marker ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const marker8 = Math.min(1, Math.max(0, (s8 - 60) / 120)); // marker slides to week 11
  const glow8 = 1 + 0.06 * Math.sin(s8 * 0.1);
  const drift8 = Array.from({ length: 10 }).map((_, i) => ({
    x: 40 + ((i * 149) % 680),
    y: 10 + ((i * 61) % 60),
    speed: 0.8 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 14),
  }));

  // ---- S9 (1200-1500): PAYOFF — dogs catch human yawns, 72% vs humans ~55% ----
  // TRUE percentages: dogs 72% -> 547px, humans ~55% -> 418px of a 760px track.
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const dog9 = Math.min(1, s9 / 120); // dog bar grows to 72%
  const hum9 = Math.min(1, Math.max(0, (s9 - 90) / 120)); // human bar grows to ~55%
  const dogW9 = dog9 * TRACK * 0.72; // 72% — TRUE percentage
  const humW9 = hum9 * TRACK * 0.55; // ~55% — TRUE percentage (Provine ~55%)
  const tail9 = Math.sin(s9 * 0.15) * 10; // dog tail wag

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — contagion bars: 55% caught a yawn vs 21% smiled (TRUE %) */}
      {frame < 300 && (
        <Center>
          <Kicker>THE CLASSIC EXPERIMENT</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>WATCHED SOMEONE YAWN</span>
                <span style={{ color: GOLD }}>~55%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: yawnW2, height: 44, backgroundColor: GOLD, borderRadius: 999, transform: `scaleY(${pulse2})` }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>caught the yawn within five minutes</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>WATCHED SOMEONE SMILE</span>
                <span style={{ color: TEAL }}>~21%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: smileW2, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>yawned anyway — the control group</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp2, textAlign: "center" }}>
            ABOUT HALF CAUGHT IT
          </div>
          <Sub>Seeing a yawn more than doubles the chance you yawn yourself.</Sub>
        </Center>
      )}

      {/* S4 — social gradient: friends/family MOST, acquaintances, strangers LEAST */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>WHOSE YAWN DO YOU CATCH?</Kicker>
          <div style={{ position: "relative", width: 940, height: 100, overflow: "hidden", marginTop: 16 }}>
            {dots4.map((d, i) => {
              const x = ((d.x + s4 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? BLUE : GOLD, boxShadow: "0 0 12px rgba(90,169,255,0.7)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 10, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>CLOSE FRIENDS &amp; FAMILY</span>
                <span style={{ color: GOLD }}>MOST</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: famW4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>ACQUAINTANCES</span>
                <span style={{ color: TEAL }}>LESS</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: acqW4, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>STRANGERS</span>
                <span style={{ color: BLUE }}>LEAST</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: strW4, height: 44, backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center" }}>
            CLOSER BOND — STRONGER CATCH
          </div>
          <Sub>Your brain mirrors the people you care about most.</Sub>
        </Center>
      )}

      {/* S6 — myth-bust: low oxygen */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={RED}>✕ MYTH</Kicker>
          <div style={{ position: "relative", marginTop: 36, transform: `translateX(${shake6}px)` }}>
            <div style={{ fontSize: 72, fontWeight: 900, textAlign: "center", lineHeight: 1.15, color: "white" }}>
              YAWNS MEAN
              <br />
              LOW OXYGEN
            </div>
            {/* red cross-out line draws across the claim */}
            <div style={{ position: "absolute", left: -20, right: -20, top: "50%", height: 14, backgroundColor: RED, borderRadius: 999, transform: "rotate(-4deg) scaleX(" + cross6 + ")", transformOrigin: "left center", opacity: cross6 > 0 ? 1 : 0 }} />
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, color: RED, marginTop: 40, opacity: false6, textAlign: "center" }}>
            NO EFFECT
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 30, opacity: stamp6, textAlign: "center" }}>
            PROVINE • 1987
          </div>
          <Sub>Extra oxygen or carbon dioxide changed nothing — the old idea is dead.</Sub>
        </Center>
      )}

      {/* S8 — pregnancy timeline: yawning from week 11 */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>BEFORE YOU WERE BORN</Kicker>
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
          {/* timeline: conception -> birth, marker lands on week 11 */}
          <div style={{ position: "relative", width: 860, marginTop: 20 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 30, height: 10, backgroundColor: "#33334d", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 0, top: 30, height: 10, width: `${marker8 * 28}%`, backgroundColor: GOLD, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: `${marker8 * 28}%`, top: 0, transform: "translateX(-50%)", opacity: marker8 > 0 ? 1 : 0 }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900, color: "#0d0d1a", transform: `scale(${glow8})` }}>●</div>
            </div>
            <div style={{ position: "absolute", left: `calc(${marker8 * 28}% + 48px)`, top: 17, fontSize: 28, fontWeight: 800, color: GOLD, opacity: marker8 > 0 ? 1 : 0, whiteSpace: "nowrap" }}>
              WEEK 11
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 96, fontSize: 28, fontWeight: 800, color: GREY }}>
              <span>CONCEPTION</span>
              <span>BIRTH</span>
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp8, textAlign: "center" }}>
            YAWNING AT 11 WEEKS
          </div>
          <Sub>Ultrasound catches fetuses yawning — with no air to breathe at all.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: dogs catch human yawns — 72% vs humans ~55% (TRUE %) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DOGS • 21 OF 29</span>
                <span style={{ color: GOLD }}>72%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: dogW9, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>caught a yawn from a human — 2008 study</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>HUMANS</span>
                <span style={{ color: TEAL }}>~55%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: humW9, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>catch a yawn from another human</div>
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp9, textAlign: "center" }}>
            DOGS CATCH IT MORE
            <br />
            THAN WE DO
          </div>
          <Sub>Your yawn can jump species — and dogs catch it even better than humans.</Sub>
          <div style={{ fontSize: 56, marginTop: 18, transform: `rotate(${tail9}deg)` }}>🐕</div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
