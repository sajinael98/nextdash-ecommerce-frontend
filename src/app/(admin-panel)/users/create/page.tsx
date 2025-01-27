"use client"
import AutoForm from "@components/autoform";
import React from "react";
import { userSchema } from "../form";
import { useForm } from "@refinedev/core";

const CreateUserPage = () => {
  const { onFinish } = useForm();
  function submitHandler(values: any){
    onFinish(values)
  }
  return <AutoForm schema={userSchema} onSubmit={submitHandler} />;
};

export default CreateUserPage;
