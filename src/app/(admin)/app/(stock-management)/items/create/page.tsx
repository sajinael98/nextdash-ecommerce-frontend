"use client"

import ResourceForm from "@app/(admin)/app/components/admin-panel/resource-form";
import React from "react";
import { itemSchema } from "../form";

const CreateItemPage = () => {
  return <ResourceForm schema={itemSchema} />;
};

export default CreateItemPage;
