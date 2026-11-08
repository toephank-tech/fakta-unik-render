import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Milo Learns to Share — 60s kids test, 7 scenes, Pixar-style AI images
// with Ken Burns zoom/pan (CSS transform scale) + big friendly text.
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
  { start: 0, end: 240, img: "kids-milo/s1.png", text: "Meet Milo!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 240, end: 480, img: "kids-milo/s2.png", text: "Three shiny apples!", fontSize: 76, zoomFrom: 1.12, zoomTo: 1.0 },
  { start: 480, end: 750, img: "kids-milo/s3.png", text: "Pip is hungry!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.15 },
  { start: 750, end: 990, img: "kids-milo/s2.png", text: "Milo thinks... What can I do?", fontSize: 58, zoomFrom: 1.0, zoomTo: 1.1 },
  { start: 990, end: 1260, img: "kids-milo/s4.png", text: "Sharing is kind!", fontSize: 88, zoomFrom: 1.05, zoomTo: 1.14 },
  { start: 1260, end: 1530, img: "kids-milo/s4.png", text: "Yum, yum! They eat together!", fontSize: 66, zoomFrom: 1.14, zoomTo: 1.02 },
  { start: 1530, end: 1800, img: "kids-milo/s1.png", text: "Sharing makes everything better!", fontSize: 58, zoomFrom: 1.1, zoomTo: 1.0 },
];

export const KidsMilo: React.FC = () => {
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
            fontSize: 40,
            fontWeight: 800,
            fontFamily: "Arial, Helvetica, sans-serif",
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          }}
        >
          Milo Learns to Share
        </div>
      </div>
    </AbsoluteFill>
  );
};
