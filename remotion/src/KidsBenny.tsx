import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Benny Learns to Say Sorry — 180s kids video, 10 scenes, Pixar-style AI images
// with Ken Burns zoom/pan (CSS transform scale) + big friendly text.
// Images: b1 = Benny in meadow, b2 = building tower together, b3 = fallen tower.
// Scene 2 image generation failed, so 3 images are reused with different zooms.
type Scene = {
  start: number;
  end: number;
  img: string;
  text: string;
  fontSize: number;
  zoomFrom: number;
  zoomTo: number;
};

const SCENES: Scene[] = [
  { start: 0, end: 540, img: "kids-benny/b1.png", text: "Meet Benny!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 540, end: 1080, img: "kids-benny/b2.png", text: "Let's build a tall tower!", fontSize: 66, zoomFrom: 1.12, zoomTo: 1.0 },
  { start: 1080, end: 1620, img: "kids-benny/b2.png", text: "So tall! Wow!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.15 },
  { start: 1620, end: 2160, img: "kids-benny/b3.png", text: "Oh no! Crash!", fontSize: 88, zoomFrom: 1.05, zoomTo: 1.0 },
  { start: 2160, end: 2700, img: "kids-benny/b3.png", text: "Benny feels scared.", fontSize: 76, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 2700, end: 3240, img: "kids-benny/b3.png", text: "Accidents happen.", fontSize: 80, zoomFrom: 1.12, zoomTo: 1.02 },
  { start: 3240, end: 3780, img: "kids-benny/b3.png", text: "I'm sorry!", fontSize: 92, zoomFrom: 1.02, zoomTo: 1.1 },
  { start: 3780, end: 4320, img: "kids-benny/b2.png", text: "Let's build it again!", fontSize: 70, zoomFrom: 1.1, zoomTo: 1.0 },
  { start: 4320, end: 4860, img: "kids-benny/b2.png", text: "We build together!", fontSize: 76, zoomFrom: 1.0, zoomTo: 1.14 },
  { start: 4860, end: 5400, img: "kids-benny/b1.png", text: "Saying sorry is brave!", fontSize: 70, zoomFrom: 1.1, zoomTo: 1.0 },
];

export const KidsBenny: React.FC = () => {
  const frame = useCurrentFrame();
  const sceneIndex = SCENES.findIndex((s) => frame >= s.start && frame < s.end);
  const scene = SCENES[sceneIndex === -1 ? SCENES.length - 1 : sceneIndex];
  const local = frame - scene.start;
  const len = scene.end - scene.start;
  const scale = interpolate(local, [0, len], [scene.zoomFrom, scene.zoomTo]);
  const isLast = sceneIndex === SCENES.length - 1 || sceneIndex === -1;
  const fadeIn = interpolate(local, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = isLast
    ? 1
    : interpolate(local, [len - 12, len], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <AbsoluteFill style={{ backgroundColor: "#7ec850" }}>
      <AbsoluteFill style={{ opacity }}>
        <Img
          src={staticFile(scene.img)}
          style={{
            width: 1920,
            height: 1080,
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 110,
          display: "flex",
          justifyContent: "center",
          opacity,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            borderRadius: 44,
            padding: "18px 44px",
            color: "white",
            fontSize: scene.fontSize,
            fontWeight: 800,
            fontFamily: "Arial, Helvetica, sans-serif",
            textAlign: "center",
            maxWidth: 1700,
          }}
        >
          {scene.text}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity,
        }}
      >
        <div
          style={{
            backgroundColor: "#ff9f1c",
            borderRadius: 999,
            padding: "10px 34px",
            color: "white",
            fontSize: 36,
            fontWeight: 800,
            fontFamily: "Arial, Helvetica, sans-serif",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          Benny Learns to Say Sorry
        </div>
      </div>
    </AbsoluteFill>
  );
};
