import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Boy in the Box — V1 TRUE MOTION, 90s True Crime Shorts, vertical 1080x1920.
// 9 scenes x 300 frames. Every scene has CONTINUOUS visible movement:
// driving car, walking detective, travelling timeline marker, rotating DNA
// helix, floating fragments, growing family tree, light sweep, growing flowers.
// Dark mystery palette, gold accent. No photos, no AI video clips — all shapes
// are code-drawn divs animated by frame.

const BG = "#0d0d11";
const GOLD = "#e8b64c";
const GREEN = "#7ddf8e";
const RED = "#e05d5d";
const BLUE = "#3a7bd5";
const GREY = "#b0b0b8";
const CARD = "#1a1a22";
const LINE = "#33333d";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function SceneFrame(props: {
  start: number;
  children: (local: number) => React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const local = frame - props.start;
  if (local < 0 || local >= 300) {
    return null;
  }
  const opacity = Math.min(
    interpolate(local, [0, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(local, [282, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "150px 70px 80px",
      }}
    >
      {props.children(local)}
    </div>
  );
}

function Kicker(props: { children: React.ReactNode; local: number; color?: string }) {
  const y = interpolate(props.local, [0, 20], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(props.local, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, opacity: o, transform: `translateY(${y}px)` }}>
      {props.children}
    </div>
  );
}

function Headline(props: { children: React.ReactNode; local: number; size?: number }) {
  const y = interpolate(props.local, [10, 32], [22, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(props.local, [10, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontSize: props.size || 60, fontWeight: 800, marginTop: 26, textAlign: "center", lineHeight: 1.18, color: "white", opacity: o, transform: `translateY(${y}px)` }}>
      {props.children}
    </div>
  );
}

function Sub(props: { children: React.ReactNode; local: number }) {
  const o = interpolate(props.local, [30, 55], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontSize: 31, color: GREY, marginTop: 30, textAlign: "center", lineHeight: 1.45, opacity: o }}>
      {props.children}
    </div>
  );
}

function Stage(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "relative", width: 940, height: 880, marginTop: 44, overflow: "hidden", borderRadius: 24, backgroundColor: "#14141c", border: `2px solid ${LINE}` }}>
      {props.children}
    </div>
  );
}

// ---- Walking detective figure (legs + arms swing, body bobs) ----
function Walker(props: { x: number; local: number; scale?: number; coat?: string }) {
  const swing = Math.sin(props.local * 0.32) * 26;
  const bob = -Math.abs(Math.sin(props.local * 0.32)) * 7;
  const s = props.scale ?? 1;
  return (
    <div style={{ position: "absolute", left: props.x, bottom: 0, width: 130 * s, height: 300 * s, transform: `translateY(${bob}px)` }}>
      <div style={{ position: "absolute", left: 40 * s, top: 0, width: 52 * s, height: 52 * s, borderRadius: "50%", backgroundColor: "#c9a37e" }} />
      <div style={{ position: "absolute", left: 30 * s, top: -4 * s, width: 72 * s, height: 18 * s, borderRadius: 9 * s, backgroundColor: "#2c2c38" }} />
      <div style={{ position: "absolute", left: 40 * s, top: -20 * s, width: 52 * s, height: 26 * s, borderRadius: "12px 12px 0 0", backgroundColor: "#2c2c38" }} />
      <div style={{ position: "absolute", left: 22 * s, top: 58 * s, width: 88 * s, height: 132 * s, backgroundColor: props.coat || "#3a3a48", borderRadius: "30px 30px 10px 10px" }} />
      <div style={{ position: "absolute", left: 40 * s, top: 186 * s, width: 20 * s, height: 106 * s, backgroundColor: "#33333f", transformOrigin: "top center", transform: `rotate(${swing}deg)`, borderRadius: 10 * s }} />
      <div style={{ position: "absolute", left: 70 * s, top: 186 * s, width: 20 * s, height: 106 * s, backgroundColor: "#2a2a35", transformOrigin: "top center", transform: `rotate(${-swing}deg)`, borderRadius: 10 * s }} />
      <div style={{ position: "absolute", left: 8 * s, top: 70 * s, width: 16 * s, height: 92 * s, backgroundColor: "#2c2c38", transformOrigin: "top center", transform: `rotate(${-swing * 0.7}deg)`, borderRadius: 8 * s }} />
      <div style={{ position: "absolute", left: 106 * s, top: 70 * s, width: 16 * s, height: 92 * s, backgroundColor: "#2c2c38", transformOrigin: "top center", transform: `rotate(${swing * 0.7}deg)`, borderRadius: 8 * s }} />
    </div>
  );
}

