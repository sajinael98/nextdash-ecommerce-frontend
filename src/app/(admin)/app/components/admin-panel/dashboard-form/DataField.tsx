import { DatePickerInput } from "@mantine/dates";
import React from "react";
import { Field } from "./types";

const DateField: React.FC<Field> = (props) => {
  const { value, ...fieldProps } = props;
  return <DatePickerInput valueFormat="YYYY-MM-DD" value={new Date(value)} clearable {...fieldProps} />;
};

export default DateField;
