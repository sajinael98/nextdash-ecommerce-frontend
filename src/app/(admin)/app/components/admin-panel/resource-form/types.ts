import { BaseRecord } from "@refinedev/core";
import { AutoFormProps, Schema } from "../dashboard-form/types";

export interface ResourceFormProps extends Pick<AutoFormProps, "change"> {
  schema: Schema;
  confirmable?: boolean;
  readOnly?: boolean;
  buttons?: { label: string; onClick: (values: BaseRecord) => void }[];
  menuItems?: { label: string; onClick: (values: BaseRecord) => void }[];
}
