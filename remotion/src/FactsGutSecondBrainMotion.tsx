import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #33: Your Gut Has a Second Brain — 100 Million Neurons
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / teal palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages where numbers are claimed. Stamps appear
// EARLY in their scene (frame <= 60).

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

export const FactsGutSecondBrainMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): neuron counter 0 -> 100,000,000 ----
  const s2 = frame;
  const neurons2 = Math.min(100000000, Math.floor((s2 / 240) * 100000000));
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): reflex loop SENSE -> DECIDE -> MOVE ----
  const s4 = frame - 300;
  const active4 = Math.floor((s4 / 100) % 3); // 0 sense, 1 decide, 2 move
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse4 = 1 + 0.06 * Math.sin(s4 * 0.12);
  const steps4 = ["SENSE", "DECIDE", "MOVE"];

  // ---- S6 (600-900): serotonin 90% gut / 10% brain, TRUE % bars ----
  const s6 = frame - 600;
  const grow6 = Math.min(1, s6 / 150);
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)

  // ---- S8 (900-1200): vagus 80% up / 20% down, TRUE % bars + rising dots ----
  const s8 = frame - 900;
  const grow8 = Math.min(1, s8 / 150);
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const dots8 = Array.from({ length: 12 }).map((_, i) => ({
    x: 120 + ((i * 67) % 760),
    speed: 2.2 + (i % 3) * 0.9,
    size: 14 + ((i * 23) % 22),
    offset: (i * 173) % 300,
  }));

  // ---- S9 (1200-1500): microbes, emerging science ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.08 * Math.sin(s9 * 0.1);
  const drift = Array.from({ length: 10 }).map((_, i) => ({
    y: 40 + ((i * 173) % 260),
    speed: 1.2 + (i % 3),
    size: 16 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 100 million neurons */}
      {frame < 300 && (
        <Center>
          <Kicker>THE ENTERIC NERVOUS SYSTEM</Kicker>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD, marginTop: 36, transform: `scale(${pulse2})`, textAlign: "center", letterSpacing: 1 }}>
            {neurons2.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: "white", marginTop: 12, textAlign: "center" }}>
            NEURONS IN YOUR GUT
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp2, textAlign: "center" }}>
            MORE THAN YOUR SPINAL CORD
          </div>
          <Sub>Estimates range up to 600 million. Coined “second brain” by Gershon, 1998.</Sub>
        </Center>
      )}

      {/* S4 — reflex loop: sense -> decide -> move */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>A COMPLETE REFLEX CIRCUIT</Kicker>
          <div style={{ display: "flex", gap: 18, marginTop: 48, alignItems: "center" }}>
            {steps4.map((step, i) => (
              <div key={step} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    width: 250,
                    height: 250,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 44,
                    fontWeight: 900,
                    textAlign: "center",
                    color: i === active4 ? "#0d0d1a" : GOLD,
                    backgroundColor: i === active4 ? GOLD : "#2c2c48",
                    boxShadow: i === active4 ? "0 0 26px rgba(244,201,93,0.8)" : "none",
                    transform: `scale(${i === active4 ? pulse4 : 1})`,
                  }}
                >
                  {step}
                </div>
                {i < 2 && <div style={{ fontSize: 64, fontWeight: 900, color: BLUE }}>→</div>}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: RED, marginTop: 44, opacity: stamp4, textAlign: "center" }}>
            NO BRAIN NEEDED
          </div>
          <Sub>Sensory neurons, interneurons, motor neurons — all in the gut wall.</Sub>
        </Center>
      )}

      {/* S6 — serotonin: 90% gut / 10% brain, TRUE % */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>WHERE YOUR SEROTONIN IS MADE</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 36 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>YOUR GUT</span>
                <span style={{ color: GOLD }}>90%</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.9 * grow6}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>YOUR BRAIN</span>
                <span style={{ color: BLUE }}>10%</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.1 * grow6}px`, height: "100%", backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: RED, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.3 }}>
            BUT IT DOES NOT CROSS
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: RED, marginTop: 6, opacity: stamp6, textAlign: "center" }}>
            INTO YOUR BRAIN
          </div>
          <Sub>Gut serotonin works locally. Your brain makes its own supply.</Sub>
        </Center>
      )}

      {/* S8 — PAYOFF: vagus 80% up / 20% down, TRUE % */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>WHICH WAY DOES THE VAGUS NERVE TALK?</Kicker>
          <div style={{ position: "relative", width: 940, height: 240, marginTop: 20, overflow: "hidden" }}>
            {dots8.map((d, i) => {
              const y = 230 - ((d.offset + s8 * d.speed) % 240);
              return (
                <div key={i} style={{ position: "absolute", left: d.x, top: y, opacity: 0.85 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 16px rgba(244,201,93,0.8)" }} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", fontSize: 40, fontWeight: 900, color: GOLD }}>↑ BRAIN</div>
            <div style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", fontSize: 40, fontWeight: 900, color: BLUE }}>GUT ↓</div>
          </div>
          <div style={{ marginTop: 28, width: TRACK, display: "flex", flexDirection: "column", gap: 30 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>GUT → BRAIN</span>
                <span style={{ color: GOLD }}>80%</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.8 * grow8}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>BRAIN → GUT</span>
                <span style={{ color: BLUE }}>20%</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.2 * grow8}px`, height: "100%", backgroundColor: BLUE, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp8, textAlign: "center" }}>
            YOUR GUT REPORTS UP — MOSTLY
          </div>
        </Center>
      )}

      {/* S9 — microbes, emerging science */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 300, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 260, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : TEAL, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(127,212,193,0.6)" }} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              <div style={{ transform: `scale(${pulse9})`, fontSize: 170, lineHeight: 1 }}>🦠</div>
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: TEAL, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            EMERGING SCIENCE
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 24, textAlign: "center", lineHeight: 1.3 }}>
            TRILLIONS OF MICROBES.
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 6, textAlign: "center", lineHeight: 1.3 }}>
            ONE LISTENING BRAIN.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
