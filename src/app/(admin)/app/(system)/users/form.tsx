"use client";

import React from "react";
import ResourceForm from "../../components/admin-panel/resource-form";
import { Grid } from "@mantine/core";

const UserForm = () => {
  return (
    <ResourceForm
      schema={{
        personalInformation: {
          type: "object",
          label: "Personal Information",
          schema: {
            onSubmit(values) {},
            formContainer(field) {
              return <Grid w="100%">{field}</Grid>;
            },
            fieldContainer(props, field) {
              return <Grid.Col span={{ base: 12, md: 6 }}>{field}</Grid.Col>;
            },
            fields: {
              firstName: {
                type: "string",
                label: "First Name",
              },
              lastName: {
                type: "string",
                label: "First Name",
              },
            },
          },
        },
      }}
    />
  );
};

export default UserForm;
