"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@mantine/core";
import ResourceList from "../components/admin-panel/List";
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
