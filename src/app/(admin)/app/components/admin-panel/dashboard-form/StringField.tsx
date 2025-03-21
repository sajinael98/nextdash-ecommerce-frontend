import { TextInput } from "@mantine/core";
import React from "react";
import { Field } from "./types";

const StringField: React.FC<Field> = (props) => {
  return <TextInput {...props} />;
};

export default StringField;
