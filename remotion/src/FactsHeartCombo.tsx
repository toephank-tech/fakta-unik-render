import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts Ep.1 — Your Heart Beats 100,000 Times a Day
// FULL-MOTION version: all 9 scenes x 300 frames = 2700 frames, vertical 1080x1920.
// NOTE: the 4 planned AI-video clips (S1/S3/S6/S8) could NOT be generated —
// media.generate_video upstream returned 502 after 3 attempts. Those scenes were
// rebuilt as rich Remotion motion (pulsing heart, flowing blood cells, rising
// particles, glowing heart). Every scene has continuous real movement, NOT
// animated text cards. Big numbers are the animation itself (counters), with
// at most one short kicker/headline line per scene.

const BG = "#14090c";
const RED = "#ff4d5e";
const DEEPRED = "#c22a3a";
const GOLD = "#f4c95d";
const PINK = "#ffb3b3";
const GREY = "#c9c9cf";
const CARD = "#221016";
const LINE = "#3d1a20";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#9a7a72", fontWeight: 700 }}>
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

// Lub-dub heartbeat scale: two pulses per ~30-frame beat cycle
function heartbeat(f: number, cycle = 30) {
  const p = (f % cycle) / cycle;
  const g = (x: number, c: number, w: number) => Math.exp(-Math.pow((x - c) / w, 2));
  return 1 + 0.13 * g(p, 0.12, 0.09) + 0.08 * g(p, 0.38, 0.09);
}

function Heart(props: { size: number; scale: number; glow?: number }) {
  return (
    <div
      style={{
        fontSize: props.size,
        lineHeight: 1,
        color: RED,
        transform: `scale(${props.scale})`,
        textShadow: `0 0 ${Math.round(40 + (props.glow || 0) * 40)}px rgba(255,77,94,0.85), 0 0 120px rgba(255,77,94,0.45)`,
      }}
    >
      ♥
    </div>
  );
}

