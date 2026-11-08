import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 3 (#43): You Dream 2 Hours Every Night (LONG version of Ep.43 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep night purple / dream gold / lavender / coral (dream theme).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - 20-25% of sleep is REM, ~2 hours/night, cycles ~90 min (NINDS / NIH).
// - 4-6 dreams per night, one per REM cycle (National Sleep Foundation).
// - REM brain activity near waking; body paralyzed — REM atonia (NINDS).
// - Dreams replay the day: memory consolidation, emotion processing
//   (Wamsley & Stickgold, Harvard 2014; UC Irvine 2024).
// - Most common dream themes: being chased 81.5%, falling 73.8%
//   (Nielsen et al. 2003, Typical Dreams Questionnaire).
// - REM rebound: deprive REM and the brain fights back — more, longer REM (Dement).
// - Sleep paralysis ~8% of people (Int J Appl Basic Med Res).
// - Nightmares regularly affect 2-8% of adults (AASM ICSD-3, 2014).
// - Lifetime: ~6 years spent dreaming (NIH; Pearson; Cambridge CIE).

const BG = "#0d0a24";
const VIOLET = "#8b7cff";
const GOLD = "#f4c95d";
const CORAL = "#ff8a7a";
const GREY = "#c9c9cf";
const MOON = "#e8e4ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 26, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

// Content lives in the UPPER portion only: y 70-520, well above the
// landscape subtitle zone (y ~560-720 at MarginV 360, font 60).
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 140px 560px" }}>
      {props.children}
    </div>
  );
}

function Stamp(props: { children: React.ReactNode; color?: string; visible: boolean }) {
  return (
    <div style={{ fontSize: 44, fontWeight: 900, color: props.color || GOLD, marginTop: 18, opacity: props.visible ? 1 : 0, textAlign: "center", lineHeight: 1.2 }}>
      {props.children}
    </div>
  );
}

