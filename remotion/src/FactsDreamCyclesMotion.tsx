import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #170: You Dream Every 90 Minutes — All Night Long
// (priority queue rank 21, Tier A first)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / dream-purple palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE percentages on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative dots live in their own
// band and never cross text lines.

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const PURPLE = "#b48cff";
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
// line of text above the subtitle zone (y < 1280). Padding 600 (was 480):
// S9's tall stack pushed its Sub line 2 down to ~y=1140, colliding with the
// CTA subtitle — the extra 120px lifts every scene's lowest line clear.
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 600px" }}>
      {props.children}
    </div>
  );
}

const TRACK = 760; // px width of a 100% bar

export const FactsDreamCyclesMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the loop — 5 loop circles, ~90 min each, 4-6 loops/night ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const loops2 = Math.min(5, Math.floor(s2 / 48) + 1); // one loop lights up ~every 1.6s
  const dot2 = (s2 * 2.4) % 760; // travelling dot along the loop track
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): first cycle bars — deep sleep 20-40 min vs REM ~10 min ----
  // TRUE percentages of a 90-min cycle: deep ~30 min (midpoint of 20-40) = 33%,
  // REM ~10 min = 11%. Widths: 33% -> 253px, 11% -> 84px of 760px.
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const deep4 = Math.min(1, s4 / 120); // deep bar grows to 33%
  const rem4 = Math.min(1, Math.max(0, (s4 - 90) / 120)); // REM bar grows to 11%
  const deepW4 = deep4 * TRACK * 0.33;
  const remW4 = rem4 * TRACK * 0.11;
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): REM growth — first dream ~10 min vs last dream up to ~60 min ----
  // TRUE percentages on a 60-min scale: 10 min = 17% -> 127px, 60 min = 100% -> 760px.
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const first6 = Math.min(1, s6 / 120); // first-dream bar grows to 17%
  const last6 = Math.min(1, Math.max(0, (s6 - 90) / 120)); // last-dream bar grows to 100%
  const firstW6 = first6 * TRACK * 0.17;
  const lastW6 = last6 * TRACK * 1.0;
  const pulse6 = 1 + 0.05 * Math.sin(s6 * 0.12);

  // ---- S8 (900-1200): recall — wake in REM vs wake in deep sleep ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const remCard8 = Math.min(1, s8 / 90); // REM card slides in
  const deepCard8 = Math.min(1, Math.max(0, (s8 - 90) / 90)); // deep card slides in
  const eye8 = 1 + 0.08 * Math.sin(s8 * 0.15); // eye icon pulse

  // ---- S9 (1200-1500): PAYOFF — longest dream last, up to 60 min ----
  // Counter counts 0 -> 60 minutes; mini-bars show REM growing across the
  // night (cycle 1 ~10 min vs cycle 5 ~60 min, TRUE % of 60-min scale).
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const count9 = Math.min(60, Math.floor((s9 / 240) * 60)); // 0 -> 60 over 8s
  const c1w9 = Math.min(1, s9 / 100) * TRACK * 0.17; // cycle 1 REM ~10 min
  const c5w9 = Math.min(1, Math.max(0, (s9 - 80) / 100)) * TRACK * 1.0; // cycle 5 REM ~60 min
  const glow9 = 1 + 0.06 * Math.sin(s9 * 0.1);
  const drift9 = Array.from({ length: 10 }).map((_, i) => ({
    x: 40 + ((i * 149) % 680),
    y: 10 + ((i * 61) % 60),
    speed: 0.8 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 14),
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the loop: ~90 min per loop, 4-6 loops a night */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR NIGHT, ON REPEAT</Kicker>
          <div style={{ display: "flex", gap: 26, marginTop: 56, alignItems: "center" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  width: 132,
                  height: 132,
                  borderRadius: "50%",
                  border: `6px solid ${i < loops2 ? GOLD : "#33334d"}`,
                  backgroundColor: i < loops2 ? "rgba(244,201,93,0.18)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 52,
                  fontWeight: 900,
                  color: i < loops2 ? GOLD : "#55556e",
                  transform: `scale(${i === loops2 - 1 ? pulse2 : 1})`,
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>
          <div style={{ position: "relative", width: 760, height: 12, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44 }}>
            <div style={{ position: "absolute", left: dot2 - 12, top: -8, width: 28, height: 28, borderRadius: "50%", backgroundColor: PURPLE, boxShadow: "0 0 16px rgba(180,140,255,0.9)" }} />
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 48, opacity: stamp2, textAlign: "center" }}>
            ≈ 90 MINUTES PER LOOP
          </div>
          <Sub>One full cycle — light sleep, deep sleep, then dreaming — takes about ninety minutes.</Sub>
        </Center>
      )}

      {/* S4 — first cycle: deep sleep 20-40 min vs REM ~10 min (TRUE % of 90 min) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE FIRST LOOP</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DEEP SLEEP</span>
                <span style={{ color: BLUE }}>20–40 MIN</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: deepW4, height: 44, backgroundColor: BLUE, borderRadius: 999, transform: `scaleY(${pulse4})` }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>your body repairs itself — most of the loop</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DREAMING • REM</span>
                <span style={{ color: PURPLE }}>~10 MIN</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: remW4, height: 44, backgroundColor: PURPLE, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>only a short dream at the end of loop one</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: BLUE, marginTop: 44, opacity: stamp4, textAlign: "center" }}>
            DEEP SLEEP WINS EARLY
          </div>
          <Sub>The first loop is mostly repair — dreaming gets only about ten minutes.</Sub>
        </Center>
      )}

      {/* S6 — REM growth: first dream ~10 min vs last dream up to ~60 min (TRUE %) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE RECIPE FLIPS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>FIRST DREAM</span>
                <span style={{ color: PURPLE }}>~10 MIN</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: firstW6, height: 44, backgroundColor: PURPLE, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>short — right after you fall asleep</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>LAST DREAM</span>
                <span style={{ color: GOLD }}>UP TO ~60 MIN</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: lastW6, height: 44, backgroundColor: GOLD, borderRadius: 999, transform: `scaleY(${pulse6})` }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>in the early morning — six times longer</div>
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp6, textAlign: "center" }}>
            6× LONGER BY MORNING
          </div>
          <Sub>With every loop, deep sleep shrinks and dreaming takes over.</Sub>
        </Center>
      )}

      {/* S8 — recall: wake in REM vs wake in deep sleep */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>WHY SOME DREAMS STAY</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "center", backgroundColor: "#1c1c30", borderRadius: 24, padding: "26px 30px", opacity: remCard8, transform: `translateX(${(1 - remCard8) * -40}px)` }}>
              <div style={{ fontSize: 64, transform: `scale(${eye8})` }}>👁️</div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 900, color: TEAL }}>WAKE UP IN REM</div>
                <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>you catch the dream — it is still fresh</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center", backgroundColor: "#1c1c30", borderRadius: 24, padding: "26px 30px", opacity: deepCard8, transform: `translateX(${(1 - deepCard8) * 40}px)` }}>
              <div style={{ fontSize: 64 }}>😴</div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 900, color: RED }}>WAKE UP IN DEEP SLEEP</div>
                <div style={{ fontSize: 28, color: GREY, marginTop: 6 }}>the dream is already gone</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 44, opacity: stamp8, textAlign: "center" }}>
            TIMING DECIDES MEMORY
          </div>
          <Sub>Waking mid-dream lets you remember it — waking from deep sleep leaves nothing.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: longest dream comes last, up to 60 minutes */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={PURPLE}>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", width: 940, height: 100, overflow: "hidden", marginTop: 16 }}>
            {drift9.map((d, i) => {
              const x = ((d.x + s9 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.75 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? PURPLE : GOLD, boxShadow: "0 0 12px rgba(180,140,255,0.6)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 10, textAlign: "center", transform: `scale(${glow9})` }}>
            {count9} MIN
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "white", textAlign: "center", marginTop: 6 }}>
            YOUR LONGEST DREAM — RIGHT BEFORE MORNING
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DREAM • LOOP 1</span>
                <span style={{ color: PURPLE }}>~10 MIN</span>
              </div>
              <div style={{ position: "relative", height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: c1w9, height: 36, backgroundColor: PURPLE, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 800 }}>
                <span style={{ color: GREY }}>DREAM • LAST LOOP</span>
                <span style={{ color: GOLD }}>UP TO ~60 MIN</span>
              </div>
              <div style={{ position: "relative", height: 36, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: c5w9, height: 36, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp9, textAlign: "center" }}>
            CUT ONE LOOP — LOSE DREAMS
          </div>
          <Sub>Shorten your night by one loop, and it is mostly dreams you lose — not deep sleep.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
