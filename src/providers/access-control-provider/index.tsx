"use client";

import { authProvider } from "@providers/auth-provider";
import { AccessControlProvider } from "@refinedev/core";

interface Permission {
  resource: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export const accessControlProvider: AccessControlProvider = {
  async can(props) {
    const user = await authProvider.getIdentity();

    // Superuser check
    if (user.id === 1) {
      return { can: true };
    }

    const { action, resource } = props;
    const { permissions }: { permissions: Permission[] } =
      await authProvider.getPermissions();

    // Find the permission for the specified resource
    const permission = permissions.find(
      (p) => p.resource.toLowerCase() === resource
    );

    // Return access based on permission
    return {
      can: permission ? permission[action] || false : false,
    };
  },
};
