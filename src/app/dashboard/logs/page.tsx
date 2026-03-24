"use client";
import axios from "axios";
import { useEffect, useState } from "react";

type LogMessage = {
  message?: string;
  [key: string]: any;
};

type ServerStatus = {
  status: string;
  service: string;
  serverId: string;
  serverName: string;
  pid: number;
  uptime: number;
  memory: number;
  timestamp: string;
};

const STORAGE_KEY = "tabix_server_logs";
const MAX_STORAGE_CHARS = 1_250_000;

export default function LogPage() {
  const [messages, setMessages] = useState<LogMessage[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);

  async function getServerStatus() {
    const res = await axios.post("/api/status");
    setServerStatus(res.data);
  }

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
                if (serialized.length > MAX_STORAGE_CHARS) {
                  const cutIndex = Math.floor(updated.length / 2);
                  updated = updated.slice(cutIndex);
                  serialized = JSON.stringify(updated);
                }

                localStorage.setItem(STORAGE_KEY, serialized);
              } catch (e: any) {
                console.error("Local storage save error / quota exceeded:", e);

                if (e.name === "QuotaExceededError") {
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

    getServerStatus();
    fetchStream();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <div>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.25rem",
              }}
            >
              Logs of{" "}
              {serverStatus?.serverName?.toUpperCase() || "Tabix Server"}
            </h2>

            <p style={{ color: "var(--accent-muted)", marginBottom: "1rem" }}>
              Real-time logs from the server. Useful for debugging and
              monitoring.
            </p>

            <div
              style={{
                borderRadius: "8px",
                fontSize: "0.9rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem",
                alignItems: "center",
                height: "50px",
                padding: "1rem",
                background: "#f3f4f6",

                border: "1px solid #e5e7eb",
              }}
            >
              <span>
                <strong>Status:</strong>{" "}
                {serverStatus?.status?.toUpperCase() || "-"}
              </span>
              <span>
                <strong>Service:</strong>{" "}
                {serverStatus?.service?.toUpperCase() || "-"}
              </span>
              <span>
                <strong>Server ID:</strong> {serverStatus?.serverId || "-"}
              </span>
              <span>
                <strong>PID:</strong> {serverStatus?.pid || "-"}
              </span>
              <span>
                <strong>Uptime:</strong> {Math.floor(serverStatus?.uptime || 0)}{" "}
                sec
              </span>
              <span>
                <strong>Memory:</strong>{" "}
                {serverStatus?.memory
                  ? (serverStatus.memory / 1024 / 1024).toFixed(2)
                  : 0}{" "}
                MB
              </span>
              <span>
                <strong>Timestamp:</strong>{" "}
                {serverStatus &&
                  new Date(serverStatus?.timestamp).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <button
            onClick={clearLogs}
            style={{
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "0.875rem",
              padding: "0.25rem 0.5rem",
              borderRadius: "6px",
              background: "#f3f4f6",
              position: "absolute",
              top: "1rem",
              right: "1.5rem",
              zIndex: 10,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Clear Logs
          </button>
          <div
            style={{
              height: "70vh",
              overflowY: "scroll",
              padding: "1.5rem",
              paddingTop: "1rem",
              borderRadius: "8px",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              lineHeight: "1.5",
              border: "1px solid #e5e7eb",
            }}
          >
            {messages.length === 0 ? (
              <div style={{ color: "#a1a1aa" }}>Waiting for logs...</div>
            ) : (
              messages.map((message: LogMessage, index: number) => {
                const text = message.message || JSON.stringify(message);
                let textColor = "inherit";
                if (text.includes("ERROR")) textColor = "#ef4444";
                else if (text.includes("WARN")) textColor = "#eab308";
                else if (text.includes("SUCCESS")) textColor = "#22c55e";
                else if (text.includes("INFO")) textColor = "#3b82f6";
                else if (text.includes("DEBUG")) textColor = "#a855f7";

                return (
                  <p
                    key={index}
                    style={{
                      margin: "0.25rem 0",
                      wordBreak: "break-all",
                      whiteSpace: "pre-wrap",
                      color: textColor,
                    }}
                  >
                    <span style={{ color: "#a1a1aa", marginRight: "0.75rem" }}>
                      [{new Date().toLocaleTimeString()}]
                    </span>
                    {text}
                  </p>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
