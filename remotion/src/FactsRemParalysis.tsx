import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts — Video 1 (Daily Batch): Your Brain Paralyzes You Every Night (REM atonia)
// FULL-MOTION render: all 9 scenes x 300 frames = 2700 frames, vertical 1080x1920.
// Final video is a V3 combo: AI clips replace S1/S3/S6/S8; motion segments S2/S4/S5/S7/S9
// are cut from this render. Night theme: deep navy, moon gold, lavender.
// Every scene has continuous real movement, NOT animated text cards.

const BG = "#0a0f24";
const CARD = "#141b3a";
const LINE = "#2a3560";
const GOLD = "#f4c95d";
const BLUE = "#5b8def";
const LAV = "#b8a9e8";
const GREY = "#c9c9cf";
const TEAL = "#4dd0c4";
const RED = "#ff4d5e";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#7d8bb8", fontWeight: 700 }}>
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

function Moon(props: { size: number; glow?: number }) {
  return (
    <div
      style={{
        width: props.size,
        height: props.size,
        borderRadius: "50%",
        backgroundColor: GOLD,
        boxShadow: `0 0 ${Math.round(50 + (props.glow || 0) * 40)}px rgba(244,201,93,0.8), 0 0 140px rgba(244,201,93,0.35)`,
      }}
    />
  );
}

