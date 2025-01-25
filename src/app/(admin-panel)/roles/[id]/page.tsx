"use client";

import AutoForm from "@components/autoform";
import { useForm } from "@refinedev/core";
import { roleSchema } from "../form";

const EditRolePage = () => {
  const { onFinish, formLoading, query } = useForm();

  function submitHandler(values: any) {
    onFinish(values);
  }

  return (
    <AutoForm
      formData={query?.data?.data}
      formLoading={formLoading || query?.isFetching}
      onSubmit={submitHandler}
      schema={roleSchema}
    />
  );
};

export default EditRolePage;
