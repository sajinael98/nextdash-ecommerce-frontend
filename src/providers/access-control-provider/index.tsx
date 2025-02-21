"use client";

import { authProvider } from "@providers/auth-provider";
import { AccessControlProvider } from "@refinedev/core";
import { Permission } from "next-auth";

export const accessControlProvider: AccessControlProvider = {
  async can(props) {
    // Check if getIdentity exists
    if (!authProvider.getIdentity) {
      throw new Error("authProvider.getIdentity is not defined");
    }

    const user = (await authProvider.getIdentity()) as any;

    // Superuser check
    if (user.id === 1) {
      return { can: true };
    }

    const { action, resource } = props;

    // Check if getPermissions exists
    if (!authProvider.getPermissions) {
      throw new Error("authProvider.getPermissions is not defined");
    }

    const { permissions } = (await authProvider.getPermissions()) as {
      permissions: Permission[];
    };

    // Find the permission for the specified resource
    const permission = permissions.find(
      (p) => p.resource.toLowerCase() === resource
    ) as Permission;

    // Return access based on permission
    return {
      can: permission
        ? permission[action as "create" | "read" | "update" | "delete"] || false
        : false,
    };
  },
};
