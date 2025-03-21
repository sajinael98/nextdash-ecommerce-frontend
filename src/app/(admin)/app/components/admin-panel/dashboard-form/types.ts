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
  | "number";

export interface SchemaField {
  name: string;
  label: string;
  type: SchemaFieldTypes;
  fullWidth?: boolean;
  dependsOn?: string;
  disabled?: string;
  description?: string;
  required?: boolean;
  default?: any;
  schema?: Schema;
  view?: boolean;
  validate?: (value: unknown) => React.ReactNode;
  resource?: string | undefined;
  optionLabel?: string;
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
}

export interface Field extends GetInputPropsReturnType {
  name: string;
  required: boolean;
}
