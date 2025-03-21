import React from "react";
import { Field } from "./types";
import { NumberInput } from "@mantine/core";

const NumberField: React.FC<Field> = (props) => {
  return <NumberInput {...props} />;
};

export default NumberField;
