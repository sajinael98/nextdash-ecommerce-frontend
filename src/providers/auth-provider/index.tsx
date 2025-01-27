"use client";
import { AuthProvider } from "@refinedev/core";
import { signIn, signOut } from "next-auth/react";

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
      redirectTo: "/",
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
    console.log("check", params);

    // TODO: control if the user is logged in

    return {
      authenticated: false, // or false if the user is not authenticated
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
    console.log("getPermissions", params);

    // TODO: send request to the API to get permissions

    return {
      permissions: [],
    };
  },

  getIdentity: async (params) => {
    console.log("getIdentity", params);

    // TODO: send request to the API to get identity

    return {};
  },

  onError: async (params) => {
    // TODO: do something with the error

    return {
      logout: false, // or false if you want to continue
    };
  },
};
