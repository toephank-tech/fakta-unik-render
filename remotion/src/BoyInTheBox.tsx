import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const BG = "#0e0e12";
const GOLD = "#e8b64c";
const GREEN = "#7ddf8e";
const MUTED = "#b0b0b8";
const DIM = "#33333a";

function useScene(start: number, end: number) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [start, start + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [end - 20, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 140px" }}>
      {children}
    </div>
  );
}

export const BoyInTheBox: React.FC = () => {
  const frame = useCurrentFrame();
  const o1 = useScene(0, 600);
  const o2 = useScene(600, 1200);
  const o3 = useScene(1200, 1800);
  const o4 = useScene(1800, 2400);
  const o5 = useScene(2400, 3000);
  const o6 = useScene(3000, 3600);
  const prog2 = interpolate(frame, [700, 1100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const prog4 = interpolate(frame, [1900, 2300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      {/* Scene 1 — Discovery */}
      <div style={{ opacity: o1 }}>
        <Center>
          <div style={{ fontSize: 34, letterSpacing: 8, color: GOLD }}>PHILADELPHIA &middot; FEBRUARY 25, 1957</div>
          <div style={{ fontSize: 84, fontWeight: 900, marginTop: 32, lineHeight: 1.05 }}>A boy found<br />in a box.</div>
          <div style={{ fontSize: 36, color: MUTED, marginTop: 32 }}>No name. No one reports him missing.</div>
          <div style={{ fontSize: 26, color: GOLD, marginTop: 48, letterSpacing: 3 }}>FOX CHASE &middot; SUSQUEHANNA ROAD</div>
        </Center>
      </div>

      {/* Scene 2 — 65 years unknown */}
      <div style={{ opacity: o2 }}>
        <Center>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD }}>65 YEARS</div>
          <div style={{ fontSize: 40, marginTop: 16 }}>Known only as &ldquo;America&rsquo;s Unknown Child&rdquo;</div>
          <div style={{ fontSize: 28, color: MUTED, marginTop: 24, lineHeight: 1.5 }}>The largest missing-child investigation<br />in the city&rsquo;s history. Thousands of tips.<br />No parent comes forward.</div>
          <div style={{ width: 1100, height: 10, backgroundColor: DIM, borderRadius: 5, marginTop: 56, overflow: "hidden" }}>
            <div style={{ width: `${prog2 * 100}%`, height: "100%", backgroundColor: GOLD }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 1100, marginTop: 14, fontSize: 26, color: MUTED }}>
            <span>1957</span><span>1970</span><span>1990</span><span>2022</span>
          </div>
        </Center>
      </div>

      {/* Scene 3 — Bristow + 1998 */}
      <div style={{ opacity: o3 }}>
        <Center>
          <div style={{ fontSize: 32, letterSpacing: 6, color: GOLD }}>ONE DETECTIVE &middot; 35 YEARS</div>
          <div style={{ fontSize: 64, fontWeight: 800, marginTop: 28, lineHeight: 1.15 }}>Detective Remington Bristow<br />never lets go.</div>
          <div style={{ fontSize: 30, color: MUTED, marginTop: 32, lineHeight: 1.5 }}>1998 — the body is exhumed for the first time.<br />DNA is taken from a tooth. The science is too new.<br />The sample leads nowhere.</div>
        </Center>
      </div>

      {/* Scene 4 — 2019 DNA */}
      <div style={{ opacity: o4 }}>
        <Center>
          <div style={{ fontSize: 32, letterSpacing: 6, color: GOLD }}>2019 &middot; A SECOND EXHUMATION</div>
          <div style={{ fontSize: 60, fontWeight: 800, marginTop: 28, lineHeight: 1.15 }}>The DNA is badly degraded.<br />Broken into tiny pieces.</div>
          <div style={{ fontSize: 30, color: MUTED, marginTop: 28 }}>2.5 years just to build a usable profile.</div>
          <div style={{ width: 1100, height: 10, backgroundColor: DIM, borderRadius: 5, marginTop: 48, overflow: "hidden" }}>
            <div style={{ width: `${prog4 * 100}%`, height: "100%", backgroundColor: GOLD }} />
          </div>
          <div style={{ fontSize: 26, color: MUTED, marginTop: 20 }}>Genealogists trace it through distant cousins, one match at a time.</div>
        </Center>
      </div>

      {/* Scene 5 — Identification */}
      <div style={{ opacity: o5 }}>
        <Center>
          <div style={{ fontSize: 32, letterSpacing: 6, color: GREEN }}>DECEMBER 8, 2022 &middot; SOLVED</div>
          <div style={{ fontSize: 72, fontWeight: 900, marginTop: 28, lineHeight: 1.1, color: GOLD }}>Joseph Augustus Zarelli</div>
          <div style={{ fontSize: 36, marginTop: 24 }}>Born January 13, 1953, in Philadelphia.</div>
          <div style={{ fontSize: 28, color: MUTED, marginTop: 24, lineHeight: 1.5 }}>His name was found in October 2021.<br />His parents had both died years earlier.<br />His siblings learn, as adults, they once had a brother.</div>
        </Center>
      </div>

      {/* Scene 6 — Still open */}
      <div style={{ opacity: o6 }}>
        <Center>
          <div style={{ fontSize: 32, letterSpacing: 6, color: GOLD }}>THE CASE IS STILL OPEN</div>
          <div style={{ fontSize: 56, fontWeight: 800, marginTop: 28, lineHeight: 1.2 }}>His killer has never been named.</div>
          <div style={{ fontSize: 30, color: MUTED, marginTop: 28, lineHeight: 1.5 }}>In 2024, his headstone was replaced.<br />It finally reads his name.</div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 48 }}>Joseph.</div>
        </Center>
      </div>
    </AbsoluteFill>
  );
};
