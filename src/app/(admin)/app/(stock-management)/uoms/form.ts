"use client"

import { isNotEmpty } from "@mantine/form";
import { Schema } from "../../components/admin-panel/dashboard-form/types";

export const uomSchema: Schema = {
  uom: {
    type: "string",
    label: "Uom",
    name: "uom",
    required: true,
    validate: isNotEmpty("required"),
  },
};
