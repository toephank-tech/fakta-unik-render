import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts — You Are 60% Banana (DNA #106)
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S6, S8) are separate clips; this comp covers
// S2, S4, S5, S7, S9. Every scene has continuous real movement, NOT
// animated text cards. Big numbers/counters are the animation itself, with
// at most one short kicker/headline line per scene. Green/gold DNA palette.

const BG = "#0a140e";
const GREEN = "#a3e635";
const LIME = "#65d90a";
const GOLD = "#f4c95d";
const WHITE = "#f2f2f5";
const GREY = "#c9c9cf";
const CARD = "#12241a";
const LINE = "#1e3a2a";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 30, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

function Headline(props: { children: React.ReactNode; size?: number }) {
  return (
    <div style={{ fontSize: props.size || 56, fontWeight: 800, marginTop: 26, textAlign: "center", lineHeight: 1.2, color: "white" }}>
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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8fae7d", fontWeight: 700 }}>
      {props.children}
    </div>
  );
}

function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 70px" }}>
      {props.children}
    </div>
  );
}

function BigNum(props: { children: React.ReactNode; color?: string; size?: number }) {
  return (
    <div style={{ fontSize: props.size || 260, fontWeight: 900, color: props.color || GREEN, lineHeight: 1, textShadow: `0 0 60px ${props.color || GREEN}66, 0 0 140px ${props.color || GREEN}33` }}>
      {props.children}
    </div>
  );
}

// Drifting glowing particles, deterministic pseudo-random per index
function Particles(props: { count: number; f: number; color: string }) {
  const dots = [];
  for (let i = 0; i < props.count; i++) {
    const seed = i * 137.5;
    const x = ((seed * 7.3) % 1080) + Math.sin((props.f + i * 40) * 0.02) * 40;
    const y = ((seed * 13.7) % 1920 + props.f * (0.6 + (i % 3) * 0.4)) % 1920;
    const s = 4 + (i % 4) * 3;
    const o = 0.25 + 0.45 * Math.abs(Math.sin((props.f + i * 23) * 0.03));
    dots.push(
      <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: "50%", backgroundColor: props.color, opacity: o }} />
    );
  }
  return <>{dots}</>;
}

