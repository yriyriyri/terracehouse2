"use client";

import { useRef } from "react";
import useHls from "@/lib/useHls";

export default function HlsTile({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useHls(ref, src);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "black" }}>
      <video
        ref={ref}
        muted
        autoPlay
        playsInline
        controls={false}
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          background: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 8,
          bottom: 6,
          fontSize: 12,
          color: "rgba(255,255,255,0.8)",
          textShadow: "0 1px 2px rgba(0,0,0,0.8)",
          letterSpacing: 0.2,
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
    </div>
  );
}