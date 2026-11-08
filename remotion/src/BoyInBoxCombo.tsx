import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Boy in the Box — V3 COMBO, motion-graphics scenes only (2, 3, 6, 7, 8).
// 5 scenes x 300 frames = 1500 frames, vertical 1080x1920.
// EVERY scene has continuous real movement (not text zoom/pan):
//  S2: swinging "?", expanding fingerprint rings, sliding identity card
//  S3: travelling timeline dot, year counter 1957->2022, 0->65 counter
//  S6: spinning clock hands, DNA fragments flying in and snapping together
//  S7: family-tree branches growing, cousin nodes popping in one by one
//  S8: rotating golden light rays, name revealing letter by letter

const BG = "#0d0d11";
const GOLD = "#e8b64c";
const GREEN = "#7ddf8e";
const RED = "#e05d5d";
const GREY = "#b0b0b8";
const CARD = "#1a1a22";
const LINE = "#33333d";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

function Headline(props: { children: React.ReactNode; size?: number }) {
  return (
    <div
      style={{
        fontSize: props.size || 62,
        fontWeight: 800,
        marginTop: 28,
        textAlign: "center",
        lineHeight: 1.18,
        color: "white",
      }}
    >
      {props.children}
    </div>
  );
}

function Sub(props: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 32, color: GREY, marginTop: 26, textAlign: "center", lineHeight: 1.45 }}>
      {props.children}
    </div>
  );
}

function Badge(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 26,
        letterSpacing: 5,
        color: "#8a8a94",
        fontWeight: 700,
      }}
    >
      {props.children}
    </div>
  );
}

function Center(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 70px",
      }}
    >
      {props.children}
    </div>
  );
}

