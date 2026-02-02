"use client";

import { RefObject, useEffect } from "react";
import Hls from "hls.js";

export default function useHls(ref: RefObject<HTMLVideoElement | null>, src: string) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    if (!Hls.isSupported()) return;

    const hls = new Hls({
      lowLatencyMode: false,
      enableWorker: true,
      maxBufferLength: 45,
      liveSyncDurationCount: 8,
      backBufferLength: 30,
    });

    hls.loadSource(src);
    hls.attachMedia(video);

    const onErr = (_evt: any, data: any) => {
      if (data?.fatal) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError();
        } else {
          hls.destroy();
        }
      }
    };

    hls.on(Hls.Events.ERROR, onErr);

    return () => {
      hls.off(Hls.Events.ERROR, onErr);
      hls.destroy();
    };
  }, [ref, src]);
}