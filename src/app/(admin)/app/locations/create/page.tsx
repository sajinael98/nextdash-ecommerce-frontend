import ResourceForm from "../../components/admin-panel/resource-form";
import { locationSchema } from "../form";

const CreateLocationPage = () => {
  return <ResourceForm schema={locationSchema} />;
};

export default CreateLocationPage;
