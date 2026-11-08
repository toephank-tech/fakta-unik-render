import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #168 — One Night of Poor Sleep Lowers Your Immunity
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT animated
// text cards. Dark navy + teal/cyan immune palette + gold + red.
// ALL on-screen content stays above y=1200 so it never collides with the
// burned-in subtitles (MarginV 640 -> subtitle zone starts ~y=1280).
// BAR RULE: widths use TRUE percentages of the track (value% directly).
// S4: NK activity 100% -> 72% (Irwin 1994, verified). S8: 72% -> 100%
// (recovery after one good night, Irwin 1994, verified). No invented numbers.

const BG = "#0a0f1e";
const TEAL = "#2dd4bf";
const CYAN = "#7fd4c1";
const GOLD = "#f4c95d";
const RED = "#ff4d5e";
const WHITE = "#f2f2f5";
const GREY = "#c9c9cf";
const CARD = "#141b31";
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

export const FactsPoorSleepImmunityMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): sleep is your immune workshop — cytokines rise ----
  const s2 = frame;
  const pulse2 = 1 + 0.08 * Math.sin(s2 * 0.12);
  const rise2 = Array.from({ length: 10 }).map((_, i) => ({
    x: 110 + ((i * 97) % 860),
    y: 980 + ((s2 * (2 + (i % 3)) + i * 170) % 170),
    o: 0.25 + 0.3 * Math.abs(Math.sin(s2 * 0.08 + i)),
    c: i % 2 === 0 ? TEAL : GOLD,
  }));
  const shieldGlow2 = 0.5 + 0.3 * Math.sin(s2 * 0.07);

  // ---- S4 (300-600): NK activity drops 100% -> 72% (TRUE percentages) ----
  const s4 = frame - 300;
  const nk4 = interpolate(s4, [30, 230], [100, 72], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drop4 = Math.round(interpolate(s4, [30, 230], [0, 28], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const flicker4 = 0.55 + 0.3 * Math.sin(s4 * 0.1);

  // ---- S6 (600-900): cytokines out of balance, T cells weakened ----
  const s6 = frame - 600;
  const wobble6 = Math.sin(s6 * 0.09) * 6;
  const dim6 = 0.45 + 0.3 * Math.abs(Math.sin(s6 * 0.06));
  const drain6 = interpolate(s6, [30, 240], [100, 46], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const riseStress6 = interpolate(s6, [30, 240], [28, 96], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S8 (900-1200): PAYOFF — one good night, NK bounces back 72% -> 100% ----
  const s8 = frame - 900;
  const nk8 = interpolate(s8, [30, 240], [72, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const moonPulse8 = 1 + 0.05 * Math.sin(s8 * 0.1);
  const fall8 = Array.from({ length: 10 }).map((_, i) => ({
    x: 120 + ((i * 83) % 840),
    y: 1010 + ((s8 * (3 + (i % 3)) + i * 137) % 140),
    o: 0.5,
  }));

  // ---- S9 (1200-1500): closing — sleep is the nightly defense shift ----
  const s9 = frame - 1200;
  const drift9 = Array.from({ length: 14 }).map((_, i) => ({
    x: (i * 167) % 1080,
    y: (80 + ((i * 211) % 1000) + s9 * (1 + (i % 3))) % 1150,
    size: 18 + ((i * 41) % 40),
  }));
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.1);
  const moonGlow9 = 0.55 + 0.3 * Math.sin(s9 * 0.06);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — sleep is your immune workshop */}
      {frame < 300 && (
        <AbsoluteFill>
          {rise2.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 16, height: 16, borderRadius: "50%", backgroundColor: d.c, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>SLEEP IS YOUR IMMUNE WORKSHOP</Kicker>
            <div style={{ marginTop: 44, width: 280, height: 280, borderRadius: "50%", backgroundColor: CARD, border: `5px solid ${TEAL}`, boxShadow: `0 0 ${70 * shieldGlow2}px rgba(45,212,191,0.55)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130, transform: `scale(${pulse2})` }}>🛡️</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 44 }}>CYTOKINES ARE RELEASED</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: TEAL, marginTop: 18 }}>WHILE YOU SLEEP</div>
            <Sub>THE MESSENGERS THAT RALLY<br />YOUR IMMUNE CELLS</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — NK activity drops to 72% after one bad night */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={TEAL}>NATURAL KILLER CELLS — NORMAL NIGHT</Kicker>
            <div style={{ fontSize: 96, fontWeight: 900, color: TEAL, marginTop: 20 }}>100%</div>
            <div style={{ marginTop: 20, width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", backgroundColor: TEAL, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: TEAL, marginTop: 18 }}>FULL STRENGTH</div>
          </div>
          <div style={{ position: "absolute", top: 770, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={RED}>AFTER ONE NIGHT OF POOR SLEEP</Kicker>
            <div style={{ fontSize: 96, fontWeight: 900, color: RED, marginTop: 20 }}>{Math.round(nk4)}%</div>
            <div style={{ marginTop: 20, width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden", boxShadow: `0 0 ${50 * flicker4}px rgba(255,77,94,0.5)` }}>
              <div style={{ width: `${nk4.toFixed(1)}%`, height: "100%", backgroundColor: RED, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: RED, marginTop: 18 }}>DOWN {drop4}% IN A SINGLE NIGHT</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S6 — cytokines out of balance, T cells weakened */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>WHEN SLEEP IS LOST</Kicker>
            <div style={{ fontSize: 100, marginTop: 30, transform: `rotate(${wobble6}deg)` }}>⚖️</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 30 }}>CYTOKINES: OUT OF BALANCE</div>
            <div style={{ marginTop: 30, width: 860, height: 64, backgroundColor: LINE, borderRadius: 32, overflow: "hidden" }}>
              <div style={{ width: `${drain6.toFixed(1)}%`, height: "100%", backgroundColor: RED, borderRadius: 32, opacity: dim6 }} />
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 44 }}>STRESS HORMONES: RISING</div>
            <div style={{ marginTop: 30, width: 860, height: 64, backgroundColor: LINE, borderRadius: 32, overflow: "hidden" }}>
              <div style={{ width: `${riseStress6.toFixed(1)}%`, height: "100%", backgroundColor: GOLD, borderRadius: 32 }} />
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: WHITE, marginTop: 40 }}>🦠 T CELLS WEAKENED — DEFENSES DOWN</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S8 — PAYOFF: one good night, NK bounces back to 100% */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          {fall8.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 14, height: 14, borderRadius: "50%", backgroundColor: TEAL, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>THE WILDEST PART?</Kicker>
            <div style={{ marginTop: 40, width: 260, height: 260, borderRadius: "50%", backgroundColor: "#f4e8c1", boxShadow: "0 0 110px rgba(244,232,193,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, transform: `scale(${moonPulse8})` }}>🌙</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 40 }}>ONE GOOD NIGHT OF SLEEP</div>
            <div style={{ fontSize: 110, fontWeight: 900, color: TEAL, marginTop: 24 }}>{Math.round(nk8)}%</div>
            <div style={{ marginTop: 20, width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden" }}>
              <div style={{ width: `${nk8.toFixed(1)}%`, height: "100%", backgroundColor: TEAL, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: GOLD, marginTop: 18 }}>KILLER CELLS BACK TO NORMAL</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing: sleep is the nightly defense shift */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: GOLD, opacity: 0.4 }} />
          ))}
          <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 70px" }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", backgroundColor: CARD, border: `5px solid ${TEAL}`, boxShadow: `0 0 ${110 * moonGlow9}px rgba(45,212,191,0.7)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, transform: `scale(${pulse9})` }}>🛡️</div>
            <div style={{ marginTop: 60, fontSize: 50, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>SLEEP IS NOT<br />DOWNTIME.</div>
            <div style={{ marginTop: 40, fontSize: 54, fontWeight: 900, color: GOLD, textAlign: "center" }}>IT IS YOUR DEFENSE SHIFT</div>
            <Sub>YOUR IMMUNE SYSTEM IS<br />COUNTING ON TONIGHT</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
