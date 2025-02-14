import { RJSFSchema } from "@rjsf/utils";

export const roleSchema: RJSFSchema = {
  type: "object",
  required: ["role"],
  properties: {
    role: {
      type: "string",
      title: "Role",
    },
    enabled: {
      type: "boolean",
      title: "Enabled",

      default: true,
    },
    permissions: {
      type: "array",
      title: "Permissions",
      items: {
        type: "object",
        properties: {
          resource: {
            type: "string",
            format: "custom-url",
            url: "/resources",
            title: "Resource",
            view: true,
          },

          create: {
            view: true,
            type: "boolean",
            title: "Create",
          },
          read: {
            view: true,
            type: "boolean",
            title: "Read",
          },
          update: {
            view: true,
            type: "boolean",
            title: "Update",
          },
          delete: {
            view: true,
            type: "boolean",
            title: "Delete",
          },
        },
      },
    },
  },
};
