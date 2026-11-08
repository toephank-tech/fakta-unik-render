import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #46: Your DNA Stretches to the Sun 20 Times
// (priority queue rank 42, Tier A — LAST of the 12 remaining Shorts, 49th Short)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. DNA palette: deep navy / gold / aqua / coral.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// NARRATION VOICE: MALE Rumpled Armchair (avocado_v2:vdc_22255), speed 95,
// atempo 1.050x. Dramatic pauses after hook (S1) and before payoff (S9).
// FACTS (all verified 2026-11-08 before scripting):
// - One diploid cell: ~2.08 m DNA (6.11-6.2B bp x 0.34 nm; T2T 2022 haploid
//   genome 3.055B bp). ~2 m is TALLER than most people.
// - Nucleus only ~6-7 micrometres wide. 2 m / 6 um = ~333,000x.
// - 46 chromosomes (23 pairs). Double helix ~2 nm wide: length is roughly
//   a billion times its width (2 m / 2 nm = 1e9).
// - Red blood cells: NO nucleus, NO DNA. ~25 trillion RBCs (Sender 2016).
// - Nucleated cells ~7 trillion (Hatton 2023 census, 70-kg reference man:
//   ~36T total, ~29T RBCs + platelets without nuclei).
// - Total DNA ~14 billion km (7T x 2 m; Hatton-based estimate).
// - Sun ~150 million km away. Honest range across published estimates:
//   ~21 to ~48 round trips. Script payoff uses the SAFE FLOOR: more than
//   20 round trips. The old 600x claim assumed ~100 trillion nucleated
//   cells — it counted cells with no DNA. NEVER claim 600x as fact.

const BG = "#0b1026";
const NAVY = "#16233f";
const GOLD = "#f4c95d";
const AQUA = "#4cc9f0";
const CORAL = "#ff8a7a";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const MOON = "#e6e2ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || AQUA, fontWeight: 700, textAlign: "center" }}>
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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8fa8d4", fontWeight: 700 }}>
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

