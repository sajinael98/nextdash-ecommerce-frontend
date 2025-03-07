"use client";

import { useForm } from "@refinedev/core";
import { roleSchema } from "../form";
import ResourceForm from "../../components/admin-panel/resource-form";

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
