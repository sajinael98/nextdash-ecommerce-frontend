"use client";

import ResourceList from "@components/admin-panel/List";
import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

const ItemsListPage = () => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "itemName",
        header: "Item Name",
      },
      {
        accessorKey: "defaultSize",
        header: "Default Size",
      },
      {
        accessorKey: "itemImage",
        header: "Item Image",
      },
    ],
    []
  );
  return <ResourceList columns={columns} />;
};

export default ItemsListPage;
