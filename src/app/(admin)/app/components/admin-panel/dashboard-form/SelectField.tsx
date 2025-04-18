import React from "react";
import { SelectField as Field } from "./types";
import { Select } from "@mantine/core";

const SelectField: React.FC<Field> = (props) => {
  const { data, ...fieldProps } = props;
  return <Select data={data} {...fieldProps} clearable />;
};

export default SelectField;
