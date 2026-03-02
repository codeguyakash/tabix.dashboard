"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div
      style={{
        height: "100-vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "var(--font-geist-sans)",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 68, 68, 0.1)",
          padding: "2rem",
          borderRadius: "1.5rem",
          border: "1px solid rgba(255, 68, 68, 0.2)",
          maxWidth: "400px",
          backdropFilter: "blur(10px)",
        }}
      >
        <ShieldAlert
          size={64}
          color="#ff4444"
          style={{ marginBottom: "1.5rem" }}
        />
        <h1
          style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "700" }}
        >
          Access Denied
        </h1>
        <p
          style={{ color: "#a0a0a0", marginBottom: "2rem", lineHeight: "1.6" }}
        >
          This dashboard is restricted to Tabix staff only. Your email address
          does not have the required permissions.
        </p>
        <Link
          href="/login"
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#fff",
            color: "#000",
            textDecoration: "none",
            borderRadius: "0.75rem",
            fontWeight: "600",
            transition: "transform 0.2s",
          }}
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
