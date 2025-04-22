"use client";

import { useMemo } from "react";
import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";
import { useCustom, useDataProvider } from "@refinedev/core";

const PurchaseTransactionForm = () => {
  const dataProvider = useDataProvider();
  const schema = useMemo<Schema>(
    () => ({
      transactionDate: {
        type: "date",
        label: "Date",

        default: new Date(),
      },
      transactionType: {
        type: "select",
        label: "Type",

        data: [
          { label: "Received", value: "received".toUpperCase() },
          { label: "Ordered", value: "ordered".toUpperCase() },
        ],
      },
      warehouseId: {
        type: "resource",
        label: "Warehouse",
        resource: "warehouses",
        optionLabel: "title",
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
              console.log(value);
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
      },
      total: {
        type: "number",
        label: "Total",
      },
    }),
    []
  );

  return (
    <ResourceForm
      schema={schema}
      change={{
        items: function (
          value,
          values,
          { setFieldError, setFieldValue, setValues }
        ) {
          setFieldValue(
            "total",
            value.reduce((total, item) => item.total + total, 0)
          );
        },
      }}
      confirmable
    />
  );
};

export default PurchaseTransactionForm;
