import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts Ep.2 — A War Inside Your Body (White Blood Cells)
// MOTION-ONLY segments for the V3 combo: 4 scenes x 300 frames = 1200 frames.
// AI-video scenes (S1, S3, S4, S5, S7) are separate clips; this comp covers
// S2, S6, S8, S9. Every scene has continuous real movement, NOT animated
// text cards. Big numbers/counters are the animation itself, with at most
// one short kicker/headline line per scene. Same dark blood-red palette as
// Ep.1 (FactsHeartCombo) for series consistency.

const BG = "#14090c";
const RED = "#ff4d5e";
const DEEPRED = "#c22a3a";
const GOLD = "#f4c95d";
const WHITE = "#f2f2f5";
const GREY = "#c9c9cf";
const CARD = "#221016";
const LINE = "#3d1a20";
const TEAL = "#7fd4c1";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#9a7a72", fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
      {props.children}
    </div>
  );
}

function Cell(props: { size: number; color: string; glow?: string }) {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
        borderRadius: "50%",
        backgroundColor: props.color,
        boxShadow: props.glow || "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
}

export const FactsWBCMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): counter 4,000 -> 11,000 per microliter + 5 types ----
  const s2 = frame;
  const count2 = Math.round(interpolate(s2, [20, 260], [4000, 11000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const types2 = ["NEUTROPHIL", "LYMPHOCYTE", "MONOCYTE", "EOSINOPHIL", "BASOPHIL"];
  const shown2 = Math.min(5, Math.floor(s2 / 55));

  // ---- S6 (300-600): soldiers dying one by one; pus pool grows ----
  const s6 = frame - 300;
  const dead6 = Math.min(5, Math.floor(s6 / 55));
  const pus6 = interpolate(s6, [40, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eaten6 = Math.round(interpolate(s6, [20, 260], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S8 (600-900): memory timeline 0 -> 60+ years ----
  const s8 = frame - 600;
  const years8 = Math.round(interpolate(s8, [20, 270], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const dotX8 = interpolate(s8, [20, 270], [0, 820], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow8 = 0.7 + 0.3 * Math.sin(s8 * 0.08);

  // ---- S9 (900-1200): closing patrol, drifting cells + pulsing ring ----
  const s9 = frame - 900;
  const ring9 = (s9 % 120) / 120;
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.12);

  const drift = Array.from({ length: 12 }).map((_, i) => ({
    y: 80 + ((i * 211) % 1500),
    speed: 1.5 + (i % 4),
    size: 34 + ((i * 41) % 60),
    offset: (i * 167) % 1080,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — meet your army: counter + 5 types */}
      {frame < 300 && (
        <Center>
          <Kicker>MEET YOUR ARMY</Kicker>
          <div style={{ fontSize: 118, fontWeight: 900, color: GOLD, marginTop: 44, textAlign: "center" }}>
            {count2.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>PER MICROLITER OF BLOOD</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 56, width: 640 }}>
            {types2.map((t, i) => (
              <div
                key={t}
                style={{
                  opacity: i < shown2 ? 1 : 0.12,
                  transform: `translateX(${i < shown2 ? 0 : -30}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  backgroundColor: CARD,
                  border: `2px solid ${LINE}`,
                  borderRadius: 16,
                  padding: "16px 24px",
                }}
              >
                <Cell size={34} color={i === 0 ? WHITE : TEAL} glow={i === 0 ? "0 0 24px rgba(255,255,255,0.7)" : "none"} />
                <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 2 }}>{t}</div>
                {i === 0 && <div style={{ marginLeft: "auto", fontSize: 26, fontWeight: 800, color: GOLD }}>MOST</div>}
              </div>
            ))}
          </div>
          <Sub>Five kinds — each with its own job.</Sub>
        </Center>
      )}

      {/* S6 — victory has a price: soldiers dim, pus pool grows */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={RED}>VICTORY HAS A PRICE</Kicker>
          <div style={{ display: "flex", gap: 26, marginTop: 60 }}>
            {[0, 1, 2, 3, 4].map((i) => {
              const dead = i < dead6;
              return (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, opacity: dead ? 0.25 : 1, transform: dead ? "translateY(26px)" : "translateY(0px)" }}>
                  <Cell size={96} color={dead ? "#5a4a48" : WHITE} glow={dead ? "none" : "0 0 30px rgba(255,255,255,0.55)"} />
                  <div style={{ fontSize: 24, fontWeight: 800, color: dead ? GREY : WHITE }}>{dead ? "FALLEN" : "FIGHTING"}</div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD, marginTop: 56 }}>{eaten6}</div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>BACTERIA EATEN — THEN THEY DIE</div>
          {/* Pus pool */}
          <div style={{ width: 640, height: 90, marginTop: 48, borderRadius: 45, backgroundColor: "#2a2010", border: `2px solid ${LINE}`, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pus6 * 100}%`, backgroundColor: "#d8b13c", opacity: 0.9 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: "white", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              PUS = YOUR OWN DEAD SOLDIERS
            </div>
          </div>
        </Center>
      )}

      {/* S8 — they never forget: timeline 0 -> 60+ years */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THEY NEVER FORGET</Kicker>
          <div style={{ position: "relative", width: 340, height: 340, marginTop: 46, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1].map((i) => {
              const p = ((s8 % 90) / 90 + i / 2) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 80 + p * 260, height: 80 + p * 260, borderRadius: "50%", border: `3px solid ${TEAL}`, opacity: 0.8 * (1 - p) }} />
              );
            })}
            <div style={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: TEAL, opacity: glow8, boxShadow: "0 0 70px rgba(127,212,193,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84 }}>
              🧠
            </div>
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 40 }}>
            {years8}
            <span style={{ fontSize: 64 }}>+ YEARS</span>
          </div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>SMALLPOX IMMUNITY STILL FOUND</div>
          <div style={{ width: 820, height: 10, backgroundColor: "#33333a", borderRadius: 5, marginTop: 64, position: "relative" }}>
            <div style={{ width: `${dotX8 / 8.2}%`, height: "100%", backgroundColor: TEAL, borderRadius: 5 }} />
            <div style={{ position: "absolute", left: dotX8 - 16, top: -16, width: 42, height: 42, borderRadius: "50%", backgroundColor: TEAL, border: "4px solid white" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 820, marginTop: 22, fontSize: 30, color: GREY }}>
            <span>VACCINE</span>
            <span>20 YEARS</span>
            <span>60+ YEARS</span>
          </div>
        </Center>
      )}

      {/* S9 — closing patrol */}
      {frame >= 900 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 420, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1100) - 80;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 380, opacity: 0.75 }}>
                  <Cell size={d.size} color={i % 3 === 0 ? GOLD : WHITE} glow={i % 3 === 0 ? "0 0 26px rgba(244,201,93,0.7)" : "0 0 18px rgba(255,255,255,0.4)"} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              {[0, 1].map((i) => {
                const p = (ring9 + i / 2) % 1;
                return (
                  <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 110 + p * 300, height: 110 + p * 300, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.7 * (1 - p), transform: "translate(-50%, -50%)" }} />
                );
              })}
              <div style={{ transform: `scale(${pulse9})`, fontSize: 150, lineHeight: 1 }}>🛡️</div>
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 800, marginTop: 40, textAlign: "center", lineHeight: 1.2 }}>
            Still on patrol.
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 26 }}>FOR YOU.</div>
          <Sub>Your body files away every enemy it meets.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
