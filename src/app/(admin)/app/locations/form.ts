"use client"

import { isNotEmpty } from "@mantine/form";
import { Schema } from "../components/admin-panel/dashboard-form/types";

export const locationSchema: Schema = {
  countryId: {
    label: "Country",
    type: "resource",
    resource: "countries",
    optionLabel: "title",
    name: "countryId",
    validate: isNotEmpty("required"),
  },
  city: {
    label: "City",
    type: "string",
    name: "city",
    dependsOn(values) {
      return !!values.countryId;
    },
    validate: isNotEmpty("required"),
  },
  address: {
    label: "Address",
    type: "string",
    name: "address",
    dependsOn(values) {
      return !!values.city;
    },
    validate: isNotEmpty("required"),
  },
};
