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
        profileImage: {
          type: "string",
          title: "Image",
          widget: "image",
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
        enabled: {
          title: "Enabled",
          type: "boolean",
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
            widget: "resource",
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
