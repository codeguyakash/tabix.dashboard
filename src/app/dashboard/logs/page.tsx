"use client";
import { useEffect, useState } from "react";

export default function LogPage() {
  const [messages, setMessages] = useState<any>([]);
  useEffect(() => {
    const eventSource = new EventSource("https://d.codeguyakash.in/logs");

    eventSource.onmessage = (event) => {
      const parsed = JSON.parse(event.data);

      console.log(parsed);
      setMessages((prev: any) => [...prev, parsed]);
    };
    eventSource.onerror = (err) => {
      console.error("SE error", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <p style={{ color: "var(--accent-muted)" }}>
          Welcome back to your administration dashboard.
        </p>
        <div style={{ height: "50vh", overflowY: "scroll" }}>
          {messages.map((message: any, index: number) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
