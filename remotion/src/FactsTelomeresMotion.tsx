import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #108: Your Telomeres Shorten Every Time a Cell Divides
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S8) are separate clips; this comp covers
// S2, S4, S6, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / blue palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages where numbers are claimed — S7 lifestyle
// bars are qualitative only (no fake numbers): they are labelled SHORTER /
// LONGER, never with a % value. Stamps appear EARLY in their scene
// (frame <= 60).

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const RED = "#ff5d5d";
const GREY = "#c9c9cf";
const TRACK = 760; // px — all bar widths are % of this track

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

export const FactsTelomeresMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): TTAGGG repeats — letters light up, counter 0 -> 2000 ----
  const s2 = frame;
  const lit2 = Math.min(12, Math.floor((s2 / 200) * 12));
  const repeats2 = Math.min(2000, Math.floor((s2 / 240) * 2000));
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): Hayflick limit — division counter 0 -> 60, cap bar shrinks ----
  const s4 = frame - 300;
  const divs4 = Math.min(60, Math.floor((s4 / 240) * 60));
  const capLeft4 = Math.max(0, 100 - (s4 / 240) * 100); // TRUE % of cap remaining
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): telomerase rebuilds the cap ----
  const s6 = frame - 600;
  const rebuilt6 = Math.min(100, (s6 / 210) * 100); // % rebuilt, TRUE scale
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const glow6 = 0.6 + 0.4 * Math.sin(s6 * 0.12);

  // ---- S7 (900-1200): lifestyle — QUALITATIVE bars only, no numbers ----
  const s7 = frame - 900;
  const grow7 = Math.min(1, s7 / 150);
  // Relative lengths are illustrative only: shorter vs longer, no % claimed.
  const rows7 = [
    { label: "CHRONIC STRESS", tag: "LINKED TO SHORTER", frac: 0.45, color: RED },
    { label: "SMOKING", tag: "LINKED TO SHORTER", frac: 0.4, color: RED },
    { label: "REGULAR EXERCISE", tag: "LINKED TO LONGER", frac: 0.85, color: TEAL },
  ];

  // ---- S9 (1200-1500): closing — countdown / shield / warning + Nobel stamp ----
  const s9 = frame - 1200;
  const pulse9 = 1 + 0.08 * Math.sin(s9 * 0.1);
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
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

      {/* S2 — TTAGGG repeats, shoelace-tip cap */}
      {frame < 300 && (
        <Center>
          <Kicker>THE CAP AT THE END OF EVERY CHROMOSOME</Kicker>
          <div style={{ display: "flex", gap: 10, marginTop: 44, justifyContent: "center" }}>
            {"TTAGGG".split("").map((ch, i) => (
              <div
                key={i}
                style={{
                  width: 96,
                  height: 120,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 64,
                  fontWeight: 900,
                  color: i * 2 < lit2 ? "#0d0d1a" : GOLD,
                  backgroundColor: i * 2 < lit2 ? GOLD : "#2c2c48",
                  boxShadow: i * 2 < lit2 ? "0 0 22px rgba(244,201,93,0.7)" : "none",
                  transform: `scale(${i * 2 < lit2 ? pulse2 : 1})`,
                }}
              >
                {ch}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
            {"TTAGGG".split("").map((ch, i) => (
              <div
                key={i}
                style={{
                  width: 96,
                  height: 120,
                  borderRadius: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 64,
                  fontWeight: 900,
                  color: i * 2 + 1 < lit2 ? "#0d0d1a" : GOLD,
                  backgroundColor: i * 2 + 1 < lit2 ? GOLD : "#2c2c48",
                  boxShadow: i * 2 + 1 < lit2 ? "0 0 22px rgba(244,201,93,0.7)" : "none",
                }}
              >
                {ch}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 36, textAlign: "center" }}>
            {repeats2.toLocaleString("en-US")} REPEATS
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: "white", marginTop: 28, opacity: stamp2, textAlign: "center" }}>
            LIKE A SHOELACE TIP — FOR YOUR DNA
          </div>
          <Sub>One six-letter code, repeated thousands of times.</Sub>
        </Center>
      )}

      {/* S4 — Hayflick limit: 40-60 divisions, cap runs out */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>HOW MANY TIMES CAN A CELL DIVIDE?</Kicker>
          <div style={{ fontSize: 118, fontWeight: 900, color: GOLD, marginTop: 30, transform: `scale(${pulse4})`, textAlign: "center", letterSpacing: 2 }}>
            {divs4}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "white", marginTop: 8, textAlign: "center" }}>
            DIVISIONS — THEN THE CAP RUNS OUT
          </div>
          <div style={{ marginTop: 44, width: TRACK }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, color: GREY, marginBottom: 10 }}>
              <span>TELOMERE CAP LEFT</span>
              <span style={{ color: GOLD }}>{Math.round(capLeft4)}%</span>
            </div>
            <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${(TRACK * capLeft4) / 100}px`, height: "100%", backgroundColor: capLeft4 > 25 ? GOLD : RED, borderRadius: 999 }} />
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: RED, marginTop: 40, opacity: stamp4, textAlign: "center" }}>
            THE HAYFLICK LIMIT: 40–60
          </div>
          <Sub>After that, a normal cell cannot divide again.</Sub>
        </Center>
      )}

      {/* S6 — telomerase rebuilds the cap, only in some cells */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>ONE ENZYME CAN REBUILD THE CAP</Kicker>
          <div style={{ fontSize: 104, fontWeight: 900, color: GOLD, marginTop: 30, textAlign: "center", letterSpacing: 2 }}>
            TELOMERASE
          </div>
          <div style={{ marginTop: 40, width: TRACK }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, color: GREY, marginBottom: 10 }}>
              <span>CAP REBUILT</span>
              <span style={{ color: GOLD }}>{Math.round(rebuilt6)}%</span>
            </div>
            <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${(TRACK * rebuilt6) / 100}px`, height: "100%", backgroundColor: TEAL, boxShadow: `0 0 18px rgba(127,212,193,${glow6})`, borderRadius: 999 }} />
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.3 }}>
            ✓ STEM CELLS &nbsp;•&nbsp; ✓ SPERM &amp; EGG CELLS
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: RED, marginTop: 12, opacity: stamp6, textAlign: "center" }}>
            ✕ MOST OF YOUR OTHER CELLS
          </div>
          <Sub>Most cells never switch it on.</Sub>
        </Center>
      )}

      {/* S7 — lifestyle links, qualitative bars, NO numbers */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={TEAL}>YOUR HABITS ARE LINKED TO THE CLOCK</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 36 }}>
            {rows7.map((r) => (
              <div key={r.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                  <span>{r.label}</span>
                  <span style={{ color: r.color }}>{r.tag}</span>
                </div>
                <div style={{ width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: `${TRACK * r.frac * grow7}px`, height: "100%", backgroundColor: r.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
          <Sub>Links found in studies — not proof of cause. No pill can lengthen them.</Sub>
        </Center>
      )}

      {/* S9 — closing: countdown, shield, warning + Nobel stamp */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 300, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 260, opacity: 0.7 }}>
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
              <div style={{ transform: `scale(${pulse9})`, fontSize: 170, lineHeight: 1 }}>⏳</div>
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: GOLD, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            NOBEL PRIZE 2009
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 24, textAlign: "center", lineHeight: 1.3 }}>
            A COUNTDOWN. A SHIELD.
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 6, textAlign: "center", lineHeight: 1.3 }}>
            A WARNING — ALL AT ONCE.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
