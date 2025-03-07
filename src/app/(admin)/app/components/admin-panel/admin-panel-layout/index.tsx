import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
  Box,
  Divider,
  Group,
  TextInput,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";
import classes from "./admin-panel-layout.module.css";
import Avatar from "./Avatar";
import Logo from "./Logo";
import ToggleColorSchemeButtons from "./ToggleColorSchemeButtons";
import { Menu } from "../menu";

const AdminPanelLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      header={{
        height: 75,
      }}
      padding="md"
    >
      <AppShell.Header px="md">
        <Group h="100%" grow>
          <Group>
            <Box>{/* <Breadcrumb /> */}</Box>
          </Group>

          <Group justify="flex-end" align="center">
            <TextInput
              visibleFrom="md"
              variant="transparent"
              placeholder="What're you looking for?"
              leftSection={<IconSearch />}
              defaultValue=""
            />

            <ToggleColorSchemeButtons />

            <Avatar />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShellNavbar px="md">
        <Logo />
        <Divider mb="md" />
        <Menu />
      </AppShellNavbar>
      <AppShellMain className={classes["glass-bg"]}>{children}</AppShellMain>
    </AppShell>
  );
};

export default AdminPanelLayout;
