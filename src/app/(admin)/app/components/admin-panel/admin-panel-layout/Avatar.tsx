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
import Link from "next/link";

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
    <Menu width={200} withinPortal>
      <Menu.Target>
        <Group gap="xs" styles={{ root: { cursor: "pointer" } }}>
          <MantineAvatar
            {...(userQuery.data?.image && {
              src: `/backend-api/files/${userQuery.data?.image}`,
            })}
          />
          <div>
            <Text tt="capitalize" fw={700} visibleFrom="md">
              {userQuery.data?.fullName}
            </Text>
            <Text tt="lowercase" fz="xs" c="dimmed">
              {userQuery.data?.name}
            </Text>
          </div>
        </Group>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} href="/app/user-profile">Profile</Menu.Item>
        <Menu.Divider/>
        <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Avatar;
