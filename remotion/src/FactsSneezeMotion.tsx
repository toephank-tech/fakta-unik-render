import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #25: A Sneeze Blasts Out at ~160 km/h — And You Can't
// Sneeze With Your Eyes Open (priority queue rank 19)
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

export const FactsSneezeMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): speed bars — claim 160 km/h vs measured 16 km/h ----
  // TRUE percentages: 16/160 = 10% -> measured bar = 76px of a 760px track.
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const claim2 = Math.min(1, s2 / 120); // claim bar grows to full width
  const meas2 = Math.min(1, Math.max(0, (s2 - 90) / 120)); // measured bar grows after
  const claimW2 = claim2 * TRACK;
  const measW2 = meas2 * TRACK * 0.1; // 10% — TRUE percentage
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): reflex chain lights up in sequence ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const node1 = s4 >= 30 ? 1 : 0; // nose / irritant
  const node2 = s4 >= 110 ? 1 : 0; // trigeminal nerve
  const node3 = s4 >= 190 ? 1 : 0; // brainstem
  const node4 = s4 >= 250 ? 1 : 0; // explosive exhale
  const fill4 = Math.min(1, s4 / 260); // connecting line fills left -> right
  const dots4 = Array.from({ length: 10 }).map((_, i) => ({
    x: 60 + ((i * 173) % 700),
    y: 20 + ((i * 97) % 70),
    speed: 0.9 + (i % 3) * 0.4,
    size: 12 + ((i * 17) % 16),
  }));

  // ---- S6 (600-900): myth-bust — eyes pop out ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const cross6 = Math.min(1, Math.max(0, (s6 - 90) / 90)); // red cross-out line draws across
  const false6 = s6 >= 200 ? 1 : 0; // FALSE stamp pops in late
  const shake6 = s6 >= 200 && s6 < 230 ? Math.sin(s6 * 1.2) * 6 : 0;

  // ---- S8 (900-1200): distance bars — old 2 m rule vs 8 m cloud ----
  // TRUE percentages: 2/8 = 25% -> old-rule bar = 190px of a 760px track.
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const old8 = Math.min(1, s8 / 120); // old-rule bar grows to 25%
  const cloud8 = Math.min(1, Math.max(0, (s8 - 90) / 150)); // cloud bar grows to 100%
  const oldW8 = old8 * TRACK * 0.25; // 25% — TRUE percentage
  const cloudW8 = cloud8 * TRACK;
  const drift8 = Array.from({ length: 12 }).map((_, i) => ({
    x: 40 + ((i * 149) % 680),
    y: 10 + ((i * 61) % 60),
    speed: 0.8 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 14),
  }));

  // ---- S9 (1200-1500): PAYOFF — you cannot sneeze in your sleep ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const zFloat9 = Math.sin(s9 * 0.06) * 14; // Zzz floats gently
  const off9 = Math.min(1, Math.max(0, (s9 - 100) / 60)); // reflex switch flips OFF
  const moon9 = 1 + 0.05 * Math.sin(s9 * 0.08);
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — speed bars: popular claim 160 vs measured 16 (TRUE 10%) */}
      {frame < 300 && (
        <Center>
          <Kicker>THE FAMOUS NUMBER — CHECKED</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>POPULAR CLAIM</span>
                <span style={{ color: GOLD }}>160 km/h</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: claimW2, height: 44, backgroundColor: GOLD, borderRadius: 999, transform: `scaleY(${pulse2})` }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>MEASURED • 2013</span>
                <span style={{ color: TEAL }}>16 km/h</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: measW2, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: RED, marginTop: 44, opacity: stamp2, textAlign: "center" }}>
            10× SLOWER THAN THE LEGEND
          </div>
          <Sub>High-speed cameras measured the real sneeze — the old number was only a calculation.</Sub>
        </Center>
      )}

      {/* S4 — reflex chain: nose -> trigeminal -> brainstem -> exhale */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE SNEEZE REFLEX</Kicker>
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
          {/* chain of 4 nodes */}
          <div style={{ position: "relative", width: 900, marginTop: 10 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 44, height: 10, backgroundColor: "#33334d", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 0, top: 44, height: 10, width: `${fill4 * 100}%`, backgroundColor: GOLD, borderRadius: 999 }} />
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              {[
                { on: node1, label: "NOSE", sub: "irritant", color: BLUE },
                { on: node2, label: "TRIGEMINAL", sub: "nerve fires", color: GOLD },
                { on: node3, label: "BRAINSTEM", sub: "takes over", color: TEAL },
                { on: node4, label: "EXHALE", sub: "explosive", color: RED },
              ].map((n, i) => (
                <div key={i} style={{ width: 200, textAlign: "center" }}>
                  <div style={{ width: 96, height: 96, margin: "0 auto", borderRadius: "50%", backgroundColor: n.on ? "#2b2b4d" : "#1c1c30", border: `5px solid ${n.on ? n.color : "#33334d"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: n.on ? n.color : GREY }}>
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 900, marginTop: 14, color: n.on ? "white" : GREY }}>{n.label}</div>
                  <div style={{ fontSize: 26, color: GREY, marginTop: 4 }}>{n.sub}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp4, textAlign: "center" }}>
            FULL-BODY REFLEX
          </div>
          <Sub>One tickle in your nose — and your whole body fires in sequence.</Sub>
        </Center>
      )}

      {/* S6 — myth-bust: eyes pop out */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={RED}>✕ MYTH</Kicker>
          <div style={{ position: "relative", marginTop: 36, transform: `translateX(${shake6}px)` }}>
            <div style={{ fontSize: 72, fontWeight: 900, textAlign: "center", lineHeight: 1.15, color: "white" }}>
              YOUR EYES WILL
              <br />
              POP OUT
            </div>
            {/* red cross-out line draws across the claim */}
            <div style={{ position: "absolute", left: -20, right: -20, top: "50%", height: 14, backgroundColor: RED, borderRadius: 999, transform: "rotate(-4deg) scaleX(" + cross6 + ")", transformOrigin: "left center", opacity: cross6 > 0 ? 1 : 0 }} />
          </div>
          <div style={{ fontSize: 84, fontWeight: 900, color: RED, marginTop: 40, opacity: false6, textAlign: "center" }}>
            FALSE
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 30, opacity: stamp6, textAlign: "center" }}>
            NO CASE EVER RECORDED
          </div>
          <Sub>Six muscles hold each eye in place — and the pressure never reaches your eyes.</Sub>
        </Center>
      )}

      {/* S8 — distance bars: old 2 m rule vs 8 m cloud (TRUE 25%) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>HOW FAR DOES IT REALLY GO?</Kicker>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 10, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>OLD 2-METRE RULE</span>
                <span style={{ color: GOLD }}>2 m</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: oldW8, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>SNEEZE CLOUD • MIT</span>
                <span style={{ color: TEAL }}>8 m</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: cloudW8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp8, textAlign: "center" }}>
            4× FARTHER THAN ASSUMED
          </div>
          <Sub>Tiny droplets ride the cloud across a whole room — and hang in the air for minutes.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: you cannot sneeze in your sleep */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", width: 940, height: 260, marginTop: 30 }}>
            {/* moon */}
            <div style={{ position: "absolute", left: 80, top: 20, width: 170, height: 170, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 50px rgba(244,201,93,0.6)", transform: `scale(${moon9})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84 }}>
              🌙
            </div>
            {/* floating Zzz */}
            <div style={{ position: "absolute", left: 300, top: 30 + zFloat9, fontSize: 64, fontWeight: 900, color: BLUE }}>
              Z z z
            </div>
            {/* reflex switch — flips OFF */}
            <div style={{ position: "absolute", right: 60, top: 40, width: 300, height: 170, backgroundColor: "#17172b", borderRadius: 28, border: "4px solid #33334d", padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY, letterSpacing: 3 }}>SNEEZE REFLEX</div>
              <div style={{ fontSize: 64, fontWeight: 900, marginTop: 12, color: off9 > 0.5 ? RED : TEAL, transform: `scale(${pulse9})` }}>
                {off9 > 0.5 ? "OFF" : "ON"}
              </div>
            </div>
            {/* sleeping face — kept left, clear of the switch box */}
            <div style={{ position: "absolute", left: 280, bottom: 0, width: 200, height: 90, backgroundColor: "#e8b48c", borderRadius: "45%", opacity: 0.9 }} />
            <div style={{ position: "absolute", left: 280, bottom: 70, fontSize: 28, fontWeight: 700, color: GREY }}>😴 DEEP SLEEP</div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 20, textAlign: "center" }}>
            YOU CAN'T SNEEZE
            <br />
            IN YOUR SLEEP
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 30, opacity: stamp9, textAlign: "center" }}>
            REM SLEEP • REFLEX OFF
          </div>
          <Sub>Your body switches the whole reflex off — an irritant can only wake you up first.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
