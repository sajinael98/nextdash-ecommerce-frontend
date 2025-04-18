import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";

const uomSchema: Schema = {
  uom: {
    type: "string",
    label: "Uom",
    required: true
  },
};

export const UomForm = () => <ResourceForm schema={uomSchema}/>;