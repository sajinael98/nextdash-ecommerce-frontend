"use client";

import { useMemo } from "react";
import { Schema } from "../components/admin-panel/dashboard-form/types";
import ResourceForm from "../components/admin-panel/resource-form";

export const LocationForm = () => {
  const locationSchema = useMemo<Schema>(
    () => ({
      countryId: {
        label: "Country",
        type: "resource",
        resource: "countries",
        required: true,
      },
      country: {
        type: "string",
        label: "Country",
        visible: () => false,
      },
      city: {
        label: "City",
        type: "string",
        required: true,
        visible(values) {
          return !!values.countryId;
        },
      },
      address: {
        label: "Address",
        type: "string",
        required: true,
        visible(values) {
          return !!values.city;
        },
      },
    }),
    []
  );
  return <ResourceForm schema={locationSchema} />;
};