export const FactsRemParalysis: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S1 (0-300): moon + rising Zzz + breathing glow ----
  const s1 = frame;
  const breathe1 = 1 + 0.05 * Math.sin(s1 * 0.05);
  const zRise = (s1 % 150) / 150;

  // ---- S2 (300-600): brain waves pulsing vs body flatline ----
  const s2 = frame - 300;
  const wavePhase = s2 * 0.12;

  // ---- S3 (600-900): drifting dream clouds + stars ----
  const s3 = frame - 600;
  const cloudX = (s3 * 1.2) % 1200;

  // ---- S4 (900-1200): switch flipping OFF + GABA/glycine flowing down spine ----
  const s4 = frame - 900;
  const switchOn = s4 < 60;
  const flowY = (s4 * 3) % 320;

  // ---- S5 (1200-1500): 8-in-100 counter + clock hand sweeping ----
  const s5 = frame - 1200;
  const count5 = Math.min(8, Math.floor(s5 / 30) + 1);
  const clockDeg = s5 * 1.2;

  // ---- S6 (1500-1800): electric pulses down the body ----
  const s6 = frame - 1500;
  const pulseY = (s6 * 4) % 480;

  // ---- S7 (1800-2100): RBD — swinging limbs + <1 in 100 ----
  const s7 = frame - 1800;
  const swing = Math.sin(s7 * 0.12) * 38;

  // ---- S8 (2100-2400): eyes opening + frozen body then relief glow ----
  const s8 = frame - 2100;
  const eyeOpen = interpolate(s8, [30, 120], [0.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const relief = interpolate(s8, [180, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S9 (2400-2700): twinkling stars + moon + sweet dreams ----
  const s9 = frame - 2400;
  const twinkle = 0.5 + 0.5 * Math.sin(s9 * 0.1);

  const stars = Array.from({ length: 16 }).map((_, i) => ({
    x: 60 + ((i * 173) % 960),
    y: 120 + ((i * 251) % 500),
    size: 8 + ((i * 13) % 14),
    phase: i * 0.7,
  }));

  const clouds = [0, 1, 2].map((i) => ({
    y: 180 + i * 160,
    speed: 0.8 + i * 0.4,
    size: 200 + i * 60,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S1 — moon + Zzz (motion fallback; final uses AI clip) */}
      {frame < 300 && (
        <Center>
          <div style={{ transform: `scale(${breathe1})` }}>
            <Moon size={300} glow={0.6} />
          </div>
          <div style={{ marginTop: 60, fontSize: 90, fontWeight: 900, color: LAV, opacity: 0.9, transform: `translateY(${-zRise * 60}px)` }}>
            Z z z
          </div>
          <Headline size={58}>Tonight, your brain will switch you off.</Headline>
          <Sub>And you will not even notice.</Sub>
        </Center>
      )}

      {/* S2 — brain awake, body off */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={BLUE}>REM SLEEP • THE DREAMING STAGE</Kicker>
          <div style={{ display: "flex", gap: 40, marginTop: 60, width: 940, justifyContent: "center" }}>
            <div style={{ width: 430, height: 380, borderRadius: 24, backgroundColor: CARD, border: `3px solid ${BLUE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30 }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: BLUE }}>BRAIN</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150, marginTop: 30 }}>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                  const h = 40 + 100 * Math.abs(Math.sin(wavePhase + i * 0.9));
                  return <div key={i} style={{ width: 30, height: h, borderRadius: 15, backgroundColor: i % 2 === 0 ? BLUE : LAV }} />;
                })}
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "white", marginTop: 30 }}>AWAKE</div>
            </div>
            <div style={{ width: 430, height: 380, borderRadius: 24, backgroundColor: CARD, border: `3px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30 }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: GREY }}>BODY</div>
              <div style={{ width: 300, height: 150, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 30 }}>
                <div style={{ width: 280, height: 8, backgroundColor: TEAL, borderRadius: 4 }} />
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: TEAL, marginTop: 30 }}>SWITCHED OFF</div>
            </div>
          </div>
          <Sub>Your brain lights up — as if you were awake.</Sub>
        </Center>
      )}

      {/* S3 — dream clouds (motion fallback; final uses AI clip) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>DREAM WORLD</Kicker>
          <div style={{ position: "relative", width: 940, height: 420, marginTop: 40, overflow: "hidden" }}>
            {stars.slice(0, 10).map((st, i) => (
              <div key={i} style={{ position: "absolute", left: st.x, top: st.y % 380, width: st.size, height: st.size, borderRadius: "50%", backgroundColor: "white", opacity: 0.4 + 0.5 * Math.abs(Math.sin(s3 * 0.05 + st.phase)) }} />
            ))}
            {clouds.map((c, i) => {
              const x = ((c.speed * s3 + i * 400) % 1100) - 100;
              return (
                <div key={i} style={{ position: "absolute", left: x, top: c.y, width: c.size, height: 90, borderRadius: 45, backgroundColor: "rgba(184,169,232,0.35)" }} />
              );
            })}
          </div>
          <Headline size={58}>You run. You jump. You fight.</Headline>
          <Sub>But in bed, you do not move a muscle.</Sub>
        </Center>
      )}

      {/* S4 — brainstem switch + GABA/glycine */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={TEAL}>THE OFF-SWITCH</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 50 }}>
            <div style={{ width: 300, height: 420, borderRadius: 24, backgroundColor: CARD, border: `3px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
              <div style={{ fontSize: 30, fontWeight: 800, color: GREY }}>BRAINSTEM</div>
              <div style={{ width: 120, height: 200, borderRadius: 60, backgroundColor: switchOn ? BLUE : "#33333a", marginTop: 30, position: "relative", border: "3px solid #555" }}>
                <div style={{ position: "absolute", left: 14, top: switchOn ? 14 : 96, width: 86, height: 86, borderRadius: "50%", backgroundColor: switchOn ? "white" : TEAL, transition: "none" }} />
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: switchOn ? BLUE : TEAL, marginTop: 26 }}>{switchOn ? "ON" : "OFF"}</div>
            </div>
            <div style={{ width: 300, height: 420, position: "relative", overflow: "hidden", borderRadius: 24, backgroundColor: "#0d1330", border: `3px solid ${LINE}` }}>
              {[0, 1, 2].map((i) => {
                const y = ((flowY + i * 110) % 400) - 20;
                return (
                  <div key={i} style={{ position: "absolute", left: 100, top: y, width: 100, height: 44, borderRadius: 22, backgroundColor: i % 2 === 0 ? TEAL : LAV, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#0a0f24" }}>
                    {i % 2 === 0 ? "GABA" : "GLYCINE"}
                  </div>
                );
              })}
              <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center", fontSize: 28, fontWeight: 800, color: GREY }}>TO THE MUSCLES</div>
            </div>
          </div>
          <Sub>Two chemicals cut the signal to your muscles.</Sub>
        </Center>
      )}

      {/* S5 — sleep paralysis: 8 in 100 + clock */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={LAV}>WHEN THE TIMING GOES WRONG</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 60, marginTop: 50 }}>
            <div style={{ position: "relative", width: 320, height: 320, borderRadius: "50%", backgroundColor: CARD, border: `4px solid ${LAV}` }}>
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 8, height: 130, backgroundColor: GOLD, transformOrigin: "bottom center", transform: `translateX(-50%) rotate(${clockDeg}deg) translateY(-100%)` }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", width: 26, height: 26, borderRadius: "50%", backgroundColor: GOLD, transform: "translate(-50%, -50%)" }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 150, fontWeight: 900, color: GOLD, lineHeight: 1 }}>{count5}</div>
              <div style={{ fontSize: 44, fontWeight: 900 }}>IN 100 PEOPLE</div>
              <div style={{ fontSize: 32, color: GREY, marginTop: 12 }}>have felt it</div>
            </div>
          </div>
          <Headline size={56}>Awake — but you cannot move.</Headline>
          <Sub>That is sleep paralysis. It lasts seconds to minutes.</Sub>
        </Center>
      )}

      {/* S6 — electric pulses down the body (motion fallback; final uses AI clip) */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={BLUE}>WHEN DREAMS ESCAPE</Kicker>
          <div style={{ position: "relative", width: 300, height: 480, marginTop: 40 }}>
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 10, backgroundColor: "#1d2547", borderRadius: 5, transform: "translateX(-50%)" }} />
            {[0, 1, 2].map((i) => {
              const y = ((pulseY + i * 160) % 480);
              return (
                <div key={i} style={{ position: "absolute", left: "50%", top: y, width: 60, height: 60, borderRadius: "50%", backgroundColor: BLUE, transform: "translate(-50%, -50%)", boxShadow: "0 0 40px rgba(91,141,239,0.9)" }} />
              );
            })}
          </div>
          <Headline size={56}>People punch, kick, and shout in their sleep.</Headline>
          <Sub>Acting out every dream.</Sub>
        </Center>
      )}

      {/* S7 — RBD: less than 1 in 100, men over 50 */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={GOLD}>REM SLEEP BEHAVIOR DISORDER</Kicker>
          <div style={{ display: "flex", gap: 30, marginTop: 50 }}>
            <div style={{ width: 430, height: 360, borderRadius: 24, backgroundColor: CARD, border: `3px solid ${GOLD}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, lineHeight: 1 }}>&lt;1</div>
              <div style={{ fontSize: 40, fontWeight: 900, marginTop: 10 }}>IN 100 PEOPLE</div>
              <div style={{ fontSize: 30, color: GREY, marginTop: 10 }}>have it</div>
            </div>
            <div style={{ width: 430, height: 360, borderRadius: 24, backgroundColor: CARD, border: `3px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: 24 }}>
                {[0, 1].map((i) => (
                  <div key={i} style={{ width: 60, height: 180, borderRadius: 30, backgroundColor: i === 0 ? BLUE : LAV, transform: `rotate(${swing * (i === 0 ? 1 : -1)}deg)`, transformOrigin: "top center" }} />
                ))}
              </div>
              <div style={{ fontSize: 38, fontWeight: 900, marginTop: 30 }}>MOSTLY MEN OVER 50</div>
            </div>
          </div>
          <Sub>It can be dangerous — for them, and for anyone sleeping beside them.</Sub>
        </Center>
      )}

      {/* S8 — eyes opening, frozen, then relief (motion fallback; final uses AI clip) */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={RED}>THE WILDEST PART</Kicker>
          <div style={{ display: "flex", gap: 70, marginTop: 60 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ width: 200, height: 100 * eyeOpen + 12, borderRadius: "50%", backgroundColor: "white", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#222" }} />
              </div>
            ))}
          </div>
          <Headline size={58}>
            Without this paralysis,
            <br />
            you would act out every dream.
          </Headline>
          <Sub>Every night — for your whole life.</Sub>
        </Center>
      )}

      {/* S9 — moon + twinkling stars, closing */}
      {frame >= 2400 && (
        <Center>
          <div style={{ position: "relative", width: 940, height: 260, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {stars.map((st, i) => (
              <div key={i} style={{ position: "absolute", left: st.x, top: (st.y % 220), width: st.size, height: st.size, borderRadius: "50%", backgroundColor: "white", opacity: 0.3 + 0.6 * Math.abs(Math.sin(s9 * 0.06 + st.phase)) }} />
            ))}
            <Moon size={220} glow={twinkle * 0.8} />
          </div>
          <Headline size={60}>Sweet dreams.</Headline>
          <Sub>Your brain will switch you off again tonight — to keep you safe.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
