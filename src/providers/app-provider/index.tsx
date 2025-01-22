"use client";

import { authProvider } from "@providers/auth-provider";
import { dataProvider } from "@providers/data-provider";
import UiProvider from "@providers/ui-provider";
import { Refine, ResourceProps } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { IconChartBar, IconHome, IconShoppingCart } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";

const resources: ResourceProps[] = [
  {
    name: "Main Dashboard",
    list: "/",
    meta: {
      icon: <IconHome />,
    },
  },
  {
    name: "NFT MarketPlace",
    list: "/",
    meta: {
      icon: <IconShoppingCart />,
    },
  },
  {
    name: "Data Tables",
    list: "/",
    meta: {
      icon: <IconChartBar />,
    },
  },
];

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <UiProvider>
      <Refine
        resources={resources}
        routerProvider={routerProvider}
        dataProvider={dataProvider}
        authProvider={authProvider}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
          projectId: "sXyKYR-uoMAWV-NTZ337",
        }}
      >
        {children}
      </Refine>
    </UiProvider>
  );
};

export default AppProvider;
