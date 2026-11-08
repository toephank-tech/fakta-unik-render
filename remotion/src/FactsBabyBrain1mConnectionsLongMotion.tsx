import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 10 (#54): A Baby's Brain Makes 1 Million Connections Per Second (LONG version of Ep.54 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE: with MarginV 360 + font 60, subtitles occupy roughly
// y 560-720, so ALL motion content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge and NO Sub lines (the burned-in subtitle already carries the narration).
// Every scene: Kicker + one big visual + one stamp. Stamps appear EARLY (frame <= 60).
// TRUE proportions on all bars. Palette: deep plum-navy / gold / coral / pink (baby theme).
// FACTS (all verified, see script_en.txt):
// - >1M new neural connections/second in the first years (Harvard Center on the Developing Child, 2009).
// - Brain weight ~350 g at birth, ~970 g at age 1, ~1,400 g adult (Dekaban & Sadowsky 1978).
// - Serve-and-return: baby serves (babble/gesture/cry), adult returns (words/eye contact/hug) — Harvard.
// - Pruning: used connections strengthen, rarely used ones are pruned — "use it or lose it".
// - Newborns hear the sounds of every language; by 10-12 months they lose non-native
//   discrimination and specialize (Werker & Tees 1984; Kuhl et al. 2006).
// - Newborns spend ~50% of sleep in active (REM-like) sleep vs ~20-25% for adults.
// - A baby's brain uses ~60% of the body's energy vs ~20% for an adult (Steiner 2019; Kuzawa 2014).
// - Toxic stress: prolonged cortisol with no supportive adult wears on the young brain (Harvard NSC 2005).
// - Prefrontal cortex (judgment, self-control) finishes maturing around age 25 (Fields 2008).
// - PAYOFF: ~1,000 trillion connections by age 3, almost twice as many as an adult keeps.
//   The comparison line ("almost twice as many as an adult's") was trimmed from the S18
//   narration to fix drift (Slot 9 lesson) and lives here as the S18 stamp instead.

const BG = "#120e24";
const GOLD = "#f4c95d";
const CORAL = "#ff9a8a";
const PINK = "#ff9ecf";
const CYAN = "#4dd8ff";
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

export const FactsBabyBrain1mConnectionsLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): counter racing to 1,000,000 per second ----
  const s2 = frame;
  const count2 = Math.floor(1000000 * Math.min(1, s2 / 210));

  // ---- S4 (300-600): brain weight bars, TRUE on 1400 g = 1100 px ----
  // birth 350 g = 275 px; age 1 ~970 g = 762 px; adult 1400 g = 1100 px
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);

  // ---- S6 (600-900): serve and return ping-pong ----
  const s6 = frame - 600;
  const tri6 = s6 % 60;
  const ballX6 = tri6 < 30 ? (tri6 / 30) * 360 : 360 - ((tri6 - 30) / 30) * 360;

  // ---- S8 (900-1200): phoneme narrowing — heard sounds stay, unheard fade ----
  const s8 = frame - 900;
  const fade8 = Math.max(0.15, 1 - Math.min(1, s8 / 210) * 0.85);

  // ---- S10 (1200-1500): REM sleep bars, TRUE on 100% = 1100 px ----
  // baby 50% = 550 px; adult 25% = 275 px
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 210);

  // ---- S12 (1500-1800): energy bars, TRUE on 100% = 1100 px ----
  // baby 60% = 660 px; adult 20% = 220 px
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);

  // ---- S14 (1800-2100): toxic stress vs comfort (qualitative, no numbers) ----
  const s14 = frame - 1800;
  const calm14 = Math.min(1, s14 / 210);

  // ---- S16 (2100-2400): myelination timeline birth -> age 25 ----
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);

  // ---- S18 (2400-2700): payoff — 1,000 trillion connections ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — counter racing to 1,000,000 new connections per second */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>HARVARD — THE FASTEST BUILDING PROJECT IN THE BODY</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            {count2.toLocaleString("en-US")}
          </div>
          <Label>NEW CONNECTIONS FORMING EVERY SECOND</Label>
          <Stamp color={GOLD} visible={s2 >= 60}>EVERY SINGLE SECOND</Stamp>
        </Center>
      )}

      {/* S4 — brain weight bars: 350 g -> ~970 g -> 1400 g (TRUE: 275 / 762 / 1100 px) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={CORAL}>THE BRAIN NEARLY TRIPLES IN ONE YEAR</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: MOON, textAlign: "right" }}>BIRTH</div>
              <div style={{ width: 275 * fill4, height: 34, backgroundColor: PINK, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: MOON }}>350 g</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GOLD, textAlign: "right" }}>AGE 1</div>
              <div style={{ width: 762 * fill4, height: 34, backgroundColor: GOLD, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD }}>~1 kg</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>ADULT</div>
              <div style={{ width: 1100 * fill4, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY }}>1.4 kg</div>
            </div>
          </div>
          <Stamp color={CORAL} visible={s4 >= 60}>FROM 350 GRAMS TO ALMOST A KILOGRAM</Stamp>
        </Center>
      )}

      {/* S6 — serve and return: baby serves, you return */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={PINK}>SERVE AND RETURN — HARVARD</Kicker>
          <div style={{ position: "relative", width: 760, height: 150, marginTop: 22 }}>
            <div style={{ position: "absolute", left: 0, top: 15, width: 120, height: 120, borderRadius: "50%", backgroundColor: PINK, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#120e24" }}>BABY</div>
            <div style={{ position: "absolute", right: 0, top: 15, width: 120, height: 120, borderRadius: "50%", backgroundColor: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#120e24" }}>YOU</div>
            <div style={{ position: "absolute", left: 120 + ballX6, top: 62, width: 28, height: 28, borderRadius: "50%", backgroundColor: "white", boxShadow: "0 0 20px rgba(255,255,255,0.8)" }} />
          </div>
          <Label>BABBLE — ANSWER — BABBLE — ANSWER</Label>
          <Stamp color={PINK} visible={s6 >= 60}>EVERY RETURN STRENGTHENS A CONNECTION</Stamp>
        </Center>
      )}

      {/* S8 — phoneme narrowing: sounds heard stay bright, unheard fade (qualitative) */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={VIOLET}>BORN HEARING EVERY LANGUAGE ON EARTH</Kicker>
          <div style={{ display: "flex", gap: 22, marginTop: 24 }}>
            {["a", "e", "i", "o", "u", "r", "l", "sh"].map((ch, i) => (
              <div key={i} style={{ width: 84, height: 84, borderRadius: "50%", backgroundColor: i < 3 ? GOLD : "#3a3f66", opacity: i < 3 ? 1 : fade8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: i < 3 ? "#120e24" : MOON }}>
                {ch}
              </div>
            ))}
          </div>
          <Label>SOUNDS THE BABY HEARS STAY — THE REST FADE AWAY</Label>
          <Stamp color={VIOLET} visible={s8 >= 60}>TUNED IN TO ONE LANGUAGE BY TEN MONTHS</Stamp>
        </Center>
      )}

      {/* S10 — REM sleep bars: baby 50% vs adult 25% (TRUE: 550 / 275 px) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={CYAN}>EVEN SLEEP IS CONSTRUCTION WORK</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CYAN, textAlign: "right" }}>BABY</div>
              <div style={{ width: 550 * fill10, height: 34, backgroundColor: CYAN, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: CYAN }}>~50% DREAM SLEEP</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>ADULT</div>
              <div style={{ width: 275 * fill10, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY }}>~25%</div>
            </div>
          </div>
          <Label>THE BRAIN REPLAYS THE DAY WHILE THE BABY DREAMS</Label>
          <Stamp color={CYAN} visible={s10 >= 60}>DOUBLE THE DREAM SLEEP OF AN ADULT</Stamp>
        </Center>
      )}

      {/* S12 — energy bars: baby 60% vs adult 20% (TRUE: 660 / 220 px) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={GOLD}>BUILDING BURNS ENORMOUS FUEL</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GOLD, textAlign: "right" }}>BABY</div>
              <div style={{ width: 660 * fill12, height: 34, backgroundColor: GOLD, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD }}>~60% OF THE BODY'S ENERGY</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>ADULT</div>
              <div style={{ width: 220 * fill12, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY }}>~20%</div>
            </div>
          </div>
          <Stamp color={GOLD} visible={s12 >= 60}>TRIPLE THE FUEL OF YOUR BRAIN</Stamp>
        </Center>
      )}

      {/* S14 — toxic stress vs comfort (qualitative: stress bar high, comfort brings it down) */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={CORAL}>HARVARD CALLS IT TOXIC STRESS</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 60, marginTop: 22, height: 170 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 200, height: 150, backgroundColor: CORAL, borderRadius: 12, opacity: 1 - 0.45 * calm14 }} />
              <Label>STRESS, NO COMFORT</Label>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 200, height: 60, backgroundColor: "#4dd8a0", borderRadius: 12, opacity: 0.55 + 0.45 * calm14 }} />
              <Label>WITH A HUG</Label>
            </div>
          </div>
          <Stamp color={CORAL} visible={s14 >= 60}>A HUG LITERALLY CALMS THE CHEMISTRY</Stamp>
        </Center>
      )}

      {/* S16 — myelination timeline: birth to age 25 */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={VIOLET}>SOME WIRING TAKES DECADES</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: VIOLET, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            AGE 25
          </div>
          <Label>WHEN THE FRONT OF THE BRAIN FINISHES MATURING</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 1100 * fill16, height: 40, backgroundColor: VIOLET, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", width: 1100, justifyContent: "space-between", marginTop: 10, fontSize: 26, fontWeight: 800, color: MOON }}>
            <span>BIRTH</span><span>AGE 5</span><span>AGE 25</span>
          </div>
          <Stamp color={VIOLET} visible={s16 >= 60}>THE FRONT FINISHES LAST</Stamp>
        </Center>
      )}

      {/* S18 — PAYOFF: 1,000 trillion connections; stamp carries the trimmed narration line */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker color={GOLD}>HERE IS THE WILDEST PART</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1, transform: `scale(${pulse18})` }}>
            1,000 TRILLION
          </div>
          <Label>CONNECTIONS IN A THREE-YEAR-OLD'S BRAIN</Label>
          <Stamp color={GOLD} visible={s18 >= 60}>ALMOST TWICE AS MANY AS AN ADULT'S</Stamp>
          <div style={{ fontSize: 30, fontWeight: 800, color: PINK, marginTop: 10, opacity: s18 >= 90 ? 1 : 0, textAlign: "center" }}>
            ONE MILLION A SECOND — BUILT BY LOVE, TALK, AND PLAY
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
