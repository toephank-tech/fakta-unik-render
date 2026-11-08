import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts — Idea #112: The Left-Brain / Right-Brain Myth Is False
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S8) are separate clips; this comp covers
// S2, S4, S6, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / blue-pink palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages — no inherited *8.6-style width math.
// Stamps appear EARLY in their scene (frame <= 60).

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const PINK = "#ff8fa3";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const CARD = "#1b1b30";
const LINE = "#3a3a5e";

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

export const FactsLeftRightBrainMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): the myth — LEFT logical vs RIGHT creative, stamped MYTH ----
  const s2 = frame;
  const mythStamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const wobble2 = Math.sin(s2 * 0.08) * 4;
  const qPulse2 = 1 + 0.08 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): 1,011 brains scanned, zero evidence ----
  const s4 = frame - 300;
  const count4 = Math.min(1011, Math.floor((s4 / 210) * 1011));
  const zeroStamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse4 = 1 + 0.05 * Math.sin(s4 * 0.12);
  const dots4 = Math.min(12, Math.floor(s4 / 20));

  // ---- S6 (600-900): corpus callosum bridge, pulses travel both ways ----
  const s6 = frame - 600;
  const bridgePhase6 = (s6 * 2) % 640; // dots travel across the 640px bridge
  const glow6 = 0.6 + 0.4 * Math.sin(s6 * 0.12);

  // ---- S7 (900-1200): bridge cut, halves drift apart, Nobel 1981 ----
  const s7 = frame - 900;
  const cutAt7 = 90;
  const cutProgress7 = s7 < cutAt7 ? 0 : Math.min(1, (s7 - cutAt7) / 120);
  const split7 = cutProgress7 * 70; // halves drift apart by 70px each side
  const stamp7 = s7 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const medalGlow7 = 0.6 + 0.4 * Math.sin(s7 * 0.1);

  // ---- S9 (1200-1500): whole-brained closing glow ----
  const s9 = frame - 1200;
  const pulse9 = 1 + 0.1 * Math.sin(s9 * 0.1);
  const ring9 = (s9 % 120) / 120;
  const drift = Array.from({ length: 10 }).map((_, i) => ({
    y: 60 + ((i * 173) % 700),
    speed: 1.2 + (i % 3),
    size: 14 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the myth: left logical, right creative */}
      {frame < 300 && (
        <Center>
          <Kicker>THE MYTH SAYS</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48 }}>
            <div style={{ backgroundColor: CARD, border: `2px solid ${BLUE}`, borderRadius: 20, padding: "30px 28px", textAlign: "center", width: 330, transform: `translateY(${wobble2}px)` }}>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 2, color: BLUE }}>LEFT BRAIN</div>
              <div style={{ fontSize: 52, fontWeight: 900, marginTop: 12 }}>LOGICAL</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>numbers • words</div>
            </div>
            <div style={{ fontSize: 64, fontWeight: 900, color: GOLD, transform: `scale(${qPulse2})` }}>?</div>
            <div style={{ backgroundColor: CARD, border: `2px solid ${PINK}`, borderRadius: 20, padding: "30px 28px", textAlign: "center", width: 330, transform: `translateY(${-wobble2}px)` }}>
              <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: 2, color: PINK }}>RIGHT BRAIN</div>
              <div style={{ fontSize: 52, fontWeight: 900, marginTop: 12 }}>CREATIVE</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>art • feelings</div>
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#ff5d5d", marginTop: 44, opacity: mythStamp2, transform: "rotate(-4deg)", border: "5px solid #ff5d5d", borderRadius: 16, padding: "6px 34px" }}>
            ✕ MYTH
          </div>
          <Sub>Logical people are left-brained, artists are right-brained? Not true.</Sub>
        </Center>
      )}

      {/* S4 — 1,011 brains scanned, zero evidence */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>THE STUDY THAT TESTED IT</Kicker>
          <div style={{ fontSize: 118, fontWeight: 900, color: GOLD, marginTop: 36, transform: `scale(${pulse4})`, textAlign: "center", letterSpacing: 2 }}>
            {count4.toLocaleString("en-US")}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: "white", marginTop: 12, textAlign: "center" }}>
            BRAINS SCANNED — UTAH, 2013
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 40, width: 640 }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  backgroundColor: i < dots4 ? TEAL : "#2c2c48",
                  boxShadow: i < dots4 ? "0 0 16px rgba(127,212,193,0.8)" : "none",
                }}
              />
            ))}
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: "#ff5d5d", marginTop: 40, opacity: zeroStamp4, textAlign: "center" }}>
            ZERO EVIDENCE OF A DOMINANT SIDE
          </div>
          <Sub>7,000 brain regions mapped. No one favored one side.</Sub>
        </Center>
      )}

      {/* S6 — corpus callosum bridge */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE BRIDGE BETWEEN HALVES</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 48 }}>
            <div style={{ backgroundColor: CARD, border: `2px solid ${BLUE}`, borderRadius: 20, padding: "26px 24px", textAlign: "center", width: 250 }}>
              <div style={{ fontSize: 72, lineHeight: 1 }}>🧠</div>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginTop: 10, color: BLUE }}>LEFT</div>
            </div>
            <div style={{ position: "relative", width: 300, height: 80 }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 38, height: 6, backgroundColor: LINE, borderRadius: 999 }} />
              {[0, 1, 2].map((i) => {
                const x = (bridgePhase6 + i * 213) % 640;
                const pos = (x / 640) * 280 + 10;
                const dir = i % 2 === 0 ? 1 : -1;
                const px = dir === 1 ? pos : 290 - pos;
                return (
                  <div key={i} style={{ position: "absolute", left: px, top: 26, width: 28, height: 28, borderRadius: "50%", backgroundColor: GOLD, boxShadow: `0 0 18px rgba(244,201,93,${glow6})` }} />
                );
              })}
            </div>
            <div style={{ backgroundColor: CARD, border: `2px solid ${PINK}`, borderRadius: 20, padding: "26px 24px", textAlign: "center", width: 250 }}>
              <div style={{ fontSize: 72, lineHeight: 1 }}>🧠</div>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginTop: 10, color: PINK }}>RIGHT</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 44, textAlign: "center" }}>
            ≈ 200,000,000 FIBERS
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: GREY, marginTop: 10, textAlign: "center" }}>
            the corpus callosum
          </div>
          <Sub>Almost every task uses both halves at once.</Sub>
        </Center>
      )}

      {/* S7 — bridge cut, Nobel Prize */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={PINK}>CUT THE BRIDGE?</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 48 }}>
            <div style={{ backgroundColor: CARD, border: `2px solid ${BLUE}`, borderRadius: 20, padding: "26px 24px", textAlign: "center", width: 250, transform: `translateX(${-split7}px)` }}>
              <div style={{ fontSize: 72, lineHeight: 1 }}>🧠</div>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginTop: 10, color: BLUE }}>LEFT ALONE</div>
            </div>
            <div style={{ position: "relative", width: 300, height: 80 }}>
              <div style={{ position: "absolute", left: 0, width: 140, top: 38, height: 6, backgroundColor: "#ff5d5d", borderRadius: 999, opacity: cutProgress7 > 0 ? 0.35 : 1 }} />
              <div style={{ position: "absolute", right: 0, width: 140, top: 38, height: 6, backgroundColor: "#ff5d5d", borderRadius: 999, opacity: cutProgress7 > 0 ? 0.35 : 1 }} />
              <div style={{ position: "absolute", left: "50%", top: 8, transform: "translateX(-50%)", fontSize: 56, fontWeight: 900, color: "#ff5d5d", opacity: cutProgress7 > 0 ? 1 : 0 }}>
                ✂
              </div>
            </div>
            <div style={{ backgroundColor: CARD, border: `2px solid ${PINK}`, borderRadius: 20, padding: "26px 24px", textAlign: "center", width: 250, transform: `translateX(${split7}px)` }}>
              <div style={{ fontSize: 72, lineHeight: 1 }}>🧠</div>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginTop: 10, color: PINK }}>RIGHT ALONE</div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp7, textAlign: "center", textShadow: `0 0 22px rgba(244,201,93,${medalGlow7})` }}>
            🏅 NOBEL PRIZE 1981
          </div>
          <Sub>Specialization is real. Personality types are not.</Sub>
        </Center>
      )}

      {/* S9 — whole-brained closing */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 380, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 340, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : BLUE, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(90,169,255,0.6)" }} />
                </div>
              );
            })}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
              {[0, 1].map((i) => {
                const p = (ring9 + i / 2) % 1;
                return (
                  <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 110 + p * 280, height: 110 + p * 280, borderRadius: "50%", border: `3px solid ${GOLD}`, opacity: 0.7 * (1 - p), transform: "translate(-50%, -50%)" }} />
                );
              })}
              <div style={{ transform: `scale(${pulse9})`, fontSize: 170, lineHeight: 1 }}>🧠</div>
            </div>
          </div>
          <div style={{ fontSize: 62, fontWeight: 900, color: GOLD, marginTop: 36, textAlign: "center" }}>
            WHOLE-BRAINED
          </div>
          <div style={{ fontSize: 46, fontWeight: 800, marginTop: 18, textAlign: "center", lineHeight: 1.25 }}>
            Both sides, working together, all the time.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
