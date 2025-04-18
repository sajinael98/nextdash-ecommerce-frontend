"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BaseRecord } from "@refinedev/core";
import ResourceList from "../components/admin-panel/List";

const LocationsListPage = () => {
  const columns = useMemo<ColumnDef<BaseRecord>[]>(() => [
    {
      accessorKey: "country",
      header: "Country"
    },
    {
      accessorKey: "city",
      header: "City"
    },
    {
      accessorKey: "address",
      header: "Address"
    }
  ], []);
  return <ResourceList columns={columns} />;
};

export default LocationsListPage;
