"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react";

const ToggleColorSchemeButtons = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  return (
    <ActionIcon variant="subtle" onClick={toggleColorScheme}>
      {colorScheme === "light" ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
};

export default ToggleColorSchemeButtons;
