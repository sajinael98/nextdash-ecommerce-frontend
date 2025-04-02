import { isNotEmpty } from "@mantine/form";
import { Schema } from "../../components/admin-panel/dashboard-form/types";

export const itemSchema: Schema = {
  title: {
    type: "string",
    label: "Title",
    name: "title",
    disabled(values) {
      return !!values.variantInformation.template;
    },
  },
  enabled: {
    type: "boolean",
    label: "Enabled",
    name: "enabled",
    default: true,
  },
  websiteInformation: {
    type: "object",
    name: "websiteInformation",
    label: "Website",
    fullWidth: true,
    schema: {
      published: {
        type: "boolean",
        label: "Published",
        name: "published",
      },
      publishedDate: {
        type: "date",
        label: "Published Date",
        name: "publishedDate",
        dependsOn(values) {
          return values.websiteInformation.published;
        },
      },
    },
  },
  variantInformation: {
    type: "object",
    label: "Variants Information",
    name: "variantInformation",
    fullWidth: true,
    schema: {
      hasSubItems: {
        type: "boolean",
        label: "Is Template",
        name: "hasSubItems",
        disabled(values) {
          return !values.isNew;
        },
      },
      template: {
        type: "string",
        label: "Parent Item",
        name: "template",
        dependsOn(values) {
          return values.variantInformation.template;
        },
        disabled(values) {
          return values.variantInformation.template;
        },
      },
      values: {
        type: "array",
        label: "Variants",
        name: "values",
        fullWidth: true,
        required: true,
        validate: (value, values) => {
          return values?.variantInformation.hasSubItems
            ? isNotEmpty("Enter at least one variant")(value)
            : null;
        },
        dependsOn(values) {
          return (
            values.variantInformation.hasSubItems ||
            values.variantInformation.template
          );
        },
        disabled(values) {
          return !values.isNew;
        },
        schema: {
          variantId: {
            type: "resource",
            label: "Variant",
            name: "variantId",
            resource: "variants",
            optionLabel: "title",
            view: true,
          },
          value: {
            type: "string",
            label: "Value",
            name: "value",
            view: true,
          },
        },
      },
    },
  },
  uoms: {
    type: "array",
    label: "Uom",
    name: "uoms",
    fullWidth: true,
    required: true,
    validate: (value) => {
      if (value.length === 0) {
        return "include one uom at least.";
      }
      if(value[0].value !== 1){ 
        return "first uom should have '1' as value"
      }
    },
    schema: {
      uomId: {
        type: "resource",
        label: "Uom",
        name: "uomId",
        resource: "uoms",
        optionLabel: "uom",
        view: true,
        required: true,
        validate: isNotEmpty("required"),
      },
      value: {
        type: "number",
        label: "Value",
        name: "value",
        view: true,
        required: true,
        validate: isNotEmpty("required"),
      },
    },
  },
};
