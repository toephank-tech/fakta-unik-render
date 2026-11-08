import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #116: Your Brain Is Most Active When You Daydream
// (priority queue rank 38, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dream palette: deep indigo / violet / gold / teal /
// coral for the payoff beats.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: MALE Rumpled Armchair (avocado_v2:vdc_22255), speed 95,
// atempo 1.05x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-07 before scripting):
// - Raichle et al. 2001 (PNAS 98:676-682), "A default mode of brain
//   function": regions MORE active at rest, quieter during focused tasks.
//   Core hubs: medial prefrontal cortex, posterior cingulate cortex,
//   precuneus, angular gyrus. Greicius et al. 2003: the hubs fire together
//   in sync at rest.
// - FRAMING: "most active" is RELATIVE — the DMN is more active at rest /
//   mind-wandering than during focused tasks, not "harder" in absolute terms.
// - Brain energy: ~2% of body weight, ~20% of the body's energy (Sokoloff
//   1953; Raichle "dark energy"). A focused task adds LESS than 5% on top
//   of the resting baseline — daydreaming runs at ~95% of full power.
// - Killingsworth & Gilbert 2010 (Science 330:932): iPhone app pinged
//   2,250 people; minds wandering 46.9% (~47%) of waking hours.
// - DMN jobs: self-referential thought, replaying memories, imagining the
//   future (Buckner et al. 2008; Andrews-Hanna et al. 2010).
// - CREATIVITY (association, not proof): Baird et al. 2012 (Psychological
//   Science 23:1117-1122): 145 people; an undemanding break that let minds
//   wander improved answers on REPEATED problems by about 40% vs demanding
//   task / rest / no break. NO benefit for brand-new problems.

const BG = "#0d0a24";
const VIOLET = "#a78bfa";
const AQUA = "#4cc9f0";
const TEAL = "#7fd4c1";
const GOLD = "#f4c95d";
const GREY = "#c9c9cf";
const MOON = "#e6e2ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || VIOLET, fontWeight: 700, textAlign: "center" }}>
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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8fa8d4", fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

// Content is centered in the UPPER portion: big bottom padding keeps every
// line of text above the subtitle zone (y < 1280).
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 640px" }}>
      {props.children}
    </div>
  );
}

export const FactsBrainDaydreamingMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2001 — Raichle names the default mode network ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210);
  const year2 = Math.round(1990 + 11 * fill2); // 1990 -> 2001
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): 2% weight vs 20% energy — TRUE bars ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210); // bars grow over 7s
  // Scale: 20% = 760px track. Weight 2% -> 76px; energy 20% -> 760px.
  const barWeight4 = Math.max(76 * fill4, fill4 > 0 ? 6 : 0);
  const barEnergy4 = Math.max(760 * fill4, fill4 > 0 ? 6 : 0);
  const pulse4 = 1 + 0.04 * Math.sin(s4 * 0.12);

  // ---- S6 (600-900): three DMN jobs — cards appear one by one ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const card1 = s6 >= 30 ? 1 : 0;
  const card2 = s6 >= 100 ? 1 : 0;
  const card3 = s6 >= 170 ? 1 : 0;
  const bob6 = 8 * Math.sin(s6 * 0.09);

  // ---- S8 (900-1200): 47% mind-wandering + 40% creative boost — TRUE bars ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210); // bars grow over 7s
  // Scale: 100% = 760px track. 47% -> 357px; 40% -> 304px.
  const barWander8 = Math.max(357 * fill8, fill8 > 0 ? 6 : 0);
  const barBoost8 = Math.max(304 * fill8, fill8 > 0 ? 6 : 0);
  const pulse8 = 1 + 0.05 * Math.sin(s8 * 0.12);

  // ---- S9 (1200-1500): PAYOFF — default switch flips OFF -> ON ----
  const s9 = frame - 1200;
  const on9 = s9 >= 120 ? 1 : 0; // toggle flips at frame ~120
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 2001: Raichle names the default mode network */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>BEFORE 2001, REST WAS JUST “NOISE”</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #a78bfa, #6d28d9 60%, #4c1d95)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, transform: `scale(${pulse2})` }}>
              💭
            </div>
            <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, marginTop: 20, textAlign: "center", lineHeight: 1 }}>
              {year2}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              THE YEAR REST GOT A NAME
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            THE DEFAULT MODE
            <br />
            NETWORK
          </div>
          <Sub>Scientist Marcus Raichle found a hidden network that lights up when you stop focusing.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Raichle et al. 2001 — PNAS
          </div>
        </Center>
      )}

      {/* S4 — 2% of weight, 20% of energy */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE SHOCKER</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>⚖️ BRAIN WEIGHT</span>
                <span style={{ color: AQUA }}>2%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWeight4, height: 44, backgroundColor: AQUA, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>⚡ ENERGY IT BURNS</span>
                <span style={{ color: GOLD }}>20%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barEnergy4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>SCALE: 20% = FULL BAR</span>
              <span>EVEN AT REST</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse4})` }}>
            2% WEIGHT,
            <br />
            20% ENERGY
          </div>
          <Sub>Your brain is tiny — but it burns a fifth of everything your body spends.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Sokoloff 1953 • Raichle’s “dark energy”
          </div>
        </Center>
      )}

      {/* S6 — the DMN's three jobs */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>SO WHAT IS IT DOING?</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginTop: 36, width: 860 }}>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #a78bfa", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: card1 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: VIOLET }}>🔁 REPLAYING MEMORIES</div>
            </div>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #4cc9f0", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: card2 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: AQUA }}>💬 REHEARSING CONVERSATIONS</div>
            </div>
            <div style={{ backgroundColor: "#1a1440", border: "3px solid #f4c95d", borderRadius: 24, padding: "22px 28px", textAlign: "center", opacity: card3 }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: GOLD }}>🔮 IMAGINING YOUR FUTURE</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2, transform: `translateY(${bob6}px)` }}>
            YOUR MIND,
            <br />
            TALKING TO ITSELF
          </div>
          <Sub>The default network replays your past and rehearses what comes next.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Buckner et al. 2008 • Andrews-Hanna et al. 2010
          </div>
        </Center>
      )}

      {/* S8 — Harvard 47% + Baird 40% creative boost */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={VIOLET}>HOW OFTEN DO WE DRIFT OFF?</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>💭 MIND WANDERING</span>
                <span style={{ color: VIOLET }}>47%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barWander8, height: 44, backgroundColor: VIOLET, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>💡 CREATIVE BOOST</span>
                <span style={{ color: TEAL }}>+40%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barBoost8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", fontWeight: 700 }}>
              <span>OF WAKING HOURS</span>
              <span>ON PROBLEMS ALREADY TRIED</span>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: VIOLET, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            NEARLY HALF
            <br />
            OF YOUR DAY
          </div>
          <Sub>Harvard pinged 2,250 people — and a wandering mind gave 40% more creative answers.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Killingsworth &amp; Gilbert 2010 • Baird et al. 2012, 145 people
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: the default switch is ON */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ width: 420, height: 200, borderRadius: 999, backgroundColor: on9 ? "#3d2b00" : "#2a2438", border: `6px solid ${on9 ? GOLD : "#5b5470"}`, display: "flex", alignItems: "center", padding: 16, transform: `scale(${pulse9})` }}>
              <div style={{ width: 160, height: 160, borderRadius: "50%", backgroundColor: on9 ? GOLD : "#5b5470", marginLeft: on9 ? 228 : 0, transition: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, fontWeight: 900, color: on9 ? "#3d2b00" : "#cfc9e0" }}>
                {on9 ? "ON" : "OFF"}
              </div>
            </div>
            <div style={{ fontSize: 44, fontWeight: 800, color: MOON, marginTop: 24, textAlign: "center" }}>
              {on9 ? "YOUR BRAIN’S DEFAULT SETTING" : "WAITING…"}
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: on9, textAlign: "center", lineHeight: 1.2 }}>
            NOT OFF — ON.
            <br />
            DREAMING.
          </div>
          <Sub>When you stop focusing, your brain does not power down. It switches on — and dreams.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            The default mode network — Raichle 2001
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
