"use client";

import { RefObject, useEffect } from "react";
import Hls from "hls.js";

export default function useHls(
  ref: RefObject<HTMLVideoElement | null>,
  src: string
) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let hls: Hls | null = null;
    let disposed = false;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("video.play() failed:", err);
      }
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;

      const onLoadedMetadata = () => {
        if (!disposed) void tryPlay();
      };

      const onCanPlay = () => {
        if (!disposed) void tryPlay();
      };

      video.addEventListener("loadedmetadata", onLoadedMetadata);
      video.addEventListener("canplay", onCanPlay);

      return () => {
        disposed = true;
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
        video.removeEventListener("canplay", onCanPlay);
        video.pause();
        video.removeAttribute("src");
        video.load();
      };
    }

    if (!Hls.isSupported()) return;

    hls = new Hls({
      lowLatencyMode: false,
      enableWorker: true,
      maxBufferLength: 45,
      liveSyncDurationCount: 8,
      backBufferLength: 30,
    });

    const onErr = (_evt: unknown, data: any) => {
      if (data?.fatal) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls?.startLoad();
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls?.recoverMediaError();
        } else {
          hls?.destroy();
        }
      }
    };

    const onManifestParsed = () => {
      if (!disposed) void tryPlay();
    };

    const onLevelLoaded = () => {
      if (!disposed && video.paused) void tryPlay();
    };

    hls.on(Hls.Events.ERROR, onErr);
    hls.on(Hls.Events.MANIFEST_PARSED, onManifestParsed);
    hls.on(Hls.Events.LEVEL_LOADED, onLevelLoaded);

    hls.attachMedia(video);
    hls.loadSource(src);

    return () => {
      disposed = true;
      hls?.off(Hls.Events.ERROR, onErr);
      hls?.off(Hls.Events.MANIFEST_PARSED, onManifestParsed);
      hls?.off(Hls.Events.LEVEL_LOADED, onLevelLoaded);
      video.pause();
      hls?.destroy();
    };
  }, [ref, src]);
}