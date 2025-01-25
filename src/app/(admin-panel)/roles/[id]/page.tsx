"use client";

import EditResource from "@components/Edit";
import { useForm } from "@refinedev/core";
import { roleSchema } from "../form";

const EditRolePage = () => {
  const form = useForm();

  function submitHandler(values: any) {
    form.onFinish(values);
  }

  return (
    <EditResource schema={roleSchema} form={form} onSubmit={submitHandler} />
  );
};

export default EditRolePage;
