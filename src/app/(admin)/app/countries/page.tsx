"use client";

import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { BaseRecord } from "@refinedev/core";
import ResourceList from "../components/admin-panel/List";

const CountriesListPage = () => {
  const columns = useMemo<ColumnDef<BaseRecord>[]>(() => [
    {
        accessorKey: "title",
        header: "Country"
    },
    {
        accessorKey: "code",
        header: "Code"
    }
  ], []);
  
  return <ResourceList columns={columns} />;
};

export default CountriesListPage;
