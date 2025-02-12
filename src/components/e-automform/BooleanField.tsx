import { Checkbox } from "@mantine/core";
import { FieldProps } from "@rjsf/utils";
import React, { ChangeEventHandler, FocusEventHandler } from "react";

const BooleanField: React.FC<FieldProps> = (props) => {
  const {
    name,
    idSchema,
    defaultValue = "",
    formData = "",
    onChange,
    onBlur,
    readonly,
    required,
    disabled,
    title
  } = props;

  const changeHandler: ChangeEventHandler<HTMLInputElement> = function (event) {
    onChange(event.target.checked);
  };

  const foucsHandler: FocusEventHandler<HTMLInputElement> = function (event) {
    onBlur(idSchema.$id, event.target.value);
  };

  return (
    <Checkbox
      id={idSchema.$id}
      name={name}
      label={title ?? name}
      defaultValue={defaultValue}
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

export default BooleanField;
