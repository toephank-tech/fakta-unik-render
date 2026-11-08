import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts #102 — Less Sleep Makes You Hungrier
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT animated
// text cards. Dark navy + amber/orange hunger palette + gold + cyan.
// ALL on-screen content stays above y=1200 so it never collides with the
// burned-in subtitles (MarginV 640 -> subtitle zone starts ~y=1280).

const BG = "#0b0e1a";
const ORANGE = "#ff7a3d";
const AMBER = "#f4a93d";
const GOLD = "#f4c95d";
const CYAN = "#7fd4c1";
const RED = "#ff4d5e";
const WHITE = "#f2f2f5";
const GREY = "#c9c9cf";
const CARD = "#151b30";
const LINE = "#26304d";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#7a8bb0", fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

export const FactsLessSleepHungrierMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): ghrelin vs leptin — two messengers ----
  const s2 = frame;
  const pulse2 = 1 + 0.08 * Math.sin(s2 * 0.12);
  const rise2 = Array.from({ length: 8 }).map((_, i) => ({
    x: 120 + ((i * 113) % 840),
    y: 1000 + ((s2 * (2 + (i % 3)) + i * 170) % 150),
    o: 0.25 + 0.25 * Math.abs(Math.sin(s2 * 0.08 + i)),
    c: i % 2 === 0 ? ORANGE : CYAN,
  }));
  const shout2 = 1 + 0.15 * Math.abs(Math.sin(s2 * 0.15));

  // ---- S4 (300-600): leptin falls 18%, ghrelin rises 28% ----
  const s4 = frame - 300;
  const lep4 = interpolate(s4, [30, 220], [100, 82], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ghr4 = interpolate(s4, [30, 220], [100, 128], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow4 = 0.6 + 0.3 * Math.sin(s4 * 0.08);

  // ---- S6 (600-900): tired brain — self-control drains, reward lights up ----
  const s6 = frame - 600;
  const control6 = interpolate(s6, [30, 240], [100, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const reward6 = interpolate(s6, [30, 240], [20, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brainBob6 = Math.sin(s6 * 0.07) * 8;
  const star6 = 0.7 + 0.3 * Math.sin(s6 * 0.12);

  // ---- S8 (900-1200): PAYOFF — one extra hour of sleep, calories drop ----
  const s8 = frame - 900;
  const kcal8 = Math.round(interpolate(s8, [40, 250], [0, 270], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const moonPulse8 = 1 + 0.05 * Math.sin(s8 * 0.1);
  const fall8 = Array.from({ length: 10 }).map((_, i) => ({
    x: 120 + ((i * 83) % 840),
    y: 1010 + ((s8 * (3 + (i % 3)) + i * 137) % 140),
    o: 0.5,
  }));

  // ---- S9 (1200-1500): closing — sleep is the appetite switch ----
  const s9 = frame - 1200;
  const drift9 = Array.from({ length: 14 }).map((_, i) => ({
    x: (i * 167) % 1080,
    y: (80 + ((i * 211) % 1000) + s9 * (1 + (i % 3))) % 1150,
    size: 18 + ((i * 41) % 40),
  }));
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.1);
  const moonGlow9 = 0.55 + 0.3 * Math.sin(s9 * 0.06);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — two hormones, two messages */}
      {frame < 300 && (
        <AbsoluteFill>
          {rise2.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 16, height: 16, borderRadius: "50%", backgroundColor: d.c, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>TWO HORMONES, TWO MESSAGES</Kicker>
            <div style={{ display: "flex", gap: 40, marginTop: 50 }}>
              <div style={{ width: 400, height: 330, backgroundColor: CARD, border: `4px solid ${ORANGE}`, borderRadius: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 90, transform: `scale(${shout2})` }}>🍽️</div>
                <div style={{ fontSize: 46, fontWeight: 900, color: ORANGE, marginTop: 16 }}>GHRELIN</div>
                <div style={{ fontSize: 30, color: GREY, marginTop: 8 }}>FROM YOUR STOMACH</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: WHITE, marginTop: 14 }}>SHOUTS: EAT!</div>
              </div>
              <div style={{ width: 400, height: 330, backgroundColor: CARD, border: `4px solid ${CYAN}`, borderRadius: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 90, transform: `scale(${pulse2})` }}>😌</div>
                <div style={{ fontSize: 46, fontWeight: 900, color: CYAN, marginTop: 16 }}>LEPTIN</div>
                <div style={{ fontSize: 30, color: GREY, marginTop: 8 }}>FROM YOUR FAT CELLS</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: WHITE, marginTop: 14 }}>WHISPERS: FULL</div>
              </div>
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 50 }}>BOTH TALK TO YOUR BRAIN</div>
            <Sub>ONE SAYS EAT. THE OTHER SAYS STOP.<br />SLEEP DECIDES WHO SHOUTS LOUDEST.</Sub>
          </div>
        </AbsoluteFill>
      )}

      {/* S4 — leptin falls, ghrelin rises */}
      {frame >= 300 && frame < 600 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={ORANGE}>GHRELIN — THE HUNGER HORMONE</Kicker>
            <div style={{ fontSize: 96, fontWeight: 900, color: ORANGE, marginTop: 20 }}>+28%</div>
            <div style={{ marginTop: 20, width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden", boxShadow: `0 0 ${60 * glow4}px rgba(255,122,61,0.5)` }}>
              <div style={{ width: `${(ghr4 / 128 * 100).toFixed(1)}%`, height: "100%", backgroundColor: ORANGE, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: ORANGE, marginTop: 18 }}>⬆ HUNGER SIGNAL RISES</div>
          </div>
          <div style={{ position: "absolute", top: 780, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={CYAN}>LEPTIN — THE FULLNESS HORMONE</Kicker>
            <div style={{ fontSize: 96, fontWeight: 900, color: CYAN, marginTop: 20 }}>−18%</div>
            <div style={{ marginTop: 20, width: 860, height: 70, backgroundColor: LINE, borderRadius: 35, overflow: "hidden" }}>
              <div style={{ width: `${lep4.toFixed(1)}%`, height: "100%", backgroundColor: CYAN, borderRadius: 35 }} />
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: CYAN, marginTop: 18 }}>⬇ FULLNESS SIGNAL FALLS</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S6 — tired brain: control drains, reward lights up */}
      {frame >= 600 && frame < 900 && (
        <AbsoluteFill>
          <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>YOUR TIRED BRAIN</Kicker>
            <div style={{ fontSize: 100, marginTop: 30, transform: `translateY(${brainBob6}px)` }}>🧠</div>
            <div style={{ fontSize: 52, fontWeight: 900, color: WHITE, marginTop: 30 }}>SELF-CONTROL: DRAINING</div>
            <div style={{ marginTop: 30, width: 860, height: 64, backgroundColor: LINE, borderRadius: 32, overflow: "hidden" }}>
              <div style={{ width: `${control6.toFixed(1)}%`, height: "100%", backgroundColor: RED, borderRadius: 32 }} />
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 44 }}>REWARD CENTERS: LIGHTING UP</div>
            <div style={{ marginTop: 30, width: 860, height: 64, backgroundColor: LINE, borderRadius: 32, overflow: "hidden", boxShadow: `0 0 ${50 * star6}px rgba(244,201,93,0.6)` }}>
              <div style={{ width: `${reward6.toFixed(1)}%`, height: "100%", backgroundColor: GOLD, borderRadius: 32 }} />
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: WHITE, marginTop: 40 }}>🍩 JUNK FOOD LOOKS IRRESISTIBLE</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S8 — PAYOFF: one extra hour of sleep */}
      {frame >= 900 && frame < 1200 && (
        <AbsoluteFill>
          {fall8.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: 14, height: 14, borderRadius: "50%", backgroundColor: CYAN, opacity: d.o }} />
          ))}
          <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker>THE WILDEST PART?</Kicker>
            <div style={{ marginTop: 50, width: 280, height: 280, borderRadius: "50%", backgroundColor: "#f4e8c1", boxShadow: `0 0 110px rgba(244,232,193,0.8)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130, transform: `scale(${moonPulse8})` }}>🌙</div>
            <div style={{ fontSize: 56, fontWeight: 900, color: WHITE, marginTop: 50 }}>ONE EXTRA HOUR OF SLEEP</div>
            <div style={{ fontSize: 110, fontWeight: 900, color: CYAN, marginTop: 30 }}>−{kcal8} kcal</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 20 }}>EATEN PER DAY — NO DIET AT ALL</div>
          </div>
        </AbsoluteFill>
      )}

      {/* S9 — closing: sleep is the appetite switch */}
      {frame >= 1200 && frame < 1500 && (
        <AbsoluteFill>
          {drift9.map((d, i) => (
            <div key={i} style={{ position: "absolute", left: d.x, top: d.y, width: d.size, height: d.size, borderRadius: "50%", backgroundColor: GOLD, opacity: 0.4 }} />
          ))}
          <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 70px" }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", backgroundColor: "#f4e8c1", boxShadow: `0 0 ${110 * moonGlow9}px rgba(244,232,193,0.8)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 140, transform: `scale(${pulse9})` }}>🌙</div>
            <div style={{ marginTop: 60, fontSize: 50, fontWeight: 900, color: WHITE, textAlign: "center", lineHeight: 1.3 }}>DON'T BLAME YOUR<br />WILLPOWER.</div>
            <div style={{ marginTop: 40, fontSize: 54, fontWeight: 900, color: GOLD, textAlign: "center" }}>BLAME THE NIGHT BEFORE</div>
            <Sub>SLEEP IS YOUR APPETITE'S<br />SECRET SWITCH</Sub>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
