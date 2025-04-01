import ResourceForm from "@app/(admin)/app/components/admin-panel/resource-form";
import React from "react";
import { warehouseSchema } from "../form";

const CreateWarehousePage = () => {
  return <ResourceForm schema={warehouseSchema} />;
};

export default CreateWarehousePage;
