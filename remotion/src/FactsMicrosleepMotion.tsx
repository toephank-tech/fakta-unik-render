import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #45: Microsleep — Your Brain Falls Asleep for Seconds, While Your Eyes Are Open
// (priority queue rank 26, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Night palette: dark navy / moonlight blue / gold.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE percentages on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// FACTS (all verified 2026-11-07 before scripting):
// - Microsleep = very brief involuntary sleep, "typically lasting 15 seconds
//   or less" (Sleep Foundation); Cleveland Clinic: "typically lasts 30
//   seconds or fewer". Script uses "usually fifteen seconds or less".
// - Eyes can stay open through it; the person may not notice it happened
//   (Sleep Foundation; Cleveland Clinic). NOT a blackout or a seizure.
// - LOCAL SLEEP: Vyazovskiy et al. 2011, Nature 472:443-447 — in freely
//   behaving sleep-deprived RATS, cortical neurons went briefly "off line"
//   as in sleep, with local slow waves, often in one area and not another;
//   rats appeared awake and active but were impaired in a reaching task.
//   Presented explicitly as a rat study, not proven the same in humans.
// - WARNING SIGNS (National Sleep Foundation / NHTSA): frequent yawning,
//   heavy eyelids, drifting out of lane, missing exits or traffic signs,
//   trouble remembering the last few miles driven.
// - COFFEE / COLD AIR / WINDOW: NHTSA — adequate sleep (7-8h) is the only
//   true way to prevent drowsy driving; coffee alone is not always enough
//   and short-lived; cold air + radio had no significant effect on lane
//   drifting (Reyner & Horne); opening the window had no effect on
//   sleepiness (Swedish motorway study).
// - CRASH RISK: AAA Foundation 2016 — missing 1-2h of the recommended 7h
//   nearly doubles crash risk (5-6h sleep = 1.9x); missing 2-3h more than
//   quadruples it (4-5h = 4.3x), the same risk NHTSA associates with
//   driving over the legal alcohol limit. NHTSA: ~100,000 police-reported
//   drowsy-driving crashes/year in the US.
// - PAYOFF: Arnedt et al. 2000 (simulated driving) — 20h of wakefulness
//   produced impairment of the same magnitude as 0.08% BAC; Williamson &
//   Feyer 2000: 17-19h ≈ 0.05% BAC, longer wakefulness ≈ 0.10% BAC.
//   Script: "After about twenty hours awake, you drive like someone at the
//   legal alcohol limit" — hedged "about", framed as driving impairment.

const BG = "#0b0b1e";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

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
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 640px" }}>
      {props.children}
    </div>
  );
}

const TRACK = 760; // px width of a 100% bar

