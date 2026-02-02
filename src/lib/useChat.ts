"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ChatMessage = {
  type: "msg";
  id: number;
  ip: string;
  text: string;
  ts: number;
};

type HelloMsg = { type: "hello"; ts: number; history: ChatMessage[] };
type ViewersMsg = { type: "viewers"; count: number; ts: number };
type ErrorMsg = { type: "error"; code: string; ts: number };

type Incoming = HelloMsg | ChatMessage | ViewersMsg | ErrorMsg;

export default function useChat({ url }: { url: string }) {
  const wsRef = useRef<WebSocket | null>(null);

  const [connected, setConnected] = useState(false);
  const [viewers, setViewers] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const send = useCallback((text: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: "msg", text }));
  }, []);

  useEffect(() => {
    let alive = true;

    function connect() {
      if (!alive) return;

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!alive) return;
        setConnected(true);
      };

      ws.onclose = () => {
        if (!alive) return;
        setConnected(false);
        // reconnect with backoff
        setTimeout(connect, 800);
      };

      ws.onerror = () => {
        try { ws.close(); } catch {}
      };

      ws.onmessage = (e) => {
        const parsed = safeParse(e.data);
        if (!parsed) return;

        const msg = parsed as Incoming;

        if (msg.type === "hello") {
          setMessages(msg.history ?? []);
          return;
        }

        if (msg.type === "viewers") {
          setViewers(msg.count);
          return;
        }

        if (msg.type === "msg") {
          setMessages((prev) => {
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          return;
        }

        if (msg.type === "error") {
          return;
        }
      };
    }

    connect();

    return () => {
      alive = false;
      setConnected(false);
      try { wsRef.current?.close(); } catch {}
      wsRef.current = null;
    };
  }, [url]);

  return { connected, viewers, messages, send };
}

function safeParse(data: any) {
  try {
    return JSON.parse(String(data));
  } catch {
    return null;
  }
}