import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #18: You Shed 30,000–40,000 Dead Skin Cells Every Minute
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / warm-skin palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages where numbers are claimed. Stamps appear
// EARLY in their scene (frame <= 60). Drifting decorative dots live in their
// own band and never cross text lines.

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const RED = "#ff5d5d";
const GREY = "#c9c9cf";
const TRACK = 760; // px — all bar widths are % of this track

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
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 480px" }}>
      {props.children}
    </div>
  );
}

export const FactsSkinShedMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): per-minute counter 0 -> 40,000, falling cells ----
  const s2 = frame;
  const count2 = Math.min(40000, Math.floor((s2 / 240) * 40000));
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);
  const dots2 = Array.from({ length: 12 }).map((_, i) => ({
    y: 60 + ((i * 173) % 240),
    speed: 1.1 + (i % 3) * 0.5,
    size: 12 + ((i * 29) % 22),
    offset: (i * 211) % 900,
  }));

  // ---- S4 (300-600): per-day scale — 0 -> 50 million cells, 1.5 grams ----
  const s4 = frame - 300;
  const count4 = Math.min(50000000, Math.floor((s4 / 240) * 50000000));
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // 1.5 g on a 0-2 g scale = TRUE 75% of track.
  const grow4 = Math.min(1, s4 / 180);
  const gramBar = (TRACK * 1.5 * grow4) / 2; // 570px at full grow

  // ---- S6 (600-900): dust myth-buster — myth 70-80% vs real 20-50% ----
  const s6 = frame - 600;
  const grow6 = Math.min(1, s6 / 180);
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  // Bars use the MIDPOINTS of the verified ranges, labelled as ranges:
  // myth 70-80% -> 75% of track (570px); real 20-50% -> 35% (266px).
  const mythBar = (TRACK * 75 * grow6) / 100;
  const realBar = (TRACK * 35 * grow6) / 100;

  // ---- S8 (900-1200): 1.5 g feeds ~1 million mites ----
  const s8 = frame - 900;
  const count8 = Math.min(1000000, Math.floor((s8 / 240) * 1000000));
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const mites8 = Array.from({ length: 16 }).map((_, i) => ({
    x: 40 + ((i * 137) % 680),
    y: 20 + ((i * 89) % 100),
    speed: 1.2 + (i % 3) * 0.6,
    size: 16 + ((i * 11) % 14),
    phase: (i * 0.7) % 6.28,
  }));

  // ---- S9 (1200-1500): payoff — 0 -> 10 million mites in one mattress ----
  const s9 = frame - 1200;
  const count9 = Math.min(10000000, Math.floor((s9 / 240) * 10000000));
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.06 * Math.sin(s9 * 0.12);
  // Dots live ONLY in their own band above the counter (never over text).
  const dots9 = Array.from({ length: 10 }).map((_, i) => ({
    y: 30 + ((i * 173) % 120),
    speed: 1.2 + (i % 3),
    size: 14 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — per-minute shedding: 30,000-40,000 dead cells every minute */}
      {frame < 300 && (
        <Center>
          <Kicker>EVERY SINGLE MINUTE</Kicker>
          <div style={{ position: "relative", width: 940, height: 180, overflow: "hidden", marginTop: 20 }}>
            {dots2.map((d, i) => {
              const x = ((d.offset + s2 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 160, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : TEAL, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(127,212,193,0.6)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, transform: `scale(${pulse2})`, textAlign: "center", lineHeight: 1 }}>
            {count2.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 10, textAlign: "center" }}>
            DEAD SKIN CELLS SHED
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp2, textAlign: "center" }}>
            30,000–40,000 A MINUTE
          </div>
          <Sub>You cannot see them. You cannot feel them. They never stop falling.</Sub>
        </Center>
      )}

      {/* S4 — per-day scale: ~50 million cells, ~1.5 grams */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>ADD IT UP — ONE DAY</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 36, textAlign: "center", lineHeight: 1 }}>
            {count4.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 10, textAlign: "center" }}>
            DEAD CELLS SHED EVERY DAY
          </div>
          <div style={{ marginTop: 44, width: TRACK }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 700, color: GREY, marginBottom: 10 }}>
              <span>WEIGHT OF ONE DAY&apos;S SHED SKIN</span>
              <span style={{ color: GOLD }}>~1.5 g</span>
            </div>
            <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${gramBar}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, fontWeight: 700, color: GREY, marginTop: 8 }}>
              <span>0 g</span>
              <span>2-GRAM SCALE</span>
              <span>2 g</span>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp4, textAlign: "center" }}>
            50 MILLION A DAY
          </div>
          <Sub>About fifty million cells — roughly one and a half grams of you.</Sub>
        </Center>
      )}

      {/* S6 — dust myth-buster: 70-80% is a myth, real figure 20-50% */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>WHAT IS HOUSEHOLD DUST?</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>THE MYTH</span>
                <span style={{ color: RED }}>70–80% DEAD SKIN</span>
              </div>
              <div style={{ width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${mythBar}px`, height: "100%", backgroundColor: RED, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>THE REAL FIGURE</span>
                <span style={{ color: GOLD }}>20–50% DEAD SKIN</span>
              </div>
              <div style={{ width: TRACK, height: 40, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${realBar}px`, height: "100%", backgroundColor: GOLD, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: RED, marginTop: 40, opacity: stamp6, textAlign: "center" }}>
            ✕ THE 70–80% CLAIM IS A MYTH
          </div>
          <Sub>Dead skin is a large share of dust — but not most of it.</Sub>
        </Center>
      )}

      {/* S8 — 1.5 g of shed skin feeds about a million dust mites */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>ONE DAY OF SHED SKIN FEEDS</Kicker>
          <div style={{ position: "relative", width: 940, height: 170, overflow: "hidden", marginTop: 20 }}>
            {mites8.map((m, i) => {
              const wob = Math.sin(s8 * 0.08 + m.phase) * 18;
              return (
                <div key={i} style={{ position: "absolute", left: m.x + wob, top: m.y, opacity: 0.85 }}>
                  <div style={{ width: m.size, height: m.size, borderRadius: "50%", backgroundColor: i % 2 === 0 ? GOLD : BLUE, boxShadow: "0 0 14px rgba(244,201,93,0.6)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, textAlign: "center", lineHeight: 1 }}>
            {count8.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 10, textAlign: "center" }}>
            DUST MITES
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp8, textAlign: "center" }}>
            1.5 GRAMS FEEDS A MILLION
          </div>
          <Sub>Each mite is smaller than a grain of sand — and invisible to you.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: up to 10 million dust mites in one mattress */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ position: "relative", width: 940, height: 150, overflow: "hidden", marginTop: 20 }}>
            {dots9.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 130, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : TEAL, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(127,212,193,0.6)" }} />
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, transform: `scale(${pulse9})`, textAlign: "center", lineHeight: 1 }}>
            {count9.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 10, textAlign: "center" }}>
            DUST MITES IN ONE MATTRESS
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 40, opacity: stamp9, textAlign: "center" }}>
            UP TO 10 MILLION — IN YOUR BED
          </div>
          <Sub>Millions of them, living in your bed right now, eating the skin you shed.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
