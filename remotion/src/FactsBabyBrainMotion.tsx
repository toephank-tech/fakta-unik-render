import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts — Idea #54: Your Baby Brain Makes 1 Million New Connections Per Second
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S8) are separate clips; this comp covers
// S2, S4, S6, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Warm gold / soft pink palette for the baby theme.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages — no inherited *8.6-style width math.

const BG = "#17102a";
const GOLD = "#f4c95d";
const PINK = "#ff8fa3";
const TEAL = "#7fd4c1";
const VIOLET = "#8b7cf6";
const GREY = "#c9c9cf";
const CARD = "#241a45";
const LINE = "#3d2f6e";

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

export const FactsBabyBrainMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): counter races to 1,000,000 per second ----
  const s2 = frame;
  const count2 = Math.min(1000000, Math.floor((s2 / 210) * 1000000));
  const countStr2 = count2.toLocaleString("en-US");
  const pulse2 = 1 + 0.06 * Math.sin(s2 * 0.12);
  const dots2 = Math.min(20, Math.floor(s2 / 12));

  // ---- S4 (300-600): brain size bars, TRUE percentages ----
  const s4 = frame - 300;
  const bars4 = [
    { label: "AT BIRTH", pct: 25, color: VIOLET },
    { label: "AGE 1 — DOUBLED", pct: 50, color: TEAL },
    { label: "AGE 3", pct: 80, color: GOLD },
  ];
  const shown4 = Math.min(3, Math.floor(s4 / 45) + 1); // first bar visible from frame 0
  const BAR_MAX = 760; // px at 100%

  // ---- S6 (600-900): serve and return ping-pong ----
  const s6 = frame - 600;
  const swing6 = Math.sin(s6 * 0.09);
  const ballX6 = swing6 * 260;
  const returns6 = Math.min(5, Math.floor(s6 / 55) + 1); // hearts accumulate
  const glow6 = 0.6 + 0.4 * Math.sin(s6 * 0.12);

  // ---- S7 (900-1200): the window closes ----
  const s7 = frame - 900;
  const windowPct7 = Math.max(28, 100 - (s7 / 300) * 72); // 100% -> 28%
  const stamp7 = s7 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60 of scene)
  const barGlow7 = 0.5 + 0.5 * Math.sin(s7 * 0.1);

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

      {/* S2 — one million new connections, every second */}
      {frame < 300 && (
        <Center>
          <Kicker>NEW CONNECTIONS</Kicker>
          <div style={{ fontSize: 118, fontWeight: 900, color: GOLD, marginTop: 36, transform: `scale(${pulse2})`, textAlign: "center", letterSpacing: 2 }}>
            {countStr2}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 12, textAlign: "center" }}>
            EVERY SECOND
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 44, width: 640 }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: i < dots2 ? GOLD : "#3a2f52",
                  boxShadow: i < dots2 ? "0 0 16px rgba(244,201,93,0.8)" : "none",
                  transform: `scale(${i < dots2 ? pulse2 : 1})`,
                }}
              />
            ))}
          </div>
          <Sub>More than a million new neural connections — every single second.</Sub>
        </Center>
      )}

      {/* S4 — the brain doubles, then reaches 80% */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>IT SHOWS IN THE SIZE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 48, width: 820 }}>
            {bars4.map((b, i) => (
              <div key={b.label} style={{ opacity: i < shown4 ? 1 : 0.12 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 2 }}>{b.label}</div>
                  <div style={{ marginLeft: "auto", fontSize: 52, fontWeight: 900, color: b.color }}>{b.pct}%</div>
                </div>
                <div style={{ height: 34, borderRadius: 999, backgroundColor: "#2c2350", marginTop: 10, overflow: "hidden" }}>
                  <div
                    style={{
                      width: i < shown4 ? `${(b.pct / 100) * BAR_MAX}px` : "0px",
                      height: "100%",
                      borderRadius: 999,
                      backgroundColor: b.color,
                      boxShadow: `0 0 18px ${b.color}66`,
                      transition: "width 0.4s",
                    }}
                  />
                </div>
                <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>
                  {i === 0 ? "of adult size" : i === 1 ? "of adult size — doubled in one year" : "of adult size by age three"}
                </div>
              </div>
            ))}
          </div>
          <Sub>Doubles in the first year. 80% of adult size by age three.</Sub>
        </Center>
      )}

      {/* S6 — serve and return */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={PINK}>SERVE AND RETURN</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48 }}>
            <div style={{ backgroundColor: CARD, border: `2px solid ${PINK}`, borderRadius: 20, padding: "26px 28px", textAlign: "center", width: 330 }}>
              <div style={{ fontSize: 64, lineHeight: 1 }}>👶</div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 2, marginTop: 10 }}>BABY SERVES</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>babble • gesture • cry</div>
            </div>
            <div style={{ fontSize: 56, fontWeight: 900, color: GOLD }}>⇄</div>
            <div style={{ backgroundColor: CARD, border: `2px solid ${TEAL}`, borderRadius: 20, padding: "26px 28px", textAlign: "center", width: 330 }}>
              <div style={{ fontSize: 64, lineHeight: 1 }}>🧑</div>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 2, marginTop: 10 }}>YOU RETURN</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>words • eye contact • hug</div>
            </div>
          </div>
          <div style={{ position: "relative", width: 640, height: 60, marginTop: 36 }}>
            <div style={{ position: "absolute", left: 20, right: 20, top: 28, height: 4, backgroundColor: LINE, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: `calc(50% + ${ballX6}px)`, top: 14, transform: "translateX(-50%)", width: 32, height: 32, borderRadius: "50%", backgroundColor: GOLD, boxShadow: `0 0 18px rgba(244,201,93,${glow6})` }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{ fontSize: 40, opacity: i < returns6 ? 1 : 0.15, transform: `scale(${i < returns6 ? 1 + 0.1 * Math.sin(s6 * 0.15 + i) : 1})` }}>
                💛
              </div>
            ))}
          </div>
          <Sub>Each return strengthens a connection.</Sub>
        </Center>
      )}

      {/* S7 — the window does not stay open forever */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={PINK}>THE WINDOW CLOSES</Kicker>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 40, textAlign: "center", opacity: stamp7, lineHeight: 1.2 }}>
            BUILDING → REFINING
          </div>
          <div style={{ width: 760, marginTop: 44 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: GREY, marginBottom: 12 }}>
              <span>EXPLOSIVE BUILDING</span>
              <span>REFINING</span>
            </div>
            <div style={{ height: 40, borderRadius: 999, backgroundColor: "#2c2350", overflow: "hidden" }}>
              <div
                style={{
                  width: `${windowPct7}%`,
                  height: "100%",
                  borderRadius: 999,
                  backgroundColor: PINK,
                  boxShadow: `0 0 18px rgba(255,143,163,${barGlow7})`,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: GREY, marginTop: 12 }}>
              <span>BABY</span>
              <span>CHILDHOOD →</span>
            </div>
          </div>
          <Sub>As childhood goes on, the building slows — and the brain shifts to refining.</Sub>
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
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : PINK, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(255,143,163,0.6)" }} />
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
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 36, textAlign: "center" }}>
            1,000,000 / SECOND
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, marginTop: 18, textAlign: "center", lineHeight: 1.25 }}>
            Built by love, talk, and play.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
