"use client";

import React, { useMemo } from "react";
import ResourceList from "../../components/admin-panel/List";
import { ColumnDef } from "@tanstack/react-table";

const PurchaseTransactionsListPage = () => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "voucher",
        header: "Voucher",
      },
      {
        accessorKey: "transaction_type",
        header: "Transaction",
      },
      {
        accessorKey: "transaction_date",
        header: "Date",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
    ],
    []
  );
  return <ResourceList columns={columns} />;
};

export default PurchaseTransactionsListPage;
