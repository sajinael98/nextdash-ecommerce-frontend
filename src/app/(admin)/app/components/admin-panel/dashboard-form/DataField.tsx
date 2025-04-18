import { DateInput, DateTimePicker } from "@mantine/dates";
import React from "react";
import { Field } from "./types";
import dayjs from "dayjs";

const DateField: React.FC<Field> = (props) => {
  const { value, ...fieldProps } = props;
  return (
    <DateTimePicker
      valueFormat="YYYY-MM-DD"
      value={typeof value === "string" ? new Date(value) : value}
      defaultValue={typeof value === "string" ? new Date(value) : value}
      {...fieldProps}
      clearable
    />
  );
};
[];

export default DateField;
