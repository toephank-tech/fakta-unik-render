import { AbsoluteFill, useCurrentFrame } from "remotion";

// Unique Facts — LONG-FORM Slot 9 (#2): Your Brain Can't Feel Pain (LONG version of Ep.2 Short)
// 180s landscape 1920x1080, 30fps, 5400 frames. MOTION segments for the V3 combo:
// 9 EVEN scenes x 300 frames = 2700 frames. AI-video scenes are the ODD scenes
// (S1,S3,...,S17); this comp covers S2,S4,S6,S8,S10,S12,S14,S16,S18.
// LANDSCAPE SUBTITLE RULE (verified from earlier smoke frames):
// with MarginV 360 + font 60, subtitles occupy roughly y 560-720, so ALL motion
// content stays inside y 70-520 (Center padding "70px 140px 560px").
// NO Badge and NO Sub lines (the burned-in subtitle already carries the narration).
// Every scene: Kicker + one big visual + one stamp. Stamps appear EARLY (frame <= 60).
// TRUE proportions on all bars; qualitative scenes use no fake numbers.
// Palette: deep space navy / coral red (pain) / gold / cyan.
// FACTS (all verified 2026-11-08, see script_en.txt):
// - Brain tissue has NO nociceptors (BrainFacts.org/SfN); skin is packed with them.
// - Awake craniotomy: only scalp + outer layers numbed; exposed brain feels nothing.
// - Dagmar Turner played violin through awake brain surgery, King's College London, 2020.
// - Penfield 1930s, Montreal: mapped living cortex with a gentle electric probe —
//   motor strip moved the opposite hand, sensory strip gave tingling, visual area
//   flashes of light; temporal-lobe stimulation replayed old memories (first case 1934).
// - Headaches come from meninges, blood vessels, scalp — never the brain itself.
// - Meninges = three membranes (dura, arachnoid, pia); dura rich in nociceptors.
// - Migraine: trigeminal nerve sensitizes meningeal sensors (Burstein et al. 2011).
// - Dura stretch receptors track intracranial pressure — silently, without pain.
// - Phantom limb pain: the brain builds pain for a limb that is gone.
// - Some people are born unable to feel pain (CIP); injuries go unnoticed — dangerous.
// - Protection: skull + cerebrospinal fluid + meninges guard the brain; the alarm sits outside.
// - PAYOFF: the organ that creates every pain you have ever felt has never felt pain itself.

const BG = "#0a0a20";
const CORAL = "#ff6b5e";
const GOLD = "#f4c95d";
const CYAN = "#4dd8ff";
const VIOLET = "#b48cff";
const MOON = "#dfe8ff";

function Kicker(props: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ fontSize: 26, letterSpacing: 7, color: props.color || GOLD, fontWeight: 700, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

// Content lives in the UPPER portion only: y 70-520, well above the
// landscape subtitle zone (y ~560-720 at MarginV 360, font 60).
function Center(props: { children: React.ReactNode }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 140px 560px" }}>
      {props.children}
    </div>
  );
}

function Stamp(props: { children: React.ReactNode; color?: string; visible: boolean }) {
  return (
    <div style={{ fontSize: 44, fontWeight: 900, color: props.color || GOLD, marginTop: 18, opacity: props.visible ? 1 : 0, textAlign: "center", lineHeight: 1.2 }}>
      {props.children}
    </div>
  );
}

function Label(props: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 30, fontWeight: 800, color: MOON, marginTop: 8, textAlign: "center" }}>
      {props.children}
    </div>
  );
}

// One slow pulse per second: quick swell, slow relax.
function pulse(frame: number) {
  const phase = (frame % 30) / 30;
  return 1 + 0.06 * Math.pow(Math.max(0, Math.sin(phase * Math.PI * 2)), 2);
}

