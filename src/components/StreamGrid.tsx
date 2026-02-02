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
    <div style={{ alignSelf: "start", display: "inline-block" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 2,
          height: "90vh",
          maxHeight: 635,
          aspectRatio: "4 / 3",
          width: "auto",
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