export const FactsMicrosleepMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): how long is a microsleep? 0-30s timeline ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const sweep2 = Math.min(1, s2 / 270); // dot sweeps the 30s timeline
  const pulse2 = 1 + 0.06 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): local sleep — some neurons OFF, others ON (rat study) ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // 12 neurons; 5 of them nap (go dim) in a staggered pattern, the rest stay lit
  const napping4 = [1, 4, 6, 9, 11];
  const napLevel4 = napping4.map((_, i) => {
    const t = Math.max(0, Math.min(1, (s4 - 30 - i * 35) / 60));
    return 1 - 0.75 * t * (0.7 + 0.3 * Math.sin((s4 - 30 - i * 35) * 0.1));
  });

  // ---- S6 (600-900): 4 warning signs appear one by one ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const check6 = [0, 60, 120, 180].map((d) => Math.min(1, Math.max(0, (s6 - d) / 60)));

  // ---- S8 (900-1200): crash risk bars — TRUE multiples (AAA 2016) ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const barBase8 = Math.min(1, s8 / 120);
  const barMid8 = Math.min(1, Math.max(0, (s8 - 60) / 120));
  const barHigh8 = Math.min(1, Math.max(0, (s8 - 120) / 120));
  // scale: 4.3x = full TRACK (760px); 1x = 760/4.3 ≈ 177px; 1.9x ≈ 336px
  const wBase8 = barBase8 * (TRACK / 4.3);
  const wMid8 = barMid8 * (TRACK * 1.9 / 4.3);
  const wHigh8 = barHigh8 * TRACK;

  // ---- S9 (1200-1500): PAYOFF — 20h awake ≈ 0.08% BAC ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const hours9 = Math.min(20, (s9 / 150) * 20); // counter 0 -> 20 by 5s into the scene
  const bac9 = Math.min(0.08, (s9 / 150) * 0.08); // BAC 0.00 -> 0.08 by 5s
  const gauge9 = Math.min(1, s9 / 150); // gauge fills by 5s

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — how long is a microsleep? Usually 15 seconds or less */}
      {frame < 300 && (
        <Center>
          <Kicker>A TINY BURST OF REAL SLEEP</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: MOON, marginTop: 36, textAlign: "center", lineHeight: 1, transform: `scale(${pulse2})` }}>
            15<span style={{ fontSize: 64, color: GOLD }}> SEC</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 8, textAlign: "center" }}>
            OR LESS — USUALLY
          </div>
          <div style={{ position: "relative", width: 860, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44, overflow: "hidden" }}>
            <div style={{ width: TRACK * 0.5, height: 44, backgroundColor: TEAL, borderRadius: 999, opacity: 0.55 }} />
            <div style={{ position: "absolute", left: sweep2 * 820, top: 2, width: 40, height: 40, borderRadius: "50%", backgroundColor: GOLD, border: "4px solid #0b0b1e" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 860, fontSize: 28, color: GREY, marginTop: 12 }}>
            <span>0 SECONDS</span>
            <span style={{ color: TEAL }}>15 SEC — USUAL LIMIT</span>
            <span>30 SEC — MAX</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            A FEW SECONDS
            <br />
            OF REAL SLEEP
          </div>
          <Sub>It steals in while you are awake — and you may never notice.</Sub>
        </Center>
      )}

      {/* S4 — local sleep: some brain cells nap while the rat stays awake (RAT STUDY) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>PART OF THE BRAIN NAPS</Kicker>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, marginTop: 40 }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const isNapping = napping4.includes(i);
              const level = isNapping ? napLevel4[napping4.indexOf(i)] : 1;
              return (
                <div key={i} style={{ width: 110, height: 110, borderRadius: "50%", backgroundColor: isNapping ? "#3a3a52" : BLUE, opacity: 0.25 + 0.75 * level, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: isNapping ? "#8a8aa0" : "#0b0b1e", border: isNapping ? "3px dashed #8a8aa0" : "3px solid #5aa9ff" }}>
                  {isNapping ? "z" : "●"}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 860, fontSize: 28, color: GREY, marginTop: 24 }}>
            <span style={{ color: BLUE }}>● AWAKE CELLS — FIRING</span>
            <span style={{ color: "#8a8aa0" }}>z NAPPING CELLS — OFF</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            LOCAL SLEEP
          </div>
          <Sub>Some brain cells switch off — while the rat stays awake and keeps moving.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Vyazovskiy et al., Nature 2011 — a rat study
          </div>
        </Center>
      )}

      {/* S6 — 4 warning signs */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>4 WARNING SIGNS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36, width: 860 }}>
            {["⚠ HEAVY EYELIDS", "⚠ YAWNING AGAIN AND AGAIN", "⚠ CAN'T REMEMBER THE LAST MILES", "⚠ MISSING A KNOWN EXIT"].map((label, i) => (
              <div key={label} style={{ backgroundColor: "#1c1c30", borderRadius: 16, padding: "18px 28px", textAlign: "center", opacity: check6[i], transform: `translateY(${(1 - check6[i]) * 24}px)` }}>
                <span style={{ fontSize: 34, fontWeight: 900, color: i === 3 ? GOLD : MOON }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            TIME TO
            <br />
            STOP AND REST
          </div>
          <Sub>Any one of these means the microsleeps are already starting.</Sub>
        </Center>
      )}

      {/* S8 — crash risk bars: TRUE multiples (AAA 2016) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>THE NUMBERS ARE BRUTAL</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 30, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>7+ HOURS OF SLEEP</span>
                <span style={{ color: TEAL }}>1× RISK</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wBase8, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>5–6 HOURS OF SLEEP</span>
                <span style={{ color: GOLD }}>ABOUT 2× RISK</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wMid8, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800 }}>
                <span style={{ color: GREY }}>4–5 HOURS OF SLEEP</span>
                <span style={{ color: "#ff7a7a" }}>OVER 4× RISK</span>
              </div>
              <div style={{ position: "relative", height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ width: wHigh8, height: 44, backgroundColor: "#ff7a7a", borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            NEARLY DOUBLES
            <br />
            AFTER 1–2 LOST HOURS
          </div>
          <Sub>About 100,000 drowsy-driving crashes a year in America.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            AAA Foundation for Traffic Safety, 2016
          </div>
        </Center>
      )}

      {/* S9 — PAYOFF: 20 hours awake ≈ 0.08% BAC */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 150, fontWeight: 900, color: MOON, marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            {hours9.toFixed(0)} HOURS
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 10, textAlign: "center" }}>
            AWAKE — NO SLEEP AT ALL
          </div>
          <div style={{ position: "relative", width: 760, height: 40, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 32, overflow: "hidden" }}>
            <div style={{ width: gauge9 * TRACK, height: 40, backgroundColor: "#ff7a7a", borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 96, fontWeight: 900, color: "#ff7a7a", marginTop: 28, textAlign: "center", lineHeight: 1 }}>
            {bac9.toFixed(2)}% BAC
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 28, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            LIKE THE LEGAL
            <br />
            ALCOHOL LIMIT
          </div>
          <Sub>Yet you feel fine. Only sleep fixes it — pull over, and rest.</Sub>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Arnedt et al., 2000 — simulated driving
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
