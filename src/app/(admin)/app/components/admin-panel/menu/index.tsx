"use client";

import { NavLink, ScrollArea, Text } from "@mantine/core";
import { useMenu } from "@refinedev/core";
import Link from "next/link";
import { Fragment } from "react";

export const Menu = () => {
  const { menuItems } = useMenu();

  const items = menuItems.map(({ key, label, icon, list, children }, index) => {
    return (
      <Fragment key={key}>
        <Text fw={500} c="dimmed" fz="sm" mt={index === 0 ? undefined : "sm"}>
          {label}
        </Text>
        {children.map((child) => (
          <NavLink
            key={child.label}
            href={child?.list?.toString() ?? "/"}
            component={Link}
            leftSection={child.icon}
            label={child.label}
            fz="sm"
          />
        ))}
      </Fragment>
    );
  });

  return <ScrollArea>{items}</ScrollArea>;
};
