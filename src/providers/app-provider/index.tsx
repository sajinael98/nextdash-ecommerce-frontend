"use client";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { accessControlProvider } from "@providers/access-control-provider";
import { auditLogProvider } from "@providers/audit-log-provider";
import { authProvider } from "@providers/auth-provider";
import { defaultDataProvider } from "@providers/data-provider";
import { LoaderProvider } from "@providers/loader-provider";
import { notificationProvider } from "@providers/notification-provider";
import UiProvider from "@providers/ui-provider";
import { Refine, ResourceProps } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { IconHierarchy3, IconHome, IconUser } from "@tabler/icons-react";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

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
];

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <UiProvider>
      <LoaderProvider>
        <ModalsProvider>
          <SessionProvider>
            <Notifications />
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
          </SessionProvider>
        </ModalsProvider>
      </LoaderProvider>
    </UiProvider>
  );
};

export default AppProvider;
