"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import useChat, { ChatMessage } from "@/lib/useChat";

function formatTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function renderTextWithLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((p, i) => {
    if (p.startsWith("http://") || p.startsWith("https://")) {
      return (
        <a key={i} href={p} target="_blank" rel="noreferrer">
          {p}
        </a>
      );
    }
    return <span key={i}>{p}</span>;
  });
}

export default function ChatPanel() {
  const { connected, viewers, messages, send } = useChat({
    url: "wss://chat.towergroup.tv/ws",
  });

  const [text, setText] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [lockedToBottom, setLockedToBottom] = useState(true);

  const sorted = useMemo(() => {
    // messages already chronological, but keep safe:
    return [...messages].sort((a, b) => a.ts - b.ts);
  }, [messages]);

  useEffect(() => {
    if (!lockedToBottom) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [sorted, lockedToBottom]);

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 60;
    setLockedToBottom(nearBottom);
  }

  function onSend() {
    const t = text.trim();
    if (!t) return;
    send(t);
    setText("");
  }

  return (
    <aside
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "1fr auto",
        gap: 10,
      }}
    >
      <div
        style={{
          padding: 16,
          background: "rgba(0,0,0,0.12)",
          borderRadius: 6,
          overflow: "hidden",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.75)",
            fontSize: 12,
            letterSpacing: 0.2,
          }}
        >
          <div>{connected ? "connected" : "connecting…"}</div>
          <div>{typeof viewers === "number" ? `${viewers} online` : ""}</div>
        </div>

        <div
          ref={scrollRef}
          onScroll={onScroll}
          style={{
            overflowY: "auto",
            paddingRight: 6,
            fontSize: 12,
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {sorted.map((m) => (
            <ChatLine key={`${m.id}-${m.ts}`} m={m} />
          ))}
        </div>
      </div>

      <div
        style={{
          background: "rgba(0,0,0,0.14)",
          borderRadius: 6,
          padding: 10,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 10,
          alignItems: "center",
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          placeholder="write something..."
          style={{
            width: "100%",
            height: 40,
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.35)",
            background: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.85)",
            outline: "none",
            padding: "0 12px",
            fontSize: 13,
          }}
        />

        <button
          onClick={onSend}
          style={{
            height: 40,
            width: 44,
            borderRadius: 6,
            border: "1px solid rgba(0,0,0,0.35)",
            background: "rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.8)",
            cursor: "pointer",
            fontSize: 18,
          }}
          aria-label="send"
          title="send"
        >
          🙂
        </button>
      </div>
    </aside>
  );
}

function ChatLine({ m }: { m: ChatMessage }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <span style={{ color: "rgba(255,255,255,0.55)" }}>{m.ip}: </span>
      <span>{renderTextWithLinks(m.text)}</span>
      <span style={{ marginLeft: 8, color: "rgba(255,255,255,0.35)" }}>
        {formatTime(m.ts)}
      </span>
    </div>
  );
}