"use client"

import React from "react";
import ResourceForm from "../../components/admin-panel/resource-form";
import { userSchema } from "../form";

const EditUserPage = () => {
  return <ResourceForm schema={userSchema} />;
};

export default EditUserPage;
