import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #49: Goosebumps Are Leftovers From When You Were Furry
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / cold-blue palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// No percentage bars in this video (no verified percentages claimed).
// Stamps appear EARLY in their scene (frame <= 60). Drifting decorative
// dots live in their own band and never cross text lines.

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const RED = "#ff5d5d";
const GREY = "#c9c9cf";

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

export const FactsGoosebumpsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): arrector pili pulls a hair upright ----
  const s2 = frame;
  const rise2 = Math.min(1, s2 / 220); // 0 -> 1 over the scene
  const angle2 = -62 + rise2 * 57; // hair rotates from flat (-62deg) to upright (-5deg)
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const muscleW2 = 260 - rise2 * 90; // muscle band shortens as it contracts
  const bump2 = rise2; // skin puckers as the hair rises
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.1);

  // ---- S4 (300-600): two jobs — traps warm air + looks bigger ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fur4 = Math.min(1, s4 / 200); // fur lines rise
  const big4 = 1 + Math.min(1, Math.max(0, (s4 - 60) / 180)) * 0.28; // cat puffs up bigger
  const airDots4 = Array.from({ length: 10 }).map((_, i) => ({
    x: 60 + ((i * 173) % 700),
    y: 30 + ((i * 97) % 90),
    speed: 0.9 + (i % 3) * 0.4,
    size: 12 + ((i * 17) % 16),
  }));

  // ---- S6 (600-900): triggers — cold, fear, awe fire the same signal ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // Each trigger chip lights up in turn, then all stay lit.
  const litCold = s6 >= 40 ? 1 : 0;
  const litFear = s6 >= 120 ? 1 : 0;
  const litAwe = s6 >= 200 ? 1 : 0;
  const signal6 = Math.min(1, Math.max(0, (s6 - 200) / 60)); // nerve signal fires after all three
  const dotY6 = 40 + signal6 * 260; // travelling pulse down the nerve line

  // ---- S8 (900-1200): brain reward circuit lights up — dopamine ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const nodeA = s8 >= 40 ? 1 : 0; // caudate lights first (anticipation)
  const nodeB = s8 >= 130 ? 1 : 0; // nucleus accumbens lights at the peak
  const nodeC = s8 >= 210 ? 1 : 0; // orbitofrontal cortex joins
  const glow8 = 1 + 0.08 * Math.sin(s8 * 0.12);
  const dopDots8 = Array.from({ length: 12 }).map((_, i) => ({
    x: 80 + ((i * 151) % 640),
    y: 20 + ((i * 83) % 80),
    speed: 1.0 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 16),
  }));

  // ---- S9 (1200-1500): PAYOFF — Harvard 2020: the muscle helps grow new hair ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const grow9 = Math.min(1, s9 / 230); // new hair grows upward
  const hairH9 = 40 + grow9 * 240;
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.12);
  const stemDots9 = Array.from({ length: 8 }).map((_, i) => ({
    x: 90 + ((i * 167) % 600),
    y: 20 + ((i * 71) % 60),
    speed: 1.1 + (i % 3) * 0.5,
    size: 14 + ((i * 23) % 18),
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — arrector pili: the tiny muscle that pulls a hair upright */}
      {frame < 300 && (
        <Center>
          <Kicker>THE TINY MUSCLE BEHIND THE BUMP</Kicker>
          {/* Follicle diagram: skin line, hair rising, contracting muscle band */}
          <div style={{ position: "relative", width: 940, height: 330, marginTop: 30 }}>
            {/* skin surface */}
            <div style={{ position: "absolute", left: 40, right: 40, bottom: 60, height: 10, backgroundColor: "#e8b48c", borderRadius: 999 }} />
            {/* puckered bump under the hair */}
            <div style={{ position: "absolute", left: 430, bottom: 60, width: 90 + bump2 * 40, height: 26 + bump2 * 30, backgroundColor: "#e8b48c", borderRadius: "50%", transform: "translateX(-50%)", opacity: 0.6 + bump2 * 0.4 }} />
            {/* hair shaft, rotating from flat to upright */}
            <div style={{ position: "absolute", left: 466, bottom: 70, width: 14, height: 250, backgroundColor: GOLD, borderRadius: 999, transformOrigin: "50% 100%", transform: `rotate(${angle2}deg)` }} />
            {/* contracting muscle band */}
            <div style={{ position: "absolute", left: 560, bottom: 130, width: muscleW2, height: 34, backgroundColor: RED, borderRadius: 999, opacity: 0.9, transform: `scale(${pulse2})` }} />
            <div style={{ position: "absolute", left: 560, bottom: 96, fontSize: 26, fontWeight: 800, color: RED }}>
              MUSCLE CONTRACTS →
            </div>
            <div style={{ position: "absolute", left: 60, bottom: 200, fontSize: 26, fontWeight: 700, color: GREY }}>
              HAIR FOLLICLE
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 10, textAlign: "center" }}>
            ARRECTOR PILI
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 30, opacity: stamp2, textAlign: "center" }}>
            ONE MUSCLE PER HAIR
          </div>
          <Sub>It contracts, pulls the hair upright — and puckers your skin into a bump.</Sub>
        </Center>
      )}

      {/* S4 — two jobs of raised fur: traps warm air + looks bigger */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>ONE REFLEX, TWO JOBS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 36, marginTop: 36, width: 860 }}>
            {/* Job 1: insulation */}
            <div style={{ backgroundColor: "#17172b", borderRadius: 24, padding: "28px 34px" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: GOLD }}>1 • TRAPS WARM AIR</div>
              <div style={{ position: "relative", height: 90, marginTop: 14, overflow: "hidden" }}>
                {airDots4.map((d, i) => (
                  <div key={i} style={{ position: "absolute", left: d.x, top: d.y, opacity: 0.55 + fur4 * 0.45 }}>
                    <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: BLUE, boxShadow: "0 0 12px rgba(90,169,255,0.7)" }} />
                  </div>
                ))}
                {/* rising fur lines */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ position: "absolute", left: 60 + i * 80, bottom: 0, width: 10, height: 30 + fur4 * 46, backgroundColor: GOLD, borderRadius: 999, opacity: 0.85 }} />
                ))}
              </div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 10 }}>Raised fur holds a layer of still, warm air next to the skin.</div>
            </div>
            {/* Job 2: threat display */}
            <div style={{ backgroundColor: "#17172b", borderRadius: 24, padding: "28px 34px", display: "flex", alignItems: "center", gap: 30 }}>
              <div style={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: TEAL, transform: `scale(${big4})`, boxShadow: "0 0 30px rgba(127,212,193,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>
                🐱
              </div>
              <div>
                <div style={{ fontSize: 40, fontWeight: 900, color: TEAL }}>2 • LOOKS BIGGER</div>
                <div style={{ fontSize: 28, color: GREY, marginTop: 10, lineHeight: 1.4 }}>A frightened cat puffs up its fur — a porcupine raises its quills the same way.</div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp4, textAlign: "center" }}>
            A WINTER COAT + A WARNING
          </div>
        </Center>
      )}

      {/* S6 — triggers: cold, fear, awe — one sympathetic signal */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>WHAT FLIPS THE SWITCH?</Kicker>
          <div style={{ display: "flex", gap: 30, marginTop: 44 }}>
            <div style={{ width: 250, padding: "30px 10px", borderRadius: 24, textAlign: "center", backgroundColor: litCold ? BLUE : "#1c1c30", border: `4px solid ${litCold ? BLUE : "#33334d"}` }}>
              <div style={{ fontSize: 64 }}>❄️</div>
              <div style={{ fontSize: 38, fontWeight: 900, marginTop: 8 }}>COLD</div>
            </div>
            <div style={{ width: 250, padding: "30px 10px", borderRadius: 24, textAlign: "center", backgroundColor: litFear ? RED : "#1c1c30", border: `4px solid ${litFear ? RED : "#33334d"}` }}>
              <div style={{ fontSize: 64 }}>😨</div>
              <div style={{ fontSize: 38, fontWeight: 900, marginTop: 8 }}>FEAR</div>
            </div>
            <div style={{ width: 250, padding: "30px 10px", borderRadius: 24, textAlign: "center", backgroundColor: litAwe ? GOLD : "#1c1c30", border: `4px solid ${litAwe ? GOLD : "#33334d"}` }}>
              <div style={{ fontSize: 64 }}>🎵</div>
              <div style={{ fontSize: 38, fontWeight: 900, marginTop: 8 }}>AWE</div>
            </div>
          </div>
          {/* nerve line with travelling pulse */}
          <div style={{ position: "relative", width: 60, height: 300, marginTop: 30 }}>
            <div style={{ position: "absolute", left: 26, top: 0, width: 8, height: 300, backgroundColor: "#33334d", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 26, top: 0, width: 8, height: dotY6, backgroundColor: GOLD, borderRadius: 999, opacity: signal6 > 0 ? 1 : 0 }} />
            <div style={{ position: "absolute", left: 14, top: dotY6 - 12, width: 32, height: 32, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 20px rgba(244,201,93,0.9)", opacity: signal6 > 0 ? 1 : 0 }} />
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 10, opacity: stamp6, textAlign: "center" }}>
            SYMPATHETIC NERVOUS SYSTEM
          </div>
          <Sub>Fight-or-flight fires the same signal — cold, fear, or sudden awe.</Sub>
        </Center>
      )}

      {/* S8 — frisson: dopamine in the brain's reward system */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>WHY MUSIC GIVES YOU CHILLS</Kicker>
          <div style={{ position: "relative", width: 940, height: 120, overflow: "hidden", marginTop: 20 }}>
            {dopDots8.map((d, i) => {
              const x = ((d.x + s8 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.8 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? GOLD : BLUE, boxShadow: "0 0 12px rgba(244,201,93,0.7)" }} />
                </div>
              );
            })}
          </div>
          {/* reward circuit nodes lighting up in sequence */}
          <div style={{ display: "flex", gap: 40, marginTop: 20 }}>
            <div style={{ width: 250, padding: "26px 10px", borderRadius: 24, textAlign: "center", backgroundColor: nodeA ? "#2b2b4d" : "#1c1c30", border: `4px solid ${nodeA ? GOLD : "#33334d"}`, transform: `scale(${nodeA ? glow8 : 1})` }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: nodeA ? GOLD : GREY }}>CAUDATE</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 6 }}>anticipation</div>
            </div>
            <div style={{ width: 250, padding: "26px 10px", borderRadius: 24, textAlign: "center", backgroundColor: nodeB ? "#2b2b4d" : "#1c1c30", border: `4px solid ${nodeB ? GOLD : "#33334d"}`, transform: `scale(${nodeB ? glow8 : 1})` }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: nodeB ? GOLD : GREY }}>NUCLEUS</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: nodeB ? GOLD : GREY }}>ACCUMBENS</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 6 }}>the peak</div>
            </div>
            <div style={{ width: 250, padding: "26px 10px", borderRadius: 24, textAlign: "center", backgroundColor: nodeC ? "#2b2b4d" : "#1c1c30", border: `4px solid ${nodeC ? GOLD : "#33334d"}`, transform: `scale(${nodeC ? glow8 : 1})` }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: nodeC ? GOLD : GREY }}>ORBITO-</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: nodeC ? GOLD : GREY }}>FRONTAL</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 6 }}>reward</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center" }}>
            DOPAMINE • REWARD SYSTEM
          </div>
          <Sub>Brain scans link music chills to dopamine release — the same circuits as food and pleasure.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: Harvard 2020 — the muscle helps grow new hair */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", width: 940, height: 130, overflow: "hidden", marginTop: 20 }}>
            {stemDots9.map((d, i) => {
              const x = ((d.x + s9 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.75 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? TEAL : GOLD, boxShadow: "0 0 14px rgba(127,212,193,0.6)" }} />
                </div>
              );
            })}
          </div>
          {/* follicle with a new hair growing upward */}
          <div style={{ position: "relative", width: 940, height: 320, marginTop: 10 }}>
            <div style={{ position: "absolute", left: 40, right: 40, bottom: 40, height: 10, backgroundColor: "#e8b48c", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 490, bottom: 50, width: 120, height: 90, backgroundColor: "#2b2b4d", borderRadius: "50%", transform: "translateX(-50%)" }} />
            <div style={{ position: "absolute", left: 490, bottom: 50, width: 120, height: 90, borderRadius: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, color: TEAL, textAlign: "center" }}>
              STEM
              <br />
              CELLS
            </div>
            <div style={{ position: "absolute", left: 543, bottom: 120, width: 14, height: hairH9, backgroundColor: GOLD, borderRadius: 999, transform: `scale(${pulse9})`, transformOrigin: "50% 100%" }} />
            <div style={{ position: "absolute", left: 640, bottom: 220, fontSize: 30, fontWeight: 800, color: GOLD }}>
              NEW HAIR GROWS ↑
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, marginTop: 10, textAlign: "center" }}>
            A SECOND JOB
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 30, opacity: stamp9, textAlign: "center" }}>
            HARVARD • 2020 • CELL
          </div>
          <Sub>The same little muscle helps the stem cells that grow new hair.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