export const FactsDnaBananaMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const scene = Math.floor(frame / 300);
  const f = frame % 300;

  // ---- S2 (scene 0): 60% counter + orbiting dots ----
  const pct2 = Math.round(interpolate(f, [20, 260], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const ring2 = 1 + 0.04 * Math.sin(f * 0.08);
  const orbit2 = f * 0.9;

  // ---- S4 (scene 1): two-phase counter 60% fly / 75% disease genes ----
  const phase4 = Math.min(1, Math.floor(f / 150));
  const p4 = (f % 150) / 150;
  const targets4 = [60, 75];
  const pct4 = Math.round(targets4[phase4] * (0.15 + 0.85 * p4));
  const labels4 = ["FRUIT FLY", "OF HUMAN DISEASE GENES"];
  const flyX = 200 + 300 * Math.abs(Math.sin(f * 0.045));
  const flyY = 500 + 220 * Math.sin(f * 0.03);

  // ---- S5 (scene 2): 85% counter + filling bar ----
  const pct5 = Math.round(interpolate(f, [20, 260], [0, 85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const bar5 = interpolate(f, [20, 260], [0, 940], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S7 (scene 3): 99.9% counter + expanding rings ----
  const pct7 = (interpolate(f, [20, 270], [0, 99.9], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(1);
  const ringPhase7 = (f % 100) / 100;

  // ---- S9 (scene 4): DNA helix dots + closing headline ----
  const pulse9 = 1 + 0.03 * Math.sin(f * 0.07);
  const helixDots = [];
  for (let i = 0; i < 16; i++) {
    const y = 560 + i * 52;
    const off = Math.sin(f * 0.05 + i * 0.55) * 130;
    const off2 = Math.sin(f * 0.05 + i * 0.55 + Math.PI) * 130;
    helixDots.push(
      <div key={`a${i}`} style={{ position: "absolute", left: 540 + off, top: y, width: 16, height: 16, borderRadius: "50%", backgroundColor: GOLD, boxShadow: "0 0 18px rgba(244,201,93,0.9)" }} />,
      <div key={`b${i}`} style={{ position: "absolute", left: 540 + off2, top: y, width: 16, height: 16, borderRadius: "50%", backgroundColor: GREEN, boxShadow: "0 0 18px rgba(163,230,53,0.9)" }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <Particles count={26} f={frame} color={scene === 4 ? GOLD : GREEN} />

      {scene === 0 && (
        <>
          <Badge>YOUR GENES · BANANA</Badge>
          <Center>
            <div style={{ transform: `scale(${ring2})`, width: 420, height: 420, borderRadius: "50%", border: `6px solid ${GREEN}55`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", width: 460, height: 460, borderRadius: "50%", border: `3px dashed ${GOLD}66`, transform: `rotate(${orbit2}deg)` }} />
              <BigNum size={170}>{pct2}%</BigNum>
            </div>
            <div style={{ height: 40 }} />
            <Kicker>OF YOUR GENES</Kicker>
            <Headline size={52}>have a match<br />in a banana</Headline>
          </Center>
        </>
      )}

      {scene === 1 && (
        <>
          <Badge>SMALL FLY · BIG SHARE</Badge>
          <Center>
            <div style={{ position: "absolute", left: flyX, top: flyY, fontSize: 64, opacity: 0.9 }}>●</div>
            <BigNum size={230}>{pct4}%</BigNum>
            <div style={{ height: 30 }} />
            <Kicker>{labels4[phase4]}</Kicker>
            <Sub>{phase4 === 0 ? "of your genes — same as a banana" : "are also found in fruit flies"}</Sub>
          </Center>
        </>
      )}

      {scene === 2 && (
        <>
          <Badge>MOUSE · LAB PARTNER</Badge>
          <Center>
            <BigNum size={230}>{pct5}%</BigNum>
            <div style={{ height: 30 }} />
            <Kicker color={GREEN}>PROTEIN-CODING GENES</Kicker>
            <Sub>shared with a mouse</Sub>
            <div style={{ height: 46 }} />
            <div style={{ width: 940, height: 26, borderRadius: 13, backgroundColor: LINE, overflow: "hidden" }}>
              <div style={{ width: bar5, height: "100%", borderRadius: 13, backgroundColor: GREEN, boxShadow: "0 0 24px rgba(163,230,53,0.7)" }} />
            </div>
          </Center>
        </>
      )}

      {scene === 3 && (
        <>
          <Badge>ANOTHER HUMAN</Badge>
          <Center>
            <div style={{ position: "relative", width: 500, height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", width: 300 + ringPhase7 * 260, height: 300 + ringPhase7 * 260, borderRadius: "50%", border: `4px solid rgba(244,201,93,${0.7 * (1 - ringPhase7)})` }} />
              <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", border: `3px solid ${GREEN}44` }} />
              <BigNum size={190} color={GOLD}>{pct7}%</BigNum>
            </div>
            <div style={{ height: 36 }} />
            <Kicker>GENETICALLY THE SAME</Kicker>
            <Sub>the differences between us are tiny</Sub>
          </Center>
        </>
      )}

      {scene === 4 && (
        <>
          <Badge>YOU ARE 60% BANANA</Badge>
          <div style={{ position: "absolute", inset: 0 }}>{helixDots}</div>
          <Center>
            <div style={{ transform: `scale(${pulse9})`, textAlign: "center" }}>
              <Kicker>EVERY LIVING THING</Kicker>
              <Headline size={72}>is family</Headline>
            </div>
          </Center>
        </>
      )}
    </AbsoluteFill>
  );
};
