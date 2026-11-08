import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 8 (#4): Your Brain Holds 2.5 Petabytes of Memories (LONG version of Ep.4 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from the #47 smoke frame at t=15s):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge and NO Sub lines (the burned-in subtitle already carries the narration).
// Every scene: Kicker + one big visual + one stamp. Stamps appear EARLY (frame <= 60).
// TRUE proportions on all bars. Palette: deep space navy / violet / gold (memory theme).
// FACTS (all verified 2026-11-08, see script_en.txt):
// - Bartol et al. 2015, Salk: synapses come in 26 distinguishable sizes, ~4.7 bits each;
//   "at least a petabyte" — 10x previous estimates.
// - ~100 trillion synapses; 4.7 bits x 100 trillion = petabyte scale; 1 PB = 1,000,000 GB.
// - 1 PB holds ~1.2M hours of video (~137 years non-stop, scaled from Reber's 2.5 PB figure).
// - 2.5 PB is a popular estimate only (Reber 2010, never measured); brain is no hard drive.
// - Bliss & Lømo 1973: LTP — firing two cells together strengthens their connection.
// - Miller 1956: ~7 things at once; Cowan 2001: closer to 4 chunks.
// - Ebbinghaus 1885: ~50% forgotten in 1h, ~66% in 24h (retention 44% / ~34%).
// - Scoville & Milner 1957: Patient H.M., hippocampus removed 1953, no new memories.
// - Infantile amnesia: earliest memories cluster around age 3-4.
// - PAYOFF: every recall rebuilds the memory slightly differently (Nader et al. 2000).

const BG = "#0a0a20";
const VIOLET = "#b48cff";
const GOLD = "#f4c95d";
const CYAN = "#4dd8ff";
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

export const FactsBrainMemoryPetabytesLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): Salk 2015 — 26 synapse sizes ----
  const s2 = frame;
  const grow2 = Math.min(1, s2 / 210);

  // ---- S4 (300-600): 4.7 bits x 100 trillion = 1 PB ----
  const s4 = frame - 300;
  const fill4 = Math.min(1, s4 / 210);

  // ---- S6 (600-900): 1 PB vs 2.5 PB (TRUE: 1/2.5 = 440px of 1100px) ----
  const s6 = frame - 600;
  const fill6 = Math.min(1, s6 / 210);

  // ---- S8 (900-1200): LTP 1973 — connection thickens as cells fire together ----
  const s8 = frame - 900;
  const thick8 = 4 + 16 * Math.min(1, s8 / 240);
  const flash8 = Math.floor(s8 / 15) % 2 === 0;

  // ---- S10 (1200-1500): Miller 7 vs Cowan 4 — TRUE dot counts ----
  const s10 = frame - 1200;
  const pop10 = Math.min(1, s10 / 150);

  // ---- S12 (1500-1800): forgetting curve — 100% -> 44% (1h) -> 34% (24h), TRUE on 1100px ----
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 210);

  // ---- S14 (1800-2100): Patient H.M. 1953 ----
  const s14 = frame - 1800;
  const fade14 = 1 - Math.min(1, s14 / 240) * 0.75;

  // ---- S16 (2100-2400): childhood timeline — first 4 of 10 years dimmed (TRUE 40%) ----
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);

  // ---- S18 (2400-2700): payoff — copies of copies ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — Salk 2015: 26 different synapse sizes */}
      {frame < 300 && (
        <Center>
          <Kicker color={VIOLET}>SALK INSTITUTE 2015 — THEY MEASURED EVERY SIZE</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: VIOLET, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            26
          </div>
          <Label>DIFFERENT SIZES OF BRAIN CONNECTIONS</Label>
          <div style={{ display: "flex", gap: 10, marginTop: 22, alignItems: "flex-end", height: 70 }}>
            {Array.from({ length: 26 }).map((_, i) => (
              <div key={i} style={{ width: 14 + i * 1.6, height: 14 + i * 1.6, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : VIOLET, opacity: 0.35 + 0.65 * grow2 }} />
            ))}
          </div>
          <Stamp color={VIOLET} visible={s2 >= 60}>TWENTY-SIX SETTINGS ON THE DIAL</Stamp>
        </Center>
      )}

      {/* S4 — 4.7 bits x 100 trillion synapses = 1 petabyte */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>MULTIPLY IT OUT — THE MATH OF A PETABYTE</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            1 <span style={{ fontSize: 56 }}>PB</span>
          </div>
          <Label>4.7 BITS &times; A HUNDRED TRILLION CONNECTIONS</Label>
          <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: 1100 * fill4, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
          </div>
          <Stamp color={GOLD} visible={s4 >= 60}>ONE MILLION GIGABYTES IN YOUR HEAD</Stamp>
        </Center>
      )}

      {/* S6 — 1 PB vs 2.5 PB popular estimate (TRUE: 440px vs 1100px on a 2.5 PB scale) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={CYAN}>SOME ESTIMATES GO EVEN FURTHER</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GOLD, textAlign: "right" }}>SALK</div>
              <div style={{ width: 440 * fill6, height: 34, backgroundColor: GOLD, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD }}>1 PB</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CYAN, textAlign: "right" }}>POPULAR</div>
              <div style={{ width: 1100 * fill6, height: 34, backgroundColor: CYAN, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: CYAN }}>2.5 PB</div>
            </div>
          </div>
          <Label>BUT YOUR BRAIN IS NO HARD DRIVE AT ALL</Label>
          <Stamp color={CYAN} visible={s6 >= 60}>NO FILES. NO FOLDERS. NO DISK.</Stamp>
        </Center>
      )}

      {/* S8 — LTP 1973: fire together, wire together */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={VIOLET}>BLISS &amp; L&Oslash;MO 1973 — FIRE TOGETHER, WIRE TOGETHER</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 22 }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", backgroundColor: flash8 ? GOLD : VIOLET, boxShadow: "0 0 30px rgba(180,140,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#0a0a20" }}>A</div>
            <div style={{ width: 260, height: thick8, backgroundColor: GOLD, borderRadius: 999 }} />
            <div style={{ width: 120, height: 120, borderRadius: "50%", backgroundColor: flash8 ? GOLD : VIOLET, boxShadow: "0 0 30px rgba(180,140,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#0a0a20" }}>B</div>
          </div>
          <Label>THE CONNECTION GROWS STRONGER EVERY TIME THEY FIRE</Label>
          <Stamp color={VIOLET} visible={s8 >= 60}>THAT IS HOW A MEMORY IS MADE</Stamp>
        </Center>
      )}

      {/* S10 — Miller 7 vs Cowan 4 (TRUE dot counts) */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={GOLD}>WORKING MEMORY IS TINY — COUNT THE DOTS</Kicker>
          <div style={{ display: "flex", gap: 80, marginTop: 20, alignItems: "flex-start" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, lineHeight: 1 }}>7</div>
              <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: GOLD, opacity: pop10 }} />
                ))}
              </div>
              <Label>MILLER 1956</Label>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: CYAN, lineHeight: 1 }}>4</div>
              <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: CYAN, opacity: pop10 }} />
                ))}
              </div>
              <Label>NEWER RESEARCH</Label>
            </div>
          </div>
          <Stamp color={GOLD} visible={s10 >= 60}>SEVEN THINGS — OR CLOSER TO FOUR</Stamp>
        </Center>
      )}

      {/* S12 — forgetting curve: 100% -> 44% in 1h -> 34% in 24h (TRUE: 1100px, 484px, 374px) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={CORAL}>EBBINGHAUS 1885 — THE FORGETTING CURVE</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: GREY, textAlign: "right" }}>LEARNED</div>
              <div style={{ width: 1100 * fill12, height: 34, backgroundColor: "#3a3f66", borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: GREY }}>100%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: CORAL, textAlign: "right" }}>1 HOUR</div>
              <div style={{ width: 484 * fill12, height: 34, backgroundColor: CORAL, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: CORAL }}>~44%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 150, fontSize: 26, fontWeight: 800, color: VIOLET, textAlign: "right" }}>1 DAY</div>
              <div style={{ width: 374 * fill12, height: 34, backgroundColor: VIOLET, borderRadius: 999 }} />
              <div style={{ fontSize: 26, fontWeight: 800, color: VIOLET }}>~34%</div>
            </div>
          </div>
          <Stamp color={CORAL} visible={s12 >= 60}>TWO-THIRDS GONE WITHIN A DAY</Stamp>
        </Center>
      )}

      {/* S14 — Patient H.M. 1953: hippocampus removed, no new memories */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={CYAN}>ONE MAN TAUGHT US HOW MEMORY WORKS</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: CYAN, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            1953
          </div>
          <Label>HENRY MOLAISON — HIS HIPPOCAMPUS WAS REMOVED</Label>
          <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ width: 120, height: 70, borderRadius: 12, backgroundColor: "#1c2340", border: "3px solid #55556e", opacity: fade14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: MOON }}>?</div>
            ))}
          </div>
          <Stamp color={CYAN} visible={s14 >= 60}>NO NEW MEMORIES — EVER AGAIN</Stamp>
        </Center>
      )}

      {/* S16 — childhood timeline: first 4 of 10 years dimmed (TRUE 40%) */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={GOLD}>YOUR FIRST YEARS ARE MISSING</Kicker>
          <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, marginTop: 14, textAlign: "center", lineHeight: 1 }}>
            AGE 3&ndash;4
          </div>
          <Label>WHEN YOUR FIRST MEMORIES BEGIN</Label>
          <div style={{ display: "flex", width: 1100, height: 44, marginTop: 20, borderRadius: 999, overflow: "hidden" }}>
            <div style={{ width: 440 * fill16, backgroundColor: "#3a3f66" }} />
            <div style={{ width: 660 * fill16, backgroundColor: GOLD }} />
          </div>
          <div style={{ display: "flex", width: 1100, justifyContent: "space-between", marginTop: 10, fontSize: 26, fontWeight: 800, color: MOON }}>
            <span>BIRTH</span><span>AGE 4</span><span>AGE 10</span>
          </div>
          <Stamp color={GOLD} visible={s16 >= 60}>ALMOST NOTHING BEFORE AGE THREE OR FOUR</Stamp>
        </Center>
      )}

      {/* S18 — PAYOFF: every recall rebuilds the memory — copies of copies */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker color={VIOLET}>HERE IS THE WILDEST PART</Kicker>
          <div style={{ display: "flex", gap: 24, marginTop: 22, alignItems: "center" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 150 - i * 18, height: 150 - i * 18, borderRadius: 16, border: "4px solid " + (i === 0 ? VIOLET : i === 1 ? GOLD : CYAN), backgroundColor: "#1c2340", transform: `scale(${pulse18})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: MOON, opacity: 1 - i * 0.25 }}>
                {i === 0 ? "1st" : i === 1 ? "2nd" : "3rd"}
              </div>
            ))}
          </div>
          <Label>EVERY TIME YOU REMEMBER, YOUR BRAIN REBUILDS IT</Label>
          <Stamp color={VIOLET} visible={s18 >= 60}>REBUILT — SLIGHTLY DIFFERENTLY</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
