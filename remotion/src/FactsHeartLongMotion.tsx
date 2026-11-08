import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM #1: Your Heart Beats 100,000 Times a Day (LONG version of Ep.1 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep indigo / gold / teal / coral / violet (same as #47).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - 100k beats/day; 35M/year; 2.5-3B/lifetime (AHA).
// - Fist-sized, 250-350 g (Healthgrades).
// - Beating at 5 weeks in the womb; ~54M beats before birth (EHD/Sadler).
// - Coronary arteries feed the heart first (Pearson).
// - Cardiomyocyte renewal ~1%/yr at 25 -> 0.45% at 75; <50% exchanged (Bergmann 2009).
// - First heart transplant 3 Dec 1967, Barnard; patient lived 18 days (PMC).
// - SA node: heart's own electricity; beats without the brain (Pearson).
// - CVD #1 killer globally; >=80% of early deaths avoidable (WHO/WHF).

const BG = "#0d0b1e";
const GOLD = "#f4c95d";
const TEAL = "#7fd4c1";
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

// ECG waveform: one beat per 180px. Keypoints (dx, dy) within a beat.
const ECG_KEYS: Array<[number, number]> = [
  [0, 0], [20, 0], [35, -10], [50, 0], [70, -6], [80, 0],
  [86, -55], [92, 0], [98, 12], [108, 0], [130, -16], [155, 0], [180, 0],
];
function ecgY(x: number): number {
  const beat = 180;
  const local = ((x % beat) + beat) % beat;
  for (let i = 0; i < ECG_KEYS.length - 1; i++) {
    const [x0, y0] = ECG_KEYS[i];
    const [x1, y1] = ECG_KEYS[i + 1];
    if (local >= x0 && local <= x1) {
      const t = x1 === x0 ? 0 : (local - x0) / (x1 - x0);
      return 60 + y0 + (y1 - y0) * t;
    }
  }
  return 60;
}

