"use client";

import { List } from "@mantine/core";
import { useMenu } from "@refinedev/core";
import { useRouter } from "next/navigation";
import classes from "./menu.module.css";

export const Menu = () => {
  const router = useRouter();
  const { menuItems, selectedKey } = useMenu();

  function redirectUser(path: string) {
    router.push(path);
  }

  const items = menuItems.map(({ name, meta, list = "" }) => (
    <List.Item
      key={name}
      icon={meta?.icon}
      className={classes["list-item"]}
      data-selected={selectedKey === `/${name}`}
      onClick={() => redirectUser(list.toString())}
    >
      {name}
    </List.Item>
  ));
  return <List>{items}</List>;
};
