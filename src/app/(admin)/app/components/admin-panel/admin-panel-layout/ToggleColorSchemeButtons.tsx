"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect } from "react";

const ToggleColorSchemeButtons = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const [ready, { open }] = useDisclosure(false);
  // I used this technique to render this component when it becomes a client component
  useEffect(() => {
    open();
  }, []);

  if (!ready) {
    return;
  }
  return (
    <ActionIcon variant="subtle" onClick={toggleColorScheme}>
      {colorScheme === "light" ? <IconMoon /> : <IconSun />}
    </ActionIcon>
  );
};

export default ToggleColorSchemeButtons;
