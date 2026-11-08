import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Luna Learns to Be Brave — 216s kids video (6480 frames), 10 scenes,
// Pixar-style AI images with Ken Burns zoom/pan + big friendly text.
// 3 unique images reused with different zooms (image gen limit per turn).
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
  { start: 0, end: 648, img: "kids-luna/s1.png", text: "Meet Luna!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 648, end: 1296, img: "kids-luna/s2.png", text: "Luna is afraid of the dark!", fontSize: 66, zoomFrom: 1.12, zoomTo: 1.0 },
  { start: 1296, end: 1944, img: "kids-luna/s4.png", text: "Where is the path?", fontSize: 76, zoomFrom: 1.0, zoomTo: 1.15 },
  { start: 1944, end: 2592, img: "kids-luna/s2.png", text: "A tiny twinkle!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.1 },
  { start: 2592, end: 3240, img: "kids-luna/s1.png", text: "Thank you, Luna!", fontSize: 76, zoomFrom: 1.1, zoomTo: 1.0 },
  { start: 3240, end: 3888, img: "kids-luna/s4.png", text: "Luna lights the way!", fontSize: 76, zoomFrom: 1.05, zoomTo: 1.14 },
  { start: 3888, end: 4536, img: "kids-luna/s4.png", text: "La, la, la! Thank you, Luna!", fontSize: 62, zoomFrom: 1.14, zoomTo: 1.02 },
  { start: 4536, end: 5184, img: "kids-luna/s1.png", text: "Luna shines bright!", fontSize: 76, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 5184, end: 5832, img: "kids-luna/s2.png", text: "Brave means trying!", fontSize: 76, zoomFrom: 1.08, zoomTo: 1.0 },
  { start: 5832, end: 6480, img: "kids-luna/s4.png", text: "You can be brave too!", fontSize: 76, zoomFrom: 1.1, zoomTo: 1.0 },
];

export const KidsLuna: React.FC = () => {
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
    <AbsoluteFill style={{ backgroundColor: "#16224d" }}>
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
          Luna Learns to Be Brave
        </div>
      </div>
    </AbsoluteFill>
  );
};
