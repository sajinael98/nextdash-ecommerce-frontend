"use client";

import { Breadcrumb } from "@components/breadcrumb";
import { Menu } from "@components/menu";
import {
  ActionIcon,
  AppShell,
  AppShellMain,
  AppShellNavbar,
  Box,
  Divider,
  Group,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useResourceParams } from "@refinedev/core";
import { IconBurger, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import React, { PropsWithChildren, Suspense } from "react";
import classes from "./admin-panel-layout.module.css";
import Avatar from "./Avatar";
import ToggleColorSchemeButtons from "./ToggleColorSchemeButtons";
import Logo from "./Logo";

const AdminPanelLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open: openSidebar, close: closeSidebar }] =
    useDisclosure(false);
  const { identifier } = useResourceParams();

  return (
    <AppShell
      layout="alt"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          desktop: false,
          mobile: !opened,
        },
      }}
      header={{
        height: 75,
      }}
      padding="md"
    >
      <AppShell.Header px="md">
        <Group h="100%" grow>
          <Group>
            <Box>
              <Title tt="capitalize" fz={{ base: "h2", md: "h1" }} order={1}>
                {identifier}
              </Title>
              <Breadcrumb />
            </Box>
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
