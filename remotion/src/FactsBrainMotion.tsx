import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts Ep.3 — Your Brain Eats 20% of Your Energy
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S6, S8) are separate clips; this comp covers
// S2, S4, S5, S7, S9. Every scene has continuous real movement, NOT animated
// text cards. Big numbers/counters are the animation itself, with at most
// one short kicker line per scene. Dark navy + electric blue + gold palette.

const BG = "#0a0e1a";
const BLUE = "#4da6ff";
const CYAN = "#7fd4c1";
const GOLD = "#f4c95d";
const RED = "#ff4d5e";
const WHITE = "#f2f2f5";
const GREY = "#c9c9cf";
const CARD = "#141b30";
const LINE = "#26304d";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#7a8bb0", fontWeight: 700 }}>
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

export const FactsBrainMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2% weight bar vs 20% energy bar ----
  const s2 = frame;
  const weightPct = Math.round(interpolate(s2, [20, 120], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const energyPct = Math.round(interpolate(s2, [60, 220], [0, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const weightW = interpolate(s2, [20, 120], [0, 76], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const energyW = interpolate(s2, [60, 220], [0, 760], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S4 (300-600): glucose dots flowing up into the brain ----
  const s4 = frame - 300;
  const glucosePct = Math.round(interpolate(s4, [20, 260], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const brainPulse4 = 1 + 0.05 * Math.sin(s4 * 0.1);
  const dots4 = Array.from({ length: 12 }).map((_, i) => {
    const y = 1560 - (((s4 * 6 + i * 130) % 1400) + 1400) % 1400;
    const x = 540 + Math.sin((y / 1400) * Math.PI * 2 + i) * 130;
    const fade = y < 480 ? Math.max(0, (y - 380) / 100) : 1;
    return { x, y, fade };
  });

  // ---- S5 (600-900): fuel tank draining to near empty ----
  const s5 = frame - 600;
  const level5 = interpolate(s5, [20, 260], [1, 0.04], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brainDim5 = interpolate(s5, [20, 260], [1, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const warn5 = s5 > 200 ? 0.4 + 0.4 * Math.sin(s5 * 0.15) : 0;

  // ---- S7 (900-1200): water glass draining, attention bar dropping ----
  const s7 = frame - 900;
  const waterH7 = interpolate(s7, [20, 260], [420, 380], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const attnW7 = interpolate(s7, [40, 270], [760, 430], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S9 (1200-1500): glowing brain closing, drifting particles ----
  const s9 = frame - 1200;
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.12);
  const glow9 = 0.7 + 0.3 * Math.sin(s9 * 0.08);
  const drift9 = Array.from({ length: 14 }).map((_, i) => ({
    x: (i * 167) % 1080,
    y: (80 + ((i * 211) % 1500) + s9 * (1 + (i % 3))) % 1920,
    size: 26 + ((i * 41) % 54),
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 2% vs 20% */}
      {frame < 300 && (
        <Center>
          <Kicker>SMALL ORGAN, HUGE APPETITE</Kicker>
          <div style={{ width: 860, marginTop: 70 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: GREY }}>BODY WEIGHT</div>
              <div style={{ fontSize: 96, fontWeight: 900, color: BLUE }}>{weightPct}%</div>
            </div>
            <div style={{ height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden", marginTop: 8 }}>
              <div style={{ width: weightW, height: "100%", backgroundColor: BLUE, borderRadius: 22 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 64 }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: GREY }}>ENERGY USED</div>
              <div style={{ fontSize: 150, fontWeight: 900, color: GOLD }}>{energyPct}%</div>
            </div>
            <div style={{ height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden", marginTop: 8 }}>
              <div style={{ width: energyW, height: "100%", backgroundColor: GOLD, borderRadius: 22 }} />
            </div>
          </div>
        </Center>
      )}

      {/* S4 — glucose flowing into the brain */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          {dots4.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x - 14, top: d.y, width: 28, height: 28, borderRadius: "50%", backgroundColor: CYAN, opacity: d.fade, boxShadow: "0 0 18px #7fd4c1" }} />
          ))}
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 270, height: 270, borderRadius: "50%", backgroundColor: BLUE, transform: `scale(${brainPulse4})`, boxShadow: `0 0 ${90 * brainPulse4}px ${BLUE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>🧠</div>
            <div style={{ marginTop: 60, fontSize: 34, letterSpacing: 7, color: GOLD, fontWeight: 700 }}>FUELLED BY GLUCOSE</div>
            <div style={{ fontSize: 150, fontWeight: 900, color: WHITE, marginTop: 40 }}>{glucosePct}%</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: GREY, marginTop: 10 }}>OF ALL YOUR GLUCOSE</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S5 — fuel tank draining */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={RED}>ALMOST NO FUEL TANK</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 80, marginTop: 60 }}>
            <div style={{ width: 270, height: 270, borderRadius: "50%", backgroundColor: BLUE, opacity: brainDim5, boxShadow: "0 0 70px #4da6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>🧠</div>
            <div style={{ width: 200, height: 480, borderRadius: 24, border: "6px solid #3a4a6e", backgroundColor: CARD, overflow: "hidden", position: "relative", boxShadow: warn5 > 0 ? `0 0 40px rgba(255,77,94,${warn5})` : "none" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 468 * level5, backgroundColor: level5 < 0.2 ? RED : GOLD }} />
            </div>
          </div>
          <Sub>A CONSTANT SUPPLY — MINUTE AFTER MINUTE</Sub>
        </Center>
      )}

      {/* S7 — 2% water lost, attention slips */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>JUST 2% LESS WATER</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 70, marginTop: 60 }}>
            <div style={{ width: 300, height: 480, borderRadius: "0 0 30px 30px", border: "6px solid #3a4a6e", borderTop: "none", backgroundColor: CARD, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: waterH7, backgroundColor: BLUE, opacity: 0.85 }} />
              <div style={{ position: "absolute", top: 14, left: 0, right: 0, textAlign: "center", fontSize: 30, fontWeight: 800, color: RED }}>−2%</div>
            </div>
            <div style={{ width: 420 }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: GREY }}>ATTENTION</div>
              <div style={{ height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden", marginTop: 12 }}>
                <div style={{ width: attnW7, maxWidth: 420, height: "100%", backgroundColor: CYAN, borderRadius: 22 }} />
              </div>
              <div style={{ fontSize: 32, color: GREY, marginTop: 20, lineHeight: 1.4 }}>starts to slip — before you even feel thirsty</div>
            </div>
          </div>
        </Center>
      )}

      {/* S9 — closing: glowing brain, never off */}
      {frame >= 1200 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: BLUE, opacity: 0.25 }} />
          ))}
          <Center>
            <div style={{ width: 300, height: 300, borderRadius: "50%", backgroundColor: BLUE, transform: `scale(${pulse9})`, boxShadow: `0 0 ${110 * glow9}px ${BLUE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140 }}>🧠</div>
            <div style={{ fontSize: 140, fontWeight: 900, color: GOLD, marginTop: 56 }}>20 WATTS</div>
            <Sub>RUNNING NON-STOP — EVERY SECOND OF YOUR LIFE</Sub>
          </Center>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
