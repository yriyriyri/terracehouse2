"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const MIC_HLS = "https://streams.towergroup.tv/macmini-mic/index.m3u8";
const MIC_TOGGLE_ENABLED = false;

export default function MicAudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  if (!MIC_TOGGLE_ENABLED) {
    return null;
  }

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (audioRef.current.paused) {
        await audioRef.current.play(); 
      }

      audioRef.current.muted = !muted;
      setMuted(!muted);
    } catch (err) {
      console.error("Audio toggle failed:", err);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        muted
        playsInline
        preload="none"
        crossOrigin="anonymous"
        style={{ display: "none" }}
      >
        <source src={MIC_HLS} type="application/vnd.apple.mpegurl" />
      </audio>

      <button
        type="button"
        className="micLabel"
        onClick={toggleAudio}
        aria-label={muted ? "unmute" : "mute"}
        title={muted ? "unmute" : "mute"}
      >
        <Image
          src={muted ? "/volume-off.png" : "/volume-on.png"}
          alt=""
          width={20}
          height={20}
          style={{ display: "block", width: 20, height: 20 }}
        />
      </button>
    </>
  );
}
