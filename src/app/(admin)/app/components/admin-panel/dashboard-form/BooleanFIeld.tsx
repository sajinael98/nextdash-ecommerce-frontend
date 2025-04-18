import React from "react";
import { Field } from "./types";
import { Checkbox } from "@mantine/core";

const BooleanField: React.FC<Field> = (props) => {
  return (
    <Checkbox
      {...props}
      defaultChecked={props.defaultValue}
      checked={props.value}
    />
  );
};

export default BooleanField;
