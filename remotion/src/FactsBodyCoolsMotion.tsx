import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — Idea #169: Your Body Cools Down to Help You Sleep Deeper
// (priority queue rank 28, Tier A)
// MOTION segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S5, S7) are separate clips; this comp covers
// S2, S4, S6, S8, S9. Every scene has continuous real movement, NOT
// animated text cards. Night palette: dark navy / moonlight blue / gold.
// IMPORTANT: all on-screen text stays in the UPPER TWO-THIRDS of the frame
// (subtitles sit at MarginV 640 from the bottom, i.e. below y=1280) — the
// Center wrapper is padded so content never reaches the lower third.
// TRUE proportions on all bars (verified in pixels). Stamps appear EARLY
// in their scene (frame <= 60). Drifting decorative elements live in their
// own band and never cross text lines.
// FACTS (all verified 2026-11-07 before scripting):
// - Core temperature drops ~1-2 degF (0.5-1 degC) each night; drop begins
//   ~2h before bedtime; nadir ~4-5 AM (NeuroLaunch; UT Austin).
// - Deepest sleep (N3) is the coldest stage; temperature climbs back up
//   to wake you.
// - Kräuchi et al. 2000, Am. J. Physiol.: the distal-proximal skin
//   temperature gradient (DPG) was the BEST predictor of sleep-onset
//   latency — beating core temperature, its rate of change, heart rate,
//   melatonin onset, and subjective sleepiness. Warm feet precede sleep
//   (Kräuchi et al. Nature 1999).
// - Bedroom: NSF recommends 60-67 degF (15.6-19.4 degC); Sleep Foundation
//   ~65 degF ideal. Script gives the RANGE, never one magic number.
// - Too-warm room: 2020 SLEEP study, 3.75M nights, 34,096 people — each
//   1 degF rise (60-85 degF) meant slightly lower sleep efficiency.
// - Warm-bath fact (Haghayegh 2019, ~10 min faster) was VERIFIED but is
//   NOT in this video: its AI clip was refused on policy grounds and
//   must not be retried; S7 was pivoted to the too-warm-room fact.

const BG = "#0b0b1e";
const GOLD = "#f4c95d";
const BLUE = "#5aa9ff";
const TEAL = "#7fd4c1";
const GREY = "#c9c9cf";
const MOON = "#dfe8ff";

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
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 70px 640px" }}>
      {props.children}
    </div>
  );
}

