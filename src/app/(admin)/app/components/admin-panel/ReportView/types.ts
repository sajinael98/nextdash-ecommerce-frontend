import { ComboboxData } from "@mantine/core";
import { Schema } from "../auto-form-builder/types";
import { ColumnDef } from "@tanstack/table-core";

// report view
export interface ReportViewProps {
  reportName: string;
  filters: Schema;
  columns: (
    filters: Record<string, unknown>,
    data: Record<string, unknown>[]
  ) => ColumnDef<any>[];
}
