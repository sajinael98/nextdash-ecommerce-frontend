import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface Permission {
    resource: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  }

  interface User extends DefaultUser {
    fullName: string;
    roles: string[];
    permissions: Permission[];
    token: string;
  }
}
