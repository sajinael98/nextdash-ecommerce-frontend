import ResourceForm from "../../components/admin-panel/resource-form";
import { countrySchema } from "../form";

const EditCountryPage = () => {
  return <ResourceForm schema={countrySchema} />;
};

export default EditCountryPage;
