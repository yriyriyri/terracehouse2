"use client";

import HlsTile from "@/components/HlsTile";
import { useEffect, useMemo, useState } from "react";

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
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedKey(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const streams = useMemo(
    () => [
      {
        key: "living-room",
        label: "Living Room",
        src: "https://streams.towergroup.tv/living-room/index.m3u8",
      },
      {
        key: "kitchen",
        label: "Kitchen",
        src: "https://streams.towergroup.tv/kitchen/index.m3u8",
      },
      {
        key: "dining-room",
        label: "Dining Room",
        src: "https://streams.towergroup.tv/dining-room/index.m3u8",
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
        key: "tv",
        label: "TV",
        src: "https://streams.towergroup.tv/tv/index.m3u8",
      },
      null,
      {
        key: "downstairs",
        label: "Downstairs",
        src: "https://streams.towergroup.tv/downstairs/index.m3u8",
      },
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
          position: "relative",
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
        {streams.map((s, i) => {
          if (!s) return <EmptyTile key={`empty-${i}`} />;

          const isSelected = selectedKey === s.key;
          const someSelected = selectedKey !== null;
          const isOtherTile = someSelected && !isSelected;

          return (
            <div
              key={s.key}
              onClick={() => setSelectedKey(isSelected ? null : s.key)}
              style={{
                width: isSelected ? "calc(100% - 8px)" : "100%",
                height: isSelected ? "calc(100% - 8px)" : "100%",
                cursor: "pointer",
                position: isSelected ? "absolute" : "relative",
                top: isSelected ? 4 : undefined,
                left: isSelected ? 4 : undefined,
                zIndex: isSelected ? 20 : 1,
                opacity: isOtherTile ? 0 : 1,
                pointerEvents: isOtherTile ? "none" : "auto",
              }}
            >
              <HlsTile src={s.src} />
            </div>
          );
        })}
      </div>

      <div className="statusBar">{STATUS_TOKEN_DEFAULT}</div>
    </div>
  );
}