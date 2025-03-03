"use client"

import { accessControlProvider } from "@providers/access-control-provider";
import { auditLogProvider } from "@providers/audit-log-provider";
import { authProvider } from "@providers/auth-provider";
import { defaultDataProvider } from "@providers/data-provider";
import { notificationProvider } from "@providers/notification-provider";
import { Refine, ResourceProps } from "@refinedev/core";
import { IconBurger, IconChefHat, IconHierarchy3, IconHome, IconUser } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";
import routerProvider from "@refinedev/nextjs-router";

const resources: ResourceProps[] = [
  {
    name: "home",
    list: "/",
    meta: {
      icon: <IconHome />,
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/:id",
    meta: {
      icon: <IconUser />,
    },
  },
  {
    name: "roles",
    list: "/roles",
    create: "/roles/create",
    edit: "/roles/:id",
    meta: {
      icon: <IconHierarchy3 />,
    },
  },
  {
    name: "food menu",
    meta: {
      icon: <IconChefHat />,
    },
  },
  {
    name: "items",
    list: "/items",
    create: "/items/create",
    edit: "/items/:id",
    meta: {
      icon: <IconBurger />,
      parent: "food menu",
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
