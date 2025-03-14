"use client";

import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { LoaderProvider } from "@providers/loader-provider";
import { SessionProvider } from "next-auth/react";
import React, { PropsWithChildren } from "react";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <LoaderProvider>
      <ModalsProvider>
        <SessionProvider>
          <Notifications />
          {children}
        </SessionProvider>
      </ModalsProvider>
    </LoaderProvider>
  );
};

export default AppProvider;
