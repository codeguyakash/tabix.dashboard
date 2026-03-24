"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type LogMessage = {
  message?: string;
  [key: string]: any;
};


export default function LogPage() {
  const [messages, setMessages] = useState<LogMessage[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStream = async () => {
      try {
        const res = await fetch("/api/logs", {
          signal: controller.signal,
        });


        console.log("Logs response:", res);

        
        if (!res.body) return;



        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            if (part.startsWith("data: ")) {
              const json = part.replace("data: ", "").trim();

              try {
                const parsed: LogMessage = JSON.parse(json);
                setMessages((prev) => [...prev, parsed]);
              } catch (err) {
                console.error("JSON parse error:", err);
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Stream error:", err);
        }
      }
    };

    fetchStream();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
          Logs
        </h2>
        <p style={{ color: "var(--accent-muted)" }}>
          Real-time logs from the server. Useful for debugging and monitoring.
        </p>
        <div style={{ height: "50vh", overflowY: "scroll" }}>
          {messages.map((message: LogMessage, index: number) => (
            <p key={index}>{message.message || JSON.stringify(message)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
