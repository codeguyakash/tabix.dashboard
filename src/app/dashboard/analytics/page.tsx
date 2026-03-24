export default function Analytics() {
    return (
        <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>
                Analytics
            </h2>
            <p style={{ color: "var(--accent-muted)" }}>
                View detailed analytics and performance metrics.
            </p>

            <div
                style={{
                    marginTop: "2rem",
                    padding: "2rem",
                    background: "var(--card-background)",
                    borderRadius: "0.5rem",
                    border: "1px solid var(--card-border)",
                    textAlign: "center",
                    color: "var(--accent-muted)",
                }}
            >
                Charts and graphs will be displayed here.
            </div>
        </div>
    );
}