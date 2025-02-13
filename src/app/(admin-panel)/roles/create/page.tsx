"use client";

import ResourceForm from "@components/resource-form";
import { useForm } from "@refinedev/core";
import { roleSchema } from "../form";

const CreateRolePage = () => {
  const form = useForm();

  function submitHandler(values: any) {
    form.onFinish(values);
  }

  return (
    <ResourceForm
      loading={form.formLoading}
      schema={roleSchema}
      onSubmit={submitHandler}
    />
  );
};

export default CreateRolePage;
