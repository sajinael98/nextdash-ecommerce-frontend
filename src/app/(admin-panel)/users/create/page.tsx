"use client";
import ResourceForm from "@components/resource-form";
import { useForm } from "@refinedev/core";
import { userSchema } from "../form";

const CreateUserPage = () => {
  const { onFinish, formLoading } = useForm({});
  function submitHandler(values: any) {
    onFinish(values);
  }
  return (
    <ResourceForm
      loading={formLoading}
      onSubmit={submitHandler}
      schema={userSchema}
      validate={{
        firstName(value) {
          return value?.length < 6
            ? "The first name should be at least 6 characters long!"
            : null;
        },
      }}
    />
  );
};

export default CreateUserPage;