export const FactsBrainCantFeelPainLongMotion: React.FC = () => {
  const frame = useCurrentFrame();

  // ---- S2 (0-300): skin packed with nociceptors vs brain ZERO ----
  const s2 = frame;
  const grow2 = Math.min(1, s2 / 210);

  // ---- S4 (300-600): only scalp + outer layers numbed ----
  const s4 = frame - 300;

  // ---- S6 (600-900): Penfield 1930s mapping ----
  const s6 = frame - 600;
  const flash6 = Math.floor(s6 / 15) % 2 === 0;

  // ---- S8 (900-1200): temporal lobe — memories replay ----
  const s8 = frame - 900;
  const pop8 = Math.min(1, s8 / 180);

  // ---- S10 (1200-1500): three meninges layers light up ----
  const s10 = frame - 1200;
  const fill10 = Math.min(1, s10 / 210);

  // ---- S12 (1500-1800): dura pressure gauge (qualitative, no fake numbers) ----
  const s12 = frame - 1500;
  const fill12 = Math.min(1, s12 / 240);

  // ---- S14 (1800-2100): phantom limb — pain from a limb that is gone ----
  const s14 = frame - 1800;
  const fade14 = 1 - Math.min(1, s14 / 240) * 0.8;

  // ---- S16 (2100-2400): skull + fluid + meninges guard the brain ----
  const s16 = frame - 2100;
  const fill16 = Math.min(1, s16 / 210);

  // ---- S18 (2400-2700): payoff — never felt pain itself ----
  const s18 = frame - 2400;
  const pulse18 = pulse(s18);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, color: "white", fontFamily: "Arial, sans-serif" }}>

      {/* S2 — skin packed with nociceptors, brain ZERO */}
      {frame < 300 && (
        <Center>
          <Kicker color={CORAL}>PAIN SENSORS CALLED NOCICEPTORS</Kicker>
          <div style={{ display: "flex", gap: 120, marginTop: 20, alignItems: "flex-start" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: CORAL }}>YOUR SKIN</div>
              <div style={{ display: "flex", flexWrap: "wrap", width: 260, gap: 12, marginTop: 16, justifyContent: "center", opacity: grow2 }}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: CORAL }} />
                ))}
              </div>
              <Label>PACKED WITH SENSORS</Label>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: CYAN }}>YOUR BRAIN</div>
              <div style={{ fontSize: 130, fontWeight: 900, color: CYAN, lineHeight: 1, marginTop: 6 }}>0</div>
              <Label>NOT ONE SENSOR</Label>
            </div>
          </div>
          <Stamp color={CYAN} visible={s2 >= 60}>YOUR BRAIN HAS NONE. ZERO.</Stamp>
        </Center>
      )}

      {/* S4 — only the scalp and outer layers are numbed */}
      {frame >= 300 && frame < 600 && (
        <Center>
          <Kicker color={GOLD}>WHAT GETS NUMBED IN AWAKE SURGERY?</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 260, fontSize: 30, fontWeight: 800, color: MOON, textAlign: "right" }}>SCALP</div>
              <div style={{ flex: 1, height: 40, backgroundColor: "#1c2340", borderRadius: 999, display: "flex", alignItems: "center", paddingLeft: 20, fontSize: 26, fontWeight: 800, color: GOLD }}>NUMBED ✓</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 260, fontSize: 30, fontWeight: 800, color: MOON, textAlign: "right" }}>OUTER LAYERS</div>
              <div style={{ flex: 1, height: 40, backgroundColor: "#1c2340", borderRadius: 999, display: "flex", alignItems: "center", paddingLeft: 20, fontSize: 26, fontWeight: 800, color: GOLD }}>NUMBED ✓</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
              <div style={{ width: 260, fontSize: 30, fontWeight: 800, color: MOON, textAlign: "right" }}>THE BRAIN</div>
              <div style={{ flex: 1, height: 40, backgroundColor: "#1c2340", borderRadius: 999, display: "flex", alignItems: "center", paddingLeft: 20, fontSize: 26, fontWeight: 800, color: CORAL }}>NOTHING TO NUMB</div>
            </div>
          </div>
          <Stamp color={GOLD} visible={s4 >= 60}>NOTHING LEFT TO NUMB — NOTHING TO FEEL</Stamp>
        </Center>
      )}

      {/* S6 — Penfield 1930s: mapping the living brain */}
      {frame >= 600 && frame < 900 && (
        <Center>
          <Kicker color={VIOLET}>WILDER PENFIELD — THE 1930s, MONTREAL</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 22 }}>
            <div style={{ width: 130, height: 130, borderRadius: "50%", backgroundColor: flash6 ? GOLD : VIOLET, boxShadow: "0 0 30px rgba(180,140,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontWeight: 900, color: "#0a0a20" }}>🧠</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: GOLD }}>⚡ →</div>
            <div style={{ textAlign: "left", fontSize: 30, fontWeight: 800, color: MOON, lineHeight: 1.4 }}>
              A TINY PROBE<br />AWAKE PATIENTS<br />"WHAT DO YOU FEEL?"
            </div>
          </div>
          <Label>TOUCH A SPOT — THE PATIENT TELLS YOU WHAT IT DOES</Label>
          <Stamp color={VIOLET} visible={s6 >= 60}>HE MAPPED THE LIVING BRAIN</Stamp>
        </Center>
      )}

      {/* S8 — temporal lobe: old memories replay */}
      {frame >= 900 && frame < 1200 && (
        <Center>
          <Kicker color={CYAN}>STIMULATE THE TEMPORAL LOBE…</Kicker>
          <div style={{ display: "flex", gap: 18, marginTop: 22, opacity: pop8 }}>
            {["VOICES", "MUSIC", "CHILDHOOD"].map((t, i) => (
              <div key={i} style={{ width: 250, height: 110, borderRadius: 16, backgroundColor: "#1c2340", border: "4px solid " + (i === 0 ? CYAN : i === 1 ? GOLD : VIOLET), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 900, color: MOON }}>{t}</div>
            ))}
          </div>
          <Label>OLD MEMORIES REPLAY — AS IF HAPPENING AGAIN</Label>
          <Stamp color={CYAN} visible={s8 >= 60}>MEMORIES, SWITCHED ON BY A PROBE</Stamp>
        </Center>
      )}

      {/* S10 — three meninges layers */}
      {frame >= 1200 && frame < 1500 && (
        <Center>
          <Kicker color={CORAL}>THE MENINGES — THREE MEMBRANES AROUND YOUR BRAIN</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            {[{ n: "DURA MATER", c: CORAL, note: "TOUGHEST — RICH IN SENSORS" }, { n: "ARACHNOID", c: GOLD, note: "MIDDLE LAYER" }, { n: "PIA MATER", c: CYAN, note: "HUGS THE BRAIN" }].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, marginTop: i === 0 ? 0 : 12 }}>
                <div style={{ width: 260, fontSize: 28, fontWeight: 800, color: row.c, textAlign: "right" }}>{row.n}</div>
                <div style={{ width: 1100 * fill10, maxWidth: 640, height: 36, backgroundColor: row.c, borderRadius: 999, opacity: 0.55 + 0.45 * fill10 }} />
                <div style={{ fontSize: 24, fontWeight: 800, color: MOON }}>{row.note}</div>
              </div>
            ))}
          </div>
          <Stamp color={CORAL} visible={s10 >= 60}>WHEN THEY SWELL, THE ALARM FIRES</Stamp>
        </Center>
      )}

      {/* S12 — dura stretch sensors track pressure, silently, without pain */}
      {frame >= 1500 && frame < 1800 && (
        <Center>
          <Kicker color={GOLD}>YOUR BRAIN WATCHES ITS OWN PRESSURE</Kicker>
          <div style={{ marginTop: 20, width: 1100 }}>
            <div style={{ fontSize: 30, fontWeight: 800, color: MOON, textAlign: "center" }}>STRETCH SENSORS IN THE DURA MATER</div>
            <div style={{ position: "relative", width: 1100, height: 40, backgroundColor: "#1c2340", borderRadius: 999, marginTop: 16, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: 1100 * fill12, height: 40, backgroundColor: GOLD, borderRadius: 999 }} />
            </div>
            <div style={{ display: "flex", width: 1100, justifyContent: "space-between", marginTop: 10, fontSize: 26, fontWeight: 800, color: MOON }}>
              <span>LOW</span><span>PRESSURE RISING</span><span>HIGH</span>
            </div>
          </div>
          <Label>TRACKED EVERY SECOND — SILENTLY</Label>
          <Stamp color={GOLD} visible={s12 >= 60}>MONITORED — WITHOUT ANY PAIN</Stamp>
        </Center>
      )}

      {/* S14 — phantom limb: pain from a limb that is gone */}
      {frame >= 1800 && frame < 2100 && (
        <Center>
          <Kicker color={CORAL}>PAIN FROM NOTHING</Kicker>
          <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 22 }}>
            <div style={{ fontSize: 120, lineHeight: 1, opacity: fade14 }}>🦾</div>
            <div style={{ fontSize: 90, lineHeight: 1, color: CORAL }}>→</div>
            <div style={{ fontSize: 120, lineHeight: 1 }}>🧠</div>
          </div>
          <Label>THE LIMB IS GONE — THE PAIN IS BUILT IN THE BRAIN</Label>
          <Stamp color={CORAL} visible={s14 >= 60}>MANY AMPUTEES FEEL IT BURNING</Stamp>
        </Center>
      )}

      {/* S16 — skull + fluid + meninges guard the brain */}
      {frame >= 2100 && frame < 2400 && (
        <Center>
          <Kicker color={CYAN}>THREE GUARDS — NO SENSORS NEEDED INSIDE</Kicker>
          <div style={{ display: "flex", gap: 18, marginTop: 22, alignItems: "center" }}>
            <div style={{ width: 200, height: 200, borderRadius: "50%", border: "10px solid " + CYAN, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: CYAN, textAlign: "center", opacity: 0.4 + 0.6 * fill16 }}>SKULL</div>
            <div style={{ width: 170, height: 170, borderRadius: "50%", border: "10px solid " + GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: GOLD, textAlign: "center", opacity: 0.4 + 0.6 * fill16 }}>FLUID</div>
            <div style={{ width: 140, height: 140, borderRadius: "50%", border: "10px solid " + VIOLET, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 900, color: VIOLET, textAlign: "center", opacity: 0.4 + 0.6 * fill16 }}>MENINGES</div>
            <div style={{ fontSize: 100, lineHeight: 1 }}>🧠</div>
          </div>
          <Stamp color={CYAN} visible={s16 >= 60}>THE ALARM SITS OUTSIDE</Stamp>
        </Center>
      )}

      {/* S18 — PAYOFF: never felt pain itself (narration trimmed "Not once. Not ever." — the stamp carries it) */}
      {frame >= 2400 && frame < 2700 && (
        <Center>
          <Kicker color={VIOLET}>HERE IS THE WILDEST PART</Kicker>
          <div style={{ fontSize: 130, lineHeight: 1, marginTop: 14, transform: `scale(${pulse18})` }}>🧠</div>
          <Label>THE ORGAN THAT CREATES EVERY PAIN YOU HAVE EVER FELT</Label>
          <Stamp color={VIOLET} visible={s18 >= 60}>HAS NEVER FELT PAIN ITSELF — NOT ONCE. NOT EVER.</Stamp>
        </Center>
      )}
    </AbsoluteFill>
  );
};
