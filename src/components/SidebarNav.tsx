"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BarChart3, Settings } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Overview" },
    { href: "/dashboard/logs", icon: <LayoutDashboard size={20} />, label: "Logs" },
    { href: "/dashboard/analytics", icon: <BarChart3 size={20} />, label: "Analytics" },
    { href: "/dashboard/settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        flex: 1,
      }}
    >
      {navItems.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname?.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.875rem 1rem",
              borderRadius: "0.75rem",
              color: active ? "var(--foreground)" : "var(--accent-muted)",
              background: active ? "var(--card-bg)" : "transparent",
              textDecoration: "none",
              fontWeight: active ? "600" : "500",
              fontSize: "0.875rem",
              transition: "all 0.2s",
            }}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
