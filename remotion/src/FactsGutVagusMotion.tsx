import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #153: Your Gut Talks to Your Brain (Vagus Nerve)
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

export const FactsGutVagusMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): traffic direction — TRUE % bars: 85% up, 15% down ----
  // Scale: 100% of track (760 px). 85% = 646 px, 15% = 114 px.
  const s2 = frame;
  const grow2 = Math.min(1, s2 / 150);
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const flow2 = (s2 % 40) / 40; // rising dots along the up bar

  // ---- S4 (300-600): serotonin 90% made in gut, 0% reaches brain ----
  // Scale: 90% = 684 px gold bar; brain bar stays empty (0 px) with a wall.
  const s4 = frame - 300;
  const grow4 = Math.min(1, s4 / 150);
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const wallPulse = 1 + 0.06 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): SCFA / butyrate signals via the vagus ----
  const s6 = frame - 600;
  const checks6 = Math.min(3, Math.floor(s6 / 70) + 1);
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const rise6 = (s6 % 90) / 90;

  // ---- S8 (900-1200): PAYOFF — the vagus is cut, the effect vanishes ----
  const s8 = frame - 900;
  const cutAt = 90; // cable breaks at frame 90 of the scene
  const broken = s8 >= cutAt ? 1 : 0;
  const glow8 = s8 < cutAt ? 1 : Math.max(0, 1 - (s8 - cutAt) / 90);
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fade8 = s8 >= 180 ? 1 : 0;

  // ---- S9 (1200-1500): closing — gut <-> brain loop, butterflies ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.07 * Math.sin(s9 * 0.1);
  const loop9 = s9 * 1.2; // rotating arrows
  const drift = Array.from({ length: 6 }).map((_, i) => ({
    x: 120 + i * 140,
    speed: 0.8 + (i % 3) * 0.5,
    size: 44 + ((i * 17) % 22),
    phase: (i * 97) % 300,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — traffic direction: 85% UP vs 15% DOWN (TRUE % bars) */}
      {frame < 300 && (
        <Center>
          <Kicker>ONE NERVE. TWO DIRECTIONS.</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>GUT → BRAIN (UP)</span>
                <span style={{ color: GOLD }}>~85%</span>
              </div>
              <div style={{ position: "relative", width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.85 * grow2}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
                {[0, 1, 2].map((i) => {
                  const p = (flow2 + i / 3) % 1;
                  return (
                    <div key={i} style={{ position: "absolute", left: 20 + p * (TRACK * 0.85 - 60), top: 12, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#fff7d6", boxShadow: "0 0 12px rgba(244,201,93,0.9)" }} />
                  );
                })}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>BRAIN → GUT (DOWN)</span>
                <span style={{ color: TEAL }}>~15%</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.15 * grow2}px`, height: "100%", backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp2, textAlign: "center" }}>
            MOSTLY UP — NOT DOWN
          </div>
          <Sub>About 80–90% of vagus fibers carry signals from gut to brain. (Ottaviani &amp; Macefield, 2022)</Sub>
        </Center>
      )}

      {/* S4 — serotonin: 90% made in gut, 0% reaches the brain */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE MOOD CHEMICAL — WITH A TWIST</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>SEROTONIN MADE IN YOUR GUT</span>
                <span style={{ color: GOLD }}>~90%</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.9 * grow4}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>THAT REACHES YOUR BRAIN</span>
                <span style={{ color: RED }}>0% ✕</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 26, backgroundColor: RED, transform: `scaleY(${wallPulse})`, opacity: 0.9 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: RED, marginTop: 44, opacity: stamp4, textAlign: "center" }}>
            IT NEVER GETS THERE
          </div>
          <Sub>Gut serotonin cannot cross the blood-brain barrier. It works locally — and rings the vagus nerve instead.</Sub>
        </Center>
      )}

      {/* S6 — microbes signal through the vagus (SCFA / butyrate) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>YOUR MICROBES JOIN THE CALL</Kicker>
          <div style={{ position: "relative", width: 300, height: 220, marginTop: 28 }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 10, marginLeft: -5, backgroundColor: "#2c2c48", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 10, marginLeft: -5, backgroundColor: TEAL, borderRadius: 999, opacity: 0.55 }} />
            {[0, 1, 2].map((i) => {
              const p = (rise6 + i / 3) % 1;
              return (
                <div key={i} style={{ position: "absolute", left: "50%", top: 190 - p * 180, transform: "translateX(-50%)", width: 34, height: 34, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 16px rgba(244,201,93,0.8)" }} />
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: -8, transform: "translateX(-50%)", fontSize: 64, lineHeight: 1 }}>🧠</div>
          </div>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: checks6 >= 1 ? GOLD : "#5a5a72", textAlign: "center" }}>
              {checks6 >= 1 ? "✓" : "○"} SHORT-CHAIN FATTY ACIDS
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: checks6 >= 2 ? GOLD : "#5a5a72", textAlign: "center" }}>
              {checks6 >= 2 ? "✓" : "○"} BUTYRATE SIGNALS VIA THE VAGUS
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: checks6 >= 3 ? GOLD : "#5a5a72", textAlign: "center" }}>
              {checks6 >= 3 ? "✓" : "○"} SOME CAN EVEN REACH THE BRAIN
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.3 }}>
            MICROBES TALK TOO
          </div>
          <Sub>Microbial molecules activate vagal signals. (Martin-Gallausiaux et al., 2021)</Sub>
        </Center>
      )}

      {/* S8 — PAYOFF: cut the vagus, the effect vanishes */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={RED}>THE PROOF — IN ONE CUT</Kicker>
          <div style={{ position: "relative", width: TRACK, height: 120, marginTop: 44 }}>
            <div style={{ position: "absolute", left: 0, top: 55, width: "46%", height: 12, backgroundColor: GOLD, borderRadius: 999, opacity: glow8, boxShadow: glow8 > 0.2 ? "0 0 22px rgba(244,201,93,0.8)" : "none" }} />
            <div style={{ position: "absolute", right: 0, top: 55, width: "46%", height: 12, backgroundColor: GOLD, borderRadius: 999, opacity: glow8, boxShadow: glow8 > 0.2 ? "0 0 22px rgba(244,201,93,0.8)" : "none" }} />
            {broken === 1 && (
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: 90, lineHeight: 1 }}>✂️</div>
            )}
            {broken === 0 && (
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: 110, lineHeight: 1 }}>⚡</div>
            )}
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: "white", marginTop: 20, opacity: stamp8, textAlign: "center", lineHeight: 1.3 }}>
            SCIENTISTS CUT THE VAGUS NERVE
          </div>
          <div style={{ fontSize: 110, fontWeight: 900, color: RED, marginTop: 24, opacity: fade8, textAlign: "center" }}>
            EFFECT: GONE
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 24, opacity: fade8, textAlign: "center", lineHeight: 1.3 }}>
            NO NERVE, NO CALMER MICE.
          </div>
          <Sub>Cut the wire, lose the effect. The vagus was the proof. (Bravo et al., PNAS 2011)</Sub>
        </Center>
      )}

      {/* S9 — closing: gut <-> brain loop */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 280, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const y = 240 - ((d.phase + s9 * d.speed) % 300);
              return (
                <div key={i} style={{ position: "absolute", left: d.x, top: y, opacity: 0.85 }}>
                  <div style={{ fontSize: d.size, lineHeight: 1 }}>🦋</div>
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(-50%, -50%) scale(${pulse9})`, textAlign: "center" }}>
              <div style={{ fontSize: 120, lineHeight: 1 }}>🧠</div>
              <div style={{ fontSize: 64, color: GOLD, transform: `rotate(${loop9 % 360}deg)`, lineHeight: 1.1 }}>⇄</div>
              <div style={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#0d0d1a", boxShadow: "0 0 26px rgba(127,212,193,0.7)" }}>GUT</div>
            </div>
          </div>
          <div style={{ fontSize: 104, fontWeight: 900, color: GOLD, marginTop: 24, textAlign: "center" }}>
            WIRED TOGETHER
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 20, opacity: stamp9, textAlign: "center", lineHeight: 1.3 }}>
            YOUR GUT AND YOUR MOOD
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 6, textAlign: "center", lineHeight: 1.3 }}>
            TALK EVERY SINGLE DAY.
          </div>
          <Sub>In humans the evidence is still emerging — but the wire is real.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
