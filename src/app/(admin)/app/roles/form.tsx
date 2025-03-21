import { Schema } from "../components/admin-panel/dashboard-form/types";

export const roleSchema: Schema = {
  role: {
    type: "string",
    label: "Role",
    name: "role",
  },
  enabled: {
    type: "boolean",
    label: "Enabled",
    name: "enabled",
    default: true
  },
};
