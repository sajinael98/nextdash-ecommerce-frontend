import { ComboboxItem } from "@mantine/core";
import {
  GetInputPropsReturnType,
  SetFieldError,
  SetFieldValue,
  SetValues,
} from "@mantine/form/lib/types";
import { BaseRecord, LogicalFilter } from "@refinedev/core";

export type SchemaFieldTypes =
  | "string"
  | "object"
  | "array"
  | "image"
  | "resource"
  | "boolean"
  | "number"
  | "select"
  | "date"
  | "query";

export interface BaseSchemaField {
  label: string;
  type: SchemaFieldTypes;
  required?: boolean;
  fullWidth?: boolean;
  description?: string;
  validate?: (value: unknown, values?: BaseRecord) => React.ReactNode;
  default?: unknown;
  visible?: (values: BaseRecord) => boolean;
  disabled?: (values: BaseRecord) => boolean;
}

export interface SchemaField extends BaseSchemaField {
  type: "string" | "number" | "boolean" | "date";
}

export interface SelectSchemaField extends BaseSchemaField {
  type: "select";
  data: ComboboxItem[];
}

export interface ResourceSchemaField extends BaseSchemaField {
  type: "resource";
  resource: string;
  optionLabel?: string;
  filters?: (values:BaseRecord) => LogicalFilter[]
}

export interface ObjectSchemaField extends BaseSchemaField {
  type: "object";
  schema: {
    [key: string]: Fields;
  };
}
export interface ArraySchemaField extends BaseSchemaField {
  type: "array";
  schema: {
    [key: string]: Fields & { view?: boolean };
  };
  change?: FieldChange;
}

export interface QuerySchemaField extends BaseSchemaField {
  type: "query";
  query: (values: BaseRecord) => string | undefined;
}

export type Fields =
  | BaseSchemaField
  | SelectSchemaField
  | ResourceSchemaField
  | ObjectSchemaField
  | ArraySchemaField
  | QuerySchemaField;

export interface Schema {
  [key: string]: Fields;
}

export interface AutoFormProps {
  loading?: boolean;
  submitting?: boolean;
  values?: BaseRecord;
  schema: Schema;
  onSubmit: (values: BaseRecord) => void;
  noSubmitButton?: boolean;
  readOnly?: boolean;
  change?: FieldChange;
}

export interface Field extends Omit<GetInputPropsReturnType, "error"> {
  name: string;
}
export interface SelectField extends Field, Pick<SelectSchemaField, "data"> {}
export interface ResourceField
  extends Field,
    Pick<ResourceSchemaField, "resource" | "optionLabel" | "filters"> {}
export interface ObjectField extends Field, Pick<ObjectSchemaField, "schema"> {}
export interface ArrayField
  extends Field,
    Pick<ArraySchemaField, "schema" | "change"> {}

export interface QueryField extends Field, Pick<QuerySchemaField, "query"> {}

export interface FieldChange {
  [key: string]: (
    value: unknown,
    values: BaseRecord,
    frm: {
      setFieldError: SetFieldError<BaseRecord>;
      setFieldValue: SetFieldValue<BaseRecord>;
      setValues: SetValues<BaseRecord>;
    }
  ) => void;
}
