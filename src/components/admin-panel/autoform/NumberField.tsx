import { NumberInput } from "@mantine/core";
import { FieldProps } from "@rjsf/utils";
import React, { FocusEventHandler } from "react";
import ResourceField from "./ResourceField";

const Field: React.FC<FieldProps> = (props) => {
  const {
    name,
    idSchema,
    defaultValue = 0,
    formData = 0,
    onChange,
    onBlur,
    readonly,
    required,
    disabled,
  } = props;

  const changeHandler = function (value: number | string) {
    onChange(value);
  };

  const foucsHandler: FocusEventHandler<HTMLInputElement> = function (event) {
    onBlur(idSchema.$id, event.target.value);
  };

  return (
    <NumberInput
      id={idSchema.$id}
      name={name}
      defaultValue={defaultValue as number}
      value={formData}
      onChange={changeHandler}
      onFocus={foucsHandler}
      onBlur={foucsHandler}
      readOnly={readonly}
      required={required}
      disabled={disabled}
    />
  );
};
const NumberField: React.FC<FieldProps> = (props) => {
  switch (props.schema?.widget) {
    case "resource":
      return <ResourceField {...props} />;
    default:
      return <Field {...props} />;
  }
};

export default NumberField;
