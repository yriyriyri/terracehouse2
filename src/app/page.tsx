import StreamGrid from "@/components/StreamGrid";
import ChatPanel from "@/components/ChatPanel";

const MIC_HLS = "https://streams.towergroup.tv/macmini-mic/index.m3u8";

export default function Page() {
  return (
    <>
      <video
        className="bgVideo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <audio
        autoPlay
        controls
        playsInline
        preload="none"
        crossOrigin="anonymous"
      >
        <source src={MIC_HLS} type="application/vnd.apple.mpegurl" />
      </audio>

      <main className="page">
        <section className="mainRow">
          <StreamGrid />
          <ChatPanel />
        </section>

        <footer className="titleRow">
          <div className="bigTitle">Terrace House 2</div>
        </footer>
      </main>
    </>
  );
}