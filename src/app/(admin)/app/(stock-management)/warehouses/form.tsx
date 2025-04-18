"use client";

import { useDataProvider } from "@refinedev/core";
import { getResouceValues } from "../../../../../../lib/db";
import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";

export const warehouseSchema: Schema = {
  title: {
    type: "string",
    label: "Title",
    required: true,
  },
  locationId: {
    type: "resource",
    label: "Location",
    resource: "locations",
    optionLabel: "title",
    required: true,
  },
  location: {
    type: "string",
    label: "Location",
    visible: () => false,
  },
};

export const WarehouseForm = () => {
  const dataProvider = useDataProvider();
  return (
    <ResourceForm
      schema={warehouseSchema}
      change={{
        locationId: function (value, values, { setFieldValue }) {
          if (!value) {
            return;
          }
          dataProvider()
            .getList({
              resource: "locations",
              filters: [{ field: "id", operator: "eq", value: value }],
              meta: {
                extraParams: {
                  fields: "title"
                }
              }
            })
            .then((data) => {
              console.log(data)
              if(data?.length){
                setFieldValue("location", data[0].title);
              }
            });
        },
      }}
    />
  );
};