// ---- Police car (drives in, wheels spin, light bar flashes) ----
function PoliceCar(props: { x: number; local: number }) {
  const wheel = props.local * 14;
  const flashing = props.local % 30 < 15;
  return (
    <div style={{ position: "absolute", left: props.x, bottom: 64, width: 340, height: 150 }}>
      <div style={{ position: "absolute", left: 330, top: 62, width: 260, height: 46, background: "linear-gradient(90deg, rgba(232,182,76,0.35), rgba(232,182,76,0))", clipPath: "polygon(0 20%, 100% 0, 100% 100%, 0 80%)" }} />
      <div style={{ position: "absolute", left: 0, top: 44, width: 340, height: 62, backgroundColor: "#23232e", borderRadius: 18 }} />
      <div style={{ position: "absolute", left: 90, top: 4, width: 160, height: 52, backgroundColor: "#2e2e3c", borderRadius: "24px 24px 0 0" }} />
      <div style={{ position: "absolute", left: 96, top: 16, width: 66, height: 30, backgroundColor: "#8fb7e8", borderRadius: 6, opacity: 0.85 }} />
      <div style={{ position: "absolute", left: 174, top: 16, width: 66, height: 30, backgroundColor: "#8fb7e8", borderRadius: 6, opacity: 0.85 }} />
      <div style={{ position: "absolute", left: 130, top: -12, width: 80, height: 18, borderRadius: 9, backgroundColor: flashing ? RED : BLUE }} />
      <div style={{ position: "absolute", left: 45, top: 98, width: 48, height: 48, borderRadius: "50%", backgroundColor: "#111", border: "6px solid #555" }}>
        <div style={{ position: "absolute", left: 2, top: 16, width: 34, height: 6, backgroundColor: GOLD, transform: `rotate(${wheel}deg)`, transformOrigin: "center" }} />
      </div>
      <div style={{ position: "absolute", left: 250, top: 98, width: 48, height: 48, borderRadius: "50%", backgroundColor: "#111", border: "6px solid #555" }}>
        <div style={{ position: "absolute", left: 2, top: 16, width: 34, height: 6, backgroundColor: GOLD, transform: `rotate(${wheel}deg)`, transformOrigin: "center" }} />
      </div>
    </div>
  );
}

