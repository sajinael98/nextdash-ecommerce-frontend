import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Grid
} from "@mantine/core";
import { ObjectFieldTemplateProps } from "@rjsf/utils";
import React from "react";

const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = (props) => {
  const { idSchema, properties, title } = props;

  const content = properties.map((prop) => prop.content);

  if (idSchema.$id === "root") {
    return content;
  }

  return (
    <Accordion defaultValue={idSchema.$id} variant="separated">
      <AccordionItem value={idSchema.$id}>
        <AccordionControl>{title}</AccordionControl>
        <AccordionPanel>
          <Grid>{content}</Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ObjectFieldTemplate;