export const FactsDna2MetresMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 2 metres, taller than most people, in a 6-um nucleus ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill2 = Math.min(1, s2 / 210); // thread unspools over ~7s
  const thread2 = 760 * fill2; // 2-metre thread grows across the track
  const pulse2 = 1 + 0.04 * Math.sin(s2 * 0.12);
  // Nucleus dot: 6 um vs 2 m = 1 : 333,333 — a 2 m bar of 760px makes the
  // nucleus 0.002px, so we show an 8px dot and SAY the true ratio.
  const dot2 = 4 + 4 * Math.sin(s2 * 0.08);

  // ---- S4 (300-600): 46 chromosomes; helix only ~2 nm wide ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill4 = Math.min(1, s4 / 210);
  const count4 = Math.round(46 * fill4); // chromosome counter 0 -> 46
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);
  // Length vs width: 2 m long bar (760px) vs 2 nm wide = 1/1,000,000,000,
  // a hairline. The hairline IS the honest proportion.
  const wide4 = Math.max(2 * fill4, fill4 > 0 ? 2 : 0);

  // ---- S6 (600-900): only nucleated cells count — ~7T vs ~25T RBCs ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill6 = Math.min(1, s6 / 210);
  // TRUE proportions on a 760px track: RBCs ~25T = full 760px;
  // nucleated ~7T = 7/25 = 28% -> 213px.
  const barRbc6 = 760 * fill6;
  const barNuc6 = Math.max(213 * fill6, fill6 > 0 ? 6 : 0);

  // ---- S8 (900-1200): the Sun is ~150 million km away — so how far? ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const fill8 = Math.min(1, s8 / 210);
  const trip8 = Math.min(150, Math.round(150 * fill8)); // counter 0 -> 150 (million km)
  const pulse8 = 1 + 0.04 * Math.sin(s8 * 0.12);
  // Earth -> Sun line grows across the track as the counter climbs.
  const line8 = 760 * fill8;

  // ---- S9 (1200-1500): PAYOFF — more than 20 round trips; 600x is wrong ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const big9 = s9 >= 90 ? 1 : 0;
  const count9 = Math.min(20, Math.floor(s9 / 10)); // ticks 0 -> 20 over ~7s
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — 2 metres of thread in a 6-micrometre nucleus. */}
      {frame < 300 && (
        <Center>
          <Kicker color={GOLD}>TWO METRES — IN ONE CELL</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36, transform: `scale(${pulse2})` }}>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1 }}>2 m</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              TALLER THAN MOST PEOPLE
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
              <span style={{ color: MOON }}>🧬 THE THREAD</span>
              <span style={{ color: GOLD }}>2 METRES</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 40, backgroundColor: NAVY, borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: thread2, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 32, fontWeight: 800, marginTop: 18 }}>
              <span style={{ color: MOON }}>🔬 THE NUCLEUS IT FITS IN</span>
              <span style={{ color: AQUA }}>6 µm</span>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
              <div style={{ width: 8 + dot2, height: 8 + dot2, borderRadius: "50%", backgroundColor: AQUA, boxShadow: "0 0 24px #4cc9f0" }} />
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: MOON, textAlign: "center", marginTop: 6 }}>
              THE THREAD IS ~333,000× LONGER THAN THE NUCLEUS IS WIDE
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 36, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            2 METRES
            <br />
            IN A SPECK
          </div>
          <Sub>One cell. Two metres of DNA. A nucleus six millionths of a metre wide.</Sub>
        </Center>
      )}

      {/* S4 — 46 chromosomes; helix ~2 nm wide. */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>PACKED INTO 46 CHROMOSOMES</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ fontSize: 150, fontWeight: 900, color: AQUA, lineHeight: 1, transform: `scale(${pulse4})` }}>
              {count4}
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              CHROMOSOMES IN EVERY CELL
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
              <span style={{ color: MOON }}>📏 LENGTH</span>
              <span style={{ color: GOLD }}>~2 METRES</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 40, backgroundColor: NAVY, borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 760 * fill4, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800, marginTop: 18 }}>
              <span style={{ color: MOON }}>↔ WIDTH OF THE HELIX</span>
              <span style={{ color: AQUA }}>~2 nm</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 40, backgroundColor: NAVY, borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: wide4, height: 40, backgroundColor: AQUA, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, color: MOON, textAlign: "center", marginTop: 6 }}>
              A BILLION TIMES LONGER THAN IT IS WIDE
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: AQUA, marginTop: 36, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            6 BILLION LETTERS
            <br />
            IN ONE CELL
          </div>
          <Sub>Two copies of your genome — about three billion letters each.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            T2T Consortium 2022 • 3.055 billion base pairs per copy
          </div>
        </Center>
      )}

      {/* S6 — only nucleated cells count: ~7T vs ~25T RBCs with no DNA. */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={CORAL}>BUT NOT EVERY CELL COUNTS</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, marginTop: 40, width: 860 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🩸 RED BLOOD CELLS</span>
                <span style={{ color: CORAL }}>~25 TRILLION</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: NAVY, borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barRbc6, height: 44, backgroundColor: CORAL, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: CORAL, marginTop: 8, textAlign: "center" }}>
                NO NUCLEUS — NO DNA AT ALL
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 32, fontWeight: 800 }}>
                <span style={{ color: MOON }}>🧬 CELLS WITH A NUCLEUS</span>
                <span style={{ color: GOLD }}>~7 TRILLION</span>
              </div>
              <div style={{ position: "relative", width: 760, height: 44, backgroundColor: NAVY, borderRadius: 999, marginTop: 10, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: barNuc6, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: GOLD, marginTop: 8, textAlign: "center" }}>
                ONLY THESE COUNT — 28% OF THE RED-CELL BAR
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            25 TRILLION CELLS
            <br />
            CARRY NOTHING
          </div>
          <Sub>Scientists count only the cells with a nucleus.</Sub>
          <div style={{ fontSize: 26, color: "#8fa8d4", marginTop: 18, textAlign: "center" }}>
            Sender, Fuchs &amp; Milo 2016 • Hatton 2023 census
          </div>
        </Center>
      )}

      {/* S8 — the Sun is ~150 million km away. So how far? */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={GOLD}>NOW, THE SUN</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 36 }}>
            <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, lineHeight: 1, transform: `scale(${pulse8})` }}>
              {trip8}M km
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
              FROM EARTH TO THE SUN — ONE WAY
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40, width: 860 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 40, fontWeight: 900 }}>
              <span style={{ color: AQUA }}>🌍 EARTH</span>
              <span style={{ color: GOLD }}>☀️ SUN</span>
            </div>
            <div style={{ position: "relative", width: 760, height: 44, backgroundColor: NAVY, borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: line8, height: 44, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: MOON, textAlign: "center", marginTop: 10 }}>
              ~150 MILLION KILOMETRES, ONE WAY
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            SO HOW FAR DOES
            <br />
            ALL YOUR DNA REACH?
          </div>
          <Sub>Fourteen billion kilometres of it. Do the maths.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: more than 20 round trips; 600x is wrong. */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 40 }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 24, textAlign: "center" }}>
              ALL YOUR DNA, END TO END
            </div>
            <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1, marginTop: 12, transform: `scale(${pulse9})` }}>
              {count9}+
            </div>
            <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 12, textAlign: "center" }}>
              TRIPS TO THE SUN AND BACK
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: CORAL, marginTop: 36, opacity: big9, textAlign: "center", lineHeight: 1.2 }}>
            NOT 600×
          </div>
          <div style={{ fontSize: 32, fontWeight: 800, color: TEAL, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            THE OLD NUMBER COUNTED CELLS WITH NO DNA
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
