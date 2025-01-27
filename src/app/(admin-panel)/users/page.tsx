"use client";

import ResourceList from "@components/List";
import { Anchor, Checkbox } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

const UserListPage = () => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "username",
        header: "Username"
      },
      {
        accessorKey: "accountInformation.email",
        header: "Email",
        cell: ({ getValue }) => (
          <Anchor href={`mailto:${getValue()}`}>{getValue() as string}</Anchor>
        ),
      },
      {
        accessorKey: "enabled",
        header: "Enabled",
        cell: ({ getValue }) => (
          <Checkbox checked={getValue() as boolean} readOnly />
        ),
      },
    ],
    []
  );
  return <ResourceList columns={columns} />;
};

export default UserListPage;
