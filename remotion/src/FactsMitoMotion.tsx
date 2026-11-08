import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts Ep.3 — Your Mother's Mother's Mother Lives Inside You (#105)
// MOTION scenes only: S2, S4, S5, S7, S9 (5 x 300 frames = 1500 frames, vertical 1080x1920).
// AI clips cover S1/S3/S6/S8. Gold-on-dark palette to match the AI clips.
// Every scene has continuous real movement, NOT animated text cards. Big numbers
// are the animation itself (counters), with at most one short kicker/headline per scene.

const BG = "#0d0a06";
const GOLD = "#f4c95d";
const AMBER = "#e8a33d";
const DEEPGOLD = "#8a6420";
const GREY = "#c9c9cf";
const CARD = "#1d150a";
const LINE = "#3d2c17";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

function Headline(props: { children: React.ReactNode; size?: number }) {
  return (
    <div style={{ fontSize: props.size || 56, fontWeight: 800, marginTop: 26, textAlign: "center", lineHeight: 1.2, color: "white" }}>
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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#9a7a5a", fontWeight: 700 }}>
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

// Gentle breathing scale for organelles
function breathe(f: number, cycle = 60) {
  return 1 + 0.05 * Math.sin((f / cycle) * Math.PI * 2);
}

export const FactsMitoMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- local S2 (0-300): mitochondrion + counter 0 -> 37, nucleus 20,000 ----
  const s2 = frame;
  const genes = Math.round(interpolate(s2, [30, 240], [0, 37], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const nuc = Math.round(interpolate(s2, [120, 270], [0, 20000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const mitoPulse = breathe(s2, 50);

  // ---- local S4 (300-600): sperm swims to egg, its mitochondria fade out ----
  const s4 = frame - 300;
  const spermX = interpolate(s4, [0, 150], [-420, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const spermFade = interpolate(s4, [150, 240], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eggGlow = interpolate(s4, [150, 220], [0.25, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eggPulse = 1 + 0.04 * Math.sin(s4 * 0.08);

  // ---- local S5 (600-900): mother-to-child chain, dots appear one by one ----
  const s5 = frame - 600;
  const chainN = Math.min(6, Math.floor(s5 / 45));
  const chainGrow = interpolate(s5, [0, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chainLabels = ["MOTHER", "DAUGHTER", "GRANDDAUGHTER", "GREAT-GRANDDAUGHTER", "AND ON…", "AND ON…"];

  // ---- local S7 (900-1200): timeline back to 150,000-200,000 years ago ----
  const s7 = frame - 900;
  const years = Math.round(interpolate(s7, [20, 260], [0, 200000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const dotX7 = interpolate(s7, [20, 260], [820, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const africaGlow = interpolate(s7, [230, 290], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- local S9 (1200-1500): unbroken ring of mothers, slowly rotating ----
  const s9 = frame - 1200;
  const rot9 = s9 * 0.12;
  const ringPulse = 1 + 0.06 * Math.sin(s9 * 0.1);
  const ring9 = (s9 % 120) / 120;

  const particles = Array.from({ length: 16 }).map((_, i) => ({
    x: 80 + ((i * 197) % 920),
    speed: 1.0 + (i % 4) * 0.5,
    size: 8 + ((i * 29) % 20),
    drift: (i % 3) - 1,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — mitochondrion: 37 genes vs 20,000 in the nucleus */}
      {frame < 300 && (
        <Center>
          <Kicker>THE POWER PLANT OF YOUR CELLS</Kicker>
          {/* mitochondrion capsule */}
          <div style={{ position: "relative", width: 560, height: 300, marginTop: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 520 * mitoPulse,
                height: 240 * mitoPulse,
                borderRadius: 140,
                border: `5px solid ${GOLD}`,
                backgroundColor: "#241a08",
                boxShadow: "0 0 80px rgba(244,201,93,0.55)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* inner folds */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 70 + i * 100,
                    top: 24,
                    width: 60,
                    height: 190,
                    borderRadius: 30,
                    border: `4px solid ${AMBER}`,
                    opacity: 0.75,
                    transform: `scaleY(${1 + 0.08 * Math.sin(s2 * 0.1 + i)})`,
                  }}
                />
              ))}
              {/* drifting gold dots inside */}
              {particles.slice(0, 8).map((p, i) => {
                const y = 200 - ((s2 * p.speed + i * 70) % 220);
                return (
                  <div key={i} style={{ position: "absolute", left: 40 + ((i * 53) % 420), top: y, width: p.size, height: p.size, borderRadius: "50%", backgroundColor: GOLD, opacity: 0.8 }} />
                );
              })}
            </div>
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 44 }}>{genes}</div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>GENES IN ITS OWN TINY DNA</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GREY, marginTop: 36 }}>
            NUCLEUS: <span style={{ color: "white" }}>{nuc.toLocaleString("en-US")}</span> GENES
          </div>
        </Center>
      )}

      {/* S4 — sperm reaches the egg; father's mitochondria destroyed */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>FATHER'S MITOCHONDRIA</Kicker>
          <div style={{ position: "relative", width: 940, height: 420, marginTop: 60 }}>
            {/* egg */}
            <div
              style={{
                position: "absolute",
                right: 60,
                top: 40,
                width: 330,
                height: 330,
                borderRadius: "50%",
                backgroundColor: "#2a1c0c",
                border: `5px solid ${GOLD}`,
                boxShadow: `0 0 ${Math.round(30 + eggGlow * 90)}px rgba(244,201,93,${0.3 + eggGlow * 0.6})`,
                transform: `scale(${eggPulse})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 800,
                color: GOLD,
                textAlign: "center",
              }}
            >
              MOTHER'S
              <br />
              EGG
            </div>
            {/* sperm: head + tail, swimming toward the egg */}
            <div style={{ position: "absolute", left: 470 + spermX, top: 170, opacity: 1 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: 110, height: 70, borderRadius: "50%", backgroundColor: "#c9c9cf" }} />
                <svg width={220} height={40}>
                  <path d="M0,20 Q55,0 110,20 T220,20" fill="none" stroke="#c9c9cf" strokeWidth={7} strokeLinecap="round" />
                </svg>
              </div>
              {/* sperm's mitochondria: gold dots that fade after contact */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 20 + i * 26,
                    top: -26 - (i % 2) * 8,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: GOLD,
                    opacity: spermFade,
                    transform: `scale(${spermFade})`,
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: s4 >= 150 ? GOLD : GREY, marginTop: 20, opacity: s4 >= 140 ? 1 : 0.25 }}>
            {s4 >= 150 ? "DESTROYED." : "SWIMMING IN…"}
          </div>
          <Sub>Only your mother's mitochondria survive.</Sub>
        </Center>
      )}

      {/* S5 — mother-to-child chain */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>PASSED DOWN, UNCHANGED</Kicker>
          <div style={{ position: "relative", width: 900, height: 300, marginTop: 60 }}>
            <div style={{ position: "absolute", left: 0, right: 0, top: 60, height: 8, backgroundColor: "#33333a", borderRadius: 4 }} />
            <div style={{ position: "absolute", left: 0, top: 60, height: 8, width: `${chainGrow * 100}%`, backgroundColor: GOLD, borderRadius: 4 }} />
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const x = 30 + i * 168;
              const shown = i <= chainN;
              return (
                <div key={i} style={{ position: "absolute", left: x - 34, top: 26, opacity: shown ? 1 : 0.15, textAlign: "center", width: 68 }}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: "50%",
                      backgroundColor: shown ? GOLD : "#33333a",
                      border: "4px solid white",
                      boxShadow: shown ? "0 0 34px rgba(244,201,93,0.9)" : "none",
                      margin: "0 auto",
                    }}
                  />
                  <div style={{ fontSize: 20, fontWeight: 800, color: shown ? "white" : GREY, marginTop: 14, lineHeight: 1.2 }}>
                    {chainLabels[i]}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 40 }}>MOTHER → CHILD → MOTHER → CHILD</div>
          <Sub>For thousands of generations.</Sub>
        </Center>
      )}

      {/* S7 — timeline back to Mitochondrial Eve */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>TRACING THE LINE BACK</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 44 }}>
            {years.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>YEARS AGO</div>
          <div style={{ width: 820, height: 10, backgroundColor: "#33333a", borderRadius: 5, marginTop: 70, position: "relative" }}>
            <div style={{ width: `${((820 - dotX7) / 820) * 100}%`, height: "100%", backgroundColor: GOLD, borderRadius: 5 }} />
            <div style={{ position: "absolute", left: dotX7 - 16, top: -16, width: 42, height: 42, borderRadius: "50%", backgroundColor: GOLD, border: "4px solid white" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 820, marginTop: 22, fontSize: 30, color: GREY }}>
            <span>150,000+ YEARS AGO</span>
            <span>TODAY</span>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 56, opacity: africaGlow }}>
            ✦ &nbsp;AFRICA&nbsp; ✦
          </div>
        </Center>
      )}

      {/* S9 — unbroken ring of mothers */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 520, height: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1].map((i) => {
              const p = (ring9 + i / 2) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 130 + p * 360, height: 130 + p * 360, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.7 * (1 - p) }} />
              );
            })}
            <div style={{ position: "absolute", width: 460, height: 460, transform: `rotate(${rot9}deg)` }}>
              {Array.from({ length: 10 }).map((_, i) => {
                const a = (i / 10) * Math.PI * 2;
                const x = 230 + Math.cos(a) * 200;
                const y = 230 + Math.sin(a) * 200;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: x - 22,
                      top: y - 22,
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: GOLD,
                      border: "3px solid white",
                      boxShadow: "0 0 26px rgba(244,201,93,0.9)",
                    }}
                  />
                );
              })}
            </div>
            <div style={{ fontSize: 200, lineHeight: 1, color: GOLD, transform: `scale(${ringPulse})`, textShadow: "0 0 60px rgba(244,201,93,0.9), 0 0 140px rgba(244,201,93,0.5)" }}>
              ♥
            </div>
          </div>
          <Headline size={56}>The chain lives in you.</Headline>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 26 }}>IN EVERY SINGLE CELL.</div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
