"use client";

import { hasLength, isInRange } from "@mantine/form";
import { useDataProvider } from "@refinedev/core";
import { useMemo } from "react";
import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";

const PurchaseTransactionForm = () => {
  const dataProvider = useDataProvider();
  const schema = useMemo<Schema>(
    () => ({
      transactionDate: {
        type: "date",
        label: "Date",
        default: new Date(),
        required: true,
      },
      transactionType: {
        type: "select",
        label: "Type",
        data: [
          { label: "PURCHASE", value: "PURCHASE" },
          { label: "REQUEST", value: "REQUEST" },
          { label: "RETURN", value: "RETURN" },
        ],
        required: true,
      },
      warehouseId: {
        type: "resource",
        label: "Warehouse",
        resource: "warehouses",
        required: true,
      },
      items: {
        type: "array",
        label: "Items",
        fullWidth: true,
        schema: {
          itemId: {
            type: "resource",
            label: "Item",
            resource: "items",
            filters(values) {
              return [
                {
                  field: "variantInformation.hasSubItems",
                  operator: "eq",
                  value: "false",
                },
              ];
            },
            required: true,
          },
          item: {
            type: "string",
            label: "Item",
            visible: () => false,
            view: true,
          },
          uomId: {
            type: "query",
            label: "Uom",
            query(values) {
              if (values.itemId) {
                return `/items/${values.itemId}/uoms`;
              }
            },
            required: true,
          },
          uom: {
            type: "string",
            label: "uom",
            view: true,
            visible: (values) => false,
          },
          uomFactor: {
            type: "number",
            label: "Uom Factor",
            visible(values) {
              return !!values.uomId;
            },
            disabled: () => true,
          },
          qty: {
            type: "number",
            label: "Qunatity",
            view: true,
            validate: isInRange({ min: 1 }),
          },
          stockQty: {
            type: "number",
            label: "Stock Qty",
            visible: (values) => !!values.qty,
            disabled: () => true,
          },
          price: {
            type: "number",
            label: "Price",
            view: true,
            validate: isInRange({ min: 1 }, "one item is required at least"),
          },
          total: {
            type: "number",
            label: "Total",
          },
        },
        change: {
          uomId: async function (value, values, { setFieldValue }) {
            let uomFactor = 0;
            if (value) {
              const data = await dataProvider().custom({
                method: "get",
                url: `/items/${values.itemId}/uoms/${value}`,
              });
              uomFactor = data.data as number;
            }
            setFieldValue("uomFactor", uomFactor);
          },
          qty: function (value, values, { setFieldValue }) {
            setFieldValue("total", (value as number) * values.price);
            setFieldValue("stockQty", (value as number) * values.uomFactor);
          },
          price: function (value, values, { setFieldValue }) {
            setFieldValue("total", (value as number) * values.qty);
          },
        },
        required: true,
        validate: hasLength({ min: 1 }),
      },
      total: {
        type: "number",
        label: "Total",
        disabled: () => true,
      },
    }),
    []
  );

  return (
    <ResourceForm
      schema={schema}
      change={{
        items: function (value, values, { setFieldValue }) {
          setFieldValue(
            "total",
            value.reduce((total, item) => item.total + total, 0)
          );
        },
      }}
    />
  );
};

export default PurchaseTransactionForm;
