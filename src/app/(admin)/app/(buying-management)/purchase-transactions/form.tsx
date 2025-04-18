"use client";

import dayjs from "dayjs";
import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";

const schema: Schema = {
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
        optionLabel: "title",
        view: true,
        filters(values) {
            return [
              {
                field: "hasSubItems",
                operator: "eq",
                value: "No",
              },
            ];
        },
      },
      uomId: {
        type: "query",
        label: "Uom",
        query(values) {
          if (values.itemId) {
            return `/items/${values.itemId}/uoms`;
          }
        },
        view: true,
      },
      uomFactor: {
        type: "number",
        label: "Uom Factor",
        visible(values) {
          return !!values.uomId;
        },
      },
      qty: {
        type: "number",
        label: "Qunatity",
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
       
      },
      qty: function (value, values, {setFieldValue}) {
        setFieldValue("total", value as number * values.price);
      },
      price: function (value, values, {setFieldValue}) {
        setFieldValue("total", value as number * values.qty);
      },
    },
  },
  total: {
    type: "number",
    label: "Total",
  },
};

const PurchaseTransactionForm = () => {
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
