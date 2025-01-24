"use client";

import AutoForm from "@components/autoform";
import { useForm } from "@refinedev/core";

const CreateRolePage = () => {
  const { onFinish, formLoading } = useForm();

  function submitHandler(values: any) {
    onFinish(values);
  }

  return (
    <AutoForm
      formLoading={formLoading}
      onSubmit={submitHandler}
      schema={{
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
          },
        },
      }}
    />
  );
};

export default CreateRolePage;