export const FactsHeartCombo: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S1 (0-300): pulsing heart + expanding rings ----
  const s1 = frame;
  const beat1 = heartbeat(s1, 30);
  const ringPhase = (s1 % 100) / 100;

  // ---- S2 (300-600): counters 100,000 -> 35,000,000 -> 2,500,000,000 ----
  const s2 = frame - 300;
  const phase2 = Math.min(2, Math.floor(s2 / 100));
  const p2 = (s2 % 100) / 100;
  const targets2 = [100000, 35000000, 2500000000];
  const labels2 = ["BEATS TODAY", "BEATS A YEAR", "BEATS IN A LIFETIME"];
  const count2 = Math.round(targets2[phase2] * (0.15 + 0.85 * p2));

  // ---- S3 (600-900): flowing blood cells + 7,500 L + bathtubs filling ----
  const s3 = frame - 600;
  const liters = Math.round(interpolate(s3, [20, 260], [0, 7500], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const tubFill = interpolate(s3, [60, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S4 (900-1200): heart vs fist + weight counter ----
  const s4 = frame - 900;
  const grams = Math.round(interpolate(s4, [20, 260], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const breathe = 1 + 0.03 * Math.sin(s4 * 0.06);

  // ---- S5 (1200-1500): timeline week 5 -> birth, counter to 54,000,000 ----
  const s5 = frame - 1200;
  const dotX5 = interpolate(s5, [30, 270], [0, 820], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beats5 = Math.round(interpolate(s5, [30, 270], [0, 54000000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const beat5 = heartbeat(s5, Math.max(14, 30 - Math.floor(s5 / 30)));

  // ---- S6 (1500-1800): golden particles + 19% + equalizer bars ----
  const s6 = frame - 1500;
  const pct6 = Math.round(interpolate(s6, [30, 240], [0, 19], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S7 (1800-2100): SA node spark + scrolling ECG ----
  const s7 = frame - 1800;
  const ecgShift = ((s7 % 150) / 150) * 840; // seamless 840px tile, 5s loop
  const nodePulse = 1 + 0.25 * Math.sin(s7 * 0.25);

  // ---- S8 (2100-2400): rotating rays + glowing heart ----
  const s8 = frame - 2100;
  const rayRot = s8 * 0.3;
  const glow8 = 0.85 + 0.15 * Math.sin(s8 * 0.08); // floor 0.70 so text stays readable
  const beat8 = heartbeat(s8, 30);

  // ---- S9 (2400-2700): gentle closing pulse ----
  const s9 = frame - 2400;
  const beat9 = heartbeat(s9, 45);
  const ring9 = (s9 % 120) / 120;

  const cells = Array.from({ length: 22 }).map((_, i) => ({
    y: 60 + ((i * 173) % 900),
    speed: 3 + (i % 5),
    size: 26 + ((i * 37) % 46),
    offset: (i * 137) % 1080,
  }));

  const particles = Array.from({ length: 14 }).map((_, i) => ({
    x: 80 + ((i * 197) % 920),
    speed: 1.2 + (i % 4) * 0.5,
    size: 10 + ((i * 29) % 22),
    drift: (i % 3) - 1,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S1 — pulsing heart */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR HEART • RIGHT NOW</Kicker>
          <div style={{ position: "relative", marginTop: 60, width: 460, height: 460, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1, 2].map((i) => {
              const p = (ringPhase + i / 3) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 120 + p * 360, height: 120 + p * 360, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.8 * (1 - p) }} />
              );
            })}
            <Heart size={330} scale={beat1} />
          </div>
          <Headline size={58}>About once every second.</Headline>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 34 }}>≈ 100,000 BEATS TODAY</div>
        </Center>
      )}

      {/* S2 — counters */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={RED}>NO DAYS OFF. EVER.</Kicker>
          <div style={{ fontSize: 116, fontWeight: 900, color: GOLD, marginTop: 40, textAlign: "center" }}>
            {count2.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 42, fontWeight: 800, marginTop: 10 }}>{labels2[phase2]}</div>
          <div style={{ display: "flex", gap: 18, marginTop: 60 }}>
            {labels2.map((l, i) => (
              <div key={l} style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: i === phase2 ? GOLD : "#3d1a20", border: `2px solid ${i === phase2 ? "white" : LINE}` }} />
            ))}
          </div>
          <div style={{ marginTop: 70 }}>
            <Heart size={120} scale={heartbeat(s2, 30)} />
          </div>
        </Center>
      )}

      {/* S3 — flowing blood cells */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>BLOOD ON THE MOVE</Kicker>
          <div style={{ position: "relative", width: 940, height: 330, marginTop: 40, overflow: "hidden", borderRadius: 20, backgroundColor: "#1d0b10", border: `2px solid ${LINE}` }}>
            {cells.map((c, i) => {
              const x = ((c.offset + s3 * c.speed) % 1100) - 80;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: c.y % 300, width: c.size, height: c.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? DEEPRED : RED, opacity: 0.55 + (i % 4) * 0.12 }} />
              );
            })}
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 36 }}>
            {liters.toLocaleString("en-US")} <span style={{ fontSize: 56 }}>L</span>
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>LITERS PUMPED EVERY DAY</div>
          <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 110, height: 70, borderRadius: "0 0 18px 18px", border: `3px solid ${GREY}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${tubFill * 100}%`, backgroundColor: RED, opacity: 0.85 }} />
              </div>
            ))}
          </div>
          <Sub>≈ 50 bathtubs of blood — every single day.</Sub>
        </Center>
      )}

      {/* S4 — heart vs fist */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>SMALL BUT MIGHTY</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 60, marginTop: 56 }}>
            <div style={{ transform: `scale(${breathe})` }}>
              <Heart size={250} scale={heartbeat(s4, 30)} />
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: GREY }}>≈</div>
            <div style={{ width: 250, height: 250, borderRadius: 60, backgroundColor: CARD, border: `3px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${breathe})` }}>
              <div style={{ fontSize: 120, lineHeight: 1 }}>✊</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY, marginTop: 8 }}>YOUR FIST</div>
            </div>
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD, marginTop: 56 }}>{grams} g</div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>LESS THAN HALF A KILOGRAM</div>
        </Center>
      )}

      {/* S5 — timeline week 5 to birth */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>BEFORE YOU WERE BORN</Kicker>
          <div style={{ marginTop: 50 }}>
            <Heart size={170} scale={beat5} />
          </div>
          <div style={{ fontSize: 104, fontWeight: 900, color: GOLD, marginTop: 36 }}>
            {beats5.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 38, fontWeight: 800 }}>BEATS BEFORE YOUR FIRST BREATH</div>
          <div style={{ width: 820, height: 10, backgroundColor: "#33333a", borderRadius: 5, marginTop: 70, position: "relative" }}>
            <div style={{ width: `${dotX5 / 8.2}%`, height: "100%", backgroundColor: RED, borderRadius: 5 }} />
            <div style={{ position: "absolute", left: dotX5 - 16, top: -16, width: 42, height: 42, borderRadius: "50%", backgroundColor: RED, border: "4px solid white" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 820, marginTop: 22, fontSize: 30, color: GREY }}>
            <span>WEEK 5</span>
            <span>WEEK 20</span>
            <span>BIRTH</span>
          </div>
        </Center>
      )}

      {/* S6 — laughter: rising particles + 19% + equalizer */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={GOLD}>LAUGHTER IS MEDICINE</Kicker>
          <div style={{ position: "relative", width: 940, height: 300, marginTop: 36, overflow: "hidden" }}>
            {particles.map((p, i) => {
              const y = 280 - ((s6 * p.speed + i * 90) % 300);
              const x = p.x + Math.sin((s6 + i * 40) * 0.03) * 22 * p.drift;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: y, width: p.size, height: p.size, borderRadius: "50%", backgroundColor: GOLD, opacity: 0.35 + (i % 3) * 0.2 }} />
              );
            })}
            {/* Equalizer bars */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 14, height: 150 }}>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const h = 40 + 90 * Math.abs(Math.sin(s6 * 0.09 + i * 0.9));
                return <div key={i} style={{ width: 34, height: h, borderRadius: 17, backgroundColor: i % 2 === 0 ? GOLD : RED }} />;
              })}
            </div>
          </div>
          <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, marginTop: 30 }}>{pct6}%</div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>WIDER BLOOD VESSELS WHEN YOU LAUGH</div>
          <Sub>A mini workout for your heart.</Sub>
        </Center>
      )}

      {/* S7 — SA node + ECG trace */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker>ITS OWN POWER SUPPLY</Kicker>
          <div style={{ position: "relative", width: 420, height: 260, marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1].map((i) => {
              const p = ((s7 % 90) / 90 + i / 2) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 60 + p * 320, height: 60 + p * 320, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.9 * (1 - p) }} />
              );
            })}
            <div style={{ width: 110, height: 110, borderRadius: "50%", backgroundColor: GOLD, transform: `scale(${nodePulse})`, boxShadow: "0 0 60px rgba(244,201,93,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: "#14090c" }}>
              SA
            </div>
          </div>
          {/* ECG line scrolling continuously — always visible */}
          <div style={{ width: 840, height: 150, marginTop: 50, overflow: "hidden" }}>
            <svg width={1680} height={150} style={{ transform: `translateX(${-ecgShift}px)` }}>
              <path
                d="M0,75 H120 L150,75 L170,40 L195,110 L220,15 L245,130 L270,75 H400 L430,55 L455,95 L480,75 H840 L960,75 L990,75 L1010,40 L1035,110 L1060,15 L1085,130 L1110,75 H1240 L1270,55 L1295,95 L1320,75 H1680"
                fill="none"
                stroke={RED}
                strokeWidth={6}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, marginTop: 30 }}>THE S-A NODE FIRES EVERY BEAT</div>
          <Sub>Your heart makes its own electricity.</Sub>
        </Center>
      )}

      {/* S8 — payoff: rotating rays + glowing heart */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", opacity: 0.28, transform: `rotate(${rayRot}deg)` }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 14, height: 450, backgroundColor: GOLD, transformOrigin: "top center", transform: `translateX(-50%) rotate(${i * 30}deg)`, clipPath: "polygon(50% 0, 62% 100%, 38% 100%)" }} />
            ))}
          </div>
          <div style={{ opacity: glow8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={RED}>NO BRAIN NEEDED</Kicker>
            <div style={{ marginTop: 50 }}>
              <Heart size={300} scale={beat8} glow={glow8} />
            </div>
            <Headline size={58}>
              It beats
              <br />
              on its own.
            </Headline>
            <Sub>Given oxygen, it keeps beating — even outside the body.</Sub>
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
            <Heart size={280} scale={beat9} />
          </div>
          <Headline size={56}>100,000 beats today.</Headline>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 26 }}>100,000 beats tomorrow.</div>
          <Sub>It has never asked for a break. Maybe today, say thanks.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
