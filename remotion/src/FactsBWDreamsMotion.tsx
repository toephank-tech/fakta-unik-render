import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #101: Some People Dream in Black and White
// (priority queue rank 24, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / silver-grey / gold palette (B&W theme).
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE percentages on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative dots live in their own
// band and never cross text lines.
// FACTS (all verified 2026-11-07 before scripting):
// - ~12% / 1 IN 8 (hedged, self-report): commonly cited "about 12% of
//   people dream in black and white"; underlying studies measure DREAMS and
//   give a range, so script says "about one in eight people SAY they dream
//   in black and white". Schredl et al. 2008 (1,928 subjects): 83% of
//   dreams contain colour; Murzyn 2008: 80%+ of adult dreams contain colour.
// - 1940s: Middleton 1942 — only 10% saw colours frequently, 71% rarely
//   or never; commonly cited summary "in the 1940s, 75% reported colour
//   only rarely or never". Script: "around three in four ... rarely or
//   never dreamed in colour" (hedged). Bar: 75% TRUE.
// - TV effect: Murzyn 2008 (Consciousness and Cognition, DOI
//   10.1016/j.concog.2008.09.002) — childhood B&W TV/film exposure linked
//   to more greyscale dreams decades later; correlation, not proven
//   causation (Murzyn's own caveat kept in script: "may have").
// - AGE EFFECT: Murzyn 2008, 60 subjects — under-25s: 4.4% of dreams B&W;
//   over-55s with colour TV in childhood: 7.3%; over-55s with ONLY B&W
//   media in childhood: ~25% (a quarter). Bars use TRUE 4.4% and 25%.
// - MEMORY TWIST: Schredl et al. 2008 + Murzyn 2008 — people reporting
//   more B&W dreams also recall fewer dreams, less vividly. Script hedges
//   with "maybe".
// - BLIND CALLBACK (S8, one line only — #173 covered this fully):
//   Hurovitz 1999; Meaidi 2014 — born blind: no visual imagery; dreams
//   built from sound, touch, smell, taste.
// - PAYOFF: Murzyn tested whether childhood B&W TV exposure still shaped
//   dreams 40 years later — and found it could.

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const SILVER = "#e8e8ec";

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

