"use client"

import { accessControlProvider } from "@providers/access-control-provider";
import { auditLogProvider } from "@providers/audit-log-provider";
import { authProvider } from "@providers/auth-provider";
import { defaultDataProvider } from "@providers/data-provider";
import { notificationProvider } from "@providers/notification-provider";
import { Refine, ResourceProps } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { IconHierarchy3, IconHome, IconUser } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";

const resources: ResourceProps[] = [
  {
    name: "home",
    list: "/app",
    meta: {
      icon: <IconHome />,
      label: "Home"
    },
  },
  {
    name: "users",
    list: "/app/users",
    create: "/app/users/create",
    edit: "/app/users/:id",
    meta: {
      icon: <IconUser />,
    },
  },
  {
    name: "roles",
    list: "/app/roles",
    create: "/app//roles/create",
    edit: "/app/roles/:id",
    meta: {
      icon: <IconHierarchy3 />,
    },
  },
];

const RefineProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Refine
      auditLogProvider={auditLogProvider}
      resources={resources}
      routerProvider={routerProvider}
      dataProvider={defaultDataProvider}
      authProvider={authProvider}
      accessControlProvider={accessControlProvider}
      notificationProvider={notificationProvider}
      options={{
        syncWithLocation: true,
        warnWhenUnsavedChanges: true,
        useNewQueryKeys: true,
        projectId: "sXyKYR-uoMAWV-NTZ337",
      }}
    >
      {children}
    </Refine>
  );
};

export default RefineProvider;
