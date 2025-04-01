"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BaseRecord } from "@refinedev/core";
import ResourceList from "../../components/admin-panel/List";

const VariantsListPage = () => {
  const columns = useMemo<ColumnDef<BaseRecord>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Variant",
      },
      {
        accessorKey: "type",
        header: "Type",
      },
    ],
    []
  );
  
  return <ResourceList columns={columns} />;
};

export default VariantsListPage;
