"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BaseRecord } from "@refinedev/core";
import ResourceList from "../../components/admin-panel/List";

const ItemsListPage = () => {
  const columns = useMemo<ColumnDef<BaseRecord>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "enabled",
        header: "Enabled",
      },
    ],
    []
  );

  return <ResourceList columns={columns} />;
};

export default ItemsListPage;
