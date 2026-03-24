"use client";
import { useEffect, useState } from "react";

type LogMessage = {
  message?: string;
  [key: string]: any;
};

const STORAGE_KEY = "tabix_server_logs";
const MAX_STORAGE_CHARS = 1_250_000; // ~2.5MB (UTF-16 chars) = 50% limit approx

export default function LogPage() {
  const [messages, setMessages] = useState<LogMessage[]>([]);
  
  // Load existing logs from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      }
    } catch (err) {
      console.error("Failed to parse stored logs:", err);
    }
  }, []);

  const clearLogs = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

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

          let newLogs: LogMessage[] = [];

          for (const part of parts) {
            if (part.startsWith("data: ")) {
              const json = part.replace("data: ", "").trim();

              try {
                const parsed: LogMessage = JSON.parse(json);
                newLogs.push(parsed);
              } catch (err) {
                console.error("JSON parse error:", err);
              }
            }
          }

          if (newLogs.length > 0) {
            setMessages((prev) => {
              let updated = [...prev, ...newLogs];
              try {
                let serialized = JSON.stringify(updated);
                
                // Size Check: if serialized strings > ~2.5MB, drop the oldest 50%
                if (serialized.length > MAX_STORAGE_CHARS) {
                  const cutIndex = Math.floor(updated.length / 2);
                  updated = updated.slice(cutIndex);
                  serialized = JSON.stringify(updated);
                }
                
                localStorage.setItem(STORAGE_KEY, serialized);
              } catch (e: any) {
                console.error("Local storage save error / quota exceeded:", e);
                // Fallback hard prune if quota exceeded happens before our limit
                if (e.name === 'QuotaExceededError') {
                  const cutIndex = Math.floor(updated.length * 0.75); // remove 75%
                  updated = updated.slice(cutIndex);
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
                }
              }
              return updated;
            });
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1rem" }}>
           <div>
             <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.25rem" }}>
               Logs
             </h2>
             <p style={{ color: "var(--accent-muted)", margin: 0 }}>
               Real-time logs from the server. Useful for debugging and monitoring.
             </p>
           </div>
           <button 
             onClick={clearLogs}
             style={{
               padding: "0.5rem 1rem",
               background: "#ef4444",
               color: "white",
               border: "none",
               borderRadius: "6px",
               cursor: "pointer",
               fontWeight: "500",
               fontSize: "0.875rem",
               transition: "background 0.2s"
             }}
           >
             Clear Logs
           </button>
        </div>
        
        <div style={{ 
            height: "50vh", 
            overflowY: "scroll",
            background: "#1e1e1e",
            color: "#4ade80",
            padding: "1.5rem",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)"
         }}>
          {messages.length === 0 ? (
            <div style={{ color: "#a1a1aa" }}>Waiting for logs...</div>
          ) : (
            messages.map((message: LogMessage, index: number) => (
              <p key={index} style={{ margin: "0.25rem 0", wordBreak: "break-all" }}>
                <span style={{ color: "#a1a1aa", marginRight: "0.75rem" }}>
                  [{new Date().toLocaleTimeString()}]
                </span>
                {message.message || JSON.stringify(message)}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
