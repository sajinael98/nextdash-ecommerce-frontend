"use client";

import ResourceList from "@components/List";
import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@mantine/core";
const RolesListPage = () => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "role",
        header: "Role",
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

export default RolesListPage;