export const FactsBodyCoolsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): core temperature falls 1-2 F ----
  const s2 = frame;
  const stamp2 = s2 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const drop2 = Math.min(1, s2 / 210); // thermometer falls over 7s
  // Thermometer scale 35.0-38.0 C (3 deg range, 360px tall).
  // Start 37.0 C, end 36.0 C: mercury top moves down 120px.
  const tempC2 = 37.0 - drop2 * 1.0;
  const pulse2 = 1 + 0.05 * Math.sin(s2 * 0.12);

  // ---- S4 (300-600): hands & feet are the radiators ----
  const s4 = frame - 300;
  const stamp4 = s4 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const glow4 = 0.55 + 0.45 * Math.sin(s4 * 0.1); // pulsing heat glow
  const card4 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s4 - d) / 60)));

  // ---- S6 (600-900): bedroom range 60-67 F — TRUE proportions ----
  const s6 = frame - 600;
  const stamp6 = s6 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const band6 = Math.min(1, s6 / 150); // band fills over 5s
  // Scale 50-80 F across an 860px track: 1 F = 860/30 = 28.67px.
  // Band 60-67 F: offset (60-50)*28.67 = 287px, width 7*28.67 = 201px.
  const bandX6 = 287;
  const bandW6 = 201 * band6;

  // ---- S8 (900-1200): the nightly recipe — three checks ----
  const s8 = frame - 900;
  const stamp8 = s8 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const check8 = [0, 70, 140].map((d) => Math.min(1, Math.max(0, (s8 - d) / 60)));

  // ---- S9 (1200-1500): PAYOFF — warm hands & feet are the best predictor ----
  const s9 = frame - 1200;
  const stamp9 = s9 >= 60 ? 1 : 0; // stamp visible EARLY (frame 60)
  const pulse9 = 1 + 0.05 * Math.sin(s9 * 0.12);
  const rank9 = [0, 60, 120, 180].map((d) => Math.min(1, Math.max(0, (s9 - d) / 60)));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* S2 — core temperature falls about 1-2 F */}
      {frame < 300 && (
        <Center>
          <Kicker>YOUR CORE COOLS DOWN</Kicker>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 60, marginTop: 36 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: MOON, lineHeight: 1, transform: `scale(${pulse2})` }}>
                {tempC2.toFixed(1)}°
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: BLUE, marginTop: 8 }}>CELSIUS</div>
            </div>
            <div style={{ position: "relative", width: 70, height: 360, backgroundColor: "#1c1c30", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${((tempC2 - 35) / 3) * 360}px`, backgroundColor: BLUE, borderRadius: 999 }} />
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 110, fontWeight: 900, color: GOLD, lineHeight: 1 }}>
                −1 to −2°
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: GOLD, marginTop: 8 }}>FAHRENHEIT</div>
            </div>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp2, textAlign: "center", lineHeight: 1.2 }}>
            EVERY SINGLE
            <br />
            NIGHT
          </div>
          <Sub>About one to two degrees Fahrenheit — half a degree to one degree Celsius.</Sub>
        </Center>
      )}

      {/* S4 — hands & feet are the radiators */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker>YOUR BODY'S RADIATORS</Kicker>
          <div style={{ display: "flex", gap: 40, marginTop: 40 }}>
            {["HANDS", "FEET"].map((label, i) => (
              <div key={label} style={{ width: 380, backgroundColor: "#1c1c30", borderRadius: 24, padding: "28px 20px", textAlign: "center", opacity: card4[i], border: `3px solid rgba(244, 201, 93, ${0.3 + 0.7 * glow4})` }}>
                <div style={{ fontSize: 64, fontWeight: 900, color: GOLD }}>{label}</div>
                <div style={{ fontSize: 30, color: TEAL, marginTop: 10, fontWeight: 700 }}>WARM UP ↑</div>
                <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>heat escapes here</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: MOON, marginTop: 36, textAlign: "center", opacity: card4[2] }}>
            CORE ↓ COOLS DOWN
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 32, opacity: stamp4, textAlign: "center", lineHeight: 1.2 }}>
            HEAT DUMPS OUT
            <br />
            THROUGH YOUR SKIN
          </div>
          <Sub>Blood rushes to your hands and feet, dumping heat out of your core.</Sub>
        </Center>
      )}

      {/* S6 — bedroom range 60-67 F: TRUE proportions (50-80 F scale) */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE COOL BEDROOM ZONE</Kicker>
          <div style={{ fontSize: 100, fontWeight: 900, color: MOON, marginTop: 36, textAlign: "center", lineHeight: 1 }}>
            60–67°F
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: TEAL, marginTop: 8, textAlign: "center" }}>
            ABOUT 16–19°C
          </div>
          <div style={{ position: "relative", width: 860, height: 44, backgroundColor: "#1c1c30", borderRadius: 999, marginTop: 44, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: bandX6, top: 0, width: bandW6, height: 44, backgroundColor: TEAL, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: 860, fontSize: 28, color: GREY, marginTop: 12 }}>
            <span>50°F — TOO COLD</span>
            <span style={{ color: TEAL }}>THE ZONE</span>
            <span>80°F — TOO WARM</span>
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp6, textAlign: "center", lineHeight: 1.2 }}>
            A RANGE,
            <br />
            NOT ONE NUMBER
          </div>
          <Sub>Sleep experts suggest roughly 60 to 67 degrees Fahrenheit.</Sub>
        </Center>
      )}

      {/* S8 — the nightly recipe */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker>THE NIGHTLY RECIPE</Kicker>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 36, width: 860 }}>
            {["✓  COOL CORE", "✓  WARM HANDS & FEET", "✓  COOL ROOM"].map((label, i) => (
              <div key={label} style={{ backgroundColor: "#1c1c30", borderRadius: 16, padding: "20px 28px", textAlign: "center", opacity: check8[i], transform: `translateY(${(1 - check8[i]) * 24}px)` }}>
                <span style={{ fontSize: 38, fontWeight: 900, color: i === 1 ? GOLD : MOON }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 40, opacity: stamp8, textAlign: "center", lineHeight: 1.2 }}>
            EVERY SINGLE
            <br />
            NIGHT
          </div>
          <Sub>That is the recipe your body uses — without you ever noticing.</Sub>
        </Center>
      )}

      {/* S9 — PAYOFF: warm hands & feet are the best predictor */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker>THE WILDEST PART</Kicker>
          <div style={{ fontSize: 96, fontWeight: 900, color: GOLD, marginTop: 28, textAlign: "center", lineHeight: 1.1, transform: `scale(${pulse9})` }}>
            WARM HANDS
            <br />&amp; FEET
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, color: MOON, marginTop: 20, textAlign: "center" }}>
            BEAT EVERYTHING ELSE
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 28, width: 860 }}>
            {["1.  WARM HANDS & FEET  ★", "2.  CORE TEMPERATURE", "3.  HEART RATE", "4.  HOW TIRED YOU FEEL"].map((label, i) => (
              <div key={label} style={{ backgroundColor: i === 0 ? "#3a2f10" : "#1c1c30", borderRadius: 12, padding: "12px 24px", textAlign: "center", opacity: rank9[i] }}>
                <span style={{ fontSize: 30, fontWeight: 900, color: i === 0 ? GOLD : GREY }}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 56, fontWeight: 900, color: GOLD, marginTop: 28, opacity: stamp9, textAlign: "center", lineHeight: 1.2 }}>
            THE BEST PREDICTOR
            <br />
            OF FALLING ASLEEP
          </div>
          <div style={{ fontSize: 26, color: "#9a8fc4", marginTop: 18, textAlign: "center" }}>
            Kräuchi et al. 2000, Am. J. Physiol.
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
