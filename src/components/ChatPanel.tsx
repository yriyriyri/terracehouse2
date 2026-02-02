"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
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
          padding: 0,
          background: "transparent",
          borderRadius: 0,
          overflow: "visible",
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gap: 10,
          minHeight: 0, 
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
            minHeight: 0,
            textAlign: "right",
          }}
        >
          {sorted.map((m) => (
            <ChatLine key={`${m.id}-${m.ts}`} m={m} />
          ))}
        </div>
      </div>

      <div
        style={{
          background: "#6F6F6F",
          borderRadius: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "1fr 44px",
          alignItems: "center",
          height: 44,
        }}
      >
        <input
          className="chatInput"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
          placeholder="say something"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: 0,
            background: "transparent",
            color: "rgba(255,255,255,0.9)",
            outline: "none",
            padding: "0 12px",
            fontSize: 13,
          }}
        />

        <button
          onClick={onSend}
          style={{
            height: "100%",
            width: 44,
            border: "none",
            borderRadius: 0,
            background: "transparent",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
          }}
          aria-label="send"
          title="send"
        >
          <Image
            src="/smiley.svg"
            alt="send"
            width={18}
            height={18}
            style={{ transform: "scale(1.4)" }}
          />
        </button>
      </div>
    </aside>
  );
}

function ChatLine({ m }: { m: ChatMessage }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <span style={{ color: "rgba(255,255,255,0.75)" }}>
        {formatTime(m.ts)}{" "}
      </span>
      <span style={{ color: "rgba(255,255,255,0.85)" }}>
        {renderTextWithLinks(m.text)}{" "}
      </span>
      <span style={{ color: "rgba(255,255,255,0.75)" }}>
        :{m.ip}
      </span>
    </div>
  );
}