import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// Unique Facts — Dreams: Your Brain Erases Your Dreams Every Morning
// MOTION-ONLY segments for the V3 combo: 5 scenes x 300 frames = 1500 frames.
// AI-video scenes (S1, S3, S6, S8) are separate clips; this comp covers
// S2, S4, S5, S7, S9. Every scene has continuous REAL movement (large
// moving elements, not just a pulsing dot): counters, flowing bubbles,
// draining gauges, rotating rings, drifting clouds, bobbing brains.
// Big numbers/counters are the animation itself, with at most one short
// kicker/headline line per scene. Night/dream palette (deep indigo +
// violet + gold moon) for series consistency.

const BG = "#0d0b1e";
const VIOLET = "#8b7cff";
const LAVENDER = "#c9b8ff";
const GOLD = "#f4c95d";
const PINK = "#ff9ecf";
const WHITE = "#f2f2f5";
const GREY = "#c9c9cf";
const CARD = "#1a1433";
const LINE = "#2e2456";

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
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, textAlign: "center", fontSize: 26, letterSpacing: 5, color: "#8f86b8", fontWeight: 700 }}>
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

export const FactsDreamsMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): counter 0 -> 6 dreams, then ~2 hours; drifting Z's ----
  const s2 = frame;
  const phase2 = Math.min(1, Math.floor(s2 / 150));
  const p2 = (s2 % 150) / 150;
  const dreams2 = Math.round(interpolate(s2, [15, 135], [0, 6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const hours2 = Math.round(interpolate(s2, [165, 285], [0, 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

  // ---- S4 (300-600): hippocampus gate shaking closed, dreams bouncing off, old memories flowing out ----
  const s4 = frame - 300;
  const gatePulse = 1 + 0.04 * Math.sin(s4 * 0.1);
  const gateShake = Math.sin(s4 * 0.4) * 2.5;
  const flow4 = (s4 % 60) / 60;

  // ---- S5 (600-900): norepinephrine gauge draining 100 -> 0 ----
  const s5 = frame - 600;
  const pct5 = Math.round(interpolate(s5, [20, 270], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const drop5 = interpolate(s5, [20, 270], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ---- S7 (900-1200): two bobbing brains, rotating ring + TPJ pulse rings, rising bubbles ----
  const s7 = frame - 900;
  const tpjPulse = 1 + 0.35 * Math.sin(s7 * 0.22);
  const zap7 = (s7 % 75) / 75;
  const ringRot7 = s7 * 0.8;
  const bob7a = Math.sin(s7 * 0.07) * 12;
  const bob7b = Math.sin(s7 * 0.07 + Math.PI) * 12;
  const bubbles7 = Array.from({ length: 10 }).map((_, i) => ({
    x: 60 + ((i * 173) % 960),
    size: 20 + ((i * 29) % 44),
    speed: 1.4 + (i % 3) * 0.6,
    offset: i * 110,
  }));

  // ---- S9 (1200-1500): closing moon breathing, drifting clouds, rising Z's, bold rings ----
  const s9 = frame - 1200;
  const ring9 = (s9 % 120) / 120;
  const moonGlow = 0.8 + 0.2 * Math.sin(s9 * 0.06);
  const moonBreathe = 1 + 0.05 * Math.sin(s9 * 0.05);
  const clouds9 = [0, 1, 2].map((i) => ({
    y: 340 + i * 430,
    speed: 1.1 + i * 0.5,
    w: 420 + i * 130,
    offset: i * 520,
  }));
  const zzz9 = Array.from({ length: 6 }).map((_, i) => ({
    x: 140 + ((i * 211) % 800),
    size: 40 + ((i * 19) % 36),
    speed: 0.8 + (i % 3) * 0.4,
    offset: i * 120,
  }));

  const stars = Array.from({ length: 26 }).map((_, i) => ({
    x: 40 + ((i * 173) % 1000),
    y: 60 + ((i * 251) % 1700),
    size: 4 + ((i * 13) % 10),
    phase: (i * 0.7) % (Math.PI * 2),
  }));

  const zzz = Array.from({ length: 8 }).map((_, i) => ({
    x: 120 + ((i * 197) % 840),
    size: 44 + ((i * 23) % 40),
    speed: 0.9 + (i % 3) * 0.4,
    offset: i * 90,
  }));

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>
      <Badge>UNIQUE FACTS • THE HUMAN BODY</Badge>

      {/* twinkling stars across all scenes */}
      {stars.map((st, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: st.x,
            top: st.y,
            width: st.size,
            height: st.size,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: 0.25 + 0.55 * Math.abs(Math.sin(frame * 0.03 + st.phase)),
          }}
        />
      ))}

      {/* S2 — how many dreams a night */}
      {frame < 300 && (
        <Center>
          <Kicker>EVERY SINGLE NIGHT</Kicker>
          {phase2 === 0 ? (
            <>
              <div style={{ fontSize: 220, fontWeight: 900, color: GOLD, marginTop: 30, textAlign: "center", lineHeight: 1 }}>
                {dreams2}
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>DREAMS A NIGHT</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 220, fontWeight: 900, color: VIOLET, marginTop: 30, textAlign: "center", lineHeight: 1 }}>
                ~{hours2} h
              </div>
              <div style={{ fontSize: 44, fontWeight: 800, marginTop: 10 }}>OF DREAMS A NIGHT</div>
            </>
          )}
          <div style={{ position: "relative", width: 940, height: 260, marginTop: 50, overflow: "hidden" }}>
            {zzz.map((z, i) => {
              const y = 230 - ((s2 * z.speed + z.offset) % 260);
              return (
                <div key={i} style={{ position: "absolute", left: z.x, top: y, fontSize: z.size, fontWeight: 900, color: LAVENDER, opacity: 0.35 + (i % 3) * 0.2 }}>
                  Z
                </div>
              );
            })}
          </div>
          <Sub>Four to six dreams — and you remember almost none.</Sub>
        </Center>
      )}

      {/* S4 — hippocampus not recording new memories */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={VIOLET}>NOT RECORDING</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 56 }}>
            {/* incoming dreams bouncing off the closed gate */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              {[0, 1, 2].map((i) => {
                const y = ((s4 * 4 + i * 70) % 210) - 40;
                return (
                  <div key={i} style={{ width: 74, height: 74, borderRadius: "50%", border: `3px solid ${PINK}`, backgroundColor: "rgba(255,158,207,0.25)", transform: `translateY(${y}px)`, opacity: 0.9 - i * 0.2 }} />
                );
              })}
              <div style={{ fontSize: 26, fontWeight: 800, color: PINK, marginTop: 6 }}>NEW DREAMS</div>
            </div>
            {/* gate shaking closed */}
            <div style={{ width: 90, height: 300, borderRadius: 20, backgroundColor: CARD, border: `4px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${gatePulse}) rotate(${gateShake}deg)` }}>
              <div style={{ fontSize: 64, lineHeight: 1 }}>🚫</div>
            </div>
            {/* old memories flowing out to the right */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              {[0, 1, 2].map((i) => {
                const x = ((flow4 + i / 3) % 1) * 140;
                return (
                  <div key={i} style={{ width: 74, height: 74, borderRadius: 14, border: `3px solid ${GOLD}`, backgroundColor: "rgba(244,201,93,0.2)", transform: `translateX(${x - 70}px)`, opacity: 0.9 - i * 0.2, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: GOLD }}>
                    ♥
                  </div>
                );
              })}
              <div style={{ fontSize: 26, fontWeight: 800, color: GOLD, marginTop: 6 }}>OLD MEMORIES</div>
            </div>
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, marginTop: 56, textAlign: "center", lineHeight: 1.25 }}>
            Busy replaying old ones.
          </div>
          <Sub>So the dream never gets saved.</Sub>
        </Center>
      )}

      {/* S5 — norepinephrine draining to zero */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker>THE INK IS MISSING</Kicker>
          <div style={{ fontSize: 40, fontWeight: 800, marginTop: 40 }}>NOREPINEPHRINE</div>
          <div style={{ fontSize: 150, fontWeight: 900, color: pct5 > 30 ? VIOLET : PINK, marginTop: 10 }}>
            {pct5}%
          </div>
          <div style={{ width: 820, height: 44, backgroundColor: "#241b45", borderRadius: 22, marginTop: 30, overflow: "hidden", border: `3px solid ${LINE}` }}>
            <div style={{ width: `${pct5}%`, height: "100%", backgroundColor: pct5 > 30 ? VIOLET : PINK, borderRadius: 22, transition: "none" }} />
          </div>
          <div style={{ position: "relative", width: 300, height: 200, marginTop: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* ink bottle emptying */}
            <div style={{ width: 130, height: 170, borderRadius: "18px 18px 40px 40px", border: `4px solid ${LAVENDER}`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${(1 - drop5) * 100}%`, backgroundColor: VIOLET, opacity: 0.85 }} />
            </div>
            <div style={{ position: "absolute", right: 10, top: 60, fontSize: 90, lineHeight: 1, opacity: 0.9 }}>✒️</div>
          </div>
          <Sub>The chemical that locks memories in — drops to almost zero.</Sub>
        </Center>
      )}

      {/* S7 — high vs low recallers */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          {/* rising dream bubbles behind the brains */}
          {bubbles7.map((b, i) => {
            const y = 1500 - ((s7 * b.speed + b.offset) % 1600);
            return (
              <div key={i} style={{ position: "absolute", left: b.x, top: y, width: b.size, height: b.size, borderRadius: "50%", border: `2px solid ${LAVENDER}`, backgroundColor: "rgba(139,124,255,0.12)", opacity: 0.7 }} />
            );
          })}
          <Kicker color={PINK}>SOME BRAINS CATCH THEM</Kicker>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 70, marginTop: 56 }}>
            {/* low recaller */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: 0.55, transform: `translateY(${bob7a}px)` }}>
              <div style={{ width: 260, height: 260, borderRadius: "50%", backgroundColor: CARD, border: `4px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130 }}>🧠</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: GREY, marginTop: 20 }}>LOW RECALLER</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>~2 dreams a month</div>
            </div>
            {/* high recaller */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `translateY(${bob7b}px)` }}>
              <div style={{ position: "relative", width: 260, height: 260, borderRadius: "50%", backgroundColor: CARD, border: `4px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 130, boxShadow: "0 0 60px rgba(244,201,93,0.45)" }}>
                {/* rotating dashed ring around the brain */}
                <div style={{ position: "absolute", left: -22, top: -22, width: 304, height: 304, borderRadius: "50%", border: "3px dashed rgba(244,201,93,0.8)", transform: `rotate(${ringRot7}deg)` }} />
                {/* TPJ pulse rings emanating from the gold dot */}
                {[0, 1].map((i) => {
                  const p = ((s7 % 90) / 90 + i / 2) % 1;
                  return (
                    <div key={i} style={{ position: "absolute", left: 173 - p * 70, top: 23 - p * 70, width: 60 + p * 140, height: 60 + p * 140, borderRadius: "50%", border: "3px solid rgba(244,201,93,0.9)", opacity: 0.9 * (1 - p) }} />
                  );
                })}
                🧠
                <div style={{ position: "absolute", top: 26, right: 30, width: 54, height: 54, borderRadius: "50%", backgroundColor: GOLD, transform: `scale(${tpjPulse})`, boxShadow: "0 0 30px rgba(244,201,93,0.95)" }} />
                {[0, 1].map((i) => {
                  const p = ((zap7 + i / 2) % 1);
                  return (
                    <div key={i} style={{ position: "absolute", top: -20 - p * 40, right: 10 + p * 30, fontSize: 34, opacity: 0.9 * (1 - p), lineHeight: 1 }}>⚡</div>
                  );
                })}
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, color: GOLD, marginTop: 20 }}>HIGH RECALLER</div>
              <div style={{ fontSize: 26, color: GREY, marginTop: 8 }}>~5 dreams a week</div>
            </div>
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, marginTop: 56, textAlign: "center", color: LAVENDER }}>
            TEMPOROPARIETAL JUNCTION
          </div>
          <Sub>Their attention hub stays more active — even asleep.</Sub>
        </Center>
      )}

      {/* S9 — closing moon */}
      {frame >= 1200 && (
        <Center>
          {/* drifting clouds */}
          {clouds9.map((c, i) => {
            const x = ((s9 * c.speed + c.offset) % 1500) - 250;
            return (
              <div key={i} style={{ position: "absolute", left: x, top: c.y, width: c.w, height: 90, borderRadius: 45, backgroundColor: "rgba(139,124,255,0.16)" }} />
            );
          })}
          {/* rising Z's */}
          {zzz9.map((z, i) => {
            const y = 1500 - ((s9 * z.speed + z.offset) % 1600);
            return (
              <div key={i} style={{ position: "absolute", left: z.x, top: y, fontSize: z.size, fontWeight: 900, color: LAVENDER, opacity: 0.4 }}>
                Z
              </div>
            );
          })}
          <div style={{ position: "relative", width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[0, 1].map((i) => {
              const p = (ring9 + i / 2) % 1;
              return (
                <div key={i} style={{ position: "absolute", width: 140 + p * 340, height: 140 + p * 340, borderRadius: "50%", border: `5px solid ${GOLD}`, opacity: 0.9 * (1 - p) }} />
              );
            })}
            <div style={{ transform: `scale(${moonBreathe})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Moon size={240} glow={moonGlow} />
            </div>
            <div style={{ position: "absolute", fontSize: 110, lineHeight: 1 }}>🌙</div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 800, marginTop: 44, textAlign: "center", lineHeight: 1.2 }}>
            Tonight, dream again.
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: GOLD, marginTop: 26 }}>Most of it will be gone.</div>
          <Sub>Unless you write it down.</Sub>
        </Center>
      )}
    </AbsoluteFill>
  );
};
