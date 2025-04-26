import { MantineProvider } from "@mantine/core";
import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export default Layout;
