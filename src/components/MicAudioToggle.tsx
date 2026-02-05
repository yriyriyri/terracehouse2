"use client";

import { useRef, useState } from "react";

const MIC_HLS = "https://streams.towergroup.tv/macmini-mic/index.m3u8";

export default function MicAudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

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

      <span className="micLabel" onClick={toggleAudio}>
        {muted ? "unmute" : "mute"}
      </span>
    </>
  );
}