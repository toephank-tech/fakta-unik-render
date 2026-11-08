import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 7 (#53): Your Brain Recognizes an Image in 13 Milliseconds (LONG version of Ep.53 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge (it collided with the Kicker in #47) and NO Sub lines (the burned-in
// subtitle already carries the narration). Every scene: Kicker + one big visual
// + one stamp. Stamps appear EARLY (frame <= 60). TRUE proportions on all bars.
// Palette: deep space navy / electric cyan / gold (vision-speed theme).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - MIT 2014 (Potter et al.): brain detects a named picture flashed for just 13 ms.
// - 13 ms is less than a hundredth of a second; one blink takes 100-400 ms.
// - Feedforward sweep: retina -> visual cortex in one forward pass, no second look.
// - Thorpe 1996 (Nature): animal photos flashed 20 ms, sorted in under 150 ms.
// - Greene & Oliva 2009: scene gist grasped in as little as 19 ms.
// - Retina: ~120M rods + ~6M cones per eye -> ~1.2M optic nerve fibers (~105x compression).
// - Face N170: brain flags a face at ~170 ms (Bentin 1996).
// - Saccades: ~3/sec, 150,000+ per day (Yarbus 1967; MIT).
// - Saccadic suppression: effectively blind mid-jump; never see your own eyes move in a mirror.
// - Tinsley 2016 (Nat Commun): humans detect a single photon.
// - At least a third of the cortex is devoted to vision (Kanwisher; Bridge).
// - Two pictures side by side processed in parallel, no slowdown (Thorpe).
// - PAYOFF: target named only AFTER the pictures — brain had already recorded it (Potter 2014).

const BG = "#070b1e";
const CYAN = "#4dd8ff";
const GOLD = "#f4c95d";
const CORAL = "#ff8a7a";
const VIOLET = "#b48cff";
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

export const FactsBrain13msLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): MIT 2014 — 13 ms ----
  const s2 = frame;
  const flash2 = Math.floor(s2 / 12) % 2 === 0;

  // ---- S4 (300-600): 13 ms vs one blink (100-400 ms) ----
  // TRUE proportion on a 400 ms = 1100px scale: 13 ms = 36px, 100 ms = 275px.
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);

  // ---- S6 (600-900): feedforward sweep eye -> cortex ----
  const s6 = frame - 600;
  const flow6 = (s6 % 60) / 60;

  // ---- S8 (900-1200): Thorpe 1996 — sorted in under 150 ms ----
  const s8 = frame - 900;
  const fill8 = Math.min(1, s8 / 210);

  // ---- S10 (1200-1500): retina hardware — 126M sensors -> 1.2M fibers ----
  // TRUE proportion: 1.2M / 126M = 0.95% -> 10px of 1100px; drawn at 14px min for visibility.
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 210);

  // ---- S12 (1500-1800): saccades — 150,000+ per day ----
  const s12 = frame - 1500;
  const jump12 = Math.floor(s12 / 30) % 3;

  // ---- S14 (1800-2100): a single photon ----
  const s14 = frame - 1800;
  const pulse14 = pulse(s14);

  // ---- S16 (2100-2400): two pictures in parallel, no slowdown ----
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);

  // ---- S18 (2400-2700): closing — faster than a blink ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — MIT 2014: recognized in 13 ms */}
      {frame < 300 && (
        <Center>
          <Kicker color={CYAN}>MIT 2014 — THE FASTEST FLASH THEIR SCREEN COULD SHOW</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CYAN, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            13 <span style={{ fontSize: 56 }}>ms</span>
          </div>
          <Label>TO RECOGNIZE A PICTURE</Label>
          <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: i === 0 && flash2 ? GOLD : "#1c2340", border: "3px solid #55556e", opacity: 1 - i * 0.12 }} />
            ))}
          </div>
          <Stamp color={CYAN} visible={s2 >= 60}>FASTER THAN A BLINK</Stamp>
        </Center>
      )}

      {/* S4 — 13 ms vs one blink 100-400 ms (TRUE: 36px vs 275px on a 400ms=1100px scale) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THIRTEEN MILLISECONDS VS ONE BLINK</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            13 <span style={{ fontSize: 56 }}>ms</span>
          </div>
          <Label>LESS THAN A HUNDREDTH OF A SECOND</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GOLD, textAlign: "right" }}>BRAIN</div>
              <div style={{ width: Math.max(14, 36 * fill4), height: 34, backgroundColor: GOLD, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD }}>13 ms</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CORAL, textAlign: "right" }}>BLINK</div>
              <div style={{ width: 275 * fill4, height: 34, backgroundColor: CORAL, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: CORAL }}>100&ndash;400 ms</div>
            </div>
          </div>
          <Stamp color={CORAL} visible={s4 >= 60}>UP TO 30 TIMES LONGER</Stamp>
        </Center>
      )}

      {/* S6 — one forward sweep, no second look */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={CYAN}>ONE FORWARD SWEEP — EYE TO VISUAL CORTEX</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: CYAN, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            1 SWEEP
          </div>
          <Label>NO SECOND LOOK. NO DOUBLE-CHECKING.</Label>
          <div style={{ position: "relative", width: 1100, height: 60, marginTop: 22 }}>
            <div style={{ position: "absolute", left: 0, top: 28, width: 1100, height: 4, backgroundColor: "#55556e" }} />
            {[0, 1, 2, 3, 4].map((i) => {
              const x = ((flow6 * 1100 + i * 220) % 1100);
              return (
                <div key={i} style={{ position: "absolute", left: x, top: 17, width: 26, height: 26, borderRadius: "50%", backgroundColor: CYAN, boxShadow: "0 0 14px #4dd8ff" }} />
              );
            })}
            <div style={{ position: "absolute", left: 0, top: 8, fontSize: 28, fontWeight: 900, color: MOON }}>EYE</div>
            <div style={{ position: "absolute", right: 0, top: 8, fontSize: 28, fontWeight: 900, color: MOON }}>CORTEX</div>
          </div>
          <Stamp color={CYAN} visible={s6 >= 60}>A FACE. A BEACH. A SMILING COUPLE.</Stamp>
        </Center>
      )}

      {/* S8 — Thorpe 1996: sorted in under 150 ms (TRUE: 150/400 = 412px of 1100px) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>THORPE 1996 — ANIMAL OR NOT, IN A FLASH</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: VIOLET, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            150 <span style={{ fontSize: 56 }}>ms</span>
          </div>
          <Label>TO SORT AN ANIMAL PHOTO — FLASHED FOR ONLY 20 MS</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 412 * fill8, height: 40, backgroundColor: VIOLET, borderRadius: 999 }} />
          </div>
          <Stamp color={VIOLET} visible={s8 >= 60}>UNDER 150 MILLISECONDS — PUBLISHED IN NATURE</Stamp>
        </Center>
      )}

      {/* S10 — retina hardware: 126M sensors -> 1.2M fibers (TRUE: 1.2/126 = 0.95%, ~105x compression) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={GOLD}>THE HARDWARE: 126 MILLION SENSORS, ONE THIN CABLE</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            105&times;
          </div>
          <Label>COMPRESSION — SENSORS SQUEEZED INTO NERVE FIBERS</Label>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>SENSORS</div>
              <div style={{ width: 1100 * fill10, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY }}>126M</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GOLD, textAlign: "right" }}>FIBERS</div>
              <div style={{ width: Math.max(14, 10 * fill10), height: 34, backgroundColor: GOLD, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD }}>1.2M</div>
            </div>
          </div>
          <Stamp color={GOLD} visible={s10 >= 60}>YOUR RETINA PRE-PROCESSES EVERYTHING</Stamp>
        </Center>
      )}

      {/* S12 — saccades: 150,000+ per day, 3 per second */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={CYAN}>YOUR EYES NEVER STOP MOVING</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CYAN, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            150,000+
          </div>
          <Label>SACCADES EVERY SINGLE DAY</Label>
          <div style={{ display: "flex", gap: 40, marginTop: 22 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: i === jump12 ? GOLD : "#1c2340", border: "4px solid #55556e" }} />
            ))}
          </div>
          <Stamp color={CYAN} visible={s12 >= 60}>3 JUMPS EVERY SECOND</Stamp>
        </Center>
      )}

      {/* S14 — a single photon */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={GOLD}>ONE PARTICLE OF LIGHT — AND YOU CAN DETECT IT</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            1 <span style={{ fontSize: 56 }}>PHOTON</span>
          </div>
          <Label>THE SMALLEST UNIT OF LIGHT THERE IS</Label>
          <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: GOLD, transform: `scale(${pulse14})`, boxShadow: "0 0 50px rgba(244,201,93,0.6)", marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84, fontWeight: 900, color: "#070b1e" }}>&#9679;</div>
          <Stamp color={GOLD} visible={s14 >= 60}>TINSLEY 2016 — NATURE COMMUNICATIONS</Stamp>
        </Center>
      )}

      {/* S16 — two pictures in parallel, no slowdown (TRUE: both bars fill identically) */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={VIOLET}>TWO PICTURES AT ONCE — SAME SPEED</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: VIOLET, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            2&times;
          </div>
          <Label>PICTURES SIDE BY SIDE — PROCESSED IN PARALLEL</Label>
          <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ width: 538, height: 40, backgroundColor: "#1c2340", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: 538 * fill16, height: 40, backgroundColor: VIOLET, borderRadius: 999 }} />
              </div>
            ))}
          </div>
          <Stamp color={VIOLET} visible={s16 >= 60}>PARALLEL. NO SLOWDOWN AT ALL.</Stamp>
        </Center>
      )}

      {/* S18 — closing: faster than a blink */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker color={CYAN}>EVERY GLANCE IS A SUPERPOWER YOU NEVER NOTICE</Kicker>
          <div style={{ width: 170, height: 170, borderRadius: "50%", backgroundColor: CYAN, transform: `scale(${pulse18})`, boxShadow: "0 0 50px rgba(77,216,255,0.6)", marginTop: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 84, fontWeight: 900, color: "#070b1e" }}>&#9679;</div>
          <Label>YOUR BRAIN READS THE WORLD</Label>
          <Stamp color={CYAN} visible={s18 >= 60}>FASTER THAN YOU CAN BLINK</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
