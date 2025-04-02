"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BaseRecord } from "@refinedev/core";
import ResourceList from "../../components/admin-panel/List";

const UomListPage = () => {
  const columns = useMemo<ColumnDef<BaseRecord>[]>(
    () => [
      {
        accessorKey: "uom",
      },
    ],
    []
  );

  return <ResourceList columns={columns} />;
};

export default UomListPage;
