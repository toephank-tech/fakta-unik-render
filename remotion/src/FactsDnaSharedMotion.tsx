import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #107: You Share 99.9% of Your DNA With Every Human
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S8) are separate clips; this comp covers
// S2, S4, S6, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / blue palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages — width is pct% of a fixed 760px track,
// verified in pixels. Stamps appear EARLY in their scene (frame <= 60).

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const PINK = "#ff8fa3";
const TEAL = "#7fd4c1";
const RED = "#ff5d5d";
const GREY = "#c9c9cf";
const TRACK = 760; // px — all bar widths are TRUE % of this track

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

export const FactsDnaSharedMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 3.2 billion letters, 99.9% identical — 1000-dot grid ----
  const s2 = frame;
  const dotsTotal2 = 1000;
  // Dots fill in over the first 240 frames; 999 gold, 1 red (the 0.1%).
  const dotsLit2 = Math.min(dotsTotal2, Math.floor((s2 / 240) * dotsTotal2));
  const pct2 = Math.min(99.9, (s2 / 240) * 99.9);
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): 0.1% = 3,000,000 differences — counter ----
  const s4 = frame - 300;
  const count4 = Math.min(3000000, Math.floor((s4 / 210) * 3000000));
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): 20,000 genes, 1-2% codes for proteins ----
  const s6 = frame - 600;
  const genes6 = Math.min(20000, Math.floor((s6 / 210) * 20000));
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const codingW6 = (TRACK * 0.02 * Math.min(1, s6 / 150)).toFixed(1); // TRUE 2%
  const glow6 = 0.6 + 0.4 * Math.sin(s6 * 0.12);

  // ---- S7 (900-1200): comparison bars — TRUE percentages of 760px track ----
  const s7 = frame - 900;
  const grow7 = Math.min(1, s7 / 150); // bars grow in over first 150 frames
  const bars7 = [
    { label: "YOU vs ANY HUMAN", pct: 99.9, color: GOLD, value: "99.9%" },
    { label: "YOU vs A CHIMP", pct: 98.8, color: TEAL, value: "98.8%" },
    { label: "YOU vs A BANANA", pct: 60, color: PINK, value: "~60%" },
  ];

  // ---- S9 (1200-1500): closing — 99.9% everyone else, 0.1% = 100% you ----
  const s9 = frame - 1200;
  const pulse9 = 1 + 0.1 * Math.sin(s9 * 0.1);
  const ring9 = (s9 % 120) / 120;
  const drift = Array.from({ length: 10 }).map((_, i) => ({
    y: 40 + ((i * 173) % 260),
    speed: 1.2 + (i % 3),
    size: 14 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 3.2 billion letters, 99.9% identical: 1000-dot grid */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR GENOME: 3.2 BILLION LETTERS</Kicker>
          <div style={{ fontSize: 118, fontWeight: 900, color: GOLD, marginTop: 30, transform: `scale(${pulse2})`, textAlign: "center", letterSpacing: 2 }}>
            {pct2.toFixed(1)}%
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "white", marginTop: 8, textAlign: "center" }}>
            IDENTICAL IN EVERY HUMAN ALIVE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center", marginTop: 36, width: 640 }}>
            {Array.from({ length: 200 }).map((_, i) => {
              // 200 dots shown = 1 dot per 5 of the 1000; the single red dot
              // is the last one (the 0.1%).
              const lit = i * 5 < dotsLit2;
              const isRed = i === 199;
              return (
                <div
                  key={i}
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    backgroundColor: !lit ? "#2c2c48" : isRed ? RED : GOLD,
                    boxShadow: lit && isRed ? "0 0 14px rgba(255,93,93,0.9)" : lit ? "0 0 8px rgba(244,201,93,0.5)" : "none",
                  }}
                />
              );
            })}
          </div>
          <Sub>Only one letter in a thousand is different. That is the whole difference.</Sub>
        </Center>
      )}

      {/* S4 — 0.1% = 3,000,000 differences */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>ZERO POINT ONE PERCENT MEANS</Kicker>
          <div style={{ fontSize: 104, fontWeight: 900, color: GOLD, marginTop: 36, transform: `scale(${pulse4})`, textAlign: "center", letterSpacing: 1 }}>
            {count4.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 12, textAlign: "center" }}>
            DIFFERENCES — BETWEEN YOU AND A STRANGER
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: RED, marginTop: 40, opacity: stamp4, textAlign: "center" }}>
            0.1% IS NOT SMALL
          </div>
          <Sub>Three million tiny spelling differences in your DNA.</Sub>
        </Center>
      )}

      {/* S6 — 20,000 genes, 1-2% codes for proteins */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>HOW MANY GENES DO YOU HAVE?</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, marginTop: 30, textAlign: "center", letterSpacing: 2 }}>
            {genes6.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "white", marginTop: 8, textAlign: "center" }}>
            GENES — AND THAT IS ALL
          </div>
          <div style={{ marginTop: 44, width: TRACK }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, color: GREY, marginBottom: 10 }}>
              <span>CODES FOR PROTEINS: 1–2%</span>
              <span>98%</span>
            </div>
            <div style={{ position: "relative", width: TRACK, height: 44, backgroundColor: BLUE, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${codingW6}px`, backgroundColor: GOLD, boxShadow: `0 0 18px rgba(244,201,93,${glow6})` }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, color: GREY, marginTop: 10 }}>
              <span style={{ color: GOLD }}>▮ 1–2% protein code</span>
              <span style={{ color: BLUE }}>▮ 98% instruction manual</span>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp6, textAlign: "center" }}>
            THE REST IS THE INSTRUCTION MANUAL
          </div>
        </Center>
      )}

      {/* S7 — comparison bars, TRUE percentages */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>HOW MUCH DNA DO YOU SHARE?</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 34 }}>
            {bars7.map((b) => (
              <div key={b.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                  <span>{b.label}</span>
                  <span style={{ color: b.color }}>{b.value}</span>
                </div>
                <div style={{ width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${(TRACK * b.pct) / 100 * grow7}px`, height: "100%", backgroundColor: b.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
          <Sub>Even a chimp is almost all you. A banana is more than half.</Sub>
        </Center>
      )}

      {/* S9 — closing: 99.9% everyone else, 0.1% = 100% you */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 340, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 300, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : BLUE, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(90,169,255,0.6)" }} />
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
              <div style={{ transform: `scale(${pulse9})`, fontSize: 170, lineHeight: 1 }}>🧬</div>
            </div>
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 30, textAlign: "center" }}>
            99.9% EVERYONE ELSE
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, marginTop: 16, textAlign: "center", lineHeight: 1.25 }}>
            That last 0.1%? That is one hundred percent you.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
