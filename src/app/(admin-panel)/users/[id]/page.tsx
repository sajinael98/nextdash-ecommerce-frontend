"use client";

import EditResource from "@components/Edit";
import { useForm } from "@refinedev/core";
import React from "react";
import { userSchema } from "../form";

const EditUserPage = () => {
  const form = useForm();
  function submitHandler(values: any) {
    form.onFinish(values);
  }
  return (
    <EditResource schema={userSchema} form={form} onSubmit={submitHandler} />
  );
};

export default EditUserPage;
