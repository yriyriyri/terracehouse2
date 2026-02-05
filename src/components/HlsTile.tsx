"use client";

import { useRef } from "react";
import useHls from "@/lib/useHls";

export default function HlsTile({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useHls(ref, src);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "black",
        outline: "3px solid rgba(0,0,0,0.0)",
      }}
    >
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
    </div>
  );
}