"use client";

import { Breadcrumb } from "@components/breadcrumb";
import { Menu } from "@components/menu";
import {
  ActionIcon,
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Avatar,
  Box,
  Divider,
  Flex,
  Group,
  Menu as MantineMenu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLogout, useResourceParams } from "@refinedev/core";
import { IconBell, IconMoon, IconSearch, IconSun } from "@tabler/icons-react";
import React, { PropsWithChildren, useMemo } from "react";
import classes from "./admin-panel-layout.module.css";

const colorSchemaIcons = {
  light: IconMoon,
  dark: IconSun,
};

const AdminPanelLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [opened, { open: openSidebar, close: closeSidebar }] =
    useDisclosure(false);
  const { identifier } = useResourceParams();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const { mutate } = useLogout();

  const headerButtons = useMemo(
    () =>
      [
        { icon: IconBell, onClick() {} },
        {
          icon: colorSchemaIcons[colorScheme as "light" | "dark"],
          onClick: toggleColorScheme,
        },
      ].map(({ icon: Icon, onClick }, index) => (
        <ActionIcon
          key={index}
          onClick={onClick}
          size="sm"
          variant="transparent"
        >
          <Icon />
        </ActionIcon>
      )),
    [colorScheme]
  );

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
        height: 100,
      }}
      padding="md"
    >
      <AppShellHeader className={classes["glass-bg"]} withBorder={false} p="md">
        <Flex h="100%" justify="space-between" align="center">
          <Box visibleFrom="md">
            <Title tt="capitalize">{identifier}</Title>
            <Breadcrumb />
          </Box>
          <Group
            className={classes["header-right-part"]}
            wrap="nowrap"
            p={{ base: 0, md: "md" }}
            mb={{ base: "md", md: 0 }}
            flex={{ base: 1, md: 0.3 }}
          >
            <TextInput leftSection={<IconSearch />} variant="transparent" placeholder="search..." />
            {headerButtons}
            <MantineMenu>
              <MenuTarget>
                <Avatar radius="xl">MK</Avatar>
              </MenuTarget>
              <MenuDropdown>
                <MenuItem onClick={() => mutate()}>Logout</MenuItem>
              </MenuDropdown>
            </MantineMenu>
          </Group>
        </Flex>
      </AppShellHeader>
      <AppShellNavbar px="md">
        <Text
          mx="auto"
          my="xl"
          tt="uppercase"
          fw={700}
          size="calc(var(--mantine-font-size-md) * 1.75)"
        >
          horizon <Text span>free</Text>
        </Text>
        <Divider mb="md" />
        <Menu />
      </AppShellNavbar>
      <AppShellMain className={classes["glass-bg"]}>{children}</AppShellMain>
    </AppShell>
  );
};

export default AdminPanelLayout;
