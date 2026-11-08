import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 6 (#168): One Bad Night Weakens Your Immune System (LONG version of Ep.168 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep night indigo / teal immune green / gold (sleep-immunity theme).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - Cytokines (IL-1, IL-6, TNF-alpha) released during sleep rally immune cells (Irwin 2015; Besedovsky 2019).
// - One partial night of sleep loss: NK activity down to 72% of normal (Irwin 1994).
// - Sleep loss throws cytokines out of balance, weakens T cells (Dimitrov 2019: 3h without sleep already impairs T-cell grip).
// - Under 6h sleep: 4.2x more likely to catch a cold (Prather 2015, actigraphy, n=164).
// - 72-study review (n>50,000): bad sleep linked to higher CRP and IL-6 (Irwin 2016).
// - Sleeping after a hepatitis-A shot: nearly twice as many antibodies (Lange 2003).
// - Most adults need 7-9 hours a night (AASM/NSF).
// - Immune cells follow a daily clock, patrolling at night (Scheiermann 2013).
// - PAYOFF: one good night of sleep and NK activity bounces back to normal (Irwin 1994).

const BG = "#0b0e26";
const TEAL = "#4fd8a4";
const BLUE = "#6db3ff";
const GOLD = "#f4c95d";
const CORAL = "#ff8a7a";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

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

// One slow pulse per second: quick swell, slow relax.
function pulse(frame: number) {
  const phase = (frame % 30) / 30;
  return 1 + 0.06 * Math.pow(Math.max(0, Math.sin(phase * Math.PI * 2)), 2);
}

export const FactsPoorSleepImmunityLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): cytokines rally immune cells ----
  const s2 = frame;
  const flow2 = (s2 % 60) / 60;

  // ---- S4 (300-600): NK activity down to 72% ----
  // TRUE proportion: 72% of the 1100px track = 792px.
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);

  // ---- S6 (600-900): cytokines out of balance, T cells weakened ----
  const s6 = frame - 600;
  const tilt6 = Math.min(1, s6 / 180) * 8; // the balance tips

  // ---- S8 (900-1200): under 6h sleep -> 4.2x cold risk ----
  // TRUE proportion: short-sleep bar = 4.2x the rested bar (1092 vs 260px).
  const s8 = frame - 900;
  const fill8 = Math.min(1, s8 / 210);
  const rested8 = 260 * fill8;
  const short8 = 1092 * fill8;

  // ---- S10 (1200-1500): 72-study review, CRP + IL-6 up ----
  const s10 = frame - 1200;
  const rise10 = Math.min(1, s10 / 210);

  // ---- S12 (1500-1800): sleep after the shot -> nearly 2x antibodies ----
  // TRUE proportion: sleep bar = 2x the no-sleep bar (1000 vs 500px).
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);
  const nosleep12 = 500 * fill12;
  const sleep12 = 1000 * fill12;

  // ---- S14 (1800-2100): 7-9 hours a night ----
  const s14 = frame - 1800;
  const fill14 = Math.min(1, s14 / 210);

  // ---- S16 (2100-2400): immune cells follow a daily clock ----
  const s16 = frame - 2100;
  const hand16 = (s16 / 300) * 360; // one full sweep per scene

  // ---- S18 (2400-2700): closing — the nightly defense shift ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — sleep builds defenses: cytokines rally immune cells */}
      {frame < 300 && (
        <Center>
          <Kicker color={TEAL}>WHILE YOU SLEEP, YOUR BODY BUILDS DEFENSES</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: TEAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            CYTOKINES
          </div>
          <Label>THE MESSENGERS THAT RALLY YOUR IMMUNE CELLS</Label>
          <div style={{ position: "relative", width: 1100, height: 60, marginTop: 22 }}>
            <div style={{ position: "absolute", left: 0, top: 28, width: 1100, height: 4, backgroundColor: "#55556e" }} />
            {[0, 1, 2, 3, 4].map((i) => {
              const x = ((flow2 * 1100 + i * 220) % 1100);
              return (
                <div key={i} style={{ position: "absolute", left: x, top: 17, width: 26, height: 26, borderRadius: "50%", backgroundColor: TEAL, boxShadow: "0 0 14px #4fd8a4" }} />
              );
            })}
          </div>
          <Stamp color={TEAL} visible={s2 >= 60}>SLEEP IS YOUR IMMUNE WORKSHOP</Stamp>
        </Center>
      )}

      {/* S4 — NK activity down to 72% (TRUE: 792 of 1100 = 72%) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={CORAL}>ONE BAD NIGHT — KILLER CELLS WEAKENED</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            72%
          </div>
          <Label>OF NORMAL NATURAL-KILLER ACTIVITY LEFT</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 792 * fill4, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
          </div>
          <Stamp color={CORAL} visible={s4 >= 60}>DOWN BY NEARLY A THIRD — OVERNIGHT</Stamp>
        </Center>
      )}

      {/* S6 — cytokines out of balance, T cells weakened (qualitative, no fake numbers) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>SLEEP LOSS THROWS THINGS OFF BALANCE</Kicker>
          <div style={{ display: "flex", gap: 60, marginTop: 24 }}>
            <div style={{ textAlign: "center", transform: `rotate(${-tilt6}deg)` }}>
              <div style={{ width: 300, height: 110, borderRadius: 20, backgroundColor: "#1c2340", border: "4px solid #55556e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: MOON }}>CYTOKINES</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: CORAL, marginTop: 10 }}>OUT OF BALANCE</div>
            </div>
            <div style={{ textAlign: "center", opacity: 1 - 0.4 * Math.min(1, s6 / 210) }}>
              <div style={{ width: 300, height: 110, borderRadius: 20, backgroundColor: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 900, color: "#0b0e26" }}>T CELLS</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: TEAL, marginTop: 10 }}>WEAKENED</div>
            </div>
          </div>
          <Stamp visible={s6 >= 60}>THE SOLDIERS THAT REMEMBER INVADERS</Stamp>
        </Center>
      )}

      {/* S8 — under 6h sleep, 4.2x cold risk (TRUE: 1092 vs 260 = 4.2x) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={CORAL}>TRACKED WITH WRIST MONITORS — THEN A COLD VIRUS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            4.2&times;
          </div>
          <Label>MORE LIKELY TO CATCH A COLD — UNDER 6 HOURS A NIGHT</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>7+ HOURS</div>
              <div style={{ width: rested8, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CORAL, textAlign: "right" }}>UNDER 6</div>
              <div style={{ width: short8, height: 34, backgroundColor: CORAL, borderRadius: 999 }} />
            </div>
          </div>
          <Stamp color={CORAL} visible={s8 >= 60}>SHORT SLEEP BEAT EVERY OTHER RISK FACTOR</Stamp>
        </Center>
      )}

      {/* S10 — 72-study review: CRP + IL-6 rise (qualitative arrows, study count is real) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>POOR SLEEP TURNS UP INFLAMMATION</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            72 <span style={{ fontSize: 56 }}>STUDIES</span>
          </div>
          <Label>OVER 50,000 PEOPLE — ONE CLEAR PATTERN</Label>
          <div style={{ display: "flex", gap: 60, marginTop: 20 }}>
            {["C-R-P", "IL-6"].map((m) => (
              <div key={m} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 64, fontWeight: 900, color: CORAL, transform: `translateY(${-30 * rise10}px)` }}>&uarr;</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: MOON }}>{m}</div>
              </div>
            ))}
          </div>
          <Stamp visible={s10 >= 60}>BAD SLEEP, HIGHER INFLAMMATION MARKERS</Stamp>
        </Center>
      )}

      {/* S12 — sleep after the shot: nearly 2x antibodies (TRUE: 1000 vs 500 = 2x) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={TEAL}>SLEEP DECIDES HOW WELL A VACCINE WORKS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: TEAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            2&times;
          </div>
          <Label>THE ANTIBODIES — AFTER SLEEPING POST-SHOT</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>NO SLEEP</div>
              <div style={{ width: nosleep12, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: TEAL, textAlign: "right" }}>SLEPT</div>
              <div style={{ width: sleep12, height: 34, backgroundColor: TEAL, borderRadius: 999 }} />
            </div>
          </div>
          <Stamp color={TEAL} visible={s12 >= 60}>NEARLY TWICE AS MANY ANTIBODIES</Stamp>
        </Center>
      )}

      {/* S14 — 7-9 hours a night */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker>HOW MUCH SLEEP DOES IMMUNITY NEED?</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            7&ndash;9 <span style={{ fontSize: 56 }}>HOURS</span>
          </div>
          <Label>A NIGHT, FOR MOST ADULTS</Label>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: i < 7 ? BLUE : GOLD, border: "4px solid #55556e", opacity: fill14 }} />
            ))}
          </div>
          <Stamp color={BLUE} visible={s14 >= 60}>YOUR DEFENSES ARE BUILT IN THAT WINDOW</Stamp>
        </Center>
      )}

      {/* S16 — immune cells follow a daily clock */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={BLUE}>YOUR IMMUNE CELLS KEEP TIME</Kicker>
          <div style={{ position: "relative", width: 200, height: 200, marginTop: 18 }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#1c2340", border: "6px solid #55556e" }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 80, backgroundColor: GOLD, transformOrigin: "50% 0", transform: `translateX(-50%) rotate(${hand16}deg)` }} />
            <div style={{ position: "absolute", left: "calc(50% - 22px)", top: "calc(50% - 22px)", width: 44, height: 44, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 24px rgba(244,201,93,0.7)" }} />
          </div>
          <Label>THEY PATROL YOUR TISSUES AT NIGHT</Label>
          <Stamp visible={s16 >= 60}>A DAILY CLOCK RUNS YOUR DEFENSES</Stamp>
        </Center>
      )}

      {/* S18 — closing: the nightly defense shift */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker color={TEAL}>TONIGHT, YOUR IMMUNE SYSTEM IS COUNTING ON YOU</Kicker>
          <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: TEAL, transform: `scale(${pulse18})`, boxShadow: "0 0 50px rgba(79,216,164,0.6)", marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84, fontWeight: 900, color: "#0b0e26" }}>&#10003;</div>
          <Label>SLEEP IS YOUR NIGHTLY DEFENSE SHIFT</Label>
          <Stamp color={TEAL} visible={s18 >= 60}>WAKE UP PROTECTED</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
