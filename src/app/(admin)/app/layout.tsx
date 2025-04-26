"use client";

import {
  Anchor,
  Box,
  Breadcrumbs,
  createTheme,
  Group,
  MantineProvider,
  Menu,
  Title,
} from "@mantine/core";
import AppProvider from "@providers/app-provider";
import { useBreadcrumb, useResourceParams } from "@refinedev/core";
import React, { PropsWithChildren, Suspense } from "react";
import AdminPanelLayout from "./components/admin-panel/admin-panel-layout";
import { DateInput } from "@mantine/dates";

const theme = createTheme({
  primaryColor: "yellow",
  primaryShade: 5,
  components: {
    Menu: Menu.extend({
      defaultProps: {
        withinPortal: true,
        withArrow: true,
        width: 200,
        position: "bottom-end",
      },
    }),
    DateInput: DateInput.extend({
      defaultProps: {
        clearable: true,
        valueFormat: "YYYY-MM-DD"
      }
    })
  },
});

const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { identifier } = useResourceParams();
  const breadcrumbs = useBreadcrumb();
  const links = breadcrumbs.breadcrumbs.map((link, index) => (
    <Anchor key={index}>{link.label}</Anchor>
  ));

  return (
    <Suspense>
      <MantineProvider theme={theme}>
        <AdminPanelLayout>
          <AppProvider>
            <Group align="flex-end" mb="md" grow>
              <Box id="page-title">
                <Title order={1} tt="capitalize">
                  {identifier?.replaceAll("-", " ")}
                </Title>
                <Breadcrumbs >{links}</Breadcrumbs>
              </Box>
              <Group justify="flex-end" id="page-actions"></Group>
            </Group>
            {children}
          </AppProvider>
        </AdminPanelLayout>
      </MantineProvider>
    </Suspense>
  );
};

export default DashboardLayout;
