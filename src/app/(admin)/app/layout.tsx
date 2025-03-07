"use client";


import { MantineProvider } from "@mantine/core";
import AppProvider from "@providers/app-provider";
import React, { PropsWithChildren, Suspense } from "react";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense>
      <MantineProvider>
        <AdminPanelLayout>
          <AppProvider>{children}</AppProvider>
        </AdminPanelLayout>
      </MantineProvider>
    </Suspense>
  );
};

export default DashboardLayout;
