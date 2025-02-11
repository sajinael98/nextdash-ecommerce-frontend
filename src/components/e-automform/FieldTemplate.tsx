import { Grid, GridCol, Text } from "@mantine/core";
import { FieldTemplateProps } from "@rjsf/utils";
import React from "react";

const FULL_WIDTH_TYPES = ["object"];

const FieldTemplate: React.ComponentType<FieldTemplateProps> = (props) => {
  const { schema, id, children, label, required } = props;

  const ariaLabel = required ? `${label} (required)` : label;
  if (id === "root") {
    return <Grid>{children}</Grid>;
  }

  return (
    <GridCol span={{ lg: FULL_WIDTH_TYPES.includes(schema.type) ? 12 : 6 }}>
      {schema.type != "object" && (
        <Text mb="xs" fz="sm" aria-label={ariaLabel} component="label">
          {label}
          {required && (
            <Text c="red.8" span>
              *
            </Text>
          )}
        </Text>
      )}
      {children}
    </GridCol>
  );
};

export default FieldTemplate;
