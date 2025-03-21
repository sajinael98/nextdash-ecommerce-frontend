"use client";

import ResourceForm from "../../components/admin-panel/resource-form";
import { userSchema } from "../form";

const CreatrUserPage = () => {
  return (
    <ResourceForm
      schema={userSchema}
    />
  );
};

export default CreatrUserPage;
