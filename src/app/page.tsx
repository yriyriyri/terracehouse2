import StreamGrid from "@/components/StreamGrid";
import ChatPanel from "@/components/ChatPanel";
import MicAudioToggle from "@/components/MicAudioToggle";

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

      <main className="page">
        <section className="mainRow">
          <StreamGrid />
          <ChatPanel />
        </section>

        <footer className="titleRow">
          <div className="bigTitle">Terrace House 2</div>
          <MicAudioToggle />
        </footer>
      </main>
    </>
  );
}