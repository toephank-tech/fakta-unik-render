import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const GOLD = "#e8b64c";
const GREEN = "#7ddf8e";
const MUTED = "#b0b0b8";

function sceneOpacity(frame: number, start: number, end: number): number {
  const fadeIn = interpolate(frame, [start, start + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [end - 20, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
}

export const SomertonMan: React.FC = () => {
  const f = useCurrentFrame();
  const s1 = sceneOpacity(f, 0, 600);
  const s2 = sceneOpacity(f, 600, 1200);
  const s3 = sceneOpacity(f, 1200, 1800);
  const s4 = sceneOpacity(f, 1800, 2400);
  const s5 = sceneOpacity(f, 2400, 3000);
  const s6 = sceneOpacity(f, 3000, 3600);
  const timeline = interpolate(f, [2400, 3000], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const center: React.CSSProperties = { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 120px" };

  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0e12", color: "white", fontFamily: "Arial, sans-serif" }}>
      <div style={{ ...center, opacity: s1 }}>
        <div style={{ fontSize: 32, letterSpacing: 8, color: GOLD }}>ADELAIDE, AUSTRALIA — DECEMBER 1, 1948</div>
        <div style={{ fontSize: 64, fontWeight: 800, marginTop: 28, lineHeight: 1.15 }}>A man found on<br />Somerton Beach.</div>
        <div style={{ fontSize: 28, color: MUTED, marginTop: 28 }}>No wallet. No hat. No ID. The labels cut from his clothes.</div>
      </div>

      <div style={{ ...center, opacity: s2 }}>
        <div style={{ fontSize: 72, fontWeight: 900, color: GOLD }}>NO NAME</div>
        <div style={{ fontSize: 32, marginTop: 20, lineHeight: 1.4 }}>No missing-person report matches him.<br />His shoes are clean and polished —<br />as if he barely walked on the sand.</div>
      </div>

      <div style={{ ...center, opacity: s3 }}>
        <div style={{ fontSize: 32, letterSpacing: 8, color: GOLD }}>JUNE 1949</div>
        <div style={{ fontSize: 84, fontWeight: 900, marginTop: 24 }}>TAMAM SHUD</div>
        <div style={{ fontSize: 32, marginTop: 16 }}>&ldquo;It is over.&rdquo; — Persian</div>
        <div style={{ fontSize: 26, color: MUTED, marginTop: 20 }}>The final line of the Rubaiyat of Omar Khayyam,<br />hidden in his trousers.</div>
      </div>

      <div style={{ ...center, opacity: s4 }}>
        <div style={{ fontSize: 32, letterSpacing: 8, color: GOLD }}>THE BOOK &amp; THE CODE</div>
        <div style={{ fontSize: 44, fontWeight: 800, marginTop: 24, lineHeight: 1.3 }}>The torn page matches.<br />A phone number. Five lines of code.</div>
        <div style={{ fontSize: 30, color: MUTED, marginTop: 24 }}>It has never been deciphered.</div>
        <div style={{ fontSize: 26, color: MUTED, marginTop: 12, fontFamily: "monospace" }}>WRGOABABD &nbsp; WTBIMPANETP …</div>
      </div>

      <div style={{ ...center, opacity: s5 }}>
        <div style={{ fontSize: 32, letterSpacing: 8, color: GOLD }}>1948 — 2021</div>
        <div style={{ fontSize: 48, fontWeight: 800, marginTop: 24, lineHeight: 1.3 }}>The inquest cannot say<br />who he was, or how he died.</div>
        <div style={{ width: 1100, height: 10, backgroundColor: "#33333a", borderRadius: 5, marginTop: 56, overflow: "hidden" }}>
          <div style={{ width: `${timeline * 100}%`, height: "100%", backgroundColor: GOLD }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: 1100, marginTop: 14, fontSize: 24, color: MUTED }}>
          <span>1948</span><span>1958</span><span>2009</span><span>2021 — Exhumed</span>
        </div>
      </div>

      <div style={{ ...center, opacity: s6 }}>
        <div style={{ fontSize: 32, letterSpacing: 8, color: GREEN }}>JULY 26, 2022 — A NAME IS ANNOUNCED</div>
        <div style={{ fontSize: 56, fontWeight: 800, marginTop: 24 }}>Carl Charles Webb</div>
        <div style={{ fontSize: 28, color: MUTED, marginTop: 16 }}>Born November 16, 1905, Melbourne — electrical engineer, aged 43.<br />DNA from hairs in a plaster cast. Family tree of 4,000+ people.</div>
        <div style={{ fontSize: 28, color: GOLD, marginTop: 28, fontWeight: 700 }}>Police have NOT officially verified it.</div>
        <div style={{ fontSize: 24, color: MUTED, marginTop: 12 }}>A name, after 74 years — but not yet an ending.</div>
      </div>
    </AbsoluteFill>
  );
};
