"use client"

import { isNotEmpty } from "@mantine/form";
import { Schema } from "../components/admin-panel/dashboard-form/types";

export const countrySchema: Schema = {
  title: {
    label: "Country",
    type: "string",
    required: true,
    validate: isNotEmpty("required"),
  },
  code: {
    label: "Code",
    type: "string",
    required: true,
    validate: isNotEmpty("required"),
  },
};
