import ResourceForm from '@app/(admin)/app/components/admin-panel/resource-form'
import React from 'react'
import { variantSchema } from '../form';

const CreateVariantPage = () => {
  return <ResourceForm schema={variantSchema} />;
}

export default CreateVariantPage