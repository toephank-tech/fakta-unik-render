import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #103 — You Learn While You Sleep
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT animated
// text cards. Dark navy + indigo/violet dream palette + gold + cyan.
// ALL on-screen content stays above y=1200 so it never collides with the
// burned-in subtitles (MarginV 640 -> subtitle zone starts ~y=1280).

const BG = "#0a0e1a";
const INDIGO = "#7b6cff";
const VIOLET = "#b388ff";
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

export const FactsSleepMemoryMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): hippocampus memory inbox filling up ----
  const s2 = frame;
  const fill2 = Math.round(interpolate(s2, [20, 260], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const cards2 = Array.from({ length: 6 }).map((_, i) => {
    const start = 20 + i * 38;
    const y = interpolate(s2, [start, start + 90], [760, 420], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const o = s2 < start ? 0 : interpolate(s2, [start + 70, start + 110], [1, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { x: 170 + i * 130, y, o };
  });
  const wobble2 = Math.sin(s2 * 0.06) * 6;

  // ---- S4 (300-600): sleep vs skipped sleep recall bars ----
  const s4 = frame - 300;
  const sleepBar4 = interpolate(s4, [30, 200], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const skipBar4 = interpolate(s4, [60, 220], [0, 38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow4 = 0.6 + 0.3 * Math.sin(s4 * 0.08);

  // ---- S6 (600-900): REM softens the sting — jagged line smoothing into a calm wave ----
  const s6 = frame - 600;
  const smooth6 = interpolate(s6, [30, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const heartPulse6 = 1 + 0.06 * Math.sin(s6 * 0.1);
  const waveY6 = (x: number) => {
    const jag = Math.abs(Math.sin(x * 0.09 + s6 * 0.15)) * 46 * (1 - smooth6);
    const calm = Math.sin(x * 0.045 + s6 * 0.06) * 18 * smooth6;
    return 700 - jag - calm;
  };
  const wavePts6 = Array.from({ length: 40 })
    .map((_, i) => `${120 + i * 22},${waveY6(120 + i * 22)}`)
    .join(" ");

  // ---- S8 (900-1200): PAYOFF — fast-forward replay, day compressing into a memory orb ----
  const s8 = frame - 900;
  const orb8 = 1 + 0.12 * Math.sin(s8 * 0.12);
  const speed8 = Array.from({ length: 10 }).map((_, i) => ({
    x: (i * 137 + s8 * (14 + i * 2)) % 1080,
    y: 180 + ((i * 173) % 800),
    len: 60 + (i % 4) * 30,
    o: 0.25 + 0.2 * Math.abs(Math.sin(s8 * 0.1 + i)),
  }));
  const dayIcons8 = ["☀️", "📖", "🎓", "💬", "🎵", "🚶"].map((e, i) => {
    const t = interpolate(s8, [10 + i * 30, 110 + i * 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const x = interpolate(t, [0, 1], [140 + i * 150, 540]);
    const y = interpolate(t, [0, 1], [330 + (i % 3) * 130, 620]);
    const sc = interpolate(t, [0, 1], [1, 0.35]);
    return { e, x, y, sc, o: 1 - t * 0.7 };
  });

  // ---- S9 (1200-1500): closing night shift — moon + brain, drifting stars ----
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

      {/* S2 — hippocampus: the memory inbox */}
      {frame < 300 && (
        <AbsoluteFill>
          {cards2.map((c, i) => (
            <div key={i} style={{ position: "absolute", left: c.x, top: c.y, width: 110, height: 76, borderRadius: 12, backgroundColor: INDIGO, opacity: c.o, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38 }}>💭</div>
          ))}
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>THE HIPPOCAMPUS</Kicker>
            <div style={{ fontSize: 64, fontWeight: 900, color: WHITE, marginTop: 30 }}>YOUR MEMORY INBOX</div>
            <div style={{ marginTop: 50, width: 860, height: 300, backgroundColor: CARD, border: `4px solid ${LINE}`, borderRadius: 28, overflow: "hidden", position: "relative", transform: `rotate(${wobble2 * 0.15}deg)` }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${fill2 * 3}px`, backgroundColor: INDIGO, opacity: 0.85 }} />
              <div style={{ position: "absolute", top: 30, left: 0, right: 0, textAlign: "center", fontSize: 150, fontWeight: 900, color: WHITE }}>{fill2}%</div>
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 40 }}>IT CAN ONLY HOLD SO MUCH</div>
            <Sub>SO EVERY NIGHT, YOUR BRAIN<br />HAS TO MAKE ROOM</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — sleep after learning vs staying up */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>SLEEP AFTER LEARNING</Kicker>
            <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, marginTop: 26 }}>YOU REMEMBER FAR MORE</div>
            <div style={{ marginTop: 44, width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden", boxShadow: `0 0 ${60 * glow4}px rgba(244,201,93,0.5)` }}>
              <div style={{ width: `${sleepBar4 * 8.6}%`, height: "100%", backgroundColor: GOLD, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: GOLD, marginTop: 18 }}>😴 SLEPT AFTER STUDYING</div>
          </div>
          <div style={{ position: "absolute", top: 780, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden" }}>
              <div style={{ width: `${Math.max(skipBar4, 3) * 8.6}%`, height: "100%", backgroundColor: RED, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: RED, marginTop: 18 }}>🥱 STAYED UP ALL NIGHT</div>
            <Sub>THE NIGHT AFTER YOU LEARN<br />MATTERS JUST AS MUCH</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S6 — REM handles the feelings */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={CYAN}>REM SLEEP</Kicker>
            <div style={{ fontSize: 100, transform: `scale(${heartPulse6})`, marginTop: 40 }}>❤️</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 30 }}>KEEP THE LESSON</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: CYAN }}>SOFTEN THE STING</div>
          </div>
          <svg style={{ position: "absolute", top: 0, left: 0 }} width={1080} height={1150}>
            <polyline points={wavePts6} fill="none" stroke={smooth6 > 0.5 ? CYAN : RED} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", top: 1000, left: 0, right: 0, textAlign: "center" }}>
            <Sub>EMOTIONAL MEMORIES, PROCESSED<br />WHILE YOU DREAM</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S8 — PAYOFF: fast-forward replay */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          {speed8.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.len, height: 8, borderRadius: 4, backgroundColor: GOLD, opacity: d.o }} />
          ))}
          {dayIcons8.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, fontSize: 64 * d.sc + 30, opacity: d.o, transform: `scale(${d.sc})` }}>{d.e}</div>
          ))}
          <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>THE WILDEST PART?</Kicker>
            <div style={{ marginTop: 60, width: 300, height: 300, borderRadius: "50%", backgroundColor: INDIGO, transform: `scale(${orb8})`, boxShadow: `0 0 120px ${INDIGO}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130 }}>⏩</div>
            <div style={{ fontSize: 62, fontWeight: 900, color: WHITE, marginTop: 50 }}>FAST-FORWARD REPLAY</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 24 }}>YOUR WHOLE DAY, COMPRESSED</div>
            <Sub>TODAY, TURNED INTO A MEMORY<br />THAT CAN LAST FOR YEARS</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing: the night shift */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: GOLD, opacity: 0.4 }} />
          ))}
          <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 70px" }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", backgroundColor: "#f4e8c1", boxShadow: `0 0 ${110 * moonGlow9}px rgba(244,232,193,0.8)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, transform: `scale(${pulse9})` }}>🌙</div>
            <div style={{ marginTop: 60, fontSize: 46, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>TONIGHT IS NOT<br />WASTED TIME.</div>
            <div style={{ marginTop: 40, fontSize: 54, fontWeight: 900, color: GOLD }}>YOUR BRAIN'S NIGHT SHIFT</div>
            <Sub>TURNING TODAY INTO<br />KNOWLEDGE YOU KEEP</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
