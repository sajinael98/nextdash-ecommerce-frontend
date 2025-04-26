import { ComboboxData } from "@mantine/core";
import {
  SetFieldError,
  SetFieldValue,
  SetValues,
} from "@mantine/form/lib/types";
import { BaseRecord } from "@refinedev/core";
import React, { PropsWithChildren } from "react";

// report view
export interface Schema {
  [key: string]: FieldTypes;
}
export interface AutoFormBuilderProps {
  values?: Record<string, any>;
  fields: Schema;
  fieldContainer: (
    props: BaseFieldConfig | SelectFieldConfig | ResourceFieldConfig,
    field: React.ReactNode
  ) => React.ReactNode;
  change?: FieldChange;
  onSubmit: (values: BaseRecord) => void;
}

// Fields
export interface BaseFieldConfig {
  type: "string" | "number" | "boolean" | "select" | "resource" | "date";
  defaultValue?: string | number | boolean | Date | [Date, Date];
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  description?: string;
  validate?: (value: unknown, values?: BaseRecord) => React.ReactNode;
  visible?: (values: BaseRecord) => boolean;
  disabled?: (values: BaseRecord) => boolean;
}

export type Types = BaseFieldConfig["type"];

export interface StringFieldConfig extends BaseFieldConfig {
  type: "string";
  defaultValue?: string;
  label: string;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  defaultValue?: number;
  label: string;
}

export interface BooleanFieldConfig extends BaseFieldConfig {
  type: "boolean";
  defaultValue?: boolean;
  label: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  defaultValue?: string;
  label: string;
}

export interface ResourceFieldConfig extends BaseFieldConfig {
  type: "resource";
  defaultValue?: string;
  label: string;
  resource: "string";
  optionLabel?: string;
}

export interface DateFieldConfig extends BaseFieldConfig {
  defaultValue?: Date;
}

export interface FieldProps {
  name: string;
}

export interface SelectFieldProps extends FieldProps {
  data: ComboboxData;
}

export interface ResourceFieldProps extends FieldProps {
  resource: string;
  optionLabel?: string;
}

type FieldTypes =
  | StringFieldConfig
  | NumberFieldConfig
  | BooleanFieldConfig
  | SelectFieldConfig
  | ResourceFieldConfig
  | DateFieldConfig;

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

export interface AutoFormBuilderHandle {
  submit: () => void;
  isDirty: boolean;
  values: Record<string, any>;
}

export type FieldComponentMap = {
  string: React.FC<FieldProps>;
  number: React.FC<FieldProps>;
  boolean: React.FC<FieldProps>;
  date: React.FC<FieldProps>;
  resource: React.FC<ResourceFieldProps>;
  select: React.FC<SelectFieldProps>;
};
