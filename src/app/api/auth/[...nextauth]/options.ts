import { credentialsProvider } from "@providers/credentials-provider";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    // Set session max age to 30 minutes
    maxAge: 60 * 60, // 30 minutes in seconds
  },
  jwt: {
    // Set JWT max age to 30 minutes
    maxAge: 60 * 60, // 30 minutes in seconds
  },
  callbacks: {
    jwt(params) {
      return params;
    },
    session(params) {
      return params.session;
    },
  },
  providers: [credentialsProvider],
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
