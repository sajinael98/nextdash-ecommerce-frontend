"use client";

import ReportView from "../../components/admin-panel/ReportView";

const StockRoomSummaryReport = () => {
  return (
    <ReportView
      reportName="StockRoomSummary"
      columns={() => [
        { accessorKey: "item", header: "Item" },
        { accessorKey: "warehouse", header: "Warehouse" },
        { accessorKey: "qtyIn", header: "Quantity(IN)" },
        { accessorKey: "qtyOut", header: "Quantity(Out)" },
        { accessorKey: "qtyBalance", header: "Quantity(Balance)" },
      ]}
      filters={{
        fromDate: {
          type: "date",
          label: "From Date",
          defaultValue: new Date(),
          required: true,
        },
        toDate: {
          type: "date",
          label: "To Date",
          defaultValue: new Date(),
          required: true,
        },
        item: {
          type: "resource",
          label: "Item",
          resource: "items",
        },
        warehouse: {
          type: "resource",
          label: "Warehouse",
          resource: "warehouses",
        },
      }}
    />
  );
};

export default StockRoomSummaryReport;
