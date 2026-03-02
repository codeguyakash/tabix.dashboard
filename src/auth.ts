import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  callbacks: {
    async signIn({ user }) {
      const allowedEmails = process.env.STAFF_EMAILS?.split(",") || [];
      const userEmail = user.email?.toLowerCase();

      if (userEmail && allowedEmails.includes(userEmail)) {
        return true;
      }

      // If domain-based restriction is needed, you could add it here:
      // if (userEmail?.endsWith("@yourcompany.com")) return true

      return false; // Deny access
    },
    async authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
    error: "/unauthorized",
  },
});
