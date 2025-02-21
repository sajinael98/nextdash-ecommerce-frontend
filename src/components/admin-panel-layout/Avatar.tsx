"use client";

import {
  Group,
  Avatar as MantineAvatar,
  Menu,
  Skeleton,
  Text,
} from "@mantine/core";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { User } from "next-auth";

const Avatar = () => {
  const logout = useLogout();
  const userQuery = useGetIdentity<User>({
    queryOptions: {
      staleTime: 60 * 1000 * 60 * 24,
    },
  });

  function logoutHandler() {
    logout.mutate();
  }

  if (userQuery.isStale && userQuery.isFetching) {
    return (
      <Group>
        <Skeleton radius="50%" w={30} h={30} />
        <div>
          <Skeleton w={80} h={8} mb="xs" />
          <Skeleton w={80} h={5} />
        </div>
      </Group>
    );
  }
  return (
    <Menu>
      <Menu.Target>
        <Group gap="xs" styles={{ root: { cursor: "pointer" } }}>
          <MantineAvatar src={`/backend-api/files/${userQuery.data?.image}`} />
          <Text tt="capitalize" fw={700} visibleFrom="md">
            {userQuery.data?.fullName}
            <Text tt="lowercase" fz="xs" c="dimmed">
              {userQuery.data?.name}
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
