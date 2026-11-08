import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TrueCrimeTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = (start: number, dur = 20) =>
    interpolate(frame, [start, start + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = (start: number, dur = 20) =>
    interpolate(frame, [start, start + dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const progress = interpolate(frame, [90, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const yearScale = spring({ frame: frame - 240, fps, config: { damping: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0e12", color: "white", fontFamily: "Arial, sans-serif" }}>
      {/* Scene 1: 1957 */}
      <div style={{ opacity: Math.min(fadeIn(0), fadeOut(120)), position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#e8b64c" }}>PHILADELPHIA, 1957</div>
        <div style={{ fontSize: 52, fontWeight: 800, marginTop: 20, textAlign: "center", lineHeight: 1.1 }}>A boy found in a box.<br />No name. No identity.</div>
        <div style={{ fontSize: 22, color: "#b0b0b8", marginTop: 24 }}>THE BOY IN THE BOX</div>
      </div>

      {/* Scene 2: timeline 65 years */}
      <div style={{ opacity: Math.min(fadeIn(130), fadeOut(270)), position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 72, fontWeight: 900, color: "#e8b64c" }}>65 YEARS</div>
        <div style={{ fontSize: 26, marginTop: 12 }}>Thousands of tips. No answers.</div>
        <div style={{ width: 900, height: 8, backgroundColor: "#33333a", borderRadius: 4, marginTop: 50, overflow: "hidden" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", backgroundColor: "#e8b64c" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: 900, marginTop: 12, fontSize: 22, color: "#b0b0b8" }}>
          <span>1957</span><span>1980</span><span>2000</span><span>2022</span>
        </div>
      </div>

      {/* Scene 3: 2022 solved */}
      <div style={{ opacity: fadeIn(280), position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${yearScale})` }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#7ddf8e" }}>2022 — SOLVED</div>
        <div style={{ fontSize: 48, fontWeight: 800, marginTop: 20, textAlign: "center", lineHeight: 1.15 }}>DNA finally gave him<br />his name back.</div>
        <div style={{ fontSize: 34, fontWeight: 700, color: "#e8b64c", marginTop: 28 }}>Joseph Augustus Zarelli</div>
        <div style={{ fontSize: 20, color: "#b0b0b8", marginTop: 16 }}>A cold case, closed after 65 years.</div>
      </div>
    </AbsoluteFill>
  );
};
