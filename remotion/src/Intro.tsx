import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Intro 10 detik (300 frame @ 30fps), 1280x720.
// Judul meluncur masuk dengan spring, subjudul fade-in,
// bola aksen bergerak melintasi layar, dan bar progres tumbuh.
// Fade-out di 20 frame terakhir.
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const titleX = interpolate(titleSpring, [0, 1], [-640, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subtitleOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barWidth = interpolate(frame, [90, 260], [0, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const dotX = interpolate(frame, [0, durationInFrames], [-80, 1360], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dotY = 540 + Math.sin(frame / 12) * 40;

  const progress = frame / durationInFrames;

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0b1026 0%, #1b2a6b 60%, #2f6fed 100%)",
        opacity: fadeOut,
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: dotX,
          top: dotY,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "#ffcf3f",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 240,
          transform: `translateX(${titleX}px)`,
          opacity: titleOpacity,
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: 4 }}>
          REMOTION
        </div>
        <div
          style={{
            width: barWidth,
            height: 10,
            backgroundColor: "#ffcf3f",
            borderRadius: 5,
            marginTop: 8,
          }}
        />
        <div
          style={{
            fontSize: 42,
            marginTop: 28,
            opacity: subtitleOpacity,
            color: "#dbe4ff",
          }}
        >
          Video dibuat dengan kode
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: `${progress * 100}%`,
          height: 12,
          backgroundColor: "#ffcf3f",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 36,
          fontSize: 26,
          color: "#9fb3ff",
        }}
      >
        10 detik &middot; 720p &middot; React + Remotion
      </div>
    </AbsoluteFill>
  );
};
