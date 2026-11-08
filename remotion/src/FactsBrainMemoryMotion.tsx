import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #4 — Your Brain's Memory Is ~2.5 Petabytes
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT animated
// text cards. Dark navy + electric cyan + gold palette.
// ALL on-screen content stays above y=1200 so it never collides with the
// burned-in subtitles (MarginV 640 -> subtitle zone starts ~y=1280).
// BAR RULE: widths use TRUE percentages of the track (value% directly).
// S4: old belief 1-2 bits per synapse (2/4.7 = 43%) vs new 4.7 bits (100%).
// S8 stamp appears EARLY (frame 60) — never late in the scene.
// Decorative dots kept away from text lines.

const BG = "#0a0f1e";
const CYAN = "#22d3ee";
const BLUE = "#60a5fa";
const GOLD = "#f4c95d";
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

export const FactsBrainMemoryMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): SALK 2015, big 1 PB, a million gigabytes ----
  const s2 = frame;
  const pulse2 = 1 + 0.07 * Math.sin(s2 * 0.12);
  const countPB2 = interpolate(s2, [30, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dots2 = Array.from({ length: 14 }).map((_, i) => ({
    x: 80 + ((i * 67) % 900),
    y: 150 + ((i * 131) % 170),
    o: 0.25 + 0.6 * Math.abs(Math.sin(s2 * 0.3 + i * 1.9)),
    c: [CYAN, GOLD, BLUE][i % 3],
    s: 16 + ((i * 11) % 22),
  }));
  const dots2b = Array.from({ length: 8 }).map((_, i) => ({
    x: 100 + ((i * 109) % 860),
    y: 1000 + ((i * 47) % 110),
    o: 0.2 + 0.5 * Math.abs(Math.sin(s2 * 0.28 + i * 2.3)),
    c: [GOLD, CYAN][i % 2],
  }));

  // ---- S4 (300-600): 4.7 bits x 100 trillion synapses = 1 petabyte ----
  // Bars: old belief 2 bits = 43% of 4.7 max; new 4.7 bits = 100%. TRUE %.
  const s4 = frame - 300;
  const barOld4 = interpolate(s4, [20, 150], [0, 43], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barNew4 = interpolate(s4, [120, 260], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numOld4 = (interpolate(s4, [20, 150], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);
  const numNew4 = (interpolate(s4, [120, 260], [0, 4.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);
  const syn4 = Math.round(interpolate(s4, [40, 220], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S6 (600-900): 2.5 PB popular estimate vs hard drive ----
  const s6 = frame - 600;
  const glow6 = 0.5 + 0.3 * Math.sin(s6 * 0.08);
  const driveX6 = interpolate(s6, [90, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drift6 = Array.from({ length: 10 }).map((_, i) => ({
    x: (i * 179) % 1080,
    y: (120 + ((i * 211) % 900) + s6 * (1 + (i % 3))) % 1050,
    size: 14 + ((i * 31) % 30),
    o: 0.2 + 0.3 * Math.abs(Math.sin(s6 * 0.07 + i)),
  }));

  // ---- S8 (900-1200): PAYOFF — every recall rebuilds the memory ----
  const s8 = frame - 900;
  const cards8 = Array.from({ length: 3 }).map((_, i) => ({
    rot: -8 + i * 8,
    x: 400 + i * 190,
    y: 340 + (i % 2) * 30,
    o: i < Math.floor(s8 / 70) + 1 ? 1 : 0.25,
    c: [CYAN, GOLD, BLUE][i],
    label: ["RECALL 1", "RECALL 2", "RECALL 3"][i],
  }));
  const stamp8 = interpolate(s8, [60, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampScale8 = interpolate(s8, [60, 110], [1.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S9 (1200-1500): closing — a story it retells every day ----
  const s9 = frame - 1200;
  const drift9 = Array.from({ length: 12 }).map((_, i) => ({
    x: (i * 173) % 1080,
    y: (90 + ((i * 197) % 950) + s9 * (1 + (i % 3))) % 1100,
    size: 14 + ((i * 37) % 34),
    o: 0.25 + 0.3 * Math.abs(Math.sin(s9 * 0.07 + i)),
  }));
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.1);
  const glow9 = 0.55 + 0.3 * Math.sin(s9 * 0.06);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — Salk 2015, about one petabyte */}
      {frame < 300 && (
        <AbsoluteFill>
          {dots2.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: 6, backgroundColor: d.c, opacity: d.o }} />
          ))}
          {dots2b.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 14, height: 14, borderRadius: "50%", backgroundColor: d.c, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 360, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>SALK INSTITUTE • 2015</Kicker>
            <div style={{ fontSize: 190, fontWeight: 900, color: CYAN, marginTop: 30, transform: `scale(${pulse2})`, textShadow: `0 0 60px rgba(34,211,238,0.5)` }}>{countPB2.toFixed(1)} PB</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 20 }}>ABOUT ONE PETABYTE</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 10 }}>OF MEMORIES</div>
            <Sub>A MILLION GIGABYTES<br />INSIDE YOUR HEAD</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — 4.7 bits per synapse, old 2 bits vs new 4.7 bits, TRUE % */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>EACH CONNECTION HOLDS</Kicker>
            <div style={{ marginTop: 60, width: 880 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800, color: WHITE }}>
                <span>WHAT SCIENTISTS THOUGHT</span>
                <span style={{ color: GOLD }}>{numOld4} bits</span>
              </div>
              <div style={{ marginTop: 14, height: 56, backgroundColor: LINE, borderRadius: 28, overflow: "hidden" }}>
                <div style={{ width: `${barOld4}%`, height: "100%", backgroundColor: GOLD, borderRadius: 28 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800, color: WHITE, marginTop: 70 }}>
                <span>THE REAL MEASUREMENT</span>
                <span style={{ color: CYAN }}>{numNew4} bits</span>
              </div>
              <div style={{ marginTop: 14, height: 56, backgroundColor: LINE, borderRadius: 28, overflow: "hidden" }}>
                <div style={{ width: `${barNew4}%`, height: "100%", backgroundColor: CYAN, borderRadius: 28 }} />
              </div>
              <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 80, textAlign: "center" }}>× {syn4} TRILLION SYNAPSES</div>
              <div style={{ fontSize: 44, fontWeight: 800, color: CYAN, marginTop: 16, textAlign: "center" }}>= ABOUT ONE PETABYTE</div>
              <Sub>26 DIFFERENT SIZES<br />OF CONNECTION</Sub>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* S6 — 2.5 PB popular estimate, but not a hard drive */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          {drift6.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? CYAN : GOLD, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>SOME ESTIMATES SAY MORE</Kicker>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 40, textShadow: `0 0 50px rgba(244,201,93,0.4)` }}>2.5 PB</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: GREY, marginTop: 10 }}>A POPULAR ESTIMATE</div>
            <div style={{ marginTop: 70, width: 340, height: 220, borderRadius: 24, backgroundColor: CARD, border: `5px solid ${CYAN}`, boxShadow: `0 0 ${50 * glow6}px rgba(34,211,238,0.4)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ fontSize: 110 }}>💾</div>
              <div style={{ position: "absolute", fontSize: 150, fontWeight: 900, color: "#ef4444", opacity: driveX6 }}>✕</div>
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 60 }}>BUT YOUR BRAIN IS</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: CYAN, marginTop: 10 }}>NOT A HARD DRIVE</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S8 — PAYOFF: every recall rebuilds the memory */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={CYAN}>THE WILDEST PART</Kicker>
            <div style={{ position: "relative", width: 900, height: 300, marginTop: 50 }}>
              {cards8.map((d, i) => (
                <div key={i} style={{ position: "absolute", left: d.x - 400, top: d.y - 340, width: 200, height: 240, borderRadius: 14, backgroundColor: d.c, opacity: d.o, transform: `rotate(${d.rot}deg)`, border: "4px solid #ffffff33", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 72 }}>
                  <span>🖼️</span>
                  <span style={{ fontSize: 26, fontWeight: 900, color: "#0a0f1e", marginTop: 16 }}>{d.label}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 56, fontWeight: 900, color: CYAN, marginTop: 20, opacity: stamp8, transform: `scale(${stampScale8})` }}>REBUILT — SLIGHTLY DIFFERENT</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 24 }}>EVERY TIME YOU REMEMBER</div>
            <Sub>COPIES OF COPIES,<br />EDITED A LITTLE EACH TIME</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing: a story it retells every day */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? CYAN : GOLD, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>NOT FILES ON A DISK</Kicker>
            <div style={{ marginTop: 60, width: 300, height: 300, borderRadius: "50%", backgroundColor: CARD, border: `5px solid ${CYAN}`, boxShadow: `0 0 ${70 * glow9}px rgba(34,211,238,0.55)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, transform: `scale(${pulse9})` }}>🧠</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, marginTop: 60 }}>A STORY IT RETELLS</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 12 }}>EVERY SINGLE DAY</div>
            <Sub>YOUR BRAIN HOLDS<br />A LIFETIME OF MEMORIES</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
