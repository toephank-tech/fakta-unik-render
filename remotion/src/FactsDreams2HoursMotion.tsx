import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #43 — You Dream ~2 Hours Every Night
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S6, S8) are separate clips; this comp covers
// S2, S4, S5, S7, S9. Every scene has continuous real movement, NOT animated
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

export const FactsDreams2HoursMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2 HOURS counter — minutes counting 0 -> 120, drifting stars ----
  const s2 = frame;
  const mins2 = Math.round(interpolate(s2, [20, 260], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const pct2 = Math.round(interpolate(s2, [40, 260], [0, 25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const stars2 = Array.from({ length: 12 }).map((_, i) => ({
    x: (i * 173) % 1080,
    y: (120 + ((i * 251) % 1000) + s2 * (0.5 + (i % 3) * 0.4)) % 1150,
    size: 14 + ((i * 29) % 26),
    o: 0.35 + 0.4 * Math.abs(Math.sin(s2 * 0.05 + i)),
  }));

  // ---- S4 (300-600): brain awake-level vs body paralyzed — pulsing brain, lock ----
  const s4 = frame - 300;
  const pulse4 = 1 + 0.07 * Math.sin(s4 * 0.12);
  const brainBar4 = Math.round(interpolate(s4, [20, 200], [0, 95], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const bodyBar4 = Math.round(interpolate(s4, [40, 220], [100, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const lockBob4 = Math.sin(s4 * 0.08) * 12;

  // ---- S5 (600-900): everyone dreams — row of sleepers drifting, alarm clock ----
  const s5 = frame - 600;
  const drift5 = (s5 * 1.2) % 240;
  const alarmRing5 = Math.sin(s5 * 0.25) * 8;
  const wake5 = interpolate(s5, [150, 240], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S7 (900-1200): Harvard memory filing — cards sliding into folders ----
  const s7 = frame - 900;
  const filed7 = Math.round(interpolate(s7, [20, 260], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const cards7 = Array.from({ length: 5 }).map((_, i) => {
    const start = 30 + i * 45;
    const y = interpolate(s7, [start, start + 120], [950, 560], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const o = s7 < start ? 0 : interpolate(s7, [start + 100, start + 140], [1, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return { x: 140 + i * 160, y, o };
  });

  // ---- S9 (1200-1500): dream cinema closing — projector beam, drifting stars ----
  const s9 = frame - 1200;
  const beam9 = 0.55 + 0.3 * Math.sin(s9 * 0.06);
  const drift9 = Array.from({ length: 14 }).map((_, i) => ({
    x: (i * 167) % 1080,
    y: (80 + ((i * 211) % 1000) + s9 * (1 + (i % 3))) % 1150,
    size: 18 + ((i * 41) % 40),
  }));
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.1);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 2 hours of dreaming a night */}
      {frame < 300 && (
        <AbsoluteFill>
          {stars2.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: VIOLET, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 240, height: 240, borderRadius: "50%", backgroundColor: "#f4e8c1", boxShadow: "0 0 80px rgba(244,232,193,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>🌙</div>
            <div style={{ fontSize: 190, fontWeight: 900, color: WHITE, marginTop: 50 }}>{mins2}<span style={{ fontSize: 90, color: GOLD }}> MIN</span></div>
            <div style={{ fontSize: 44, fontWeight: 800, color: CYAN }}>OF DREAMING, EVERY NIGHT</div>
            <div style={{ fontSize: 60, fontWeight: 900, color: GOLD, marginTop: 50 }}>{pct2}% OF YOUR SLEEP</div>
            <Sub>ROUGHLY A QUARTER OF THE NIGHT</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — brain awake, body paralyzed */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 250, height: 250, borderRadius: "50%", backgroundColor: INDIGO, transform: `scale(${pulse4})`, boxShadow: `0 0 ${90 * pulse4}px ${INDIGO}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120 }}>🧠</div>
            <Kicker>BRAIN: ALMOST AWAKE</Kicker>
            <div style={{ marginTop: 30, width: 860, height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ width: brainBar4 * 8.6, height: "100%", backgroundColor: INDIGO, borderRadius: 22 }} />
            </div>
            <div style={{ fontSize: 70, fontWeight: 900, color: WHITE, marginTop: 20 }}>{brainBar4}% ACTIVITY</div>
          </div>
          <div style={{ position: "absolute", top: 830, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 90, transform: `translateY(${lockBob4}px)` }}>🔒</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: RED, marginTop: 10 }}>BODY: PARALYZED</div>
            <div style={{ marginTop: 20, width: 860, height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ width: Math.max(bodyBar4, 4) * 8.6, height: "100%", backgroundColor: RED, borderRadius: 22 }} />
            </div>
            <Sub>SO YOU CANNOT ACT OUT YOUR DREAMS</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S5 — everyone dreams, recall needs waking in REM */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>EVERYONE DREAMS</Kicker>
            <div style={{ display: "flex", gap: 40, marginTop: 60, transform: `translateX(${-drift5 + 60}px)` }}>
              {["😴", "😴", "😴", "😴", "😴"].map((e, i) => (
                <div key={i} style={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: CARD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, border: `3px solid ${LINE}` }}>{e}</div>
              ))}
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: WHITE, marginTop: 60 }}>EVEN PEOPLE WHO SWEAR</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: WHITE }}>THEY NEVER DREAM</div>
          </div>
          <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: 110, transform: `rotate(${alarmRing5}deg)` }}>⏰</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: wake5 > 0.5 ? CYAN : GREY, marginTop: 20 }}>WAKE IN REM → YOU REMEMBER</div>
            <Sub>WAKE LATER, AND IT IS GONE</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S7 — Harvard: dreaming files memories */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          {cards7.map((c, i) => (
            <div key={i} style={{ position: "absolute", left: c.x, top: c.y, width: 120, height: 80, borderRadius: 12, backgroundColor: INDIGO, opacity: c.o, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 }}>💭</div>
          ))}
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={CYAN}>HARVARD RESEARCH</Kicker>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 40 }}>{filed7}%</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: WHITE }}>MEMORIES FILED AWAY</div>
            <div style={{ marginTop: 40, width: 860, height: 44, backgroundColor: LINE, borderRadius: 22, overflow: "hidden" }}>
              <div style={{ width: filed7 * 8.6, height: "100%", backgroundColor: CYAN, borderRadius: 22 }} />
            </div>
            <Sub>DREAMING CONSOLIDATES MEMORIES<br />AND SOFTENS WHAT HURT</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing dream cinema */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: GOLD, opacity: 0.4 }} />
          ))}
          <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 70px" }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", backgroundColor: INDIGO, transform: `scale(${pulse9})`, boxShadow: `0 0 ${110 * beam9}px ${INDIGO}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140 }}>🎬</div>
            <div style={{ marginTop: 60, fontSize: 46, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>SIX YEARS OF MOVIES<br />ONLY YOU WILL EVER SEE.</div>
            <div style={{ marginTop: 40, fontSize: 54, fontWeight: 900, color: GOLD }}>ENJOY THE SHOW</div>
            <Sub>TONIGHT, WHEN YOU CLOSE YOUR EYES</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
