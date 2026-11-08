import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 5 (#102): Less Sleep Makes You Hungrier (LONG version of Ep.102 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep night indigo / hunger coral / food gold / fullness teal.
// FACTS (all verified 2026-11-08, see script_en.txt):
// - Ghrelin (stomach) = "eat"; leptin (fat cells) = "full" (textbook physiology).
// - Spiegel 2004: ghrelin +28%, leptin -18%, hunger +24%, high-carb cravings +33-45%.
// - Taheri 2004 (n=1,024): 5h vs 8h sleep -> leptin -15.5%, ghrelin +14.9%.
// - Al Khatib 2017 meta (11 studies): +385 kcal/day, ~4.5 slices of bread, no extra burn.
// - Greer 2013: sleep loss dims frontal/insula control, amplifies amygdala; craving
//   for high-calorie food rises with how bad the sleep loss feels.
// - Hanlon 2016: 2-AG +33%, stays high until ~9 pm; snacks +50% calories, 2x fat,
//   even after a meal covering 90% of daily calories.
// - Cappuccio 2008 meta (634,511 people): <=5h sleepers 55% more likely obese (OR 1.55);
//   each hour less sleep +0.35 BMI units.
// - Nedeltcheva 2010: same diet, 5.5h vs 8.5h -> fat lost 0.6 vs 1.4 kg (-55%),
//   fat-free mass lost 2.4 vs 1.5 kg (+60%).
// - Tasali 2022 (PAYOFF): +~1.2h sleep -> -270 kcal/day, no diet; group lost weight.

const BG = "#0b0e26";
const CORAL = "#ff8a7a";
const GOLD = "#f4c95d";
const TEAL = "#7fd4c1";
const BLUE = "#6db3ff";
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

export const FactsLessSleepHungrierLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): ghrelin vs leptin ----
  const s2 = frame;
  const fill2 = Math.min(1, s2 / 210);

  // ---- S4 (300-600): hunger +24%, cravings up to +45% ----
  // TRUE proportion: cravings bar = 45% of the 1100 track (495px).
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);

  // ---- S6 (600-900): +385 kcal = ~4.5 slices of bread ----
  const s6 = frame - 600;
  const fill6 = Math.min(1, s6 / 210);

  // ---- S8 (900-1200): brain scans — control dims, alarm flares ----
  const s8 = frame - 900;
  const alarm8 = pulse(s8);

  // ---- S10 (1200-1500): 2-AG stays high until 9 pm ----
  // TRUE proportion: high from ~2 pm to 9 pm = 7 of the 12 shown hours (58% of the bar).
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 210);

  // ---- S12 (1500-1800): 55% more likely obese ----
  // TRUE proportion: short-sleep bar = 155% of the rested bar (1085 vs 700).
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);
  const rested12 = 700 * fill12;
  const short12 = 1085 * fill12;

  // ---- S14 (1800-2100): same diet, 55% less fat lost ----
  // TRUE proportion: fat lost 0.6 vs 1.4 kg -> short-sleep bar = 43% of rested bar (300 vs 700).
  const s14 = frame - 1800;
  const fill14 = Math.min(1, s14 / 210);
  const rested14 = 700 * fill14;
  const short14 = 300 * fill14;

  // ---- S16 (2100-2400): one extra hour of sleep ----
  const s16 = frame - 2100;
  const pulse16 = pulse(s16);

  // ---- S18 (2400-2700): closing — sleep is the appetite switch ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — two hormones, two opposite orders */}
      {frame < 300 && (
        <Center>
          <Kicker>TWO HORMONES RUN YOUR APPETITE</Kicker>
          <div style={{ display: "flex", gap: 60, marginTop: 24 }}>
            <div style={{ textAlign: "center", opacity: fill2 }}>
              <div style={{ width: 300, height: 130, borderRadius: 20, backgroundColor: CORAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#0b0e26" }}>GHRELIN</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: CORAL, marginTop: 10 }}>STOMACH: &ldquo;EAT!&rdquo;</div>
            </div>
            <div style={{ textAlign: "center", opacity: fill2 }}>
              <div style={{ width: 300, height: 130, borderRadius: 20, backgroundColor: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#0b0e26" }}>LEPTIN</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: TEAL, marginTop: 10 }}>FAT CELLS: &ldquo;FULL&rdquo;</div>
            </div>
          </div>
          <Stamp visible={s2 >= 60}>TWO SIGNALS, ONE APPETITE</Stamp>
        </Center>
      )}

      {/* S4 — hunger +24%, cravings up to +45% (TRUE: 45% of track) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={CORAL}>AFTER TWO SHORT NIGHTS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            +24%
          </div>
          <Label>HUNGER — AND CRAVINGS UP TO +45%</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 495 * fill4, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
          </div>
          <Stamp color={CORAL} visible={s4 >= 60}>YOUR APPETITE WAS RIGGED</Stamp>
        </Center>
      )}

      {/* S6 — +385 kcal a day, ~4.5 slices of bread */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>EVERY DAY, SHORT SLEEPERS ATE</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            +385 <span style={{ fontSize: 56 }}>KCAL</span>
          </div>
          <Label>EXTRA — ROUGHLY FOUR AND A HALF SLICES OF BREAD</Label>
          <div style={{ display: "flex", gap: 14, marginTop: 20, opacity: fill6 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 90, height: 90, borderRadius: 12, backgroundColor: GOLD, border: "6px solid #b98a1e" }} />
            ))}
            <div style={{ width: 45, height: 90, borderRadius: 12, backgroundColor: GOLD, border: "6px solid #b98a1e" }} />
          </div>
          <Stamp visible={s6 >= 60}>AN EXTRA MEAL, EVERY DAY</Stamp>
        </Center>
      )}

      {/* S8 — brain scans: control dims, alarm flares (qualitative, no fake numbers) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>YOUR TIRED BRAIN FLIPS THE SWITCH</Kicker>
          <div style={{ display: "flex", gap: 60, marginTop: 24 }}>
            <div style={{ textAlign: "center", opacity: 1 - 0.45 * Math.min(1, s8 / 210) }}>
              <div style={{ width: 260, height: 130, borderRadius: 20, backgroundColor: "#3a3f66", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: MOON }}>CONTROL</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: GREY, marginTop: 10 }}>TURNS DOWN</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 260, height: 130, borderRadius: 20, backgroundColor: CORAL, transform: `scale(${alarm8})`, boxShadow: "0 0 40px rgba(255,138,122,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#0b0e26" }}>AMYGDALA</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: CORAL, marginTop: 10 }}>FLARES UP</div>
            </div>
          </div>
          <Stamp color={CORAL} visible={s8 >= 60}>CRAVING BEATS WILLPOWER</Stamp>
        </Center>
      )}

      {/* S10 — 2-AG stays high until 9 pm (TRUE: 7 of 12 shown hours = 58% of bar) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE PLEASURE SIGNAL WON&apos;T SWITCH OFF</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            9 <span style={{ fontSize: 56 }}>PM</span>
          </div>
          <Label>STILL HIGH — LONG AFTER DINNER</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 640 * fill10, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <Stamp visible={s10 >= 60}>THE MUNCHIES LAST ALL EVENING</Stamp>
        </Center>
      )}

      {/* S12 — 55% more likely obese (TRUE: short bar 155% of rested bar) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={CORAL}>IT ADDS UP WORLDWIDE</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            +55%
          </div>
          <Label>MORE LIKELY TO BE OBESE ON FIVE HOURS OR LESS</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>7&ndash;8 HRS</div>
              <div style={{ width: rested12, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CORAL, textAlign: "right" }}>&le;5 HRS</div>
              <div style={{ width: short12, height: 34, backgroundColor: CORAL, borderRadius: 999 }} />
            </div>
          </div>
          <Stamp color={CORAL} visible={s12 >= 60}>600,000 PEOPLE, SAME PATTERN</Stamp>
        </Center>
      )}

      {/* S14 — same diet, 55% less fat lost (TRUE: 0.6 vs 1.4 kg = 43% of bar) */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker>SHORT SLEEP EVEN SABOTAGES DIETS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            &minus;55%
          </div>
          <Label>FAT LOST — SAME CALORIES, LESS SLEEP</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>8.5 HRS</div>
              <div style={{ width: rested14, height: 34, backgroundColor: BLUE, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CORAL, textAlign: "right" }}>5.5 HRS</div>
              <div style={{ width: short14, height: 34, backgroundColor: CORAL, borderRadius: 999 }} />
            </div>
          </div>
          <Stamp color={BLUE} visible={s14 >= 60}>THE WEIGHT LOST WAS MUSCLE, NOT FAT</Stamp>
        </Center>
      )}

      {/* S16 — one extra hour of sleep, no diet */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={TEAL}>SO WHAT FIXES IT?</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: TEAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            +1 <span style={{ fontSize: 56 }}>HOUR</span>
          </div>
          <Label>OF SLEEP A NIGHT — THAT IS ALL IT TOOK</Label>
          <div style={{ width: 140, height: 140, borderRadius: "50%", backgroundColor: TEAL, transform: `scale(${pulse16})`, boxShadow: "0 0 50px rgba(127,212,193,0.6)", marginTop: 22 }} />
          <Stamp color={TEAL} visible={s16 >= 60}>NO DIET. JUST SLEEP.</Stamp>
        </Center>
      )}

      {/* S18 — closing: sleep is the appetite switch */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker>BLAME THE NIGHT BEFORE</Kicker>
          <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: GOLD, transform: `scale(${pulse18})`, boxShadow: "0 0 50px rgba(244,201,93,0.6)", marginTop: 22 }} />
          <Label>SLEEP IS YOUR APPETITE&apos;S SECRET SWITCH</Label>
          <Stamp visible={s18 >= 60}>GO TO BED — YOUR HUNGER WILL THANK YOU</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
