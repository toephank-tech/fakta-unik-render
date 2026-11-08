import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #17: Your Skin Is Brand New Every 28 Days
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / warm-skin palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages where numbers are claimed. Stamps appear
// EARLY in their scene (frame <= 60).

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const RED = "#ff5d5d";
const GREY = "#c9c9cf";
const TRACK = 760; // px — all bar widths are % of this track

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

export const FactsSkin28DaysMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): largest organ — 2 m2 + 16% body weight (TRUE %) ----
  const s2 = frame;
  const grow2 = Math.min(1, s2 / 150);
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);
  const dots2 = Array.from({ length: 12 }).map((_, i) => ({
    y: 60 + ((i * 173) % 240),
    speed: 1.1 + (i % 3) * 0.5,
    size: 12 + ((i * 29) % 22),
    offset: (i * 211) % 900,
  }));

  // ---- S4 (300-600): cell journey — 14 days up + 14 days shedding ----
  const s4 = frame - 300;
  const rise4 = Math.min(1, s4 / 240); // cell rises through the layers
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const layers4 = ["STRATUM CORNEUM — DEAD SHIELD", "GRANULAR LAYER", "SPINY LAYER", "BASAL LAYER — BORN HERE"];
  // Phase bars are TRUE fractions of the ~28-day cycle: 14/28 = 50% each.
  const phase4 = Math.min(1, s4 / 200);

  // ---- S6 (600-900): slows with age — TRUE % of a 60-day track ----
  const s6 = frame - 600;
  const grow6 = Math.min(1, s6 / 180);
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // 28 days = 47% of 60; 45 days = 75% of 60; 60 days = 100% of 60.
  const bar20s = (TRACK * 28) / 60; // ~355px
  const bar4050s = (TRACK * 45) / 60; // ~570px (low end of the 45-60 range)
  const bar4050sMax = TRACK; // 60 days = 100%

  // ---- S8 (900-1200): acid mantle — pH scale 0-14, TRUE zone position ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const shield8 = 0.7 + 0.3 * Math.sin(s8 * 0.1);
  // pH 4.5-5.5 on a 0-14 scale: 4.5/14 = 32.1%, 5.5/14 = 39.3% of track.
  const phStart = (TRACK * 4.5) / 14; // ~244px
  const phWidth = (TRACK * (5.5 - 4.5)) / 14; // ~54px
  const germs8 = Array.from({ length: 8 }).map((_, i) => ({
    x: 60 + ((i * 137) % 640),
    y: 30 + ((i * 89) % 120),
    speed: 1.5 + (i % 3),
    size: 22 + ((i * 13) % 14),
  }));

  // ---- S9 (1200-1500): payoff — 8 pounds a year, brand-new stamp ----
  const s9 = frame - 1200;
  const pounds9 = Math.min(8, Math.floor((s9 / 210) * 8));
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.12);
  const day9 = Math.min(28, Math.floor((s9 / 210) * 28));
  const drift9 = Array.from({ length: 10 }).map((_, i) => ({
    y: 40 + ((i * 173) % 260),
    speed: 1.2 + (i % 3),
    size: 14 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — largest organ: ~2 m2, ~16% of body weight */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR BODY&apos;S LARGEST ORGAN</Kicker>
          <div style={{ position: "relative", width: 940, height: 180, overflow: "hidden", marginTop: 20 }}>
            {dots2.map((d, i) => {
              const x = ((d.offset + s2 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 160, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : TEAL, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(127,212,193,0.6)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, transform: `scale(${pulse2})`, textAlign: "center", lineHeight: 1 }}>
            2 m²
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 10, textAlign: "center" }}>
            OF SKIN — ROUGHLY A BED SHEET
          </div>
          <div style={{ marginTop: 44, width: TRACK }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, color: GREY, marginBottom: 10 }}>
              <span>SHARE OF BODY WEIGHT</span>
              <span style={{ color: GOLD }}>~16%</span>
            </div>
            <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${(TRACK * 16 * grow2) / 100}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp2, textAlign: "center" }}>
            THE LARGEST ORGAN YOU OWN
          </div>
          <Sub>About two square metres, around sixteen percent of your weight.</Sub>
        </Center>
      )}

      {/* S4 — the cell's journey: 14 days up + 14 days as dead shield */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>ONE CELL&apos;S JOURNEY TO THE SURFACE</Kicker>
          <div style={{ position: "relative", width: TRACK, height: 300, marginTop: 36 }}>
            {layers4.map((label, i) => (
              <div key={label} style={{ position: "absolute", left: 0, right: 0, top: i * 74, height: 66, borderRadius: 14, backgroundColor: i === 0 ? "#3a2f1a" : i === 3 ? "#1d3a34" : "#23233c", display: "flex", alignItems: "center", paddingLeft: 24, fontSize: 26, fontWeight: 800, color: i === 0 ? GOLD : i === 3 ? TEAL : GREY }}>
                {label}
              </div>
            ))}
            <div style={{ position: "absolute", left: TRACK - 60, top: 300 - rise4 * 270 - 22, width: 44, height: 44, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 26px rgba(244,201,93,0.9)" }} />
          </div>
          <div style={{ marginTop: 40, width: TRACK, display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700, color: GREY, marginBottom: 8 }}>
                <span>CLIMB UP</span>
                <span style={{ color: GOLD }}>~14 DAYS</span>
              </div>
              <div style={{ width: "100%", height: 36, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${(TRACK / 2 - 8) * phase4}px`, height: "100%", backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700, color: GREY, marginBottom: 8 }}>
                <span>SHED AWAY</span>
                <span style={{ color: GOLD }}>~14 DAYS</span>
              </div>
              <div style={{ width: "100%", height: 36, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${(TRACK / 2 - 8) * Math.max(0, phase4 - 0.5) * 2}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp4, textAlign: "center" }}>
            14 + 14 = ~28 DAYS
          </div>
          <Sub>Two weeks up, two weeks as a dead shield — then it flakes away.</Sub>
        </Center>
      )}

      {/* S6 — slows with age; the dermis does NOT turn over like this */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>AN AVERAGE — NOT A CLOCK</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>IN YOUR 20s</span>
                <span style={{ color: TEAL }}>~28 DAYS</span>
              </div>
              <div style={{ width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${bar20s * grow6}px`, height: "100%", backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>IN YOUR 40s–50s</span>
                <span style={{ color: GOLD }}>45–60 DAYS</span>
              </div>
              <div style={{ position: "relative", width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: `${bar4050sMax * grow6}px`, height: "100%", backgroundColor: "#6b5a2e", borderRadius: 999 }} />
                <div style={{ position: "absolute", left: 0, top: 0, width: `${bar4050s * grow6}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, color: GREY, marginTop: 8 }}>
                <span>0 DAYS</span>
                <span>60-DAY SCALE</span>
                <span>60 DAYS</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: RED, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.3 }}>
            THE DEEPER DERMIS NEVER TURNS OVER LIKE THIS
          </div>
          <Sub>Only the outer layer — the epidermis — renews on this cycle.</Sub>
        </Center>
      )}

      {/* S8 — acid mantle: pH 4.5-5.5 on a 0-14 scale (TRUE position) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={TEAL}>YOUR SKIN&apos;S ACID SHIELD</Kicker>
          <div style={{ position: "relative", width: 940, height: 150, overflow: "hidden", marginTop: 20 }}>
            {germs8.map((g, i) => {
              const y = g.y + Math.sin((s8 * 0.08 + i) * 1.3) * 22;
              return (
                <div key={i} style={{ position: "absolute", left: g.x, top: y, opacity: 0.85, fontSize: g.size, color: RED, fontWeight: 900 }}>
                  ✕
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: 96, opacity: shield8 }}>🛡️</div>
          </div>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, textAlign: "center", lineHeight: 1 }}>
            pH 4.5–5.5
          </div>
          <div style={{ marginTop: 36, width: TRACK }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700, color: GREY, marginBottom: 10 }}>
              <span>0 — VERY ACIDIC</span>
              <span>14 — VERY ALKALINE</span>
            </div>
            <div style={{ position: "relative", width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: `${phStart}px`, top: 0, width: `${phWidth}px`, height: "100%", backgroundColor: GOLD, boxShadow: "0 0 18px rgba(244,201,93,0.8)" }} />
              <div style={{ position: "absolute", left: `${(TRACK * 7) / 14 - 2}px`, top: 0, width: 4, height: "100%", backgroundColor: "white", opacity: 0.7 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", fontSize: 26, fontWeight: 700, color: GOLD, marginTop: 10 }}>
              ▲ SLIGHTLY ACIDIC — THE ACID MANTLE
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp8, textAlign: "center" }}>
            GERMS BOUNCE OFF — GOOD BACTERIA STAY
          </div>
          <Sub>A slightly acidic surface keeps harmful germs out.</Sub>
        </Center>
      )}

      {/* S9 — payoff: 8 pounds of dead skin a year */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 220, overflow: "hidden" }}>
            {drift9.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 180, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : BLUE, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(90,169,255,0.6)" }} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
              <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, transform: `scale(${pulse9})`, lineHeight: 1 }}>{pounds9}</div>
            </div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: "white", marginTop: 8, textAlign: "center", whiteSpace: "nowrap" }}>POUNDS — EVERY YEAR</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GREY, marginTop: 20, textAlign: "center" }}>
            OF DEAD SKIN, SHED WITHOUT YOU NOTICING
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "white", marginTop: 28, textAlign: "center" }}>
            DAY {day9} OF 28
          </div>
          <div style={{ width: TRACK, height: 36, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden", marginTop: 14 }}>
            <div style={{ width: `${(TRACK * day9) / 28}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 32, opacity: stamp9, textAlign: "center", lineHeight: 1.3 }}>
            BRAND NEW EVERY ~28 DAYS
          </div>
          <Sub>The surface you touch today did not exist a month ago.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
