import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #53 — Your Brain Recognizes an Image in 13 Milliseconds
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT animated
// text cards. Dark navy + electric cyan + gold palette.
// ALL on-screen content stays above y=1200 so it never collides with the
// burned-in subtitles (MarginV 640 -> subtitle zone starts ~y=1280).
// BAR RULE: widths use TRUE percentages of the track (value% directly).
// S4: old belief 100 ms = 100% width; real limit 13 ms = 13% width.
// No invented numbers. Decorative dots kept away from text lines.

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

export const FactsBrain13msMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): MIT 2014, big 13 ms, flashing image dots ----
  const s2 = frame;
  const pulse2 = 1 + 0.07 * Math.sin(s2 * 0.12);
  const flash2 = Array.from({ length: 12 }).map((_, i) => ({
    x: 90 + ((i * 83) % 880),
    y: 150 + ((i * 137) % 180),
    o: 0.25 + 0.65 * Math.abs(Math.sin(s2 * 0.35 + i * 1.7)),
    c: [CYAN, GOLD, BLUE, "#f472b6"][i % 4],
    s: 22 + ((i * 13) % 26),
  }));
  const flash2b = Array.from({ length: 8 }).map((_, i) => ({
    x: 110 + ((i * 113) % 840),
    y: 1020 + ((i * 53) % 110),
    o: 0.2 + 0.5 * Math.abs(Math.sin(s2 * 0.3 + i * 2.1)),
    c: [GOLD, CYAN, BLUE][i % 3],
  }));

  // ---- S4 (300-600): bar comparison 100 ms vs 13 ms (TRUE %) ----
  const s4 = frame - 300;
  const barOld4 = interpolate(s4, [20, 160], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barNew4 = interpolate(s4, [120, 260], [0, 13], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numOld4 = Math.round(interpolate(s4, [20, 160], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const numNew4 = Math.round(interpolate(s4, [120, 260], [0, 13], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S6 (600-900): feedforward sweep eye -> visual cortex ----
  const s6 = frame - 600;
  const sweep6 = Array.from({ length: 9 }).map((_, i) => {
    const p = ((s6 * 4 + i * 95) % 900) / 900;
    return {
      x: 90 + p * 900,
      y: 560 - Math.sin(p * Math.PI) * 90,
      o: 0.25 + 0.75 * Math.sin(p * Math.PI),
    };
  });
  const glow6 = 0.5 + 0.3 * Math.sin(s6 * 0.08);

  // ---- S8 (900-1200): PAYOFF — target named AFTER, brain already knew ----
  const s8 = frame - 900;
  const cards8 = Array.from({ length: 5 }).map((_, i) => ({
    rot: -14 + i * 7,
    x: 190 + i * 150,
    y: 330 + (i % 2) * 40,
    o: i < Math.floor(s8 / 45) ? 1 : 0.25,
    c: [CYAN, GOLD, BLUE, "#f472b6", "#34d399"][i],
  }));
  const stamp8 = interpolate(s8, [60, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampScale8 = interpolate(s8, [60, 110], [1.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S9 (1200-1500): closing — faster than a blink ----
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

      {/* S2 — MIT 2014, 13 milliseconds */}
      {frame < 300 && (
        <AbsoluteFill>
          {flash2.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.s, height: d.s, borderRadius: 6, backgroundColor: d.c, opacity: d.o }} />
          ))}
          {flash2b.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 14, height: 14, borderRadius: "50%", backgroundColor: d.c, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 360, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>MIT • 2014</Kicker>
            <div style={{ fontSize: 190, fontWeight: 900, color: CYAN, marginTop: 30, transform: `scale(${pulse2})`, textShadow: `0 0 60px rgba(34,211,238,0.5)` }}>13 ms</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 20 }}>YOUR BRAIN KNEW</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 10 }}>WHAT IT SAW</div>
            <Sub>THE FASTEST FLASH<br />THE SCREEN COULD SHOW</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — 100 ms old belief vs 13 ms real limit, TRUE percentages */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>HOW FAST IS FAST?</Kicker>
            <div style={{ marginTop: 60, width: 880 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800, color: WHITE }}>
                <span>WHAT SCIENTISTS THOUGHT</span>
                <span style={{ color: GOLD }}>{numOld4} ms</span>
              </div>
              <div style={{ marginTop: 14, height: 56, backgroundColor: LINE, borderRadius: 28, overflow: "hidden" }}>
                <div style={{ width: `${barOld4}%`, height: "100%", backgroundColor: GOLD, borderRadius: 28 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800, color: WHITE, marginTop: 70 }}>
                <span>THE REAL LIMIT</span>
                <span style={{ color: CYAN }}>{numNew4} ms</span>
              </div>
              <div style={{ marginTop: 14, height: 56, backgroundColor: LINE, borderRadius: 28, overflow: "hidden" }}>
                <div style={{ width: `${barNew4}%`, height: "100%", backgroundColor: CYAN, borderRadius: 28 }} />
              </div>
              <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 80, textAlign: "center" }}>ALMOST 8x FASTER</div>
              <div style={{ fontSize: 44, fontWeight: 800, color: CYAN, marginTop: 16, textAlign: "center" }}>THAN ANYONE BELIEVED</div>
              <Sub>LESS THAN A HUNDREDTH<br />OF A SECOND</Sub>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* S6 — feedforward sweep */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          {sweep6.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 26, height: 26, borderRadius: "50%", backgroundColor: CYAN, opacity: d.o, boxShadow: `0 0 24px rgba(34,211,238,0.8)` }} />
          ))}
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>ONE FORWARD SWEEP</Kicker>
            <div style={{ marginTop: 130, display: "flex", alignItems: "center", gap: 40 }}>
              <div style={{ width: 200, height: 200, borderRadius: "50%", backgroundColor: CARD, border: `5px solid ${CYAN}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>👁️</div>
              <div style={{ fontSize: 80, color: GOLD }}>➜</div>
              <div style={{ width: 200, height: 200, borderRadius: "50%", backgroundColor: CARD, border: `5px solid ${GOLD}`, boxShadow: `0 0 ${60 * glow6}px rgba(244,201,93,0.5)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100 }}>🧠</div>
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: WHITE, marginTop: 90 }}>A FACE • A BEACH</div>
            <div style={{ fontSize: 48, fontWeight: 900, color: GOLD, marginTop: 12 }}>A SMILING COUPLE</div>
            <Sub>NO SECOND LOOK.<br />NO DOUBLE-CHECKING.</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S8 — PAYOFF: told AFTER, brain already knew */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={CYAN}>THE WILDEST PART</Kicker>
            <div style={{ position: "relative", width: 900, height: 300, marginTop: 50 }}>
              {cards8.map((d, i) => (
                <div key={i} style={{ position: "absolute", left: d.x - 190, top: d.y - 330, width: 130, height: 170, borderRadius: 14, backgroundColor: d.c, opacity: d.o, transform: `rotate(${d.rot}deg)`, border: "4px solid #ffffff33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🖼️</div>
              ))}
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 20 }}>TOLD WHAT TO LOOK FOR</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 10 }}>— AFTER SEEING IT —</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: CYAN, marginTop: 34, opacity: stamp8, transform: `scale(${stampScale8})` }}>YOUR BRAIN ALREADY KNEW</div>
            <Sub>IT RECORDED THE MEANING FIRST</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing: faster than a blink */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? CYAN : GOLD, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 280, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>EVERY GLANCE IS A SUPERPOWER</Kicker>
            <div style={{ marginTop: 60, width: 300, height: 300, borderRadius: "50%", backgroundColor: CARD, border: `5px solid ${CYAN}`, boxShadow: `0 0 ${70 * glow9}px rgba(34,211,238,0.55)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, transform: `scale(${pulse9})` }}>👁️</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, marginTop: 60 }}>FASTER THAN</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 12 }}>A BLINK</div>
            <Sub>YOUR BRAIN READS THE WORLD<br />BEFORE YOU EVEN NOTICE</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
