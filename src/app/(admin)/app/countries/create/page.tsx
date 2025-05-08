"use client"
import ResourceForm from "../../components/admin-panel/resource-form";
import { countrySchema } from "../form";

const CreateCountryPage = () => {
  return <ResourceForm schema={countrySchema} change={{
    title: function(){
      console.log("?")
    }
  }} />;
};

export default CreateCountryPage;
