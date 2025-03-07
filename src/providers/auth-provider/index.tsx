"use client";
import { AuthProvider } from "@refinedev/core";
import { getSession, signIn, signOut } from "next-auth/react";

/**
 * Check out the Auth Provider documentation for detailed information
 * https://refine.dev/docs/api-reference/core/providers/auth-provider/
 **/
export const authProvider: AuthProvider = {
  login: async (params) => {
    await signIn("credentials", {
      ...params,
      redirect: false,
    });
    return {
      success: true, // or false if the login is not successful
      redirectTo: "/app",
    };
  },

  register: async (params) => {
    console.log("register", params);

    // TODO: send request to the API to login

    return {
      success: false, // or false if the register is not successful
      redirectTo: "/",
    };
  },

  check: async (params) => {
    const session = await getSession();
    
    if (session) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };
  },

  logout: async (params) => {
    await signOut();
    return {
      success: true, // or false if the logout is not successful
    };
  },

  forgotPassword: async (params) => {
    console.log("forgotPassword", params);

    // TODO: send request to the API to forgot password

    return {
      success: false, // or false if the forgot password is not successful
      redirectTo: "/update-password",
    };
  },

  updatePassword: async (params) => {
    console.log("updatePassword", params);

    // TODO: send request to the API to update password

    return {
      success: false, // or false if the update password is not successful
      redirectTo: "/login",
    };
  },

  getPermissions: async (params) => {
    const session = await getSession();
    return {
      permissions: session?.user.permissions,
      roles: session?.user.roles,
    };
  },

  getIdentity: async (params) => {
    const session = await getSession();
    return session?.user;
  },

  onError: async (params) => {
    // TODO: do something with the error

    return {
      logout: false, // or false if you want to continue
    };
  },
};
