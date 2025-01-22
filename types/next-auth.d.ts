import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
    token: string;
    roles: string[];
    permissions: string[];
  }
}
