import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #173: Blind People Dream Too — But Not in Pictures
// (priority queue rank 23, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / cold-blue palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE percentages on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative dots live in their own
// band and never cross text lines.
// TONE: respectful, factual — never pitying. The science is the star.
// FACTS (all verified 2026-11-07 before scripting):
// - Hurovitz et al. 1999 (372 dreams, 15 blind adults): blind since birth
//   or before age 5 -> NO visual imagery; blind after age 7 -> visual dreams.
// - Meaidi et al. 2014 (Sleep Medicine; 11 congenital, 14 late, 25 sighted;
//   4-week diaries): congenitally blind — no visual content, MORE sound /
//   taste / smell / touch; nightmares 25% vs 7% late vs 6% sighted.
// - Sighted baseline: under 1% of dreams have taste/smell/touch references
//   (Snyder 1970; Zadra et al. 1998, cited in Hurovitz 1999) — TRUE 1% bar.
// - Fading: ScienceNordic on Meaidi — the longer blind, the fewer dreams
//   with any visual content (trend only, no fake time course).
// - Bértolo et al. 2003 (EEG, REM): visual cortex activation in congenitally
//   blind during REM similar to sighted dreamers, despite no visual imagery.
// - Sadato et al. 1996 (Nature): visual cortex activated by Braille/touch.
//   Cohen et al. 1997 (Nature): disrupting occipital cortex impairs touch
//   in blind subjects — cross-modal plasticity, functionally relevant.

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

const TRACK = 760; // px width of a 100% bar

