"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Stream = {
  id: string;
  src: string;
};

const streams: Stream[] = [
  { id: "dining-room", src: "https://streams.towergroup.tv/dining-room/index.m3u8" },
  { id: "front-area-ir", src: "https://streams.towergroup.tv/front-area-ir/index.m3u8" },
  { id: "living-room", src: "https://streams.towergroup.tv/living-room/index.m3u8" },
  { id: "kitchen", src: "https://streams.towergroup.tv/kitchen/index.m3u8" },
];

function HlsVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Safari supports HLS natively
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: false,
        maxBufferLength: 45,
        liveSyncDurationCount: 8,
      });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [src]);

  return (
    <video
      ref={ref}
      muted
      autoPlay
      playsInline
      controls={false}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        background: "black",
      }}
    />
  );
}

export default function Page() {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        width: "100vw",
        height: "100vh",
        gap: "2px",
        background: "black",
      }}
    >
      {streams.map((s) => (
        <div key={s.id} style={{ position: "relative", width: "100%", height: "100%" }}>
          <HlsVideo src={s.src} />
          <div
            style={{
              position: "absolute",
              left: 8,
              bottom: 8,
              color: "white",
              fontSize: 12,
              opacity: 0.7,
              pointerEvents: "none",
            }}
          >
            {s.id}
          </div>
        </div>
      ))}
    </main>
  );
}