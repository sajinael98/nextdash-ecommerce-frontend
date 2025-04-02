import { ComboboxItem } from "@mantine/core";
import {
  FormValidateInput,
  GetInputPropsReturnType,
} from "@mantine/form/lib/types";
import { BaseRecord } from "@refinedev/core";

export type SchemaFieldTypes =
  | "string"
  | "object"
  | "array"
  | "image"
  | "resource"
  | "boolean"
  | "number"
  | "select"
  | "date";

export interface SchemaField {
  name: string;
  label: string;
  type: SchemaFieldTypes;
  fullWidth?: boolean;
  dependsOn?: (values: BaseRecord) => boolean;
  disabled?: (values: BaseRecord) => boolean;
  description?: string;
  required?: boolean;
  default?: any;
  schema?: Schema;
  view?: boolean;
  validate?: (value: unknown, values?: BaseRecord) => React.ReactNode;
  resource?: string | undefined;
  optionLabel?: string;
  data?: ComboboxItem[];
  readOnly?: boolean;
}

export interface Schema {
  [key: string]: SchemaField;
}

export interface AutoFormProps {
  loading?: boolean;
  submitting?: boolean;
  values?: BaseRecord;
  schema: Schema;
  onSubmit: (values: BaseRecord) => void;
  noSubmitButton?: boolean;
  readOnly?: boolean
}

export interface Field extends GetInputPropsReturnType {
  name: string;
  required: boolean;
  data?: ComboboxItem[];
}