export const FactsBlindDreamsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the age line — before 5: no pictures; after 7: pictures remain ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const cardA2 = Math.min(1, Math.max(0, (s2 - 30) / 60)); // born-blind card slides in
  const cardB2 = Math.min(1, Math.max(0, (s2 - 120) / 60)); // late-blind card slides in
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): senses — sighted <1% taste/smell/touch (TRUE %) vs far more ----
  // Sighted bar: TRUE 1% -> 7.6px of 760px (Snyder 1970; Zadra et al. 1998).
  // Blind bar: QUALITATIVE width (0.85) labelled "FAR MORE" — the studies
  // report "more" / "very high percentage" without one exact number, so NO
  // fake % is printed; width is illustrative only.
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const sense4 = [0, 70, 140, 210].map((d) => Math.min(1, Math.max(0, (s4 - d) / 60)));
  const sighted4 = Math.min(1, s4 / 120); // tiny 1% bar grows
  const blind4 = Math.min(1, Math.max(0, (s4 - 90) / 120)); // qualitative bar grows
  const sightedW4 = sighted4 * TRACK * 0.01; // 1% — TRUE percentage
  const blindW4 = blind4 * TRACK * 0.85; // qualitative, labelled FAR MORE (no %)

  // ---- S6 (600-900): pictures fade slowly, year by year ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fade6 = Math.max(0.12, 1 - s6 / 300); // photo brightness fades over the scene
  const arrow6 = Math.min(1, s6 / 150); // arrow draws left -> right
  const early6 = Math.min(1, Math.max(0, (s6 - 40) / 60));
  const late6 = Math.min(1, Math.max(0, (s6 - 160) / 60));

  // ---- S8 (900-1200): REM sleep — visual cortex still lights up (Bértolo 2003) ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const glow8 = 0.55 + 0.45 * Math.sin(s8 * 0.15); // cortex glow pulses
  const drift8 = Array.from({ length: 10 }).map((_, i) => ({
    x: 40 + ((i * 149) % 680),
    y: 10 + ((i * 61) % 60),
    speed: 0.8 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 14),
  }));

  // ---- S9 (1200-1500): PAYOFF — the seeing brain learns to feel ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.1);
  const ring9 = Math.min(1, s9 / 120); // rewiring ring draws in
  const dots9 = [0, 1, 2, 3, 4, 5].map((i) => ({
    on: Math.min(1, Math.max(0, (s9 - 40 - i * 30) / 40)),
    lit: i % 2 === 0,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the age line: before 5 no pictures, after 7 pictures remain */}
      {frame < 300 && (
        <Center>
          <Kicker>IT DEPENDS ON WHEN</Kicker>
          <div style={{ fontSize: 52, fontWeight: 900, color: "white", marginTop: 28, textAlign: "center", lineHeight: 1.2 }}>
            SIGHT WAS LOST
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 40, width: 860 }}>
            <div style={{ backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 28px", opacity: cardA2, transform: `scale(${pulse2})` }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>BORN BLIND / BEFORE AGE 5</span>
                <span style={{ color: BLUE }}>NO PICTURES</span>
              </div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 10, lineHeight: 1.35 }}>No visual imagery reported in dreams</div>
            </div>
            <div style={{ backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 28px", opacity: cardB2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>BLIND AFTER AGE 7</span>
                <span style={{ color: GOLD }}>PICTURES REMAIN</span>
              </div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 10, lineHeight: 1.35 }}>Visual dreams continue, often for years</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp2, textAlign: "center" }}>
            THE AGE LINE
          </div>
          <Sub>When sight was lost decides what dreams are made of.</Sub>
        </Center>
      )}

      {/* S4 — senses: sighted <1% taste/smell/touch (TRUE %) vs far more */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>BUILT FROM THE OTHER SENSES</Kicker>
          <div style={{ display: "flex", gap: 24, marginTop: 32 }}>
            {["🔊 SOUND", "✋ TOUCH", "👃 SMELL", "👅 TASTE"].map((label, i) => (
              <div key={label} style={{ width: 200, backgroundColor: "#1c1c30", borderRadius: 20, padding: "22px 10px", textAlign: "center", opacity: sense4[i], transform: `translateY(${(1 - sense4[i]) * 30}px)` }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: i === 0 ? GOLD : i === 1 ? BLUE : i === 2 ? TEAL : RED }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 44, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>SIGHTED DREAMS — TASTE, SMELL &amp; TOUCH</span>
                <span style={{ color: GREY }}>UNDER 1%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: Math.max(sightedW4, sighted4 > 0 ? 8 : 0), height: 44, backgroundColor: GREY, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>of dream reports mention them at all</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>BORN-BLIND DREAMS</span>
                <span style={{ color: GOLD }}>FAR MORE</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: blindW4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>sound, touch, smell and taste fill the dream</div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp4, textAlign: "center" }}>
            THE SAME DREAM, DIFFERENT SENSES
          </div>
        </Center>
      )}

      {/* S6 — pictures fade slowly, year by year */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE PICTURES FADE — SLOWLY</Kicker>
          <div style={{ display: "flex", gap: 28, marginTop: 36, alignItems: "center" }}>
            <div style={{ width: 380, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center", opacity: early6 }}>
              <div style={{ fontSize: 64 }}>🖼️</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: GOLD, marginTop: 8 }}>EARLY ON</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 8, lineHeight: 1.35 }}>Many dreams still have pictures</div>
            </div>
            <div style={{ fontSize: 64, color: GOLD, opacity: arrow6 }}>→</div>
            <div style={{ width: 380, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center", opacity: late6 }}>
              <div style={{ fontSize: 64, opacity: fade6 }}>🖼️</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: BLUE, marginTop: 8 }}>YEARS LATER</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 8, lineHeight: 1.35 }}>Fewer and fewer visual dreams</div>
            </div>
          </div>
          <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44, overflow: "hidden" }}>
            <div style={{ width: fade6 * TRACK, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp6, textAlign: "center" }}>
            YEAR BY YEAR, THEY FADE
          </div>
          <Sub>The longer without sight, the fewer visual dreams.</Sub>
        </Center>
      )}

      {/* S8 — REM sleep: the visual cortex still lights up (Bértolo 2003) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>REM SLEEP — EYES CLOSED, BRAIN AWAKE</Kicker>
          <div style={{ position: "relative", width: 940, height: 100, overflow: "hidden", marginTop: 16 }}>
            {drift8.map((d, i) => {
              const x = ((d.x + s8 * d.speed) % 900) - 20;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y, opacity: 0.75 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? BLUE : GOLD, boxShadow: "0 0 12px rgba(90,169,255,0.7)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ position: "relative", marginTop: 10, width: 320, height: 320, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `10px solid ${BLUE}`, opacity: 0.35 + 0.4 * glow8, transform: `scale(${0.9 + 0.1 * glow8})` }} />
            <div style={{ fontSize: 150 }}>🧠</div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: BLUE, marginTop: 30, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            VISUAL CORTEX:
            <br />
            STILL ACTIVE
          </div>
          <Sub>No pictures reported — but the brain area fires just like in sighted dreamers.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            EEG during REM sleep — Bértolo and colleagues, 2003
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: the seeing brain learns to feel */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", marginTop: 30, width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `10px solid ${GOLD}`, opacity: ring9, transform: `scale(${0.85 + 0.15 * ring9})` }} />
            <div style={{ fontSize: 140, transform: `scale(${pulse9})` }}>✋</div>
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 30, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            THE SEEING BRAIN
            <br />
            LEARNS TO FEEL
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
            {dots9.map((d, i) => (
              <div key={i} style={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: d.lit ? GOLD : "#1c1c30", border: `3px solid ${GOLD}`, opacity: 0.35 + 0.65 * d.on }} />
            ))}
          </div>
          <Sub>The visual cortex does not go dark — it gets rewired for touch and sound.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Braille reading lights up the visual cortex — Sadato, 1996
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
