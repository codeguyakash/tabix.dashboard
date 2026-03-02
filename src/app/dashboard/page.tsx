import { TrendingUp, Users, Globe, Zap, ArrowUpRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div style={{ marginBottom: "2.5rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
          }}
        >
          Command Center
        </h1>
        <p style={{ color: "var(--accent-muted)" }}>
          Welcome back to your administration dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <StatCard
          title="Active Users"
          value="12,482"
          trend="+12%"
          icon={<Users size={24} />}
        />
        <StatCard
          title="Server Load"
          value="24.8%"
          trend="-2%"
          icon={<Zap size={24} />}
        />
        <StatCard
          title="Global Traffic"
          value="1.2M"
          trend="+5%"
          icon={<Globe size={24} />}
        />
        <StatCard
          title="Conversion"
          value="3.2%"
          trend="+0.8%"
          icon={<TrendingUp size={24} />}
        />
      </div>

      {/* Main Sections */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Activity Chart Area */}
        <div
          className="glass premium-gradient"
          style={{
            padding: "2rem",
            minHeight: "400px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h3 style={{ fontWeight: "600", color: "var(--foreground)" }}>
              System Activity
            </h3>
            <select
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--foreground)",
                padding: "0.4rem 0.8rem",
                borderRadius: "0.5rem",
                fontSize: "0.75rem",
              }}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* Placeholder for chart */}
          <div
            style={{
              height: "280px",
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              paddingBottom: "1rem",
            }}
          >
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 75, 85, 40].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: "var(--accent-muted)",
                  opacity: 0.3,
                  borderRadius: "4px",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                }}
                className="chart-bar"
              />
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div
          className="glass premium-gradient"
          style={{
            padding: "2rem",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "1rem",
          }}
        >
          <h3
            style={{
              fontWeight: "600",
              marginBottom: "1.5rem",
              color: "var(--foreground)",
            }}
          >
            Recent Alerts
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <AlertItem title="New staff onboarded" time="2m ago" />
            <AlertItem
              title="API Limit reached (node-3)"
              time="14m ago"
              urgent
            />
            <AlertItem title="Database backup completed" time="1h ago" />
            <AlertItem title="System update scheduled" time="3h ago" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  trend,
  icon,
}: {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
}) {
  const isUp = trend.startsWith("+");
  return (
    <div
      className="glass premium-gradient"
      style={{
        padding: "1.5rem",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div style={{ color: "var(--accent-muted)" }}>{icon}</div>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: "600",
            color: isUp ? "#4ade80" : "#fb7185",
            background: isUp
              ? "rgba(74, 222, 128, 0.1)"
              : "rgba(251, 113, 133, 0.1)",
            padding: "0.25rem 0.5rem",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          {trend}
          <ArrowUpRight
            size={12}
            style={{ transform: isUp ? "none" : "rotate(90deg)" }}
          />
        </div>
      </div>
      <div>
        <p
          style={{
            color: "var(--accent-muted)",
            fontSize: "0.875rem",
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "var(--foreground)",
          }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function AlertItem({
  title,
  time,
  urgent = false,
}: {
  title: string;
  time: string;
  urgent?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: urgent ? "#ff4444" : "var(--accent-muted)",
        }}
      />
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: "500",
            color: urgent ? "#ff4444" : "var(--foreground)",
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--accent-muted)" }}>
          {time}
        </p>
      </div>
    </div>
  );
}
