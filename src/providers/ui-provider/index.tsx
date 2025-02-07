"use client";
import {
  Checkbox,
  createTheme,
  CSSVariablesResolver,
  MantineProvider,
  Menu,
  Modal,
} from "@mantine/core";
import React, { PropsWithChildren } from "react";

const theme = createTheme({
  components: {
    Menu: Menu.extend({
      defaultProps: {
        width: 200,
        position: "bottom-end",
        withArrow: true,
        withinPortal: true,
      },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        size: "sm",
        fz: "lg",
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        withinPortal: true,
      },
    }),
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  light: {
    "--mantine-dashboard-bg": "#fcfcfc ",
  },
  dark: {
    "--mantine-dashboard-bg": theme.colors.dark[8],
  },
  variables: {},
});

const UiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  );
};

export default UiProvider;
