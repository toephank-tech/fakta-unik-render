import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #5: Déjà Vu Is a Glitch in Your Memory
// (priority queue rank 40, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Déjà vu palette: deep indigo / violet / gold / teal.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: MALE Rumpled Armchair (avocado_v2:vdc_22255), speed 95,
// atempo 1.017x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-08 before scripting):
// - "Déjà vu" = French for "already seen". About 60-70% of people report
//   it at least once (O'Connor & Moulin 2010; pooled 41 studies ~67% =
//   about two in three). Script says "about two in three ... at least
//   once" — safe, inside every cited range.
// - Age peak 15-25, declines steadily with age (Brown 2004; Cleary &
//   Brown 2022; Live Science 2003 study).
// - Mechanism is STILL DEBATED — presented as theories only: a familiarity
//   signal from the medial temporal lobe / rhinal (perirhinal) cortex
//   fires without a matching episodic memory (O'Connor & Moulin 2010;
//   eachbrainmatters: "no single agreed upon model"). Timing mismatch
//   between two processing streams is ONE leading theory.
// - Epilepsy link, careful: frequent déjà vu can be an aura of temporal
//   lobe (medial temporal lobe) seizures (Warren-Gash & Zeman 2013;
//   Neuropsychologia 2012). Occasional déjà vu in healthy people is
//   normal. Script says "if it happens often, see a doctor" — no diagnosis.
// - Lab recreation: Cleary et al. 2012 (Consciousness and Cognition) —
//   VR scenes built in The Sims ("Deja ville"); new scenes with the SAME
//   spatial layout as earlier scenes triggered déjà vu most often.
// - PAYOFF: Cleary et al. 2018 (Psychological Science, n=298) — people
//   who felt déjà vu also felt they could predict what happened next,
//   but their predictions were NO BETTER THAN CHANCE. Déjà vu predicts
//   nothing.

const BG = "#0d0a24";
const VIOLET = "#a78bfa";
const AQUA = "#4cc9f0";
const TEAL = "#7fd4c1";
const GOLD = "#f4c95d";
const GREY = "#c9c9cf";
const MOON = "#e6e2ff";
const CORAL = "#ff8a7a";

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

