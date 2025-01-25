"use client";

import AutoForm from "@components/autoform";
import { useForm } from "@refinedev/core";
import { roleSchema } from "../form";

const CreateRolePage = () => {
  const { onFinish, formLoading } = useForm();

  function submitHandler(values: any) {
    onFinish(values);
  }

  return (
    <AutoForm
      formLoading={formLoading}
      onSubmit={submitHandler}
      schema={roleSchema}
    />
  );
};

export default CreateRolePage;
