import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const GOLD = "#e8b64c";
const GREEN = "#7ddf8e";
const MUTED = "#b0b0b8";

function useFade(start: number, end: number) {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [start, start + 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [end - 20, end], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return Math.min(fadeIn, fadeOut);
}

const Scene: React.FC<{ start: number; end: number; children: React.ReactNode }> = ({ start, end, children }) => {
  const opacity = useFade(start, end);
  return (
    <div style={{ opacity, position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 80 }}>
      {children}
    </div>
  );
};

const Kicker: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = GOLD }) => (
  <div style={{ fontSize: 30, letterSpacing: 7, color }}>{children}</div>
);
const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 62, fontWeight: 800, marginTop: 24, textAlign: "center", lineHeight: 1.15 }}>{children}</div>
);
const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 30, color: MUTED, marginTop: 26, textAlign: "center", lineHeight: 1.45, maxWidth: 1400 }}>{children}</div>
);
const Timeline: React.FC<{ progress: number; labels: string[] }> = ({ progress, labels }) => (
  <div style={{ width: 1300, marginTop: 56 }}>
    <div style={{ height: 8, backgroundColor: "#33333a", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width: `${progress * 100}%`, height: "100%", backgroundColor: GOLD }} />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontSize: 24, color: MUTED }}>
      {labels.map((l) => (<span key={l}>{l}</span>))}
    </div>
  </div>
);

export const ZodiacKiller: React.FC = () => {
  const frame = useCurrentFrame();
  const p2 = interpolate(frame, [600, 1200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p4 = interpolate(frame, [1800, 2400], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p5 = interpolate(frame, [2400, 3000], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0e0e12", color: "white", fontFamily: "Arial, sans-serif" }}>
      <Scene start={0} end={600}>
        <Kicker>NORTHERN CALIFORNIA, 1968 – 1969</Kicker>
        <Title>THE ZODIAC KILLER</Title>
        <Body>Four confirmed attacks. Five people killed. Two survived.<br />He called himself the Zodiac — and he wanted the public to know it.</Body>
        <div style={{ fontSize: 120, marginTop: 40, color: GOLD }}>◉</div>
      </Scene>

      <Scene start={600} end={1200}>
        <Kicker>THE FIRST ATTACKS</Kicker>
        <Title>Dec 20, 1968 — Lake Herman Road<br />July 4, 1969 — Blue Rock Springs</Title>
        <Body>David Faraday, 17, and Betty Lou Jensen, 16, beside their parked car.<br />Darlene Ferrin, 22, killed in Vallejo. Michael Mageau, 19, survived —<br />and a caller claimed both attacks for the police.</Body>
        <Timeline progress={p2} labels={["Dec 1968", "July 1969"]} />
      </Scene>

      <Scene start={1200} end={1800}>
        <Kicker>THE LAST ATTACKS</Kicker>
        <Title>Sep 27, 1969 — Lake Berryessa<br />Oct 11, 1969 — San Francisco</Title>
        <Body>Cecelia Shepard, 22, and Bryan Hartnell, 20, attacked by a hooded man<br />wearing a crossed-circle symbol. Hartnell survived.<br />Cab driver Paul Stine, 29, killed in Presidio Heights.</Body>
      </Scene>

      <Scene start={1800} end={2400}>
        <Kicker>THE FIRST CIPHER — Z408</Kicker>
        <Title>July 31, 1969: 408 characters,<br />sent to three newspapers</Title>
        <Body>Solved within days by Donald and Bettye Harden, schoolteachers from Salinas.<br />It contained no name.</Body>
        <Timeline progress={p4} labels={["408", "Z408 SOLVED 1969"]} />
      </Scene>

      <Scene start={2400} end={3000}>
        <Kicker color={GREEN}>THE SECOND CIPHER — Z340 • SOLVED 2020</Kicker>
        <Title>340 characters. 51 years.<br />Solved Dec 5, 2020.</Title>
        <Body>David Oranchak, Sam Blake, and Jarl Van Eycke submitted the solution.<br />The FBI confirmed it. It began: “I hope you are having lots of fun<br />in trying to catch me.” It contained no name.</Body>
        <Timeline progress={p5} labels={["Nov 1969", "Dec 2020"]} />
      </Scene>

      <Scene start={3000} end={3600}>
        <Kicker>STILL UNSOLVED</Kicker>
        <Title>Z13 and Z32 remain unsolved.<br />The 37-victim claim was never supported.</Title>
        <Body>More than fifty years later, the case remains open.<br />The evidence is real. The codes are real.<br />The name is still missing.</Body>
      </Scene>
    </AbsoluteFill>
  );
};
