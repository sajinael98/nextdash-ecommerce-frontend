"use client";

import { NavLink, ScrollArea, Text } from "@mantine/core";
import { useMenu } from "@refinedev/core";
import Link from "next/link";

export const Menu = () => {
  const { menuItems } = useMenu();

  const items = menuItems.map(({ key, label, icon, list, children }, index) => {
    const commonProps = {
      label: label,
      leftSection: icon,
    };

    if (children.length) {
      return (
        <>
          <Text fw={500} c="dimmed" fz="sm" mt={index === 0 ? undefined : "sm"}>
            {label}
          </Text>
          {children.map((child) => (
            <NavLink
              key={child.identifier}
              href={child?.list?.toString() ?? "/"}
              component={Link}
              leftSection={child.icon}
              label={child.label}
              fz="sm"
            />
          ))}
        </>
      );
    } else {
      return (
        <NavLink
          key={key}
          href={list?.toString() ?? ""}
          component={Link}
          {...commonProps}
        />
      );
    }
  });

  return <ScrollArea>{items}</ScrollArea>;
};
