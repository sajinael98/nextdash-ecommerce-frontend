"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BaseRecord } from "@refinedev/core";
import ResourceList from "../../components/admin-panel/List";

const WarehousesListPage = () => {
  const columns = useMemo<ColumnDef<BaseRecord>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Warehouse",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
    ],
    []
  );

  return <ResourceList columns={columns} />;
};

export default WarehousesListPage;
