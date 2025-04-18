"use client";

import { accessControlProvider } from "@providers/access-control-provider";
import { auditLogProvider } from "@providers/audit-log-provider";
import { authProvider } from "@providers/auth-provider";
import { defaultDataProvider } from "@providers/data-provider";
import { notificationProvider } from "@providers/notification-provider";
import { Refine, ResourceProps } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import {
  IconBuildingWarehouse,
  IconHierarchy3,
  IconHome,
  IconLocation,
  IconMap,
  IconPercentage,
  IconPuzzle,
  IconReceipt,
  IconShirt,
  IconUser,
} from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";

const resources: ResourceProps[] = [
  {
    name: "dashboard",
  },
  {
    name: "home",
    list: "/app",
    meta: {
      icon: <IconHome />,
      label: "Home",
      parent: "dashboard",
    },
  },
  {
    name: "users",
    list: "/app/users",
    create: "/app/users/create",
    edit: "/app/users/:id",
    meta: {
      icon: <IconUser />,
      parent: "dashboard",
    },
  },
  {
    name: "roles",
    list: "/app/roles",
    create: "/app//roles/create",
    edit: "/app/roles/:id",
    meta: {
      icon: <IconHierarchy3 />,
      parent: "dashboard",
    },
  },
  {
    name: "geo",
    meta: {
      label: "GEO",
    },
  },
  {
    name: "countries",
    list: "/app/countries",
    create: "/app/countries/create",
    edit: "/app/countries/:id",
    meta: {
      parent: "geo",
      icon: <IconMap />,
    },
  },
  {
    name: "locations",
    list: "/app/locations",
    create: "/app/locations/create",
    edit: "/app/locations/:id",
    meta: {
      parent: "geo",
      icon: <IconLocation />,
    },
  },
  {
    name: "stock-management",
    meta: {
      label: "Stock Management",
      icon: <IconBuildingWarehouse />,
    },
  },
  {
    name: "warehouses",
    list: "/app/warehouses",
    create: "/app/warehouses/create",
    edit: "/app/warehouses/:id",
    meta: {
      parent: "stock-management",
      icon: <IconBuildingWarehouse />,
    },
  },
  {
    name: "variants",
    list: "/app/variants",
    create: "/app/variants/create",
    edit: "/app/variants/:id",
    meta: {
      parent: "stock-management",
      icon: <IconPuzzle />,
    },
  },
  {
    name: "items",
    list: "/app/items",
    create: "/app/items/create",
    edit: "/app/items/:id",
    meta: {
      parent: "stock-management",
      icon: <IconShirt />,
    },
  },
  {
    name: "uoms",
    list: "/app/uoms",
    create: "/app/uoms/create",
    edit: "/app/uoms/:id",
    meta: {
      parent: "stock-management",
      icon: <IconPercentage />,
      label: "UOM",
    },
  },
  {
    name: "buying-management",
  },
  {
    name: "purchase-transactions",
    list: "/app/purchase-transactions",
    create: "/app/purchase-transactions/create",
    edit: "/app/purchase-transactions/:id",
    meta: {
      parent: "buying-management",
      icon: <IconReceipt />,
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
        redirect: {
          afterCreate: false,
          afterEdit: false
        }
      }}
    >
      {children}
    </Refine>
  );
};

export default RefineProvider;
