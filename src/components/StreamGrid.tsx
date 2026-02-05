"use client";

import HlsTile from "@/components/HlsTile";
import { useMemo } from "react";

const STATUS_TOKEN_DEFAULT =
  "bc1qc09c2tsyw9rj5ema9rsvk3e7acr8dasagn8q0d";

export default function StreamGrid() {
  const streams = useMemo(
    () => [
      {
        key: "front-area-ir",
        label: "Front Area",
        src: "https://streams.towergroup.tv/front-area-ir/index.m3u8",
      },
      {
        key: "dining-room",
        label: "Dining Room",
        src: "https://streams.towergroup.tv/dining-room/index.m3u8",
      },
      {
        key: "kitchen",
        label: "Kitchen",
        src: "https://streams.towergroup.tv/kitchen/index.m3u8",
      },
      {
        key: "living-room",
        label: "Living Room",
        src: "https://streams.towergroup.tv/living-room/index.m3u8",
      },
    ],
    []
  );

  return (
    <div style={{ alignSelf: "start", display: "inline-block", width: "clamp(100%, 55vw, 600px)",}}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 4,
          padding: 4,
          aspectRatio: "4 / 3",
          height: "auto",
          background: "rgba(100, 100, 100, 0.35)",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {streams.map((s) => (
          <HlsTile key={s.key} src={s.src} />
        ))}
      </div>  
    <div className="statusBar">{STATUS_TOKEN_DEFAULT}</div>
    </div>
  );
}