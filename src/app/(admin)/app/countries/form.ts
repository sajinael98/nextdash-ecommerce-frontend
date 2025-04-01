"use client"

import { isNotEmpty } from "@mantine/form";
import { Schema } from "../components/admin-panel/dashboard-form/types";

export const countrySchema: Schema = {
  title: {
    name: "title",
    label: "Country",
    type: "string",
    required: true,
    validate: isNotEmpty("required"),
  },
  code: {
    name: "code",
    label: "Code",
    type: "string",
    dependsOn: (values) => !!values.title,
    required: true,
    validate: isNotEmpty("required"),
  },
};
