import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Boy in the Box — 90s True Crime Shorts, flat 2D motion graphics, vertical 1080x1920.
// 9 scenes x 300 frames. Dark mystery palette, gold accent, large readable text.
// No photos, no AI video clips — all shapes are code-drawn divs.

const BG = "#0d0d11";
const GOLD = "#e8b64c";
const GREEN = "#7ddf8e";
const RED = "#e05d5d";
const GREY = "#b0b0b8";
const CARD = "#1a1a22";
const LINE = "#33333d";

function Scene(props: {
  start: number;
  children: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const local = frame - props.start;
  const opacity = Math.min(
    interpolate(local, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    interpolate(local, [280, 300], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  );
  const y = interpolate(local, [0, 25], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
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

export const BoyInBoxShorts: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline progress for scene 3 (frames 600-900)
  const tlProgress = interpolate(frame, [660, 840], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // DNA strand pulse for scene 6 (frames 1500-1800)
  const pulse = 1 + 0.06 * Math.sin((frame - 1500) * 0.12);
  // Name reveal scale for scene 8 (frames 2100-2400)
  const nameScale = interpolate(frame, [2140, 2180], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>TRUE CRIME • COLD CASE</Badge>

      {/* Scene 1 (0-300): Philadelphia, 1957 — a box in the woods */}
      <Scene start={0}>
        <Kicker>PHILADELPHIA • 1957</Kicker>
        <Headline>
          A cardboard box,
          <br />
          in the woods.
        </Headline>
        {/* Flat map + box illustration */}
        <div style={{ marginTop: 60, position: "relative", width: 620, height: 380 }}>
          <div style={{ position: "absolute", inset: 0, backgroundColor: "#17171f", borderRadius: 24, border: `2px solid ${LINE}` }} />
          <div style={{ position: "absolute", top: 40, left: 60, fontSize: 30, color: GREY }}>FOX CHASE</div>
          <div style={{ position: "absolute", top: 44, right: 60, width: 26, height: 26, borderRadius: "50%", backgroundColor: RED }} />
          <div style={{ position: "absolute", top: 120, left: 90, width: 440, height: 6, backgroundColor: LINE, borderRadius: 3 }} />
          <div style={{ position: "absolute", top: 200, left: 90, width: 440, height: 6, backgroundColor: LINE, borderRadius: 3 }} />
          <div style={{ position: "absolute", top: 280, left: 90, width: 300, height: 6, backgroundColor: LINE, borderRadius: 3 }} />
          {/* Cardboard box */}
          <div style={{ position: "absolute", left: 235, top: 130, width: 150, height: 110, backgroundColor: "#b98a4e", borderRadius: 6 }} />
          <div style={{ position: "absolute", left: 235, top: 118, width: 150, height: 24, backgroundColor: "#a1763f", borderRadius: 6 }} />
          <div style={{ position: "absolute", left: 300, top: 150, width: 20, height: 70, backgroundColor: "#8f6a36" }} />
        </div>
        <Sub>February 25, 1957 — a student finds the box off Susquehanna Road.</Sub>
      </Scene>

      {/* Scene 2 (300-600): Inside — a boy, no name */}
      <Scene start={300}>
        <Kicker color={RED}>NO NAME</Kicker>
        <Headline size={58}>
          Inside: a small boy,
          <br />
          about four years old.
        </Headline>
        <div style={{ marginTop: 56, fontSize: 190, fontWeight: 900, color: GOLD, lineHeight: 1 }}>?</div>
        <Sub>No one reports him missing. No one knows who he is.</Sub>
      </Scene>

      {/* Scene 3 (600-900): 65 years unknown */}
      <Scene start={600}>
        <Kicker>65 YEARS UNKNOWN</Kicker>
        <div style={{ fontSize: 120, fontWeight: 900, color: GOLD, marginTop: 30 }}>65</div>
        <div style={{ fontSize: 40, fontWeight: 700, marginTop: 6 }}>YEARS WITHOUT A NAME</div>
        <div style={{ width: 820, height: 10, backgroundColor: "#33333a", borderRadius: 5, marginTop: 64, overflow: "hidden" }}>
          <div style={{ width: `${tlProgress * 100}%`, height: "100%", backgroundColor: GOLD }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", width: 820, marginTop: 16, fontSize: 30, color: GREY }}>
          <span>1957</span>
          <span>1980</span>
          <span>2000</span>
          <span>2022</span>
        </div>
        <Sub>“America’s Unknown Child.” Thousands of tips. No answers.</Sub>
      </Scene>

      {/* Scene 4 (900-1200): Detective Bristow, 35 years */}
      <Scene start={900}>
        <Kicker>ONE DETECTIVE</Kicker>
        <Headline size={56}>
          Remington Bristow spends
          <br />
          35 years on the case.
        </Headline>
        {/* Flat detective silhouette + file card */}
        <div style={{ marginTop: 56, display: "flex", gap: 40, alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 110, height: 110, borderRadius: "50%", backgroundColor: "#2c2c38" }} />
            <div style={{ width: 190, height: 110, backgroundColor: "#2c2c38", borderRadius: "90px 90px 12px 12px", marginTop: 14 }} />
          </div>
          <div style={{ width: 300, height: 240, backgroundColor: CARD, border: `2px solid ${LINE}`, borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 24, letterSpacing: 3, color: GOLD, fontWeight: 700 }}>POLICE FILE</div>
            <div style={{ fontSize: 34, fontWeight: 800, marginTop: 16 }}>CASE #1957</div>
            <div style={{ fontSize: 26, color: GREY, marginTop: 12, lineHeight: 1.5 }}>
              Open.
              <br />
              Never closed.
            </div>
          </div>
        </div>
        <Sub>Most of his working life — trying to give the boy his name back.</Sub>
      </Scene>

      {/* Scene 5 (1200-1500): 1998 exhumation, DNA no match */}
      <Scene start={1200}>
        <Kicker>1998 • FIRST EXHUMATION</Kicker>
        <Headline size={56}>
          DNA from a tooth.
          <br />
          The science is too new.
        </Headline>
        <div style={{ marginTop: 56, display: "flex", gap: 18 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: i === 2 ? RED : "#2c2c38",
                border: `2px solid ${LINE}`,
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: RED, marginTop: 44 }}>NO MATCH</div>
        <Sub>The sample leads nowhere.</Sub>
      </Scene>

      {/* Scene 6 (1500-1800): 2019, degraded DNA, 2.5 years */}
      <Scene start={1500}>
        <Kicker>2019 • SECOND EXHUMATION</Kicker>
        <Headline size={56}>
          The DNA is broken
          <br />
          into tiny pieces.
        </Headline>
        <div style={{ marginTop: 56, transform: `scale(${pulse})`, display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
          <div style={{ display: "flex", gap: 22 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 70, height: 26, borderRadius: 13, backgroundColor: GOLD }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 22, marginLeft: 60 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ width: 70, height: 26, borderRadius: 13, backgroundColor: "#5a5a66" }} />
            ))}
          </div>
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 44 }}>2.5 YEARS</div>
        <Sub>Just to build one usable profile.</Sub>
      </Scene>

      {/* Scene 7 (1800-2100): Genealogy — databases, cousins */}
      <Scene start={1800}>
        <Kicker>DNA GENEALOGY</Kicker>
        <Headline size={56}>
          One match at a time,
          <br />
          through distant cousins.
        </Headline>
        <div style={{ marginTop: 56, display: "flex", flexDirection: "column", gap: 20, width: 700 }}>
          {["GEDmatch", "FamilyTreeDNA"].map((name) => (
            <div
              key={name}
              style={{
                backgroundColor: CARD,
                border: `2px solid ${LINE}`,
                borderRadius: 16,
                padding: "24px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 34, fontWeight: 800 }}>{name}</span>
              <span style={{ fontSize: 28, color: GREEN, fontWeight: 700 }}>MATCH ✓</span>
            </div>
          ))}
        </div>
        <Sub>Identifinders • DNA Doe Project</Sub>
      </Scene>

      {/* Scene 8 (2100-2400): Name found — Dec 8, 2022 */}
      <Scene start={2100}>
        <div style={{ transform: `scale(${nameScale})`, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Kicker color={GREEN}>DECEMBER 8, 2022 — SOLVED</Kicker>
          <Headline size={54}>
            DNA finally gave him
            <br />
            his name back.
          </Headline>
          <div style={{ fontSize: 52, fontWeight: 900, color: GOLD, marginTop: 44, textAlign: "center", lineHeight: 1.2 }}>
            Joseph Augustus
            <br />
            Zarelli
          </div>
          <div style={{ fontSize: 30, color: GREY, marginTop: 28 }}>Born January 13, 1953</div>
        </div>
      </Scene>

      {/* Scene 9 (2400-2700): Headstone 2024, case still open */}
      <Scene start={2400}>
        <Kicker>AFTER 65 YEARS</Kicker>
        {/* Flat headstone */}
        <div style={{ marginTop: 50, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 300,
              height: 260,
              backgroundColor: "#2c2c38",
              borderRadius: "150px 150px 12px 12px",
              border: `2px solid ${LINE}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 34, fontWeight: 800, color: GOLD }}>JOSEPH</div>
            <div style={{ fontSize: 26, color: GREY, marginTop: 10 }}>1953 — 1957</div>
          </div>
          <div style={{ width: 380, height: 18, backgroundColor: "#1e7d46", borderRadius: 9, marginTop: -4 }} />
        </div>
        <Headline size={52}>
          He finally has a name.
          <br />
          The case is still open.
        </Headline>
        <Sub>His killer has never been named. Sources: Philadelphia Police, Dec 8, 2022.</Sub>
      </Scene>
    </AbsoluteFill>
  );
};
