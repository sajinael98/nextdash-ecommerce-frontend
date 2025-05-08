import { BaseRecord } from "@refinedev/core";
import { AutoFormBuilderProps, Schema } from "../auto-form-builder/types";

export interface ResourceFormProps
  extends Pick<AutoFormBuilderProps, "change"> {
  schema: Schema;
  confirmable?: boolean;
  readOnly?: boolean;
  buttons?: { label: string; onClick: (values: BaseRecord) => void }[];
  menuItems?: { label: string; onClick: (values: BaseRecord) => void }[];
}
