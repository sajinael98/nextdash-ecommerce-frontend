"use client";
import ResourceForm from "@components/resource-form";
import { useForm } from "@refinedev/core";

const schema = {
  type: "object",
  properties: {
    personalInformation: {
      required: ["firstName"],
      title: "Personal Information",
      type: "object",
      properties: {
        firstName: {
          type: "string",
          title: "First Name",
        },
        midName: {
          type: "string",
          title: "Mid Name",
        },
        lastName: {
          type: "string",
          title: "Last Name",
        },
      },
    },
  },
};
const CreateUserPage = () => {
  const { onFinish } = useForm();
  function submitHandler(values: any) {
    console.log(values);
  }
  return (
    <ResourceForm
      onSubmit={submitHandler}
      schema={schema}
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
