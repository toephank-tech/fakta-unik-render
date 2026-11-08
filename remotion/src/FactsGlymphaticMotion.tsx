import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #42 — Your Brain Washes Itself While You Sleep (glymphatic system)
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S6, S8) are separate clips; this comp covers
// S2, S4, S5, S7, S9. Every scene has continuous real movement, NOT animated
// text cards. Dark navy + electric blue + cyan + gold palette.

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

export const FactsGlymphaticMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2012 discovery — orbiting cleaning dots around pulsing brain ----
  const s2 = frame;
  const pulse2 = 1 + 0.06 * Math.sin(s2 * 0.1);
  const year2 = Math.round(interpolate(s2, [20, 140], [1900, 2012], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const orbit2 = Array.from({ length: 10 }).map((_, i) => {
    const a = (s2 * 0.03 + (i * Math.PI * 2) / 10);
    return { x: 540 + Math.cos(a) * 300, y: 700 + Math.sin(a) * 300 };
  });

  // ---- S4 (300-600): sticky amyloid blobs flushed out left -> right ----
  const s4 = frame - 300;
  const blobs4 = Array.from({ length: 9 }).map((_, i) => {
    const speed = 3 + (i % 3);
    const x = ((i * 173 + s4 * speed) % 1300) - 120;
    const y = 560 + ((i * 197) % 700) + Math.sin(s4 * 0.08 + i) * 30;
    const fade = x > 900 ? Math.max(0, (1080 - x) / 180) : 1;
    return { x, y, fade, size: 44 + ((i * 37) % 40) };
  });
  const flushed4 = Math.round(interpolate(s4, [20, 280], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S5 (600-900): sleep/wake switch — moon rises, toggle flips to ON ----
  const s5 = frame - 600;
  const toggle5 = interpolate(s5, [90, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const moonY5 = interpolate(s5, [0, 200], [900, 480], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const knobX5 = interpolate(s5, [90, 180], [0, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow5 = 0.5 + 0.5 * toggle5;

  // ---- S7 (900-1200): deep-sleep wave + meter rising to peak ----
  const s7 = frame - 900;
  const meter7 = Math.round(interpolate(s7, [20, 260], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const wave7 = Array.from({ length: 24 }).map((_, i) => {
    const x = 90 + i * 40;
    const y = 900 + Math.sin(i * 0.55 - s7 * 0.12) * (60 + s7 * 0.25);
    return { x, y };
  });

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

      {/* S2 — discovered 2012 */}
      {frame < 300 && (
        <AbsoluteFill>
          {orbit2.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x - 14, top: d.y, width: 28, height: 28, borderRadius: "50%", backgroundColor: CYAN, boxShadow: "0 0 18px #7fd4c1" }} />
          ))}
          <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 270, height: 270, borderRadius: "50%", backgroundColor: BLUE, transform: `scale(${pulse2})`, boxShadow: `0 0 ${90 * pulse2}px ${BLUE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>🧠</div>
            <div style={{ marginTop: 70, fontSize: 34, letterSpacing: 7, color: GOLD, fontWeight: 700 }}>DISCOVERED IN</div>
            <div style={{ fontSize: 170, fontWeight: 900, color: WHITE }}>{year2}</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: CYAN, marginTop: 20 }}>THE GLYMPHATIC SYSTEM</div>
            <Sub>YOUR BRAIN'S BUILT-IN CLEANING CREW</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — amyloid flushed out */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          {blobs4.map((b, i) => (
            <div key={i} style={{ position: "absolute", left: b.x, top: b.y, width: b.size, height: b.size, borderRadius: "50%", backgroundColor: "#ffb347", opacity: b.fade, boxShadow: "0 0 22px #ffb347" }} />
          ))}
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={RED}>WASTE, FLUSHED OUT</Kicker>
            <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, marginTop: 50 }}>AMYLOID-BETA</div>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 30 }}>{flushed4}%</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: GREY }}>CLEARED WHILE YOU SLEEP</div>
          </div>
          <div style={{ position: "absolute", bottom: 300, left: 90, right: 90, height: 10, backgroundColor: LINE, borderRadius: 5 }}>
            <div style={{ width: `${flushed4}%`, height: "100%", backgroundColor: CYAN, borderRadius: 5 }} />
          </div>
        </AbsoluteFill>
      )}

      {/* S5 — sleep switch ON */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", left: 405, top: moonY5, width: 270, height: 270, borderRadius: "50%", backgroundColor: "#f4e8c1", boxShadow: `0 0 ${80 * glow5}px rgba(244,232,193,${glow5})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130 }}>🌙</div>
          <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>THE NIGHT SWITCH</Kicker>
            <div style={{ marginTop: 60, width: 320, height: 130, borderRadius: 65, backgroundColor: toggle5 > 0.5 ? CYAN : LINE, position: "relative" }}>
              <div style={{ position: "absolute", left: 15 + knobX5, top: 15, width: 100, height: 100, borderRadius: "50%", backgroundColor: WHITE, boxShadow: "0 0 20px rgba(255,255,255,0.6)" }} />
            </div>
            <div style={{ fontSize: 90, fontWeight: 900, color: toggle5 > 0.5 ? CYAN : GREY, marginTop: 40 }}>{toggle5 > 0.5 ? "CLEANING: ON" : "CLEANING: OFF"}</div>
            <Sub>AWAKE: BARELY WORKS • ASLEEP: SWITCHES ON</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S7 — deep sleep wave peak */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          <svg width={1080} height={500} style={{ position: "absolute", top: 650, left: 0 }}>
            <polyline
              points={wave7.map((p) => `${p.x},${p.y - 650}`).join(" ")}
              fill="none" stroke={BLUE} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round"
            />
          </svg>
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>DEEP SLEEP = PEAK CLEANING</Kicker>
            <div style={{ fontSize: 170, fontWeight: 900, color: GOLD, marginTop: 40 }}>{meter7}%</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: GREY }}>SLOW-WAVE SLEEP POWER</div>
            <div style={{ marginTop: 50, width: 860, height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ width: meter7 * 8.6, height: "100%", backgroundColor: BLUE, borderRadius: 22 }} />
            </div>
            <Sub>THE NIGHTLY WASH, AT FULL POWER</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing glowing brain (content kept high so it never collides
          with the burned-in subtitles at MarginV 640, y≈1280) */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: CYAN, opacity: 0.35 }} />
          ))}
          <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 70px" }}>
            <div style={{ width: 320, height: 320, borderRadius: "50%", backgroundColor: BLUE, transform: `scale(${pulse9})`, boxShadow: `0 0 ${110 * glow9}px ${BLUE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 150 }}>🧠</div>
            <div style={{ marginTop: 60, fontSize: 44, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>SLEEP IS NOT JUST REST.<br />IT IS YOUR BRAIN<br />TAKING OUT THE TRASH.</div>
            <Sub>TONIGHT, GIVE IT TIME TO CLEAN</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
