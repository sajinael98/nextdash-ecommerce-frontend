import { credentialsProvider } from "@providers/credentials-provider";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    // Set session max age to 30 minutes
    maxAge: 60 * 60, // 30 minutes in seconds
  },
  jwt: {
    // Set JWT max age to 30 minutes
    maxAge: 60 * 60, // 30 minutes in seconds
  },
  callbacks: {
    async jwt({ token, user, session,  trigger }) {
      if(trigger === "update"){
        token = {
          ...token,
          ...session
        }
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
  },
  providers: [credentialsProvider],
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
