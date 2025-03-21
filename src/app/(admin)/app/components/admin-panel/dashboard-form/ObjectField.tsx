import React from "react";
import { Field, Schema } from "./types";
import AutoForm, { FieldContainer, useFormContext } from ".";
import { Accordion, AccordionItem, Grid } from "@mantine/core";

const ObjectField: React.FC<Field & { schema: Schema }> = (props) => {
  const { schema, name: fieldName } = props;
  const fields = Object.entries(schema).map(([name, props]) => (
    <FieldContainer
      key={`${fieldName}.${name}`}
      {...props}
      name={`${fieldName}.${name}`}
    />
  ));
  return <Grid>{fields}</Grid>;
};

export default ObjectField;
