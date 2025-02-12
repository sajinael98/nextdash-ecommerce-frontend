import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Grid
} from "@mantine/core";
import { ObjectFieldTemplateProps } from "@rjsf/utils";
import React, { Fragment } from "react";

const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = (props) => {
  const { idSchema, properties, title } = props;

  const content = properties.map((prop) => <Fragment key={prop.name}>{prop.content}</Fragment>);

  if (idSchema.$id === "root") {
    return content;
  }

  return (
    <Accordion defaultValue={idSchema.$id} variant="separated">
      <AccordionItem value={idSchema.$id}>
        <AccordionControl>{title}</AccordionControl>
        <AccordionPanel>
          <Grid align="flex-end">{content}</Grid>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ObjectFieldTemplate;
