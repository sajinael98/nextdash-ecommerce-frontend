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
  },
};