export const BoyInBoxCombo: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- Scene 2 (frames 0-300): swinging "?", expanding rings, sliding card ----
  const s2 = frame;
  const swing = 14 * Math.sin(s2 * 0.045); // pendulum swing of the "?"
  const cardX = interpolate(s2, [40, 90], [-700, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampScale = interpolate(s2, [150, 165], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampRot = interpolate(s2, [150, 165], [-18, -6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampOp = interpolate(s2, [150, 158], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringPhase = (s2 % 90) / 90; // expanding fingerprint rings, looping

  // ---- Scene 3 (frames 300-600): travelling timeline dot + counters ----
  const s3 = frame - 300;
  const dotX = interpolate(s3, [30, 270], [0, 820], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const year = Math.round(interpolate(s3, [30, 270], [1957, 2022], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const yearsUnknown = Math.round(interpolate(s3, [30, 270], [0, 65], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- Scene 6 (frames 600-900): spinning clock + DNA fragments snapping in ----
  const s6 = frame - 600;
  const clockDeg = s6 * 4; // minute hand spins fast
  const fragCount = Math.min(6, Math.floor(interpolate(s6, [60, 240], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const buildPct = Math.round(interpolate(s6, [60, 270], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- Scene 7 (frames 900-1200): family tree growing ----
  const s7 = frame - 900;
  const nodeCount = Math.min(5, Math.floor(interpolate(s7, [50, 250], [0, 5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const pulseX = interpolate(s7, [50, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- Scene 8 (frames 1200-1500): rotating rays + letter-by-letter reveal ----
  const s8 = frame - 1200;
  const rayRot = s8 * 0.25; // slow rotation of light rays
  const glow = 0.55 + 0.35 * Math.sin(s8 * 0.08);
  const name = "JOSEPH AUGUSTUS ZARELLI";
  const lettersShown = Math.min(name.length, Math.floor(interpolate(s8, [60, 220], [0, name.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>TRUE CRIME • COLD CASE</Badge>

      {/* Scene 2 */}
      {frame < 300 && (
        <Center>
          <Kicker color={RED}>NO NAME</Kicker>
          <Headline size={58}>
            Inside: a small boy,
            <br />
            about four years old.
          </Headline>
          {/* Swinging "?" over expanding fingerprint rings */}
          <div style={{ marginTop: 40, position: "relative", width: 420, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1, 2].map((i) => {
              const p = (ringPhase + i / 3) % 1;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: 60 + p * 320,
                    height: 60 + p * 320,
                    borderRadius: "50%",
                    border: `3px solid ${GOLD}`,
                    opacity: 0.9 * (1 - p),
                  }}
                />
              );
            })}
            <div style={{ fontSize: 180, fontWeight: 900, color: GOLD, lineHeight: 1, transform: `rotate(${swing}deg)` }}>?</div>
          </div>
          {/* Identity card sliding in from the left */}
          <div
            style={{
              transform: `translateX(${cardX}px)`,
              marginTop: 36,
              width: 640,
              backgroundColor: CARD,
              border: `2px solid ${LINE}`,
              borderRadius: 16,
              padding: "22px 30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 30, fontWeight: 700, color: GREY }}>IDENTITY</span>
            <span style={{ fontSize: 30, fontWeight: 800, color: RED }}>UNKNOWN</span>
          </div>
          {/* Stamp slamming in */}
          <div
            style={{
              opacity: stampOp,
              transform: `scale(${stampScale}) rotate(${stampRot}deg)`,
              marginTop: 34,
              fontSize: 44,
              fontWeight: 900,
              color: RED,
              border: `4px solid ${RED}`,
              borderRadius: 12,
              padding: "8px 28px",
            }}
          >
            NO NAME
          </div>
          <Sub>No one reports him missing. No one knows who he is.</Sub>
        </Center>
      )}

      {/* Scene 3 */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>65 YEARS UNKNOWN</Kicker>
          <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 30 }}>{yearsUnknown}</div>
          <div style={{ fontSize: 40, fontWeight: 700, marginTop: 6 }}>YEARS WITHOUT A NAME</div>
          {/* Travelling timeline dot */}
          <div style={{ width: 820, height: 10, backgroundColor: "#33333a", borderRadius: 5, marginTop: 64, position: "relative" }}>
            <div style={{ width: `${dotX / 8.2}%`, height: "100%", backgroundColor: GOLD, borderRadius: 5 }} />
            <div
              style={{
                position: "absolute",
                left: dotX - 16,
                top: -16,
                width: 42,
                height: 42,
                borderRadius: "50%",
                backgroundColor: GOLD,
                border: "4px solid white",
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 820, marginTop: 22, fontSize: 30, color: GREY }}>
            <span>1957</span>
            <span>1980</span>
            <span>2000</span>
            <span>2022</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: "white", marginTop: 44 }}>{year}</div>
          <Sub>“America’s Unknown Child.” Thousands of tips. No answers.</Sub>
        </Center>
      )}

      {/* Scene 6 */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>2019 • SECOND EXHUMATION</Kicker>
          <Headline size={56}>
            The DNA is broken
            <br />
            into tiny pieces.
          </Headline>
          {/* Spinning clock */}
          <div style={{ marginTop: 44, position: "relative", width: 200, height: 200, borderRadius: "50%", border: `6px solid ${LINE}`, backgroundColor: CARD }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 80, backgroundColor: GOLD, transformOrigin: "top center", transform: `translateX(-50%) rotate(${clockDeg}deg)` }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 6, height: 55, backgroundColor: "white", transformOrigin: "top center", transform: `translateX(-50%) rotate(${clockDeg * 0.35 + 120}deg)` }} />
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 16, height: 16, borderRadius: "50%", backgroundColor: RED, transform: "translate(-50%, -50%)" }} />
          </div>
          {/* DNA fragments snapping together into a ladder */}
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 14, alignItems: "center", height: 130 }}>
            {[0, 1, 2].map((row) => (
              <div key={row} style={{ display: "flex", gap: 22 }}>
                {[0, 1, 2].map((col) => {
                  const idx = row * 2 + col;
                  const shown = idx < fragCount;
                  return (
                    <div
                      key={col}
                      style={{
                        width: 70,
                        height: 26,
                        borderRadius: 13,
                        backgroundColor: idx % 2 === 0 ? GOLD : "#5a5a66",
                        opacity: shown ? 1 : 0.15,
                        transform: shown ? "translateX(0)" : `translateX(${(col - 1) * 160}px)`,
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ width: 700, height: 12, backgroundColor: "#33333a", borderRadius: 6, marginTop: 30, overflow: "hidden" }}>
            <div style={{ width: `${buildPct}%`, height: "100%", backgroundColor: GREEN }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: GOLD, marginTop: 26 }}>
            2.5 YEARS • PROFILE {buildPct}%
          </div>
          <Sub>Just to build one usable profile.</Sub>
        </Center>
      )}

      {/* Scene 7 */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>DNA GENEALOGY</Kicker>
          <Headline size={56}>
            One match at a time,
            <br />
            through distant cousins.
          </Headline>
          {/* Family tree growing: central node + branches appearing one by one */}
          <div style={{ marginTop: 44, position: "relative", width: 760, height: 260 }}>
            <div style={{ position: "absolute", left: 330, top: 100, width: 100, height: 100, borderRadius: "50%", backgroundColor: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#0d0d11" }}>
              DNA
            </div>
            {[
              { x: 0, y: 0, label: "Cousin" },
              { x: 600, y: 0, label: "Cousin" },
              { x: 0, y: 170, label: "Cousin" },
              { x: 600, y: 170, label: "Cousin" },
              { x: 300, y: 200, label: "Family" },
            ].map((n, i) => {
              const shown = i < nodeCount;
              const lineW = shown ? Math.hypot(n.x + 60 - 380, n.y + 30 - 150) : 0;
              const angle = (Math.atan2(n.y + 30 - 150, n.x + 60 - 380) * 180) / Math.PI;
              return (
                <div key={i}>
                  <div
                    style={{
                      position: "absolute",
                      left: 380,
                      top: 150,
                      width: lineW,
                      height: 4,
                      backgroundColor: GREEN,
                      transformOrigin: "left center",
                      transform: `rotate(${angle}deg)`,
                      opacity: shown ? 1 : 0,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: n.x,
                      top: n.y,
                      width: 120,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: shown ? CARD : "#14141a",
                      border: `2px solid ${shown ? GREEN : LINE}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      fontWeight: 700,
                      color: shown ? GREEN : "#55555e",
                      transform: shown ? "scale(1)" : "scale(0.6)",
                      opacity: shown ? 1 : 0.4,
                    }}
                  >
                    {n.label}
                  </div>
                </div>
              );
            })}
            {/* Travelling pulse along the bottom */}
            <div
              style={{
                position: "absolute",
                left: 20 + pulseX * 680,
                bottom: -30,
                width: 26,
                height: 26,
                borderRadius: "50%",
                backgroundColor: GREEN,
              }}
            />
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 56 }}>
            {["GEDmatch", "FamilyTreeDNA"].map((nm) => (
              <div key={nm} style={{ backgroundColor: CARD, border: `2px solid ${LINE}`, borderRadius: 14, padding: "18px 26px", fontSize: 28, fontWeight: 800 }}>
                {nm} <span style={{ color: GREEN }}>✓</span>
              </div>
            ))}
          </div>
          <Sub>Identifinders • DNA Doe Project</Sub>
        </Center>
      )}

      {/* Scene 8 */}
      {frame >= 1200 && (
        <Center>
          {/* Rotating golden rays */}
          <div style={{ position: "absolute", width: 900, height: 900, borderRadius: "50%", opacity: 0.16, transform: `rotate(${rayRot}deg)` }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 14,
                  height: 450,
                  backgroundColor: GOLD,
                  transformOrigin: "top center",
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  clipPath: "polygon(50% 0, 62% 100%, 38% 100%)",
                }}
              />
            ))}
          </div>
          <div style={{ opacity: glow, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Kicker color={GREEN}>DECEMBER 8, 2022 — SOLVED</Kicker>
            <Headline size={54}>
              DNA finally gave him
              <br />
              his name back.
            </Headline>
            <div style={{ fontSize: 48, fontWeight: 900, color: GOLD, marginTop: 44, textAlign: "center", lineHeight: 1.25, letterSpacing: 2 }}>
              {name.slice(0, lettersShown)}
              <span style={{ opacity: 0.4 }}>{name.slice(lettersShown)}</span>
            </div>
            <div style={{ fontSize: 30, color: GREY, marginTop: 28 }}>Born January 13, 1953</div>
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
