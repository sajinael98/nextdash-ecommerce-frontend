import ResourceForm from '@app/(admin)/app/components/admin-panel/resource-form'
import React from 'react'
import { uomSchema } from '../form';

const CreateUomPage = () => {
  return <ResourceForm schema={uomSchema} />;
}

export default CreateUomPage