export const FactsDejaVuMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): about two in three people have felt it ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // bar + counter grow over 7s
  // Scale: 100% = 760px track. Range 60-70%: bar drawn to midpoint 65% -> 494px.
  const bar2 = Math.max(494 * fill2, fill2 > 0 ? 6 : 0);
  const count2 = Math.round(2 * fill2);
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): temporal lobe fires "this feels familiar" ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);
  // A signal dot travels along the pathway, looping every 150 frames.
  const dot4 = ((s4 % 150) / 150) * 640;
  const glow4 = 0.6 + 0.4 * Math.sin(s4 * 0.15);

  // ---- S6 (600-900): two streams slightly out of sync ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // Stream 1 dot loops every 120 frames; stream 2 every 150 — they drift apart.
  const dotA6 = ((s6 % 120) / 120) * 700;
  const dotB6 = ((s6 % 150) / 150) * 700;
  const gap6 = Math.round(Math.abs(dotA6 - dotB6) / 7);

  // ---- S8 (900-1200): same hidden layout — garden vs junkyard ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse8 = 1 + 0.04 * Math.sin(s8 * 0.12);
  // The matching layout cell blinks in both rooms at once.
  const blink8 = s8 % 60 < 30 ? 1 : 0.35;

  // ---- S9 (1200-1500): PAYOFF — it predicts nothing ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const big9 = s9 >= 90 ? 1 : 0;
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);
  // Dice tumble gently — the prediction is pure chance.
  const roll9 = 12 * Math.sin(s9 * 0.1);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — about two in three people have felt déjà vu */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>FRENCH FOR “ALREADY SEEN”</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1, transform: `scale(${pulse2})` }}>
              {count2} IN 3
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              PEOPLE HAVE FELT IT AT LEAST ONCE
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🌍 HAVE FELT DÉJÀ VU</span>
                <span style={{ color: GOLD }}>60–70%</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: bar2, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8fa8d4", marginTop: 8 }}>
                <span>0%</span>
                <span>pooled studies: about 67%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            ABOUT TWO IN THREE
          </div>
          <Sub>Most of us have had that “I’ve been here before” feeling.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            O’Connor &amp; Moulin 2010 • pooled 41 studies ~67%
          </div>
        </Center>
      )}

      {/* S4 — the temporal lobe fires a familiarity signal */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>DEEP IN YOUR TEMPORAL LOBE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #2a1b5e, #1a1440 65%)", border: "4px solid #a78bfa", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transform: `scale(${pulse4})` }}>
              <div style={{ width: 130, height: 130, borderRadius: "50%", backgroundColor: `rgba(244, 201, 93, ${glow4})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🧠</div>
              <div style={{ position: "absolute", top: 18, left: 0, right: 0, textAlign: "center", fontSize: 26, fontWeight: 900, color: GOLD }}>TEMPORAL LOBE</div>
            </div>
            <div style={{ position: "relative", width: 700, height: 60, marginTop: 28 }}>
              <div style={{ position: "absolute", left: 30, right: 30, top: 26, height: 8, backgroundColor: "#16233f", borderRadius: 999 }} />
              <div style={{ position: "absolute", left: 30 + dot4, top: 14, width: 32, height: 32, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 24px #f4c95d" }} />
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, textAlign: "center" }}>
              A SMALL REGION FIRES: “THIS FEELS FAMILIAR”
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            FAMILIARITY
            <br />
            FIRES FIRST
          </div>
          <Sub>Scientists think the signal comes from the medial temporal lobe.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            One leading account — the cause is still debated
          </div>
        </Center>
      )}

      {/* S6 — two streams, slightly out of sync */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>ONE LEADING THEORY</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>STREAM 1 — SEEING</span>
                <span style={{ color: AQUA }}>FAST</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10 }}>
                <div style={{ position: "absolute", left: dotA6, top: 4, width: 32, height: 32, borderRadius: "50%", backgroundColor: AQUA, boxShadow: "0 0 20px #4cc9f0" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>STREAM 2 — REMEMBERING</span>
                <span style={{ color: GOLD }}>A BEAT LATE</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#16233f", borderRadius: 999, marginTop: 10 }}>
                <div style={{ position: "absolute", left: dotB6, top: 4, width: 32, height: 32, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 20px #f4c95d" }} />
              </div>
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, textAlign: "center" }}>
              THE TWO STREAMS DRIFT APART BY {gap6} BEATS
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            A TIMING
            <br />
            GLITCH
          </div>
          <Sub>Same moment, processed twice — slightly out of sync.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            A leading theory, not settled fact
          </div>
        </Center>
      )}

      {/* S8 — scientists recreate déjà vu in a lab: same hidden layout */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={AQUA}>CREATED IN A LAB</Kicker>
          <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: TEAL }}>🌳 A GARDEN</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 90px)", gridTemplateRows: "repeat(3, 90px)", gap: 10, marginTop: 16 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} style={{ borderRadius: 16, backgroundColor: i === 4 ? `rgba(127, 212, 193, ${blink8})` : "#1a1440", border: "3px solid #7fd4c1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>
                    {i === 4 ? "🌸" : ""}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: CORAL }}>🗑️ A JUNKYARD</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 90px)", gridTemplateRows: "repeat(3, 90px)", gap: 10, marginTop: 16 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} style={{ borderRadius: 16, backgroundColor: i === 4 ? `rgba(255, 138, 122, ${blink8})` : "#1a1440", border: "3px solid #ff8a7a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34 }}>
                    {i === 4 ? "📦" : ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: AQUA, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse8})` }}>
            SAME HIDDEN
            <br />
            LAYOUT
          </div>
          <Sub>Different rooms, identical layout — and déjà vu fires.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Cleary et al. 2012 — virtual-reality “Deja ville”
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: it predicts nothing */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ fontSize: 120, transform: `rotate(${roll9}deg) scale(${pulse9})`, lineHeight: 1 }}>🎲</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 24, textAlign: "center" }}>
              YOU FEEL YOU KNOW WHAT’S NEXT
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: big9, textAlign: "center", lineHeight: 1.2 }}>
            IT PREDICTS
            <br />
            NOTHING
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: TEAL, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            NO BETTER THAN CHANCE — CLEARY 2018
          </div>
          <Sub>In tests, people’s “predictions” were pure guesswork.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
