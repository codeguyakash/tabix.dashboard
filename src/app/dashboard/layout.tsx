import { auth, signOut } from "@/auth";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "var(--sidebar-width)",
          borderRight: "1px solid var(--card-border)",
          background: "var(--background)",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 1.5rem",
          position: "fixed",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          <Image
            src={`logo.svg`}
            width={50}
            height={50}
            alt="logo"
            style={{ borderRadius: "0.5rem" }}
          />
          <span
            style={{
              fontWeight: "700",
              fontSize: "1.25rem",
              color: "var(--foreground)",
            }}
          >
            Tabix - Octotech
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            flex: 1,
          }}
        >
          <NavItem
            href="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Overview"
            active
          />
          <NavItem
            href="/dashboard/analytics"
            icon={<BarChart3 size={20} />}
            label="Analytics"
          />
          <NavItem
            href="/dashboard/staff"
            icon={<Users size={20} />}
            label="Staff Management"
          />
          <NavItem
            href="/dashboard/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1rem",
              borderRadius: "1rem",
              background: "var(--card-bg)",
              marginBottom: "1rem",
              border: "1px solid var(--card-border)",
            }}
          >
            <img
              src={
                session?.user?.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${session?.user?.name}`
              }
              alt="User"
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
            <div style={{ overflow: "hidden" }}>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {session?.user?.name}
              </p>
              <p style={{ fontSize: "0.75rem", color: "var(--accent-muted)" }}>
                Staff
              </p>
            </div>
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                background: "transparent",
                border: "none",
                color: "#ff4444",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                borderRadius: "0.75rem",
              }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          marginLeft: "var(--sidebar-width)",
          flex: 1,
          padding: "2rem 3rem",
          background: "var(--background)",
        }}
      >
        {/* Top Header */}
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3rem",
          }}
        >
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--accent-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search data..."
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "20px",
                padding: "0.6rem 1rem 0.6rem 2.8rem",
                color: "var(--foreground)",
                width: "300px",
                outline: "none",
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <ThemeToggle />
            <button
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--foreground)",
                cursor: "pointer",
              }}
            >
              <Bell size={20} />
            </button>
            <button
              style={{
                padding: "0 1.25rem",
                borderRadius: "2rem",
                background: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                fontWeight: "600",
                fontSize: "0.875rem",
                cursor: "pointer",
              }}
            >
              Create Report
            </button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
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
      {icon}
      {label}
    </Link>
  );
}
