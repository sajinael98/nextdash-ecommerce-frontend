"use client";

import {
  Checkbox,
  createTheme,
  MantineProvider,
  Menu,
  Modal
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

const UiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default UiProvider;