function Label(props: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

export const FactsDreams2HoursLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2 hours, 20-25% of sleep, 90-min cycles ----
  // TRUE proportion: 120 min of a 480-min (8h) night = 25% of the bar.
  const s2 = frame;
  const fill2 = Math.min(1, s2 / 210);
  const count2 = Math.round(120 * fill2);

  // ---- S4 (300-600): 4-6 dreams a night, one per cycle ----
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);
  const dreams4 = Math.min(6, Math.floor(s4 / 45) + 1);

  // ---- S6 (600-900): brain awake-level, body paralyzed ----
  // No fake precise number: brain side is a pulsing glow ("near-waking"),
  // body side is 0% movement (paralyzed).
  const s6 = frame - 600;
  const pulse6 = 1 + 0.06 * Math.pow(Math.max(0, Math.sin(((s6 % 30) / 30) * Math.PI * 2)), 2);

  // ---- S8 (900-1200): replaying the day — memories filed, emotions processed ----
  const s8 = frame - 900;
  const fill8 = Math.min(1, s8 / 210);
  const filed8 = Math.min(3, Math.floor(s8 / 70) + 1);

  // ---- S10 (1200-1500): chased 81.5% vs falling 73.8% (TRUE proportions) ----
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 210);
  const chase10 = 81.5 * fill10; // percent of bar width (TRUE proportion)
  const fall10 = 73.8 * fill10;

  // ---- S12 (1500-1800): REM rebound — more, longer, more intense ----
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);
  const rebound12 = 1 + 0.35 * fill12;

  // ---- S14 (1800-2100): sleep paralysis ~8% ----
  const s14 = frame - 1800;
  const fill14 = Math.min(1, s14 / 210);
  const count14 = Math.round(8 * fill14);

  // ---- S16 (2100-2400): nightmares 2-8% ----
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);

  // ---- S18 (2400-2700): closing — 6 years of movies ----
  const s18 = frame - 2400;
  const glow18 = 0.55 + 0.45 * Math.sin((s18 / 30) * Math.PI * 2) * 0.5 + 0.45;

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — 2 hours, 20-25% of sleep, 90-minute cycles */}
      {frame < 300 && (
        <Center>
          <Kicker>HOW MUCH OF YOUR NIGHT IS DREAMING?</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: VIOLET, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count2} <span style={{ fontSize: 56 }}>MIN</span>
          </div>
          <Label>ABOUT TWO HOURS — 20&ndash;25% OF YOUR SLEEP</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#241f4d", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 1100 * 0.25 * fill2, height: 40, backgroundColor: VIOLET, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 275, top: 0, width: 4, height: 40, backgroundColor: "#ffffff", opacity: 0.85 }} />
          </div>
          <Stamp visible={s2 >= 60}>IN CYCLES OF ABOUT 90 MINUTES</Stamp>
        </Center>
      )}

      {/* S4 — 4 to 6 dreams a night, one per cycle */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>NOT ONE DREAM — SEVERAL</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            4&ndash;6 <span style={{ fontSize: 56 }}>DREAMS</span>
          </div>
          <Label>EVERY NIGHT — ONE FOR EVERY CYCLE</Label>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: i < dreams4 ? GOLD : "#241f4d", border: "4px solid #55556e", opacity: fill4 }} />
            ))}
          </div>
          <Stamp visible={s4 >= 60}>EVEN IF YOU REMEMBER NONE OF THEM</Stamp>
        </Center>
      )}

      {/* S6 — brain almost awake, body paralyzed */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE STRANGE PART</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 60, marginTop: 22 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: VIOLET, transform: `scale(${pulse6})`, boxShadow: "0 0 50px rgba(139,124,255,0.6)", margin: "0 auto" }} />
              <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginTop: 14 }}>BRAIN: NEAR-WAKING</div>
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: GOLD }}>VS</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: CORAL, lineHeight: 1 }}>0%</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginTop: 6 }}>BODY: NO MOVEMENT</div>
            </div>
          </div>
          <Label>YOUR BRAIN IS AWAKE — YOUR BODY IS LOCKED</Label>
          <Stamp color={CORAL} visible={s6 >= 60}>SO YOU CANNOT ACT OUT YOUR DREAMS</Stamp>
        </Center>
      )}

      {/* S8 — replaying the day: memories filed, emotions processed */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>DREAMS ARE NOT RANDOM NOISE</Kicker>
          <div style={{ display: "flex", gap: 40, marginTop: 24 }}>
            {["MEMORIES", "FILED", "EMOTIONS"].map((w, i) => (
              <div key={w} style={{ width: 280, height: 130, borderRadius: 20, backgroundColor: i < filed8 ? VIOLET : "#241f4d", border: i < filed8 ? "none" : "4px solid #55556e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: i < filed8 ? "#0d0a24" : GREY, opacity: fill8 > 0 ? 1 : 0 }}>
                {w}
              </div>
            ))}
          </div>
          <Label>YOUR BRAIN REPLAYS THE DAY WHILE YOU SLEEP</Label>
          <Stamp visible={s8 >= 60}>SORTING MEMORIES — SOFTENING WHAT HURT</Stamp>
        </Center>
      )}

      {/* S10 — chased 81.5% vs falling 73.8% (TRUE proportions: 815 and 738 of 1000) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>WE ALL DREAM THE SAME PLOTS</Kicker>
          <div style={{ width: 1100, marginTop: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ width: 220, fontSize: 28, fontWeight: 800, color: MOON, textAlign: "right" }}>BEING CHASED</div>
              <div style={{ position: "relative", flex: 1, height: 36, backgroundColor: "#241f4d", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: `${chase10}%`, height: 36, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
              <div style={{ width: 110, fontSize: 30, fontWeight: 900, color: CORAL }}>81.5%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 16 }}>
              <div style={{ width: 220, fontSize: 28, fontWeight: 800, color: MOON, textAlign: "right" }}>FALLING</div>
              <div style={{ position: "relative", flex: 1, height: 36, backgroundColor: "#241f4d", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: `${fall10}%`, height: 36, backgroundColor: VIOLET, borderRadius: 999 }} />
              </div>
              <div style={{ width: 110, fontSize: 30, fontWeight: 900, color: VIOLET }}>73.8%</div>
            </div>
          </div>
          <Stamp visible={s10 >= 60}>THE TWO MOST COMMON DREAMS ON EARTH</Stamp>
        </Center>
      )}

      {/* S12 — REM rebound: more, longer, more intense */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker>TAKE DREAMING AWAY&hellip;</Kicker>
          <div style={{ position: "relative", width: 1100, height: 150, marginTop: 22 }}>
            <div style={{ position: "absolute", left: 475, top: 0, width: 150, height: 150, borderRadius: "50%", backgroundColor: VIOLET, transform: `scale(${rebound12})`, boxShadow: "0 0 40px rgba(139,124,255,0.55)" }} />
            {[0, 1, 2].map((i) => {
              const x = 80 + ((s12 % 60) / 60 * 900 + i * 300) % 900;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: 62, width: 26, height: 26, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 14px #f4c95d" }} />
              );
            })}
          </div>
          <Label>YOUR BRAIN FIGHTS BACK — MORE DREAM SLEEP</Label>
          <Stamp visible={s12 >= 60}>LONGER. MORE INTENSE. REM REBOUND.</Stamp>
        </Center>
      )}

      {/* S14 — sleep paralysis ~8% */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker>WHEN THE PARALYSIS LEAKS INTO WAKING</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count14}<span style={{ fontSize: 56 }}>%</span>
          </div>
          <Label>OF PEOPLE HAVE FELT SLEEP PARALYSIS</Label>
          <div style={{ display: "flex", gap: 18, marginTop: 20 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: i === 0 ? CORAL : "#241f4d", border: "4px solid #55556e", opacity: fill14 }} />
            ))}
          </div>
          <Stamp color={CORAL} visible={s14 >= 60}>AWAKE — BUT UNABLE TO MOVE</Stamp>
        </Center>
      )}

      {/* S16 — nightmares 2-8%, rehearsing fear safely */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={CORAL}>EVEN NIGHTMARES HAVE A JOB</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            2&ndash;8<span style={{ fontSize: 56 }}>%</span>
          </div>
          <Label>OF ADULTS HAVE THEM OFTEN</Label>
          {/* TRUE proportion: the 2-8% range on a 0-100% track */}
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#241f4d", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 22, top: 0, width: 66 * fill16, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
          </div>
          <Stamp color={CORAL} visible={s16 >= 60}>YOUR BRAIN REHEARSES FEAR — SAFELY</Stamp>
        </Center>
      )}

      {/* S18 — closing: six years of movies only you will ever see */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker>SIX YEARS OF MOVIES</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1, textShadow: `0 0 ${Math.round(40 * glow18)}px rgba(244,201,93,0.7)` }}>
            6 YEARS
          </div>
          <Label>ONLY YOU WILL EVER SEE THEM</Label>
          <Stamp visible={s18 >= 60}>TONIGHT — ENJOY THE SHOW</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