export const FactsHeartLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the counter — 100k/day, 35M/year, 2.5B/lifetime ----
  const s2 = frame;
  const fill2 = Math.min(1, s2 / 210);
  const count2 = Math.round(100000 * fill2).toLocaleString("en-US");
  const mini2a = s2 >= 120 ? 1 : 0;
  const mini2b = s2 >= 180 ? 1 : 0;

  // ---- S4 (300-600): fist vs heart, same size ----
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 180);
  const pulse4 = heartbeat(s4);

  // ---- S6 (600-900): timeline week 5 -> birth, counter to 54,000,000 ----
  const s6 = frame - 600;
  const fill6 = Math.min(1, s6 / 240);
  const count6 = Math.round(54000000 * fill6).toLocaleString("en-US");
  const dot6 = 40 + 1020 * fill6;

  // ---- S8 (900-1200): coronary arteries — the heart feeds itself first ----
  const s8 = frame - 900;
  const fill8 = Math.min(1, s8 / 210);
  const pulse8 = heartbeat(s8);

  // ---- S10 (1200-1500): only ~1% of heart muscle replaced each year ----
  // TRUE proportion: 1% of 1100px = 11px. The near-empty bar IS the point.
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 210);
  const bar10 = Math.max(11 * fill10, fill10 > 0 ? 6 : 0);

  // ---- S12 (1500-1800): 1967, first heart transplant, 18 days ----
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);
  const count12 = Math.round(18 * fill12);

  // ---- S14 (1800-2100): SA node — the heart's own electricity (ECG trace) ----
  const s14 = frame - 1800;
  const cycle14 = (s14 % 150) / 150; // one full trace every 5s
  const reveal14 = 1100 * cycle14;
  const ecgPoints = Array.from({ length: 111 }, (_, i) => {
    const x = i * 10;
    return `${x},${ecgY(x)}`;
  }).join(" ");

  // ---- S16 (2100-2400): 80% of early deaths avoidable — TRUE proportion ----
  // 80% of 1100px = 880px.
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);
  const bar16 = 880 * fill16;

  // ---- S18 (2400-2700): closing — 100,000 beats, every day ----
  const s18 = frame - 2400;
  const pulse18 = heartbeat(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — the counter */}
      {frame < 300 && (
        <Center>
          <Kicker>ONE HUNDRED THOUSAND BEATS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count2}
          </div>
          <Label>EVERY DAY — WITHOUT A DAY OFF</Label>
          <div style={{ display: "flex", gap: 80, marginTop: 18 }}>
            <div style={{ textAlign: "center", opacity: mini2a }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: TEAL }}>35,000,000</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: GREY }}>A YEAR</div>
            </div>
            <div style={{ textAlign: "center", opacity: mini2b }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: CORAL }}>2,500,000,000</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: GREY }}>IN A LIFETIME</div>
            </div>
          </div>
          <Stamp visible={s2 >= 60}>WITHOUT A SINGLE DAY OFF</Stamp>
        </Center>
      )}

      {/* S4 — fist vs heart */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE WHOLE MACHINE IS TINY</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 22 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: "#2a2a44", border: "6px solid #55556e", opacity: 0.4 + 0.6 * fill4 }} />
              <div style={{ fontSize: 28, fontWeight: 800, color: MOON, marginTop: 10 }}>YOUR FIST</div>
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: GOLD }}>=</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 150, height: 150, borderRadius: "50%", backgroundColor: CORAL, transform: `scale(${pulse4})`, boxShadow: "0 0 40px rgba(255,138,122,0.55)", opacity: fill4 }} />
              <div style={{ fontSize: 28, fontWeight: 800, color: MOON, marginTop: 10 }}>YOUR HEART</div>
            </div>
          </div>
          <Label>&asymp; SAME SIZE &middot; 250&ndash;350 g</Label>
          <Stamp visible={s4 >= 60}>LESS THAN HALF A KILOGRAM</Stamp>
        </Center>
      )}

      {/* S6 — timeline: week 5 to birth, 54 million beats */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>IT STARTED BEFORE YOU WERE BORN</Kicker>
          <div style={{ position: "relative", width: 1100, height: 56, marginTop: 24 }}>
            <div style={{ position: "absolute", left: 0, top: 24, width: 1100, height: 8, backgroundColor: "#1c1c30", borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 0, top: 24, width: dot6, height: 8, backgroundColor: GOLD, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: dot6 - 12, top: 14, width: 28, height: 28, backgroundColor: "#ffffff", borderRadius: "50%", boxShadow: "0 0 16px #ffffff" }} />
            <div style={{ position: "absolute", left: 0, top: 0, fontSize: 24, color: "#9a8fc4", fontWeight: 700 }}>WEEK 5</div>
            <div style={{ position: "absolute", right: 0, top: 0, fontSize: 24, color: "#9a8fc4", fontWeight: 700 }}>BIRTH</div>
          </div>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count6}
          </div>
          <Label>BEATS BEFORE YOUR FIRST BREATH</Label>
          <Stamp visible={s6 >= 60}>BEATING AT FIVE WEEKS IN THE WOMB</Stamp>
        </Center>
      )}

      {/* S8 — coronary arteries: the heart feeds itself first */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>IT FEEDS ITSELF FIRST</Kicker>
          <div style={{ position: "relative", width: 1100, height: 170, marginTop: 22 }}>
            <div style={{ position: "absolute", left: 475, top: 10, width: 150, height: 150, borderRadius: "50%", backgroundColor: CORAL, transform: `scale(${pulse8})`, boxShadow: "0 0 40px rgba(255,138,122,0.55)" }} />
            <div style={{ position: "absolute", left: 620, top: 30, width: 380 * fill8, height: 10, backgroundColor: TEAL, borderRadius: 999, transform: "rotate(-22deg)", transformOrigin: "left center" }} />
            <div style={{ position: "absolute", left: 620, top: 80, width: 420 * fill8, height: 10, backgroundColor: TEAL, borderRadius: 999 }} />
            <div style={{ position: "absolute", left: 620, top: 130, width: 380 * fill8, height: 10, backgroundColor: TEAL, borderRadius: 999, transform: "rotate(22deg)", transformOrigin: "left center" }} />
            <div style={{ position: "absolute", left: 0, top: 60, width: 440, textAlign: "right", fontSize: 28, fontWeight: 800, color: MOON }}>AORTA</div>
          </div>
          <Label>CORONARY ARTERIES &mdash; ITS OWN FUEL LINE</Label>
          <Stamp color={TEAL} visible={s8 >= 60}>FIRST IN LINE FOR OXYGEN</Stamp>
        </Center>
      )}

      {/* S10 — only 1% renewed each year (TRUE proportion: 11px of 1100) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={CORAL}>HEART MUSCLE BARELY HEALS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            1%
          </div>
          <Label>OF YOUR HEART MUSCLE, REPLACED EACH YEAR</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: bar10, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
          </div>
          <Stamp color={CORAL} visible={s10 >= 60}>MOST OF IT IS THE HEART YOU WERE BORN WITH</Stamp>
        </Center>
      )}

      {/* S12 — 1967, first heart transplant */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker>DECEMBER 3, 1967</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count12} <span style={{ fontSize: 56 }}>DAYS</span>
          </div>
          <Label>THE FIRST HEART TRANSPLANT PATIENT LIVED</Label>
          <Stamp visible={s12 >= 60}>THE IMPOSSIBLE, PROVEN POSSIBLE</Stamp>
        </Center>
      )}

      {/* S14 — SA node: the heart's own electricity */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={TEAL}>ITS OWN ELECTRICITY</Kicker>
          <div style={{ marginTop: 22, width: 1100, height: 120 }}>
            <svg width={1100} height={120} viewBox="0 0 1100 120">
              <defs>
                <clipPath id="ecgClip">
                  <rect x={0} y={0} width={reveal14} height={120} />
                </clipPath>
              </defs>
              <polyline points={ecgPoints} fill="none" stroke={TEAL} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" clipPath="url(#ecgClip)" />
              <circle cx={Math.min(reveal14, 1095)} cy={ecgY(Math.min(reveal14, 1095))} r={10} fill="#ffffff" style={{ filter: "drop-shadow(0 0 8px #ffffff)" }} />
            </svg>
          </div>
          <Label>S-A NODE &mdash; THE HEART&apos;S NATURAL PACEMAKER</Label>
          <Stamp color={TEAL} visible={s14 >= 60}>NO BRAIN NEEDED</Stamp>
        </Center>
      )}

      {/* S16 — 80% of early deaths avoidable (TRUE proportion: 880px of 1100) */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={CORAL}>THE WORLD&apos;S NUMBER ONE KILLER</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CORAL, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            80%
          </div>
          <Label>OF EARLY DEATHS COULD BE AVOIDED</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: bar16, height: 40, backgroundColor: CORAL, borderRadius: 999 }} />
          </div>
          <Stamp color={CORAL} visible={s16 >= 60}>MOVE MORE. SLEEP WELL.</Stamp>
        </Center>
      )}

      {/* S18 — closing */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker>ONE HUNDRED THOUSAND BEATS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1, transform: `scale(${pulse18})` }}>
            100,000
          </div>
          <Label>TODAY. TOMORROW. EVERY DAY.</Label>
          <Stamp visible={s18 >= 60}>IT HAS NEVER ASKED FOR A BREAK</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
