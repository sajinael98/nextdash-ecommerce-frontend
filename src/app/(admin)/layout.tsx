import { MantineProvider } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider
      theme={{
        primaryColor: "yellow",
        primaryShade: 5,
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default Layout;
