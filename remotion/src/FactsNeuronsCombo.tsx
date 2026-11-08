import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts Ep.3 — Your Brain Has 86 Billion Neurons
// V3 COMBO: AI clips replace S1/S3/S6/S8; this composition renders all 9 scenes
// as silent motion, then S2/S4/S5/S7/S9 segments are used. 2700 frames, 1080x1920.
// Palette: deep navy + electric indigo + gold (brain / starry-network theme).

const BG = "#0a0e24";
const INDIGO = "#6b7cff";
const DEEPINDIGO = "#3d4fd8";
const GOLD = "#f4c95d";
const CYAN = "#7ee0ff";
const GREY = "#c9c9cf";
const CARD = "#141a33";
const LINE = "#2a3358";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8a94c9", fontWeight: 700 }}>
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

// Firing pulse: brief bright flash repeating every ~40 frames
function pulse(f: number, cycle = 40, offset = 0) {
  const p = (((f + offset) % cycle) / cycle);
  return Math.exp(-Math.pow((p - 0.15) / 0.12, 2));
}

export const FactsNeuronsCombo: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S1 (0-300): glowing neuron network, nodes pulsing, slow zoom ----
  const s1 = frame;
  const zoom1 = 1 + s1 * 0.0004;

  // ---- S2 (300-600): counter 0 -> 86,000,000,000 ----
  const s2 = frame - 300;
  const count2 = Math.round(interpolate(s2, [20, 270], [0, 86000000000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S3 (600-900): single neuron, pulses traveling along dendrites ----
  const s3 = frame - 600;

  // ---- S4 (900-1200): counter 0 -> 100 trillion synapses + 1.4 kg ----
  const s4 = frame - 900;
  const syn4 = Math.round(interpolate(s4, [20, 250], [0, 100000000000000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S5 (1200-1500): cortex 16B vs cerebellum 69B bars growing ----
  const s5 = frame - 1200;
  const barCortex = interpolate(s5, [30, 200], [0, 0.19], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barCereb = interpolate(s5, [30, 260], [0, 0.81], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S6 (1500-1800): Milky Way spiral of stars, slow rotation ----
  const s6 = frame - 1500;
  const rot6 = s6 * 0.12;

  // ---- S7 (1800-2100): new connections growing between nodes ----
  const s7 = frame - 1800;

  // ---- S8 (2100-2400): payoff 250x, rotating rays + glowing network ----
  const s8 = frame - 2100;
  const rayRot = s8 * 0.3;
  const glow8 = 0.85 + 0.15 * Math.sin(s8 * 0.08);

  // ---- S9 (2400-2700): closing pulse ----
  const s9 = frame - 2400;
  const ring9 = (s9 % 120) / 120;
  const beat9 = 1 + 0.08 * Math.sin(s9 * 0.14);

  // Deterministic node field for S1 network
  const nodes = Array.from({ length: 26 }).map((_, i) => ({
    x: 90 + ((i * 173) % 900),
    y: 120 + ((i * 251) % 1300),
    size: 14 + ((i * 29) % 26),
    phase: (i * 37) % 40,
  }));

  // Dendrite branches for S3 single neuron
  const branches = Array.from({ length: 8 }).map((_, i) => ({
    angle: i * 45,
    len: 260 + ((i * 67) % 140),
    speed: 1.1 + (i % 3) * 0.35,
  }));

  // Stars for S6 galaxy spiral
  const stars = Array.from({ length: 90 }).map((_, i) => {
    const arm = i % 2 === 0 ? 0 : 180;
    const r = 40 + ((i * 53) % 380);
    const a = arm + r * 0.55 + (i % 7) * 4;
    return { r, a, size: 5 + ((i * 17) % 12), tw: (i * 31) % 40 };
  });

  // Growing links for S7
  const links = Array.from({ length: 10 }).map((_, i) => ({
    x1: 140 + ((i * 211) % 760),
    y1: 200 + ((i * 173) % 900),
    x2: 140 + ((i * 307) % 760),
    y2: 200 + ((i * 251) % 900),
    start: 20 + i * 22,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S1 — glowing neuron network */}
      {frame < 300 && (
        <Center>
          <Kicker>A UNIVERSE IN YOUR HEAD</Kicker>
          <div style={{ position: "relative", width: 940, height: 620, marginTop: 50, transform: `scale(${zoom1})` }}>
            {nodes.map((n, i) => {
              const p = pulse(s1, 40, n.phase);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: n.x,
                    top: n.y,
                    width: n.size + p * 14,
                    height: n.size + p * 14,
                    borderRadius: "50%",
                    backgroundColor: i % 3 === 0 ? GOLD : INDIGO,
                    boxShadow: `0 0 ${20 + p * 50}px ${i % 3 === 0 ? "rgba(244,201,93,0.9)" : "rgba(107,124,255,0.9)"}`,
                    opacity: 0.55 + p * 0.45,
                  }}
                />
              );
            })}
            {/* connecting lines */}
            <svg width={940} height={620} style={{ position: "absolute", inset: 0 }}>
              {nodes.slice(0, 12).map((n, i) => {
                const m = nodes[(i + 7) % nodes.length];
                return <line key={i} x1={n.x + 14} y1={n.y + 14} x2={m.x + 14} y2={m.y + 14} stroke={INDIGO} strokeWidth={2} opacity={0.35} />;
              })}
            </svg>
          </div>
          <Headline size={58}>86 billion neurons.</Headline>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 30 }}>FIRING RIGHT NOW</div>
        </Center>
      )}

      {/* S2 — 86 billion counter */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={INDIGO}>COUNTED, NOT GUESSED</Kicker>
          <div style={{ fontSize: 118, fontWeight: 900, color: GOLD, marginTop: 40, textAlign: "center" }}>
            {count2.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, marginTop: 10 }}>NEURONS IN YOUR BRAIN</div>
          <div style={{ display: "flex", gap: 14, marginTop: 60 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const on = count2 > (i + 1) * 10750000000;
              return <div key={i} style={{ width: 60, height: 14, borderRadius: 7, backgroundColor: on ? INDIGO : LINE }} />;
            })}
          </div>
          <Sub>For decades, textbooks said 100 billion. Nobody had ever counted.</Sub>
        </Center>
      )}

      {/* S3 — single neuron firing */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>ONE NEURON, 7,000 FRIENDS</Kicker>
          <div style={{ position: "relative", width: 700, height: 700, marginTop: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {branches.map((b, i) => {
              const travel = ((s3 * b.speed + i * 90) % 300) / 300;
              const rad = (b.angle * Math.PI) / 180;
              const x = Math.cos(rad) * b.len * travel;
              const y = Math.sin(rad) * b.len * travel;
              return (
                <div key={i}>
                  <div
                    style={{
                      position: "absolute",
                      left: 350,
                      top: 350,
                      width: b.len,
                      height: 5,
                      backgroundColor: INDIGO,
                      opacity: 0.5,
                      transformOrigin: "left center",
                      transform: `rotate(${b.angle}deg)`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 350 + x - 14,
                      top: 350 + y - 14,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: GOLD,
                      boxShadow: "0 0 34px rgba(244,201,93,0.95)",
                    }}
                  />
                </div>
              );
            })}
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                backgroundColor: DEEPINDIGO,
                border: `4px solid ${INDIGO}`,
                boxShadow: `0 0 ${60 + pulse(s3, 40) * 60}px rgba(107,124,255,0.9)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 900,
                color: "white",
                zIndex: 2,
              }}
            >
              1
            </div>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 20 }}>TALKS TO 7,000 NEIGHBORS</div>
          <Sub>All at once. Every second of your life.</Sub>
        </Center>
      )}

      {/* S4 — 100 trillion synapses */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={INDIGO}>ADD THEM ALL UP</Kicker>
          <div style={{ fontSize: 104, fontWeight: 900, color: GOLD, marginTop: 40, textAlign: "center" }}>
            {syn4.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, marginTop: 10 }}>SYNAPSES — CONNECTIONS</div>
          <div style={{ fontSize: 96, fontWeight: 900, color: CYAN, marginTop: 60 }}>1.4 kg</div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>THE WEIGHT OF YOUR WHOLE BRAIN</div>
          <Sub>More than one hundred trillion connections — in about three pounds.</Sub>
        </Center>
      )}

      {/* S5 — cortex 16B vs cerebellum 69B */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE STRANGEST PART</Kicker>
          <div style={{ width: 860, marginTop: 60 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
              <span>CORTEX — WHERE YOU THINK</span>
              <span style={{ color: INDIGO }}>16 BILLION</span>
            </div>
            <div style={{ width: "100%", height: 56, backgroundColor: CARD, borderRadius: 28, marginTop: 14, overflow: "hidden" }}>
              <div style={{ width: `${barCortex * 100}%`, height: "100%", backgroundColor: INDIGO, borderRadius: 28 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800, marginTop: 50 }}>
              <span>CEREBELLUM — BACK OF BRAIN</span>
              <span style={{ color: GOLD }}>69 BILLION</span>
            </div>
            <div style={{ width: "100%", height: 56, backgroundColor: CARD, borderRadius: 28, marginTop: 14, overflow: "hidden" }}>
              <div style={{ width: `${barCereb * 100}%`, height: "100%", backgroundColor: GOLD, borderRadius: 28 }} />
            </div>
          </div>
          <Sub>A fist-sized knot at the back holds four times more neurons than your thinking cortex.</Sub>
        </Center>
      )}

      {/* S6 — Milky Way spiral */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={GOLD}>NOW LOOK UP</Kicker>
          <div style={{ position: "relative", width: 800, height: 800, marginTop: 20, transform: `rotate(${rot6}deg)` }}>
            {stars.map((st, i) => {
              const rad = ((st.a * Math.PI) / 180);
              const x = 400 + Math.cos(rad) * st.r;
              const y = 400 + Math.sin(rad) * st.r * 0.42;
              const tw = 0.5 + 0.5 * Math.sin((s6 + st.tw) * 0.12);
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: st.size,
                    height: st.size,
                    borderRadius: "50%",
                    backgroundColor: i % 4 === 0 ? GOLD : "white",
                    opacity: 0.35 + tw * 0.6,
                    boxShadow: i % 4 === 0 ? "0 0 18px rgba(244,201,93,0.8)" : "none",
                  }}
                />
              );
            })}
            <div style={{ position: "absolute", left: 400 - 60, top: 400 - 60, width: 120, height: 120, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 90px rgba(244,201,93,0.9)", opacity: 0.95 }} />
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: -40 }}>100–400 BILLION STARS</div>
          <Sub>Count every star in the Milky Way — your brain still has more connections.</Sub>
        </Center>
      )}

      {/* S7 — network rewiring, new links growing */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={CYAN}>IT NEVER STOPS CHANGING</Kicker>
          <div style={{ position: "relative", width: 940, height: 640, marginTop: 40 }}>
            <svg width={940} height={640} style={{ position: "absolute", inset: 0 }}>
              {links.map((l, i) => {
                const prog = interpolate(s7, [l.start, l.start + 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                const mx = l.x1 + (l.x2 - l.x1) * prog;
                const my = l.y1 + (l.y2 - l.y1) * prog;
                return (
                  <g key={i}>
                    <line x1={l.x1} y1={l.y1} x2={mx} y2={my} stroke={i % 2 === 0 ? GOLD : CYAN} strokeWidth={4} strokeLinecap="round" />
                    <circle cx={l.x1} cy={l.y1} r={13} fill={INDIGO} />
                    {prog >= 1 && <circle cx={l.x2} cy={l.y2} r={13} fill={GOLD} />}
                  </g>
                );
              })}
            </svg>
          </div>
          <Headline size={56}>Every time you learn,</Headline>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 22 }}>YOUR BRAIN REWIRES ITSELF</div>
          <Sub>New connections grow — for your entire life.</Sub>
        </Center>
      )}

      {/* S8 — payoff: 250x */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", opacity: 0.28, transform: `rotate(${rayRot}deg)` }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 450, backgroundColor: GOLD, transformOrigin: "top center", transform: `translateX(-50%) rotate(${i * 30}deg)`, clipPath: "polygon(50% 0, 62% 100%, 38% 100%)" }} />
            ))}
          </div>
          <div style={{ opacity: glow8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={INDIGO}>THE WILDEST FACT OF ALL</Kicker>
            <div style={{ fontSize: 200, fontWeight: 900, color: GOLD, marginTop: 40, textShadow: "0 0 60px rgba(244,201,93,0.8)" }}>250×</div>
            <Headline size={54}>
              More connections than stars
              <br />
              in our galaxy.
            </Headline>
            <Sub>A universe — inside your skull.</Sub>
          </div>
        </Center>
      )}

      {/* S9 — closing */}
      {frame >= 2400 && (
        <Center>
          <div style={{ position: "relative", width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1].map((i) => {
              const p = (ring9 + i / 2) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 110 + p * 300, height: 110 + p * 300, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.7 * (1 - p) }} />
              );
            })}
            <div style={{ width: 200, height: 200, borderRadius: "50%", backgroundColor: DEEPINDIGO, border: `4px solid ${INDIGO}`, transform: `scale(${beat9})`, boxShadow: "0 0 70px rgba(107,124,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 90 }}>🧠</div>
          </div>
          <Headline size={56}>86 billion neurons.</Headline>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 26 }}>100 trillion connections.</div>
          <Sub>And every single one of them — is you.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
