"use client"

import ResourceForm from "@components/resource-form";
import React from "react";
import { itemSchema } from "../schema";
import { useForm } from "@refinedev/core";

const CreateItemPage = () => {
  const form = useForm();

  function submitHandler(values: any) {
    form.onFinish(values)
  }

  return (
    <ResourceForm
      schema={itemSchema}
      onSubmit={submitHandler}
      loading={form.formLoading}
    />
  );
};

export default CreateItemPage;
