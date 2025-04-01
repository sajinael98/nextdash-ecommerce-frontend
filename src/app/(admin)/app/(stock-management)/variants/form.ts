import { Schema } from "../../components/admin-panel/dashboard-form/types";

export const variantSchema: Schema = {
  title: {
    type: "string",
    label: "Variant",
    name: "title",
    required: true,
  },
  type: {
    type: "select",
    label: "Type",
    name: "type",
    required: true,
    data: [
      { label: "Normal", value: "normal" },
      { label: "Color", value: "color" },
    ],
  },
  values: {
    type: "array",
    label: "Values",
    name: "values",
    fullWidth: true,
    schema: {
      label: {
        type: "string",
        label: "Label",
        name: "label",
        view: true,
        required: true,
      },
      value: {
        type: "string",
        label: "Value",
        name: "value",
        view: true,
        required: true,
      },
    },
  },
};
