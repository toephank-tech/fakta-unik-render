import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 2 (#42): Your Brain Washes Itself While You Sleep (LONG version of Ep.42 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep night blue / glowing blue / teal / gold (brain-wash theme).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - Glymphatic system discovered 2012, Iliff/Nedergaard, Rochester (Sci Transl Med).
// - CSF ~500 mL/day made, ~150 mL held, replaced 3-4x/day (textbook physiology).
// - Arterial pulsation drives CSF flow — the heartbeat is the pump (Iliff; Mestre 2018).
// - Norepinephrine falls in sleep -> cells shrink -> channels open (Xie et al. 2013).
// - Lateral (side) sleep cleared waste fastest in rodents (Lee et al. 2015).
// - Old mice cleared amyloid-beta 40% more slowly (Kress et al. 2014).
// - Adults need 7-9 h sleep; ~5 x 90-min cycles, deep sleep early (AASM 2015).
// - One sleepless night: tau +~50% in human CSF (Holth et al., Science 2019).

const BG = "#0a0e24";
const BLUE = "#6db3ff";
const TEAL = "#7fd4c1";
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

// One heartbeat per second: quick contraction, slow relax.
function heartbeat(frame: number) {
  const phase = (frame % 30) / 30;
  return 1 + 0.06 * Math.pow(Math.max(0, Math.sin(phase * Math.PI * 2)), 2);
}

export const FactsGlymphaticLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): discovered 2012 ----
  const s2 = frame;
  const fill2 = Math.min(1, s2 / 210);

  // ---- S4 (300-600): 500 mL made/day, 150 mL held, replaced 3-4x ----
  // TRUE proportion: 150 of 500 = 30% of the bar width.
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);
  const count4 = Math.round(500 * fill4);

  // ---- S6 (600-900): heartbeat is the pump ----
  const s6 = frame - 600;
  const pulse6 = heartbeat(s6);
  const flow6 = (s6 % 60) / 60; // fluid dots drift right, one per 2s

  // ---- S8 (900-1200): norepinephrine falls, channels open ----
  const s8 = frame - 900;
  const fill8 = Math.min(1, s8 / 210);
  const level8 = 100 - 70 * fill8; // 100% awake -> 30% asleep
  const open8 = 60 + 260 * fill8; // channel gap widens

  // ---- S10 (1200-1500): side vs back vs stomach ----
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 180);

  // ---- S12 (1500-1800): aging — 40% less clearance in old mice ----
  // TRUE proportion: old bar = 60% of young bar (660 of 1100).
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);
  const bar12 = 660 * fill12;

  // ---- S14 (1800-2100): 7-9 hours, 5 cycles of 90 min ----
  const s14 = frame - 1800;
  const fill14 = Math.min(1, s14 / 210);
  const cycles14 = Math.min(5, Math.floor(s14 / 45));

  // ---- S16 (2100-2400): waste piles up year after year ----
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 240);
  const pile16 = 200 * fill16;

  // ---- S18 (2400-2700): closing — sleep is not just rest ----
  const s18 = frame - 2400;
  const pulse18 = heartbeat(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — discovered 2012 */}
      {frame < 300 && (
        <Center>
          <Kicker>HIDDEN UNTIL RECENTLY</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            2012
          </div>
          <Label>THE YEAR SCIENTISTS FOUND IT</Label>
          <div style={{ fontSize: 44, fontWeight: 900, color: TEAL, marginTop: 18, textAlign: "center", opacity: fill2 }}>
            GLYMPHATIC SYSTEM
          </div>
          <Stamp visible={s2 >= 60}>YOUR BRAIN&apos;S BUILT-IN CLEANING CREW</Stamp>
        </Center>
      )}

      {/* S4 — 500 mL made, 150 mL held, replaced 3-4x a day */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>YOUR BRAIN MAKES THIS FLUID EVERY DAY</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count4} <span style={{ fontSize: 56 }}>mL</span>
          </div>
          <Label>MADE EVERY DAY — BUT ONLY 150 mL HELD</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 1100 * fill4, height: 40, backgroundColor: BLUE, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 330, top: 0, width: 4, height: 40, backgroundColor: "#ffffff", opacity: 0.85 }} />
          </div>
          <Stamp visible={s4 >= 60}>REPLACED 3&ndash;4 TIMES A DAY</Stamp>
        </Center>
      )}

      {/* S6 — the heartbeat is the pump */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>WHAT POWERS THE WASH?</Kicker>
          <div style={{ position: "relative", width: 1100, height: 150, marginTop: 22 }}>
            <div style={{ position: "absolute", left: 475, top: 0, width: 150, height: 150, borderRadius: "50%", backgroundColor: CORAL, transform: `scale(${pulse6})`, boxShadow: "0 0 40px rgba(255,138,122,0.55)" }} />
            {[0, 1, 2].map((i) => {
              const x = 80 + ((flow6 * 900 + i * 300) % 900);
              return (
                <div key={i} style={{ position: "absolute", left: x, top: 62, width: 26, height: 26, borderRadius: "50%", backgroundColor: BLUE, boxShadow: "0 0 14px #6db3ff" }} />
              );
            })}
          </div>
          <Label>EVERY PULSE PUSHES THE FLUID DEEPER</Label>
          <Stamp color={CORAL} visible={s6 >= 60}>YOUR HEARTBEAT IS THE PUMP</Stamp>
        </Center>
      )}

      {/* S8 — norepinephrine falls, channels open */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={TEAL}>THE SWITCH: NOREPINEPHRINE</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 22 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: TEAL, lineHeight: 1 }}>{Math.round(level8)}%</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginTop: 6 }}>AWAKE: 100% &rarr; ASLEEP</div>
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: GOLD }}>&rarr;</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 220, height: 110, borderRadius: 20, border: "6px solid #55556e", position: "relative", overflow: "hidden", backgroundColor: "#1c2340" }}>
                <div style={{ position: "absolute", left: 110 - open8 / 2, top: 0, width: open8, height: 110, backgroundColor: BLUE, opacity: 0.85 }} />
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: GREY, marginTop: 6 }}>CHANNELS OPEN WIDE</div>
            </div>
          </div>
          <Stamp color={TEAL} visible={s8 >= 60}>AS IT DROPS, THE FLOODGATES OPEN</Stamp>
        </Center>
      )}

      {/* S10 — side vs back vs stomach (animal studies) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>EVEN HOW YOU LIE DOWN MAY MATTER</Kicker>
          <div style={{ display: "flex", gap: 60, marginTop: 24 }}>
            {[
              { name: "SIDE", best: true },
              { name: "BACK", best: false },
              { name: "STOMACH", best: false },
            ].map((p, i) => (
              <div key={p.name} style={{ textAlign: "center", opacity: fill10 > 0 ? 1 : 0 }}>
                <div style={{ width: 200, height: 130, borderRadius: 20, backgroundColor: p.best ? GOLD : "#1c2340", border: p.best ? "none" : "4px solid #55556e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, fontWeight: 900, color: p.best ? "#0a0e24" : GREY }}>
                  {p.best ? "\u2605" : `${i + 1}`}
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, color: p.best ? GOLD : MOON, marginTop: 10 }}>{p.name}</div>
              </div>
            ))}
          </div>
          <Stamp visible={s10 >= 60}>SIDE WINS &mdash; IN ANIMAL STUDIES</Stamp>
        </Center>
      )}

      {/* S12 — aging: 40% less clearance in old mice (TRUE proportion: 660 of 1100) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={CORAL}>BUT THE SYSTEM AGES</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            &minus;40%
          </div>
          <Label>AMYLOID CLEARANCE IN OLD MICE</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: bar12, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
          </div>
          <Stamp color={CORAL} visible={s12 >= 60}>DEEP SLEEP MATTERS EVEN MORE WITH AGE</Stamp>
        </Center>
      )}

      {/* S14 — 7-9 hours, 5 cycles of 90 minutes */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker>HOW MUCH SLEEP DOES THE WASH NEED?</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: BLUE, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            7&ndash;9 <span style={{ fontSize: 56 }}>HOURS</span>
          </div>
          <Label>A NIGHT, FOR MOST ADULTS</Label>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: i < cycles14 ? TEAL : "#1c2340", border: "4px solid #55556e", opacity: fill14 }} />
            ))}
          </div>
          <Stamp color={TEAL} visible={s14 >= 60}>FIVE 90-MINUTE CYCLES &mdash; DEEPEST FIRST</Stamp>
        </Center>
      )}

      {/* S16 — waste piles up year after year */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={CORAL}>SKIP IT OFTEN ENOUGH&hellip;</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 30, marginTop: 22, height: 200 }}>
            {[0.35, 0.55, 0.75, 1].map((h, i) => (
              <div key={i} style={{ width: 120, height: pile16 * h, backgroundColor: i === 3 ? CORAL : "#3a3f66", borderRadius: "12px 12px 0 0" }} />
            ))}
          </div>
          <Label>THE WASTE QUIETLY PILES UP</Label>
          <Stamp color={CORAL} visible={s16 >= 60}>YEAR AFTER YEAR</Stamp>
        </Center>
      )}

      {/* S18 — closing */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker>SLEEP IS NOT JUST REST</Kicker>
          <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: BLUE, transform: `scale(${pulse18})`, boxShadow: "0 0 50px rgba(109,179,255,0.6)", marginTop: 22 }} />
          <Label>IT IS YOUR BRAIN TAKING OUT THE TRASH</Label>
          <Stamp visible={s18 >= 60}>TONIGHT, GIVE IT TIME TO CLEAN</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