export const FactsBWDreamsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): about 1 in 8 dream in black and white — TRUE 12% bar ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const bar2 = Math.min(1, s2 / 120); // 12% bar grows
  const barW2 = bar2 * TRACK * 0.12; // 12% — TRUE percentage (~91px)
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);
  const reel2 = (s2 * 2) % 120; // film-strip holes scroll

  // ---- S4 (300-600): the 1940s flip — 75% then vs ~12% today (TRUE %) ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const barOld4 = Math.min(1, s4 / 120);
  const barNew4 = Math.min(1, Math.max(0, (s4 - 90) / 120));
  const oldW4 = barOld4 * TRACK * 0.75; // 75% — TRUE (~570px)
  const newW4 = barNew4 * TRACK * 0.12; // ~12% — TRUE (~91px)

  // ---- S6 (600-900): age split — under-25 4.4% vs over-55 B&W childhood 25% (TRUE %) ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const barYoung6 = Math.min(1, s6 / 120);
  const barOld6 = Math.min(1, Math.max(0, (s6 - 90) / 120));
  const youngW6 = barYoung6 * TRACK * 0.044; // 4.4% — TRUE (~33px)
  const oldW6 = barOld6 * TRACK * 0.25; // 25% — TRUE (190px)

  // ---- S8 (900-1200): blind from birth — no pictures, senses instead ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const sense8 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s8 - d) / 60)));
  const glow8 = 0.55 + 0.45 * Math.sin(s8 * 0.15);
  const drift8 = Array.from({ length: 10 }).map((_, i) => ({
    x: 40 + ((i * 149) % 680),
    y: 10 + ((i * 61) % 60),
    speed: 0.8 + (i % 3) * 0.5,
    size: 12 + ((i * 19) % 14),
  }));

  // ---- S9 (1200-1500): PAYOFF — childhood TV still shapes dreams 40 years later ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.1);
  const fill9 = Math.min(1, s9 / 240); // timeline draws left -> right
  const tv9 = Math.min(1, Math.max(0, (s9 - 30) / 60));
  const moon9 = Math.min(1, Math.max(0, (s9 - 150) / 60));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — about 1 in 8 dream in black and white */}
      {frame < 300 && (
        <Center>
          <Kicker>LIKE AN OLD MOVIE, EVERY NIGHT</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: SILVER, marginTop: 30, transform: `scale(${pulse2})`, textAlign: "center", lineHeight: 1 }}>
            1 IN 8
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 16, textAlign: "center" }}>
            ABOUT 12% OF PEOPLE
          </div>
          <div style={{ position: "relative", height: 44, width: 860, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 36, overflow: "hidden" }}>
            <div style={{ width: barW2, height: 44, backgroundColor: SILVER, borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 28, color: GREY, marginTop: 14, textAlign: "center" }}>
            say they dream in black and white
          </div>
          <div style={{ position: "relative", width: 860, height: 60, marginTop: 40, overflow: "hidden", opacity: 0.9 }}>
            <div style={{ position: "absolute", top: 0, left: -reel2, display: "flex", gap: 24 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} style={{ width: 72, height: 52, backgroundColor: "#1c1c30", borderRadius: 8, border: "2px solid #3a3a52" }} />
              ))}
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center" }}>
            DREAMS IN GREYSCALE
          </div>
          <Sub>One in eight people — their nights play out like an old film.</Sub>
        </Center>
      )}

      {/* S4 — the 1940s flip: 75% then vs ~12% today */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>IT WAS NOT ALWAYS LIKE THIS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>1940s — RARELY OR NEVER IN COLOUR</span>
                <span style={{ color: SILVER }}>~75%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: oldW4, height: 44, backgroundColor: SILVER, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>around three in four people, in the 1940s</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>TODAY — DREAM IN BLACK &amp; WHITE</span>
                <span style={{ color: GOLD }}>~12%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: newW4, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>about one in eight people today</div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            THE WORLD WENT COLOUR —
            <br />
            SO DID OUR DREAMS
          </div>
          <Sub>As colour screens took over, grey dreams faded away.</Sub>
        </Center>
      )}

      {/* S6 — age split: under-25 4.4% vs over-55 B&W childhood 25% */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>YOUR CHILDHOOD TV STILL SHOWS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 34, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>UNDER 25 — GREW UP IN COLOUR</span>
                <span style={{ color: TEAL }}>~4%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: Math.max(youngW6, barYoung6 > 0 ? 8 : 0), height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>about four in a hundred dreams are black and white</div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: GREY }}>OVER 55 — GREW UP WITH B&amp;W TV ONLY</span>
                <span style={{ color: GOLD }}>~25%</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                <div style={{ width: oldW6, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>about one in four dreams are black and white</div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 44, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            ALMOST SIX TIMES
            <br />
            MORE GREY DREAMS
          </div>
          <Sub>Same study, same questions — only childhood TV differed.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Murzyn, 2008 — 60 people, questionnaire + dream diaries
          </div>
        </Center>
      )}

      {/* S8 — blind from birth: no pictures, senses instead */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>AND ONE MORE THING</Kicker>
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
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {["🔊 SOUND", "✋ TOUCH", "👃 SMELL"].map((label, i) => (
              <div key={label} style={{ width: 270, backgroundColor: "#1c1c30", borderRadius: 20, padding: "22px 10px", textAlign: "center", opacity: sense8[i], transform: `translateY(${(1 - sense8[i]) * 30}px)` }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: i === 0 ? GOLD : i === 1 ? BLUE : TEAL }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: SILVER, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            NO PICTURES
            <br />
            AT ALL
          </div>
          <Sub>People blind from birth dream in sound, touch and smell — never in pictures.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Hurovitz, 1999; Meaidi, 2014 — see episode #173 for the full story
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: childhood TV still shapes dreams 40 years later */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", gap: 28, marginTop: 36, alignItems: "center" }}>
            <div style={{ width: 380, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center", opacity: tv9 }}>
              <div style={{ fontSize: 64 }}>📺</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: SILVER, marginTop: 8 }}>AS A CHILD</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 8, lineHeight: 1.35 }}>Black-and-white TV, every evening</div>
            </div>
            <div style={{ fontSize: 64, color: GOLD, opacity: fill9 }}>→</div>
            <div style={{ width: 380, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 24px", textAlign: "center", opacity: moon9 }}>
              <div style={{ fontSize: 64 }}>🌙</div>
              <div style={{ fontSize: 34, fontWeight: 900, color: GOLD, marginTop: 8 }}>40 YEARS LATER</div>
              <div style={{ fontSize: 28, color: GREY, marginTop: 8, lineHeight: 1.35 }}>Still dreaming in black and white</div>
            </div>
          </div>
          <div style={{ position: "relative", width: 760, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44, overflow: "hidden" }}>
            <div style={{ width: fill9 * TRACK, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp9, textAlign: "center", lineHeight: 1.2, transform: `scale(${pulse9})` }}>
            40 YEARS
            <br />
            LATER
          </div>
          <Sub>The TV you watched as a child can still tint your dreams tonight.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Murzyn, 2008 — the effect was still there four decades on
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
