"use client";

import AutoForm from "@components/autoform";
import { Box, LoadingOverlay } from "@mantine/core";
import { useForm } from "@refinedev/core";

const EditRolePage = () => {
  const { onFinish, formLoading, query } = useForm();

  function submitHandler(values: any) {
    onFinish(values);
  }

  return (
    <AutoForm
      formData={query?.data?.data}
      formLoading={formLoading || query?.isFetching}
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

export default EditRolePage;
