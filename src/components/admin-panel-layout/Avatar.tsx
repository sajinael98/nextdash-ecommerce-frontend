"use client";

import React, { Suspense } from "react";
import { Avatar as MantineAvatar, Menu } from "@mantine/core";
import { useLogout } from "@refinedev/core";

const Avatar = () => {
  const logout = useLogout();

  function logoutHandler() {
    logout.mutate();
  }

  return (
    <Menu>
      <Menu.Target>
        <MantineAvatar />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Avatar;
