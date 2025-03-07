"use client";

import {
  NavLink,
  ScrollArea
} from "@mantine/core";
import { useMenu } from "@refinedev/core";
import Link from "next/link";

export const Menu = () => {
  const { menuItems} = useMenu();
 
  const items = menuItems.map(({ key, label, icon, list, children }) => {
    const commonProps = {
      label: label,
      leftSection: icon,
    };

    if (children.length) {
      return (
        <NavLink key={key} {...commonProps}>
          {children.map(({ key, label, icon, list }) => (
            <NavLink
              key={key}
              label={label}
              leftSection={icon}
              href={list?.toString() ?? ""}
              component={Link}
            ></NavLink>
          ))}
        </NavLink>
      );
    }else{
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
