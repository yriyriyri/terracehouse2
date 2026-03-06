"use client";

import HlsTile from "@/components/HlsTile";
import { useMemo } from "react";

const STATUS_TOKEN_DEFAULT =
  "bc1qc09c2tsyw9rj5ema9rsvk3e7acr8dasagn8q0d";

  function EmptyTile() {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          Donate for more cameras!
        </span>
      </div>
    );
  }

export default function StreamGrid() {
  const streams = useMemo(
    () => [
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
      {
        key: "front-area-ir",
        label: "Front Area",
        src: "https://streams.towergroup.tv/front-area-ir/index.m3u8",
      },
      {
        key: "upstairs",
        label: "Upstairs",
        src: "https://streams.towergroup.tv/upstairs/index.m3u8",
      },
      {
        key: "downstairs",
        label: "Downstairs",
        src: "https://streams.towergroup.tv/downstairs/index.m3u8",
      },
      {
        key: "tv",
        label: "TV",
        src: "https://streams.towergroup.tv/tv/index.m3u8",
      },
      null,
      null,
    ],
    []
  );

  return (
    <div
      style={{
        alignSelf: "start",
        display: "inline-block",
        width: "clamp(100%, 55vw, 600px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
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
        {streams.map((s, i) =>
          s ? (
            <HlsTile key={s.key} src={s.src} />
          ) : (
            <EmptyTile key={`empty-${i}`} />
          )
        )}
      </div>
      <div className="statusBar">{STATUS_TOKEN_DEFAULT}</div>
    </div>
  );
}