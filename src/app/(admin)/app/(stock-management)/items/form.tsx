import { isNotEmpty } from "@mantine/form";
import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";

export const itemSchema: Schema = {
  title: {
    type: "string",
    label: "Title",
    required: true,
    disabled(values) {
      return !!values.variantInformation.template;
    },
  },
  enabled: {
    type: "boolean",
    label: "Enabled",
    default: true,
  },
  websiteInformation: {
    type: "object",
    label: "Website",
    fullWidth: true,
    schema: {
      published: {
        type: "boolean",
        label: "Published",
      },
      publishedDate: {
        type: "date",
        label: "Published Date",
      },
    },
  },
  variantInformation: {
    type: "object",
    label: "Variants Information",
    fullWidth: true,
    schema: {
      hasSubItems: {
        type: "boolean",
        label: "Is Template",

        disabled(values) {
          return !values.isNew;
        },
      },
      template: {
        type: "string",
        label: "Parent Item",
        disabled(values) {
          return !!values.variantInformation.templateId;
        },
        visible(values) {
          return !!values.variantInformation.templateId;
        },
      },
      values: {
        type: "array",
        label: "Variants",
        fullWidth: true,
        validate: (value, values) => {
          return values?.variantInformation.hasSubItems
            ? isNotEmpty("Enter at least one variant")(value)
            : null;
        },
        visible(values) {
          return (
            values.variantInformation.templateId ||
            values.variantInformation.hasSubItems
          );
        },
        disabled(values) {
          return !values.isNew;
        },
        schema: {
          variantId: {
            type: "resource",
            label: "Variant",
            resource: "variants",
            optionLabel: "title",
          },
          variant: {
            type: "string",
            label: "Variant",
            view: true,
            visible: () => false,
          },
          value: {
            type: "string",
            label: "Value",
            visible(values) {
              return !!values.value;
            },
          },
        },
        change: {
          variantId: function (value, values, { setFieldValue }) {
            if (!value) {
              return;
            }

           
          },
        },
      },
    },
  },
  uoms: {
    type: "array",
    label: "Uom",
    fullWidth: true,
    required: true,
    validate: (value) => {
      if (value.length === 0) {
        return "include one uom at least.";
      }
      if (value[0].value !== 1) {
        return "first uom should have '1' as value";
      }
    },
    disabled(values) {
        return !!values.variantInformation.templateId;
    },
    schema: {
      uomId: {
        type: "resource",
        label: "Uom",
        resource: "uoms",
        optionLabel: "uom",
        required: true,
      },
      uom: {
        type: "string",
        label: "Uom",
        view: true,
        visible: () => false,
      },
      value: {
        type: "number",
        label: "Value",
        view: true,
        required: true,
      },
    },
    change: {
      uomId: function (value, values, { setFieldValue }) {
        if (!value) {
          return;
        }

       
      },
    },
  },
};

export const itemForm = () => <ResourceForm schema={itemSchema} />;
