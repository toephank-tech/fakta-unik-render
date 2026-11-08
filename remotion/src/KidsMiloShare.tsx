import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";

// Milo Learns to Share — 3-min long version, 12 scenes x 17.5s = 210s
// Pixar-style AI images + Ken Burns zoom/pan + big friendly text.
// Narration: female voice Aria (avocado_v2:MAI_01), speed 85, ~207s.
type Scene = {
  start: number;
  end: number;
  img: string;
  text: string;
  fontSize: number;
  zoomFrom: number;
  zoomTo: number;
};

const S5 = "kids-milo-share/media-generation-milo-s5-ball-0-3b500b9d-dee4-4bf4-aed7-cd37ee6e12a4.png";
const S8 = "kids-milo-share/media-generation-milo-s8-picnic-0-ca318bb9-02ec-4bc5-a70b-531d27c6cfc1.png";

const SCENES: Scene[] = [
  { start: 0, end: 525, img: "kids-milo-share/a1.png", text: "Meet Milo!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 525, end: 1050, img: "kids-milo-share/a2.png", text: "Three shiny apples!", fontSize: 76, zoomFrom: 1.12, zoomTo: 1.0 },
  { start: 1050, end: 1575, img: "kids-milo-share/a3.png", text: "Pip is hungry!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.15 },
  { start: 1575, end: 2100, img: "kids-milo-share/a4.png", text: "Sharing is kind!", fontSize: 88, zoomFrom: 1.05, zoomTo: 1.14 },
  { start: 2100, end: 2625, img: "kids-milo-share/a4.png", text: "Yum, yum! They eat together!", fontSize: 66, zoomFrom: 1.14, zoomTo: 1.02 },
  { start: 2625, end: 3150, img: S5, text: "Milo's favorite ball!", fontSize: 76, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 3150, end: 3675, img: "kids-milo-share/a1.png", text: "Benny has no ball.", fontSize: 76, zoomFrom: 1.12, zoomTo: 1.0 },
  { start: 3675, end: 4200, img: S5, text: "Playing together is fun!", fontSize: 72, zoomFrom: 1.1, zoomTo: 1.02 },
  { start: 4200, end: 4725, img: "kids-milo-share/a2.png", text: "Milo helps Pip!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.13 },
  { start: 4725, end: 5250, img: "kids-milo-share/a3.png", text: "Friends help friends!", fontSize: 76, zoomFrom: 1.13, zoomTo: 1.0 },
  { start: 5250, end: 5775, img: S8, text: "A sharing picnic!", fontSize: 88, zoomFrom: 1.0, zoomTo: 1.12 },
  { start: 5775, end: 6300, img: "kids-milo-share/a1.png", text: "Sharing makes everything better!", fontSize: 58, zoomFrom: 1.1, zoomTo: 1.0 },
];

export const KidsMiloShare: React.FC = () => {
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
