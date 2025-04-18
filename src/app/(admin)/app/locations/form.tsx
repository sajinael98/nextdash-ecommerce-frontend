"use client";

import { useDataProvider } from "@refinedev/core";
import { getResouceValues } from "../../../../../lib/db";
import { Schema } from "../components/admin-panel/dashboard-form/types";
import ResourceForm from "../components/admin-panel/resource-form";
import { useMemo } from "react";

export const LocationForm = () => {
  const dataProvider = useDataProvider();
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
  return (
    <ResourceForm
      schema={locationSchema}
      change={{
        countryId: function (value, values, { setFieldValue }) {
          dataProvider()
            .getList({
              resource: "countries",
              filters: [{ field: "id", operator: "eq", value: value }],
              pagination: {
                current: 0,
                mode: "client",
                pageSize: 20,
              },
              meta: {
                extraParams: {
                  fields: "id,title",
                },
              },
            })
            .then((res) => {
              const data = res
              if (data.length) {
                setFieldValue("country", data[0].title);
              }
            });
        },
      }}
    />
  );
};
