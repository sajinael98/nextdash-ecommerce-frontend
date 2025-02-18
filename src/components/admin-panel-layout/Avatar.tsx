"use client";

import React, { Suspense } from "react";
import { Group, Avatar as MantineAvatar, Menu, Text } from "@mantine/core";
import { useGetIdentity, useLogout } from "@refinedev/core";

const Avatar = () => {
  const logout = useLogout();
  const user = useGetIdentity({
    queryOptions: {
      initialData: () => ({}),
    },
  });
  console.log();
  function logoutHandler() {
    logout.mutate();
  }

  return (
    <Menu>
      <Menu.Target>
        <Group gap="xs" styles={{ root: { cursor: "pointer" } }}>
          <MantineAvatar src={`/backend-api/files/${user.data?.image}`} />
          <Text tt="capitalize" fw={700} visibleFrom="md">
            {user.data?.fullName}
            <Text tt="lowercase" fz="xs" c="dimmed">
              {user.data?.username}
            </Text>
          </Text>
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Avatar;
