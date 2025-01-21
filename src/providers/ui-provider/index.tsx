"use client"
import { createTheme, MantineProvider, Text } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const theme = createTheme({
  components: {
    Text: Text.extend({
      styles(theme, props, ctx) {
        
          return {

          }
      },
    })
  }
})
const UiProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};

export default UiProvider;
