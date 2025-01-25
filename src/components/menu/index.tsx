"use client";

import {
  Group,
  ScrollArea,
  Text,
  ThemeIcon,
  UnstyledButton
} from "@mantine/core";
import { useMenu } from "@refinedev/core";
import { useRouter } from "next/navigation";

export const Menu = () => {
  const router = useRouter();
  const { menuItems, selectedKey } = useMenu();

  function redirectUser(path: string) {
    router.push(path);
  }

  const items = menuItems.map(({ name, meta, list = "" }) => {
    const flag = selectedKey === `/${name}`;
    return (
      <UnstyledButton
        key={name}
        onClick={() => redirectUser(list.toString())}
        w="100%"
        h={40}
        pl="xl"
        mb="xs"
        styles={{
          root: {
            borderRadius: "var(--mantine-radius-default)",
            ...(flag && {
              backgroundColor: "var(--mantine-primary-color-light)",
            }),
          },
        }}
      >
        <Group align="flex-end" gap={5}>
          <ThemeIcon variant="transparent">{meta?.icon}</ThemeIcon>
          <Text
            tt="capitalize"
            c="dimmed"
            {...(flag && { fw: 500, c: "light-dark(black, white)" })}
          >
            {name}
          </Text>
        </Group>
      </UnstyledButton>
    );
  });
  return <ScrollArea>{items}</ScrollArea>;
};
