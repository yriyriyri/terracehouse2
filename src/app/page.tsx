import StreamGrid from "@/components/StreamGrid";
import ChatPanel from "@/components/ChatPanel";

export default function Page() {
  return (
    <main className="page">
      <section className="mainRow">
        <StreamGrid />
        <ChatPanel />
      </section>

      <footer className="titleRow">
        <div className="bigTitle">Terrace House 2</div>
      </footer>
    </main>
  );
}