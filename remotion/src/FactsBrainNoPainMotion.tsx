import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts — Idea #2: Your Brain Can't Feel Pain
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S8) are separate clips; this comp covers
// S2, S4, S6, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Deep indigo/violet palette for the brain theme.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages — no inherited *8.6-style width math.

const BG = "#0d0b1e";
const VIOLET = "#8b7cf6";
const TEAL = "#7fd4c1";
const GOLD = "#f4c95d";
const RED = "#ff4d5e";
const GREY = "#c9c9cf";
const CARD = "#1a1533";
const LINE = "#332a5e";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8f86b8", fontWeight: 700 }}>
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

export const FactsBrainNoPainMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): skin vs brain nociceptors ----
  const s2 = frame;
  const skinDots = Math.min(24, Math.floor(s2 / 10));
  const skinPulse = 1 + 0.15 * Math.sin(s2 * 0.15);
  const zeroScale = s2 < 120 ? interpolate(s2, [60, 120], [0.6, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1 + 0.05 * Math.sin(s2 * 0.1);

  // ---- S4 (300-600): pain-source layers light up, one by one, EARLY ----
  const s4 = frame - 300;
  const layers4 = ["MENINGES", "BLOOD VESSELS", "SCALP MUSCLES", "SINUSES"];
  const shown4 = Math.min(4, Math.floor(s4 / 40) + 1); // first layer visible from frame 0
  const glow4 = 0.6 + 0.4 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): signals flow into the control center ----
  const s6 = frame - 600;
  const brainPulse6 = 1 + 0.08 * Math.sin(s6 * 0.12);
  const parts6 = ["FINGER", "TOE", "STOMACH", "SKULL PRESSURE"];
  const shown6 = Math.min(4, Math.floor(s6 / 45) + 1);

  // ---- S7 (900-1200): poke / cut / burn -> flatline, no signal ----
  const s7 = frame - 900;
  const tests7 = ["POKE", "CUT", "BURN"];
  const shown7 = Math.min(3, Math.floor(s7 / 50) + 1);
  const dotX7 = (s7 * 4) % 700;
  const flatGlow7 = 0.5 + 0.5 * Math.sin(s7 * 0.1);

  // ---- S9 (1200-1500): closing glow, drifting particles ----
  const s9 = frame - 1200;
  const pulse9 = 1 + 0.1 * Math.sin(s9 * 0.1);
  const ring9 = (s9 % 120) / 120;
  const drift = Array.from({ length: 10 }).map((_, i) => ({
    y: 60 + ((i * 173) % 700),
    speed: 1.2 + (i % 3),
    size: 14 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — skin has sensors, brain has ZERO */}
      {frame < 300 && (
        <Center>
          <Kicker>PAIN SENSORS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 48, width: 780 }}>
            <div style={{ backgroundColor: CARD, border: `2px solid ${LINE}`, borderRadius: 20, padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>YOUR SKIN</div>
                <div style={{ marginLeft: "auto", fontSize: 44, fontWeight: 900, color: RED }}>MILLIONS</div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 22 }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      backgroundColor: i < skinDots ? RED : "#3a2f52",
                      boxShadow: i < skinDots ? "0 0 14px rgba(255,77,94,0.8)" : "none",
                      transform: `scale(${i < skinDots ? skinPulse : 1})`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: CARD, border: `2px solid ${VIOLET}`, borderRadius: 20, padding: "28px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>YOUR BRAIN</div>
                <div style={{ marginLeft: "auto", fontSize: 72, fontWeight: 900, color: GOLD, transform: `scale(${zeroScale})` }}>0</div>
              </div>
              <div style={{ fontSize: 30, color: GREY, marginTop: 14 }}>No nociceptors. Not a single one.</div>
            </div>
          </div>
          <Sub>Same body. One has sensors. One has none.</Sub>
        </Center>
      )}

      {/* S4 — headache sources: the layers around the brain */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={RED}>YOUR HEADACHE COMES FROM HERE</Kicker>
          <div style={{ position: "relative", width: 300, height: 300, marginTop: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1, 2].map((i) => {
              const p = ((s4 % 90) / 90 + i / 3) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 120 + p * 180, height: 120 + p * 180, borderRadius: "50%", border: `3px solid ${RED}`, opacity: 0.7 * (1 - p) }} />
              );
            })}
            <div style={{ fontSize: 170, lineHeight: 1, opacity: glow4 }}>🧠</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40, width: 680 }}>
            {layers4.map((t, i) => (
              <div
                key={t}
                style={{
                  opacity: i < shown4 ? 1 : 0.12,
                  transform: `translateX(${i < shown4 ? 0 : -30}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  backgroundColor: CARD,
                  border: `2px solid ${i < shown4 ? RED : LINE}`,
                  borderRadius: 14,
                  padding: "14px 24px",
                }}
              >
                <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: i < shown4 ? RED : "#3a2f52", boxShadow: i < shown4 ? "0 0 14px rgba(255,77,94,0.8)" : "none" }} />
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2 }}>{t}</div>
                {i < shown4 && <div style={{ marginLeft: "auto", fontSize: 24, fontWeight: 800, color: RED }}>PAIN ✓</div>}
              </div>
            ))}
          </div>
        </Center>
      )}

      {/* S6 — the control center receives signals from everywhere */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE CONTROL CENTER</Kicker>
          <div style={{ position: "relative", width: 340, height: 340, marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1].map((i) => {
              const p = ((s6 % 90) / 90 + i / 2) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 110 + p * 220, height: 110 + p * 220, borderRadius: "50%", border: `3px solid ${TEAL}`, opacity: 0.7 * (1 - p) }} />
              );
            })}
            <div style={{ fontSize: 170, lineHeight: 1, transform: `scale(${brainPulse6})` }}>🧠</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginTop: 44, width: 820 }}>
            {parts6.map((t, i) => (
              <div
                key={t}
                style={{
                  opacity: i < shown6 ? 1 : 0.12,
                  backgroundColor: CARD,
                  border: `2px solid ${TEAL}`,
                  borderRadius: 999,
                  padding: "14px 28px",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                {t} →
              </div>
            ))}
          </div>
          <Sub>Signals from everywhere — even pressure inside your own skull.</Sub>
        </Center>
      )}

      {/* S7 — poke, cut, burn: nothing. Flatline. */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={RED}>POKE IT. CUT IT. BURN IT.</Kicker>
          <div style={{ display: "flex", gap: 28, marginTop: 48 }}>
            {tests7.map((t, i) => (
              <div
                key={t}
                style={{
                  opacity: i < shown7 ? 1 : 0.12,
                  backgroundColor: CARD,
                  border: `2px solid ${LINE}`,
                  borderRadius: 18,
                  padding: "22px 30px",
                  fontSize: 34,
                  fontWeight: 900,
                  letterSpacing: 2,
                  textAlign: "center",
                }}
              >
                {t}
                <div style={{ fontSize: 26, color: RED, marginTop: 8 }}>✕ NOTHING</div>
              </div>
            ))}
          </div>
          <svg width={700} height={110} style={{ marginTop: 44 }}>
            <line x1={0} y1={55} x2={700} y2={55} stroke={RED} strokeWidth={5} strokeLinecap="round" opacity={0.9} />
            <circle cx={dotX7} cy={55} r={11} fill={GOLD} opacity={flatGlow7} />
          </svg>
          <div style={{ fontSize: 76, fontWeight: 900, color: GOLD, marginTop: 20, textAlign: "center" }}>NO SIGNAL</div>
          <Sub>No sensor, no signal, no pain.</Sub>
        </Center>
      )}

      {/* S9 — closing glow */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 380, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 340, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : VIOLET, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(139,124,246,0.6)" }} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              {[0, 1].map((i) => {
                const p = (ring9 + i / 2) % 1;
                return (
                  <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 110 + p * 280, height: 110 + p * 280, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.7 * (1 - p), transform: "translate(-50%, -50%)" }} />
                );
              })}
              <div style={{ transform: `scale(${pulse9})`, fontSize: 170, lineHeight: 1 }}>🧠</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 36, textAlign: "center", lineHeight: 1.25 }}>
            Your brain feels everything —
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 18, textAlign: "center" }}>EXCEPT ITSELF.</div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
