import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #35: ~38 Trillion Bacteria Live Inside You
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S8) are separate clips; this comp covers
// S2, S4, S6, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Dark navy / gold / teal palette.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// Bar widths use TRUE percentages where numbers are claimed. Stamps appear
// EARLY in their scene (frame <= 60).

const BG = "#0d0d1a";
const GOLD = "#f4c95d";
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

export const FactsBacteriaMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): 10:1 myth crossed out -> ~1:1 ----
  const s2 = frame;
  const cross2 = Math.min(1, Math.max(0, (s2 - 40) / 60)); // red X sweeps in early
  const ratio2 = s2 >= 120 ? 1 : 0; // corrected ratio appears after the cross
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): weight myth vs reality — TRUE % bars ----
  // Scale: 2 kg = 100% of track (760 px). 200 g = 10% (76 px).
  const s4 = frame - 300;
  const grow4 = Math.min(1, s4 / 150);
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)

  // ---- S6 (600-900): vitamins + immune training ----
  const s6 = frame - 600;
  const checks6 = Math.min(3, Math.floor(s6 / 70) + 1);
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const shieldPulse = 1 + 0.06 * Math.sin(s6 * 0.1);

  // ---- S7 (900-1200): unique fingerprint — concentric arcs + dots ----
  const s7 = frame - 900;
  const stamp7 = s7 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const spin7 = s7 * 0.4;
  const chips7 = Math.min(3, Math.floor(s7 / 70) + 1);

  // ---- S9 (1200-1500): closing — 38 trillion counter + ecosystem ----
  const s9 = frame - 1200;
  const count9 = Math.min(38, Math.floor((s9 / 240) * 38));
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.08 * Math.sin(s9 * 0.1);
  const ring9 = (s9 % 120) / 120;
  const drift = Array.from({ length: 10 }).map((_, i) => ({
    y: 40 + ((i * 173) % 260),
    speed: 1.2 + (i % 3),
    size: 14 + ((i * 29) % 26),
    offset: (i * 211) % 900,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — the 10:1 myth, crossed out, corrected to ~1:1 */}
      {frame < 300 && (
        <Center>
          <Kicker>FOR DECADES, EVERYONE SAID…</Kicker>
          <div style={{ position: "relative", marginTop: 36, transform: `scale(${pulse2})`, textAlign: "center" }}>
            <div style={{ fontSize: 170, fontWeight: 900, color: "#5a5a72", letterSpacing: 4 }}>
              10 : 1
            </div>
            <div style={{ position: "absolute", left: "8%", right: "8%", top: "46%", height: 14, backgroundColor: RED, borderRadius: 999, transform: `scaleX(${cross2})`, transformOrigin: "left center" }} />
            <div style={{ position: "absolute", left: "8%", right: "8%", top: "46%", height: 14, backgroundColor: RED, borderRadius: 999, transform: "rotate(0deg)", opacity: 0 }} />
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: RED, marginTop: 10, opacity: stamp2, textAlign: "center" }}>
            ✕ THE FAMOUS NUMBER WAS WRONG
          </div>
          <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, marginTop: 30, opacity: ratio2, textAlign: "center", textShadow: "0 0 30px rgba(244,201,93,0.6)" }}>
            ≈ 1 : 1
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "white", marginTop: 8, opacity: ratio2, textAlign: "center" }}>
            BACTERIA vs HUMAN CELLS
          </div>
          <Sub>38 trillion bacteria. 30 trillion human cells. (Sender et al., 2016)</Sub>
        </Center>
      )}

      {/* S4 — weight myth vs reality, TRUE % bars (2 kg = 100%, 200 g = 10%) */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>HOW MUCH DO THEY WEIGH?</Kicker>
          <div style={{ marginTop: 44, width: TRACK, display: "flex", flexDirection: "column", gap: 40 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>WHAT YOU&rsquo;VE HEARD</span>
                <span style={{ color: RED }}>1–2 KG ✕</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 1.0 * grow4}px`, height: "100%", backgroundColor: RED, borderRadius: 999 }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, fontWeight: 800, color: "white", marginBottom: 10 }}>
                <span>CAREFUL COUNT</span>
                <span style={{ color: TEAL }}>~200 G ✓</span>
              </div>
              <div style={{ width: TRACK, height: 44, backgroundColor: "#2c2c48", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${TRACK * 0.1 * grow4}px`, height: "100%", backgroundColor: TEAL, borderRadius: 999 }} />
              </div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: RED, marginTop: 44, opacity: stamp4, textAlign: "center" }}>
            A MYTH — ONLY ~200 GRAMS
          </div>
          <Sub>Less than a cup of water. The 1–2 kg claim has no good source.</Sub>
        </Center>
      )}

      {/* S6 — vitamins + immune training */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={TEAL}>WHAT THEY MAKE &amp; TEACH</Kicker>
          <div style={{ fontSize: 120, transform: `scale(${shieldPulse})`, marginTop: 28, textAlign: "center" }}>🛡️</div>
          <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 22, alignItems: "center" }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: checks6 >= 1 ? GOLD : "#5a5a72", textAlign: "center" }}>
              {checks6 >= 1 ? "✓" : "○"} VITAMIN K + SOME B VITAMINS
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: checks6 >= 2 ? GOLD : "#5a5a72", textAlign: "center" }}>
              {checks6 >= 2 ? "✓" : "○"} FUEL FROM FIBER (BUTYRATE)
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: checks6 >= 3 ? GOLD : "#5a5a72", textAlign: "center" }}>
              {checks6 >= 3 ? "✓" : "○"} TRAINS YOUR IMMUNE SYSTEM
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 900, color: TEAL, marginTop: 36, opacity: stamp6, textAlign: "center", lineHeight: 1.3 }}>
            TEACHING IT FRIEND FROM FOE
          </div>
          <Sub>Diet is still your main source of vitamins.</Sub>
        </Center>
      )}

      {/* S7 — unique fingerprint */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>NO TWO PEOPLE SHARE THE SAME MIX</Kicker>
          <div style={{ position: "relative", width: 420, height: 420, marginTop: 30 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: 120 + i * 90, height: 120 + i * 90, borderRadius: "50%", border: `4px solid ${i % 2 === 0 ? GOLD : TEAL}`, opacity: 0.85 - i * 0.15, transform: `translate(-50%, -50%) rotate(${spin7 + i * 25}deg)`, borderTopColor: "transparent", borderBottomColor: "transparent" }} />
            ))}
            <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", fontSize: 150, lineHeight: 1 }}>🦠</div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 28, opacity: stamp7, textAlign: "center" }}>
            AS UNIQUE AS A FINGERPRINT
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 30 }}>
            {["YOUR FOOD", "YOUR HOME", "YOUR EARLY LIFE"].map((c, i) => (
              <div key={c} style={{ fontSize: 30, fontWeight: 800, color: i < chips7 ? "#0d0d1a" : "#5a5a72", backgroundColor: i < chips7 ? TEAL : "#2c2c48", borderRadius: 999, padding: "12px 22px" }}>
                {c}
              </div>
            ))}
          </div>
          <Sub>Shaped by diet, home, and your first years of life.</Sub>
        </Center>
      )}

      {/* S9 — closing: 38 trillion counter + ecosystem */}
      {frame >= 1200 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 300, overflow: "hidden" }}>
            {drift.map((d, i) => {
              const x = ((d.offset + s9 * d.speed) % 1000) - 40;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: d.y % 260, opacity: 0.7 }}>
                  <div style={{ width: d.size, height: d.size, borderRadius: "50%", backgroundColor: i % 3 === 0 ? GOLD : TEAL, boxShadow: i % 3 === 0 ? "0 0 18px rgba(244,201,93,0.7)" : "0 0 14px rgba(127,212,193,0.6)" }} />
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
              <div style={{ transform: `scale(${pulse9})`, fontSize: 150, lineHeight: 1 }}>🦠</div>
            </div>
          </div>
          <div style={{ fontSize: 104, fontWeight: 900, color: GOLD, marginTop: 24, textAlign: "center" }}>
            {count9} TRILLION
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: "white", marginTop: 20, opacity: stamp9, textAlign: "center", lineHeight: 1.3 }}>
            TINY TENANTS — DOING JOBS
          </div>
          <div style={{ fontSize: 58, fontWeight: 900, color: "white", marginTop: 6, textAlign: "center", lineHeight: 1.3 }}>
            YOU CANNOT DO ALONE.
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: TEAL, marginTop: 24, opacity: stamp9, textAlign: "center" }}>
            YOU ARE AN ENTIRE ECOSYSTEM.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
