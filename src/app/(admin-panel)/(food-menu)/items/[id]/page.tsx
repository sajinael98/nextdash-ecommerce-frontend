"use client";

import ResourceForm from "@components/admin-panel/resource-form";
import { useForm } from "@refinedev/core";
import React from "react";
import { itemSchema } from "../schema";

const ItemEditPage = () => {
  const form = useForm();
  function submitHandler(values: any) {
    form.onFinish(values);
  }
  return (
    <ResourceForm
      loading={form.formLoading}
      onSubmit={submitHandler}
      schema={itemSchema}
      formValues={form.query?.data?.data}
    />
  );
};

export default ItemEditPage;