export const BoyInBoxMotion: React.FC = () => {
  const frame = useCurrentFrame();
  // Slow drifting background glow behind everything — the frame is never static.
  const glowX = 250 + 260 * Math.sin(frame * 0.0022);
  const glowY = 320 + 180 * Math.cos(frame * 0.0016);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: glowX,
          top: glowY,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,182,76,0.10), rgba(232,182,76,0) 70%)",
        }}
      />
      <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8a8a94", fontWeight: 700 }}>
        TRUE CRIME • COLD CASE
      </div>

      {/* ============ SCENE 1 (0-300): car drives in, detective walks to the box ============ */}
      <SceneFrame start={0}>
        {(local) => {
          const carX = interpolate(local, [0, 170], [-380, 150], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const walkX = interpolate(local, [120, 300], [-170, 400], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const lid = interpolate(local, [225, 280], [0, -68], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const moonX = 760 + 30 * Math.sin(local * 0.01);
          return (
            <>
              <Kicker local={local}>PHILADELPHIA • 1957</Kicker>
              <Headline local={local}>
                A cardboard box,
                <br />
                in the woods.
              </Headline>
              <Stage>
                {/* night sky, twinkling stars, drifting moon */}
                <div style={{ position: "absolute", left: moonX, top: 46, width: 74, height: 74, borderRadius: "50%", backgroundColor: "#f2e6b8" }} />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 60 + i * 150,
                      top: 40 + (i % 3) * 46,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "white",
                      opacity: 0.35 + 0.4 * Math.abs(Math.sin(local * 0.08 + i * 1.4)),
                    }}
                  />
                ))}
                <div style={{ position: "absolute", left: 70, top: 170, fontSize: 28, color: GREY, letterSpacing: 3 }}>FOX CHASE • SUSQUEHANNA ROAD</div>
                {/* trees scrolling past */}
                {[0, 1, 2].map((i) => {
                  const tx = 900 - ((local * 5 + i * 340) % 1050);
                  return (
                    <div key={i} style={{ position: "absolute", left: tx, bottom: 250 }}>
                      <div style={{ width: 0, height: 0, borderLeft: "46px solid transparent", borderRight: "46px solid transparent", borderBottom: "130px solid #1e5c34", marginLeft: 4 }} />
                      <div style={{ width: 20, height: 46, backgroundColor: "#5a3d22", marginLeft: 40 }} />
                    </div>
                  );
                })}
                {/* grass strip */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, height: 110, backgroundColor: "#17301f" }} />
                {/* road with scrolling dashes */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, backgroundColor: "#1c1c24" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: 68,
                      height: 10,
                      backgroundImage: "repeating-linear-gradient(90deg, #e8b64c 0 70px, transparent 70px 140px)",
                      backgroundPositionX: `${-local * 11}px`,
                    }}
                  />
                </div>
                {/* cardboard box with opening lid */}
                <div style={{ position: "absolute", left: 660, bottom: 258, width: 170, height: 120 }}>
                  <div style={{ position: "absolute", left: 0, top: 14, width: 170, height: 106, backgroundColor: "#b98a4e", borderRadius: 6 }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 170, height: 26, backgroundColor: "#a1763f", borderRadius: 6, transformOrigin: "left center", transform: `rotate(${lid}deg)` }} />
                  <div style={{ position: "absolute", left: 74, top: 40, width: 22, height: 66, backgroundColor: "#8f6a36" }} />
                </div>
                <PoliceCar x={carX} local={local} />
                {local > 115 && <Walker x={walkX} local={local} scale={0.85} />}
              </Stage>
              <Sub local={local}>February 25, 1957 — a student finds the box off Susquehanna Road.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 2 (300-600): spinning "?", orbiting dots, sliding ID card ============ */}
      <SceneFrame start={300}>
        {(local) => {
          const qRot = 7 * Math.sin(local * 0.05);
          const qScale = 1 + 0.04 * Math.sin(local * 0.09);
          const cardX = interpolate(local, [50, 130], [1000, 210], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const lineW = clamp01((local - 145) / 60) * 300;
          const stamp = clamp01((local - 200) / 18);
          const stampScale = interpolate(stamp, [0, 1], [2.4, 1]);
          const shake = local > 200 && local < 228 ? Math.sin(local * 1.4) * 4 : 0;
          return (
            <>
              <Kicker local={local} color={RED}>NO NAME</Kicker>
              <Headline local={local} size={56}>
                Inside: a small boy,
                <br />
                about four years old.
              </Headline>
              <Stage>
                <div style={{ position: "absolute", left: 0, right: 0, top: 90, textAlign: "center", fontSize: 250, fontWeight: 900, color: GOLD, lineHeight: 1, transform: `rotate(${qRot}deg) scale(${qScale})` }}>?</div>
                {[0, 1, 2].map((i) => {
                  const a = local * 0.045 + i * 2.094;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: 470 + 250 * Math.cos(a) - 11,
                        top: 215 + 175 * Math.sin(a) - 11,
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        backgroundColor: i === 1 ? RED : GOLD,
                      }}
                    />
                  );
                })}
                {/* blank identity card sliding in */}
                <div style={{ position: "absolute", left: cardX, top: 520, width: 520, height: 240, backgroundColor: CARD, border: `2px solid ${LINE}`, borderRadius: 16, padding: 28 }}>
                  <div style={{ display: "flex", gap: 24 }}>
                    <div style={{ width: 110, height: 130, backgroundColor: "#2c2c38", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, color: GREY }}>?</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 24, letterSpacing: 3, color: GOLD, fontWeight: 700 }}>IDENTITY CARD</div>
                      <div style={{ width: lineW, height: 14, backgroundColor: "#3a3a48", borderRadius: 7, marginTop: 22 }} />
                      <div style={{ width: lineW * 0.7, height: 14, backgroundColor: "#3a3a48", borderRadius: 7, marginTop: 16 }} />
                      <div style={{ width: lineW * 0.45, height: 14, backgroundColor: "#3a3a48", borderRadius: 7, marginTop: 16 }} />
                    </div>
                  </div>
                  <div style={{ position: "absolute", right: 24, bottom: 22, fontSize: 30, fontWeight: 900, color: RED, border: `3px solid ${RED}`, borderRadius: 8, padding: "6px 14px", transform: `rotate(-12deg) scale(${stampScale}) translateX(${shake}px)`, opacity: stamp }}>
                    NO NAME
                  </div>
                </div>
              </Stage>
              <Sub local={local}>No one reports him missing. No one knows who he is.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 3 (600-900): timeline marker travels, year counts up ============ */}
      <SceneFrame start={600}>
        {(local) => {
          const progress = clamp01((local - 30) / 240);
          const year = Math.round(1957 + progress * 65);
          const count = Math.round(progress * 65);
          const markerX = 60 + progress * 820;
          return (
            <>
              <Kicker local={local}>65 YEARS UNKNOWN</Kicker>
              <div style={{ fontSize: 130, fontWeight: 900, color: GOLD, marginTop: 24, lineHeight: 1 }}>{count}</div>
              <div style={{ fontSize: 38, fontWeight: 700, marginTop: 4 }}>YEARS WITHOUT A NAME</div>
              <Stage>
                <div style={{ position: "absolute", left: 60, right: 60, top: 300, height: 12, backgroundColor: "#33333a", borderRadius: 6 }} />
                <div style={{ position: "absolute", left: 60, top: 300, width: progress * 820, height: 12, backgroundColor: GOLD, borderRadius: 6 }} />
                <div style={{ position: "absolute", left: markerX - 22, top: 278, width: 56, height: 56, borderRadius: "50%", backgroundColor: GOLD, border: "6px solid white", transform: `scale(${1 + 0.18 * Math.sin(local * 0.2)})` }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 380, textAlign: "center", fontSize: 84, fontWeight: 900, color: "white" }}>{year}</div>
                {["1957", "1980", "2000", "2022"].map((y, i) => {
                  const lit = progress >= i / 3;
                  return (
                    <div key={y} style={{ position: "absolute", left: 60 + i * 273 - 20, top: 500, fontSize: 32, fontWeight: 700, color: lit ? GOLD : "#55555f" }}>
                      {y}
                    </div>
                  );
                })}
                {/* tip dots popping in as the marker passes */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const on = progress > i / 20;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: 66 + i * 43,
                        top: 620 + (i % 2 === 0 ? 0 : 46),
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        backgroundColor: "#2c2c38",
                        border: `2px solid ${on ? GOLD : LINE}`,
                        transform: `scale(${on ? 1 : 0.4})`,
                        opacity: on ? 1 : 0.35,
                      }}
                    />
                  );
                })}
                <div style={{ position: "absolute", left: 0, right: 0, top: 700, textAlign: "center", fontSize: 28, color: GREY, letterSpacing: 2 }}>
                  EACH DOT — A TIP THAT LED NOWHERE
                </div>
              </Stage>
              <Sub local={local}>“America’s Unknown Child.” Thousands of tips. No answers.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 4 (900-1200): detective walks across, file pages flip ============ */}
      <SceneFrame start={900}>
        {(local) => {
          const walkX = interpolate(local, [0, 300], [-190, 1000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const years = Math.round(clamp01(local / 280) * 35);
          const skyline = [
            { x: 20, w: 120, h: 260 }, { x: 160, w: 90, h: 340 }, { x: 270, w: 140, h: 220 },
            { x: 430, w: 100, h: 380 }, { x: 550, w: 130, h: 250 }, { x: 700, w: 110, h: 330 }, { x: 830, w: 90, h: 210 },
          ];
          return (
            <>
              <Kicker local={local}>ONE DETECTIVE</Kicker>
              <Headline local={local} size={56}>
                Remington Bristow spends
                <br />
                <span style={{ color: GOLD }}>{years} years</span> on the case.
              </Headline>
              <Stage>
                {/* city skyline filling the upper stage, windows flickering */}
                {skyline.map((b, i) => (
                  <div key={i} style={{ position: "absolute", left: b.x, bottom: 340, width: b.w, height: b.h, backgroundColor: "#1b1b26" }}>
                    {[0, 1, 2].map((j) => (
                      <div key={j} style={{ position: "absolute", left: 18 + j * 32, top: 30 + (j % 2) * 60, width: 14, height: 18, backgroundColor: GOLD, opacity: 0.25 + 0.45 * Math.abs(Math.sin(local * 0.09 + i * 1.7 + j)) }} />
                    ))}
                  </div>
                ))}
                {/* streetlamps passing */}
                {[0, 1, 2].map((i) => {
                  const lx = 920 - ((local * 7 + i * 380) % 1100);
                  return (
                    <div key={i} style={{ position: "absolute", left: lx, bottom: 340 }}>
                      <div style={{ width: 12, height: 200, backgroundColor: "#2c2c38", marginLeft: 26 }} />
                      <div style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: "#f2e6b8", opacity: 0.55 + 0.35 * Math.sin(local * 0.15 + i * 2) }} />
                    </div>
                  );
                })}
                {/* ground */}
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 340, backgroundColor: "#17171f" }} />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 330, height: 10, backgroundColor: LINE }} />
                {/* warm glow following the detective so he never vanishes into the dark */}
                <div style={{ position: "absolute", left: walkX - 70, bottom: 0, width: 280, height: 430, background: "radial-gradient(ellipse, rgba(232,182,76,0.18), rgba(232,182,76,0) 70%)" }} />
                <Walker x={walkX} local={local} scale={1.25} coat="#45455a" />
                {/* file pages resting on the ground, trailing behind him */}
                {[0, 1, 2].map((i) => {
                  const px = walkX - 210 - i * 48;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: Math.max(px, -160),
                        bottom: 18 + (i % 2) * 10,
                        width: 120,
                        height: 150,
                        backgroundColor: i === 0 ? "#e8e0c8" : CARD,
                        border: `2px solid ${LINE}`,
                        borderRadius: 8,
                        transform: `rotate(${Math.sin(local * 0.07 + i * 1.2) * 5 - 5}deg)`,
                        padding: 14,
                      }}
                    >
                      <div style={{ width: "80%", height: 8, backgroundColor: "#55555f", borderRadius: 4 }} />
                      <div style={{ width: "60%", height: 8, backgroundColor: "#55555f", borderRadius: 4, marginTop: 10 }} />
                      <div style={{ width: "70%", height: 8, backgroundColor: "#55555f", borderRadius: 4, marginTop: 10 }} />
                      {i === 0 && <div style={{ marginTop: 18, fontSize: 20, fontWeight: 800, color: RED }}>CASE #1957</div>}
                    </div>
                  );
                })}
                {/* label removed: the "CASE #1957" page already carries it,
                    and the trailing pages used to cover this centered text */}
              </Stage>
              <Sub local={local}>Most of his working life — trying to give the boy his name back.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 5 (1200-1500): rotating DNA helix, NO MATCH stamp ============ */}
      <SceneFrame start={1200}>
        {(local) => {
          const stamp = clamp01((local - 210) / 18);
          const stampScale = interpolate(stamp, [0, 1], [2.2, 1]);
          const shake = local > 210 && local < 238 ? Math.sin(local * 1.4) * 4 : 0;
          return (
            <>
              <Kicker local={local}>1998 • FIRST EXHUMATION</Kicker>
              <Headline local={local} size={56}>
                DNA from a tooth.
                <br />
                The science is too new.
              </Headline>
              <Stage>
                {/* rotating helix: two sine strands + rungs */}
                {Array.from({ length: 13 }).map((_, i) => {
                  const phase = i * 0.55 + local * 0.14;
                  const yA = 360 + Math.sin(phase) * 150;
                  const yB = 360 - Math.sin(phase) * 150;
                  const x = 110 + i * 58;
                  const rungOpacity = Math.abs(Math.cos(phase)) * 0.8 + 0.1;
                  return (
                    <div key={i}>
                      <div style={{ position: "absolute", left: x, top: Math.min(yA, yB), width: 6, height: Math.abs(yA - yB), backgroundColor: GOLD, opacity: rungOpacity }} />
                      <div style={{ position: "absolute", left: x - 9, top: yA - 9, width: 18, height: 18, borderRadius: "50%", backgroundColor: GOLD }} />
                      <div style={{ position: "absolute", left: x - 9, top: yB - 9, width: 18, height: 18, borderRadius: "50%", backgroundColor: "#8fb7e8" }} />
                    </div>
                  );
                })}
                {/* sample dots turning red one by one */}
                <div style={{ position: "absolute", left: 0, right: 0, top: 640, display: "flex", justifyContent: "center", gap: 22 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: "50%",
                        backgroundColor: local > 60 + i * 30 ? RED : "#2c2c38",
                        border: `2px solid ${LINE}`,
                        transform: `scale(${local > 60 + i * 30 ? 1.15 : 1})`,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 730,
                    textAlign: "center",
                    fontSize: 52,
                    fontWeight: 900,
                    color: RED,
                    transform: `rotate(-8deg) scale(${stampScale}) translateX(${shake}px)`,
                    opacity: stamp,
                  }}
                >
                  NO MATCH
                </div>
              </Stage>
              <Sub local={local}>The sample leads nowhere.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 6 (1500-1800): floating DNA fragments + spinning clock ============ */}
      <SceneFrame start={1500}>
        {(local) => {
          const years = (clamp01(local / 280) * 2.5).toFixed(1);
          const fragBase = [
            [120, 180, 90], [300, 120, 140], [480, 210, 70], [640, 130, 120],
            [200, 330, 150], [420, 350, 80], [600, 330, 160], [760, 240, 100],
          ];
          return (
            <>
              <Kicker local={local}>2019 • SECOND EXHUMATION</Kicker>
              <Headline local={local} size={56}>
                The DNA is broken
                <br />
                into tiny pieces.
              </Headline>
              <Stage>
                {/* drifting, tumbling fragments */}
                {fragBase.map(([bx, by, w], i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: bx + 42 * Math.sin(local * 0.05 + i * 1.1),
                      top: by + 32 * Math.cos(local * 0.04 + i * 0.9),
                      width: w,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: i % 2 === 0 ? GOLD : "#5a5a66",
                      transform: `rotate(${20 * Math.sin(local * 0.03 + i)}deg)`,
                      opacity: 0.55 + 0.3 * Math.sin(local * 0.06 + i * 2),
                    }}
                  />
                ))}
                {/* spinning clock */}
                <div style={{ position: "absolute", left: 360, top: 480, width: 220, height: 220, borderRadius: "50%", backgroundColor: CARD, border: `4px solid ${LINE}` }}>
                  <div style={{ position: "absolute", left: 104, top: 104, width: 12, height: 12, borderRadius: "50%", backgroundColor: GOLD }} />
                  <div style={{ position: "absolute", left: 105, top: 30, width: 10, height: 84, backgroundColor: "white", borderRadius: 5, transformOrigin: "5px 80px", transform: `rotate(${local * 2.4}deg)` }} />
                  <div style={{ position: "absolute", left: 105, top: 55, width: 10, height: 59, backgroundColor: GOLD, borderRadius: 5, transformOrigin: "5px 55px", transform: `rotate(${local * 0.2}deg)` }} />
                  <div style={{ position: "absolute", left: 0, top: 0, width: 220, height: 220, borderRadius: "50%", border: "10px solid transparent", borderTopColor: GOLD, transform: `rotate(${local * 1.2}deg)` }} />
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 730, textAlign: "center", fontSize: 52, fontWeight: 900, color: GOLD }}>
                  {years} YEARS
                </div>
              </Stage>
              <Sub local={local}>Just to build one usable profile.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 7 (1800-2100): family tree grows, cards slide in ============ */}
      <SceneFrame start={1800}>
        {(local) => {
          const cousins = [
            { x: 150, y: 110, len: 310, a: -156 },
            { x: 790, y: 110, len: 310, a: -24 },
            { x: 150, y: 380, len: 306, a: 158 },
            { x: 790, y: 380, len: 306, a: 22 },
            { x: 470, y: 480, len: 190, a: 90 },
          ];
          const cardL = interpolate(local, [20, 90], [-620, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const cardR = interpolate(local, [100, 170], [1000, 320], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <>
              <Kicker local={local}>DNA GENEALOGY</Kicker>
              <Headline local={local} size={56}>
                One match at a time,
                <br />
                through distant cousins.
              </Headline>
              <Stage>
                {/* growing family tree: lines first, then nodes, center node on top */}
                {cousins.map((c, i) => {
                  const grow = clamp01((local - i * 35) / 50);
                  return (
                    <div
                      key={`line-${i}`}
                      style={{
                        position: "absolute",
                        left: 470,
                        top: 250,
                        width: c.len * grow,
                        height: 5,
                        backgroundColor: GREEN,
                        transformOrigin: "left center",
                        transform: `rotate(${c.a}deg)`,
                        borderRadius: 3,
                      }}
                    />
                  );
                })}
                {cousins.map((c, i) => {
                  const pop = clamp01((local - i * 35 - 40) / 20);
                  return (
                    <div
                      key={`node-${i}`}
                      style={{
                        position: "absolute",
                        left: c.x - 34,
                        top: c.y - 34,
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        backgroundColor: "#2c2c38",
                        border: `3px solid ${pop > 0 ? GREEN : LINE}`,
                        transform: `scale(${pop === 0 ? 0.2 : 1 + 0.12 * Math.sin(pop * Math.PI)})`,
                        opacity: pop === 0 ? 0 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 30,
                      }}
                    >
                      👤
                    </div>
                  );
                })}
                <div style={{ position: "absolute", left: 470, top: 250, width: 90, height: 90, borderRadius: "50%", backgroundColor: GOLD, border: "6px solid white", transform: `scale(${1 + 0.1 * Math.sin(local * 0.15)})`, marginLeft: -45, marginTop: -45, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 900, color: "#0d0d11" }}>DNA</div>
                {/* database cards sliding in */}
                <div style={{ position: "absolute", left: cardL, top: 590, width: 560, height: 96, backgroundColor: CARD, border: `2px solid ${LINE}`, borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 28px" }}>
                  <span style={{ fontSize: 34, fontWeight: 800 }}>GEDmatch</span>
                  {local > 180 && <span style={{ fontSize: 28, color: GREEN, fontWeight: 700 }}>MATCH ✓</span>}
                </div>
                <div style={{ position: "absolute", left: cardR, top: 710, width: 560, height: 96, backgroundColor: CARD, border: `2px solid ${LINE}`, borderRadius: 16, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 28px" }}>
                  <span style={{ fontSize: 34, fontWeight: 800 }}>FamilyTreeDNA</span>
                  {local > 230 && <span style={{ fontSize: 28, color: GREEN, fontWeight: 700 }}>MATCH ✓</span>}
                </div>
              </Stage>
              <Sub local={local}>Identifinders • DNA Doe Project</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 8 (2100-2400): rotating rays, light sweep, name slides in ============ */}
      <SceneFrame start={2100}>
        {(local) => {
          const sweepX = interpolate(local, [90, 210], [-320, 1100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const word = (stagger: number) => ({
            y: interpolate(local, [stagger, stagger + 25], [54, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            o: interpolate(local, [stagger, stagger + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          });
          const w1 = word(60);
          const w2 = word(95);
          const w3 = word(130);
          return (
            <>
              <Kicker local={local} color={GREEN}>DECEMBER 8, 2022 — SOLVED</Kicker>
              <Headline local={local} size={54}>
                DNA finally gave him
                <br />
                his name back.
              </Headline>
              <Stage>
                {/* rotating rays */}
                <div
                  style={{
                    position: "absolute",
                    left: 120,
                    top: 90,
                    width: 700,
                    height: 700,
                    borderRadius: "50%",
                    background: "repeating-conic-gradient(from 0deg, rgba(232,182,76,0.14) 0deg 10deg, transparent 10deg 24deg)",
                    transform: `rotate(${local * 0.25}deg)`,
                  }}
                />
                {/* rising gold particles */}
                {Array.from({ length: 10 }).map((_, i) => {
                  const p = ((local * 2 + i * 70) % 700) / 700;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: 110 + i * 78 + 30 * Math.sin(local * 0.05 + i),
                        top: 800 - p * 700,
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor: GOLD,
                        opacity: 1 - p,
                      }}
                    />
                  );
                })}
                {/* light sweep */}
                <div
                  style={{
                    position: "absolute",
                    left: sweepX,
                    top: 0,
                    width: 240,
                    height: 880,
                    background: "linear-gradient(90deg, transparent, rgba(255,240,180,0.28), transparent)",
                    transform: "skewX(-18deg)",
                  }}
                />
                <div style={{ position: "absolute", left: 0, right: 0, top: 330, textAlign: "center" }}>
                  <div style={{ fontSize: 58, fontWeight: 900, color: GOLD, lineHeight: 1.25, opacity: w1.o, transform: `translateY(${w1.y}px)` }}>Joseph</div>
                  <div style={{ fontSize: 58, fontWeight: 900, color: GOLD, lineHeight: 1.25, opacity: w2.o, transform: `translateY(${w2.y}px)` }}>Augustus</div>
                  <div style={{ fontSize: 58, fontWeight: 900, color: GOLD, lineHeight: 1.25, opacity: w3.o, transform: `translateY(${w3.y}px)` }}>Zarelli</div>
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, top: 640, textAlign: "center", fontSize: 30, color: GREY, opacity: interpolate(local, [150, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                  Born January 13, 1953
                </div>
              </Stage>
              <Sub local={local}>Philadelphia police announce his name to the world.</Sub>
            </>
          );
        }}
      </SceneFrame>

      {/* ============ SCENE 9 (2400-2700): headstone, growing flowers, butterflies ============ */}
      <SceneFrame start={2400}>
        {(local) => {
          const glow = 0.45 + 0.2 * Math.sin(local * 0.06);
          return (
            <>
              <Kicker local={local}>AFTER 65 YEARS</Kicker>
              <Stage>
                {/* pulsing gold glow behind the headstone */}
                <div style={{ position: "absolute", left: 220, top: 60, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,182,76,0.22), rgba(232,182,76,0) 70%)", opacity: glow }} />
                {/* headstone */}
                <div style={{ position: "absolute", left: 320, top: 130, width: 300, height: 330, backgroundColor: "#2c2c38", borderRadius: "150px 150px 12px 12px", border: `2px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: GOLD }}>JOSEPH</div>
                  <div style={{ fontSize: 30, fontWeight: 800, color: GOLD, marginTop: 6 }}>ZARELLI</div>
                  <div style={{ fontSize: 26, color: GREY, marginTop: 16 }}>1953 — 1957</div>
                </div>
                <div style={{ position: "absolute", left: 280, top: 460, width: 380, height: 18, backgroundColor: "#1e7d46", borderRadius: 9 }} />
                {/* growing flowers with swaying stems */}
                {[0, 1, 2].map((i) => {
                  const fx = 180 + i * 290;
                  const stemH = interpolate(local, [40 + i * 30, 140 + i * 30], [0, 170], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  const bloom = clamp01((local - 140 - i * 30) / 25);
                  const sway = 4 * Math.sin(local * 0.07 + i);
                  return (
                    <div key={i} style={{ position: "absolute", left: fx, bottom: 120 }}>
                      <div style={{ width: 10, height: stemH, backgroundColor: "#1e7d46", marginLeft: 20, transform: `rotate(${sway}deg)`, transformOrigin: "bottom center" }} />
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: stemH,
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: i === 1 ? GOLD : "#e05d8a",
                          transform: `scale(${bloom}) rotate(${sway * 2}deg)`,
                          opacity: bloom,
                        }}
                      />
                    </div>
                  );
                })}
                {/* swaying grass */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 90 + i * 105,
                      bottom: 100,
                      width: 10,
                      height: 60,
                      backgroundColor: "#1e7d46",
                      borderRadius: 5,
                      transformOrigin: "bottom center",
                      transform: `rotate(${6 * Math.sin(local * 0.08 + i * 0.7)}deg)`,
                    }}
                  />
                ))}
                {/* butterflies drifting across */}
                {[0, 1].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: 200 + 260 * Math.sin(local * 0.03 + i * 2),
                      top: 120 + 90 * Math.sin(local * 0.05 + i * 3),
                      width: 26,
                      height: 18,
                      borderRadius: "50%",
                      backgroundColor: GOLD,
                      opacity: 0.9,
                    }}
                  />
                ))}
              </Stage>
              <Headline local={local} size={52}>
                He finally has a name.
                <br />
                The case is still open.
              </Headline>
              <Sub local={local}>His killer has never been named. Sources: Philadelphia Police, Dec 8, 2022.</Sub>
            </>
          );
        }}
      </SceneFrame>
    </AbsoluteFill>
  );
};
