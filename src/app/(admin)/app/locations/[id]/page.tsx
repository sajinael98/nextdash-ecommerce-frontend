import React from "react";
import ResourceForm from "../../components/admin-panel/resource-form";
import { locationSchema } from "../form";

const EditLocationPage = () => {
  return <ResourceForm schema={locationSchema} />;
};

export default EditLocationPage;
