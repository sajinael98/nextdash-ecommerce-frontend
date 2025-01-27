import { RJSFSchema } from "@rjsf/utils";

export const userSchema: RJSFSchema = {
  type: "object",
  properties: {
    personalInformation: {
      type: "object",
      title: "Personal Information",
      properties: {
        firstName: {
          type: "string",
          title: "First Name",
        },
        lastName: {
          type: "string",
          title: "Last Name",
        },
      },
    },
    accountInformation: {
      type: "object",
      title: "Account Information",
      properties: {
        username: {
          type: "string",
          title: "Username",
        },
        email: {
          type: "string",
          title: "Email",
        },
      },
    },
    roles: {
      type: "array",
      title: "Roles",
      items: {
        type: "object",
        properties: {
          roleId: {
            title: "Role",
            type: "number",
            resource: "roles",
            optionLabel: "role",
            view: true,
          },
        },
      },
    },
  },
};
