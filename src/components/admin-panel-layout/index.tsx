"use client";

import { Breadcrumb } from "@components/breadcrumb";
import { Menu } from "@components/menu";
import {
  ActionIcon,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Autocomplete,
  Avatar,
  Box,
  Container,
  Divider,
  Group,
  Menu as MantineMenu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useResourceParams } from "@refinedev/core";
import {
  IconAlertSquareRounded,
  IconBell,
  IconMoon,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";
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

  const headerButtons = useMemo(
    () =>
      [
        { icon: IconBell, onClick() {} },
        { icon: IconAlertSquareRounded, onClick() {} },
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
      padding="xl"
      layout="alt"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: {
          desktop: false,
          mobile: !opened,
        },
      }}
    >
      {/* <AppShellHeader p="xl" className={classes["glass-bg"]} withBorder={false}>
        <Group justify="space-between">
          <Box>
            <Breadcrumb />
            <Title>{identifier}</Title>
          </Box>
          <Group
            className={classes["header-right-part"]}
            w={{ base: "100%", md: "auto" }}
            justify=""
          >
            <Autocomplete
              placeholder="Search..."
              leftSection={<IconSearch />}
              variant="filled"
              radius="lg"
              flex="1"
            />
            <Group>
              {headerButtons}
              <MantineMenu width={200} position="bottom-end" withArrow>
                <MenuTarget>
                  <Avatar
                    styles={{ root: { cursor: "pointer" } }}
                    variant="filled"
                    color="var(--mantine-primary-color-filled)"
                    radius="xl"
                  >
                    MK
                  </Avatar>
                </MenuTarget>
                <MenuDropdown>
                  <MenuItem>Test</MenuItem>
                </MenuDropdown>
              </MantineMenu>
            </Group>
          </Group>
        </Group>
      </AppShellHeader> */}
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
      <AppShellMain
        className={classes["glass-bg"]}
        pt={{
          base: "calc(var(--mantine-spacing-lg) * 11)",
          md: "calc(var(--mantine-spacing-lg) * 7)",
        }}
      >
        {children}
      </AppShellMain>
    </AppShell>
  );
};

export default AdminPanelLayout;
