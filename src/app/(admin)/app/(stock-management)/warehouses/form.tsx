"use client";

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
  return (
    <ResourceForm
      schema={warehouseSchema}
    />
  );
};
