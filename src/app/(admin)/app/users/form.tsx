import { isEmail, isNotEmpty } from "@mantine/form";
import { Schema } from "../components/admin-panel/dashboard-form/types";

export const userSchema: Schema = {
  personalInformation: {
    type: "object",
    label: "Personal Information",
    name: "personalInformation",
    fullWidth: true,
    schema: {
      profileImage: {
        type: "image",
        label: "Profile Image",
        name: "profileImage",
        fullWidth: true
      },
      firstName: {
        type: "string",
        label: "First Name",
        name: "firstName",
        validate: isNotEmpty("required")
      },
      lastName: {
        type: "string",
        label: "Last Name",
        name: "lastName",
        validate: isNotEmpty("required")
      },
    },
  },
  accountInformation: {
    type: "object",
    label: "Account Information",
    fullWidth: true,
    name: "accountInformation",
    schema: {
      username: {
        type: "string",
        label: "Username",
        name: "username",
        validate: isNotEmpty("required")
      },
      email: {
        type: "string",
        label: "Email",
        name: "email",
        validate: isEmail("not valid email.")
      },
    },
  },
  roles: {
    type: "array",
    label: "Roles",
    name: "roles",
    fullWidth: true,
    schema: {
      roleId: {
        type: "resource",
        label: "Role",
        name: "roleId",
        view: true,
        validate: isNotEmpty("required"),
        resource: "roles",
        optionLabel: "role"
      },
    },
  },
};
