"use client"

import { isNotEmpty } from "@mantine/form";
import { Schema } from "../../components/admin-panel/dashboard-form/types";

export const warehouseSchema: Schema = {
  title: {
    type: "string",
    required: true,
    label: "Title",
    name: "title",
    validate: isNotEmpty("required"),
  },
  locationId: {
    type: "resource",
    resource: "locations",
    optionLabel: "address",
    label: "Location",
    name: "locationId",
    validate: isNotEmpty("required"),
    required: true,
  },
};
