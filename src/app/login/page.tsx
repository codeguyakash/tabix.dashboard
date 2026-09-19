import { signIn } from "@/auth";
import Image from "next/image";
import styles from "./login.module.css";

export default function LoginPage() {
  const year = new Date().getFullYear();

  return (
    <main className={styles.loginPage}>
      <section className={`${styles.authPanel} dots-patterns`}>
        <div className={styles.authContent}>
          <div className={styles.brandBlock}>
            <Image
              src={`logo.svg`}
              width={100}
              height={100}
              alt="logo"
              className={styles.logo}
            />
            <h1 className={styles.title}>
              Tabix Dashboard
            </h1>
            <p className={styles.subtitle}>
              Staff Authentication Portal
            </p>
          </div>

          <div className={styles.loginActions}>
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
              <button className="custom-button">Continue with GitHub</button>
            </form>
          </div>

          <p className={styles.copyright}>
            Copyright &copy; <span suppressHydrationWarning>{year}</span> Tabix.
            All rights reserved.
          </p>
        </div>
      </section>

      <section className={styles.imagePanel}>
        <Image
          src="/banner.jpg"
          alt="Banner"
          fill
          className={styles.bannerImage}
          priority
        />
      </section>
    </main>
  );
}
