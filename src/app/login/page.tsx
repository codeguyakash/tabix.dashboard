import { signIn } from "@/auth";
import Image from "next/image";

export default function LoginPage() {
  const year: any = new Date().getFullYear();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "30%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid var(--card-border)",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            textAlign: "center",
            padding: "0 1.5rem",
          }}
        >
          <div style={{ marginBottom: "1.5rem" }}>
            <Image
              src={`logo.svg`}
              width={100}
              height={100}
              alt="logo"
              className="my-2 mx-auto"
            />
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                letterSpacing: "-0.05em",
                marginTop: "1rem",
                color: "#000",
              }}
            >
              Tabix Dashboard
            </h1>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              Staff Authentication Portal
            </p>
          </div>

          <div style={{ display: "grid", gap: "0rem" }}>
            {/* 
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/dashboard" });
              }}
            >
              <button
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "0.75rem",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#fff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  fontWeight: "500",
                  transition: "background 0.2s",
                }}
              >
                Continue with Google
              </button>
            </form> 
            */}

            {/* GITHUB LOGIN */}
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/dashboard" });
              }}
            >
              <button
                style={{
                  transformOrigin: "10% 70%",
                  color: "#fff",
                  backgroundColor: "#000",
                  border: "1px solid #000",
                  borderRadius: "19px",
                  flex: "1",
                  padding: "10px 5px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow:
                    "0 20px 68px #00000040, 0 1px 2px #0000004d, 0 0 #000, inset 0 2px 1px #ffffff80, inset 1px 1px .25px #ffffff4d",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  fontWeight: "100",
                  width: "75%",
                  margin: "0 auto",
                }}
              >
                Continue with GitHub
              </button>
            </form>
          </div>

          <p style={{ marginTop: "2.5rem", color: "#444", fontSize: "0.8rem" }}>
            Tabix © {year}
          </p>
        </div>
      </div>

      <div
        style={{
          width: "80%",
          flexShrink: 0,
          position: "relative",
          height: "100vh",
        }}
      >
        <Image
          src="/login_banner.webp"
          alt="Banner"
          fill
          style={{
            objectFit: "cover",
          }}
          priority
        />
      </div>
    </div>
  );
}
