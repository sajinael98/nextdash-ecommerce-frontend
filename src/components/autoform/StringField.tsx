import { TextInput } from "@mantine/core";
import { FieldProps } from "@rjsf/utils";
import React, { ChangeEventHandler, FocusEventHandler } from "react";
import SelectField from "./SelectField";

const StringField: React.FC<FieldProps> = (props) => {
  const {
    name,
    idSchema,
    schema: { widget = "" },
    defaultValue = "",
    formData = "",
    onChange,
    onBlur,
    readonly,
    required,
    disabled,
  } = props;
  
  switch (widget) {
    case "select":
      return <SelectField {...props} />;
  }

  const changeHandler: ChangeEventHandler<HTMLInputElement> = function (event) {
    onChange(event.target.value);
  };

  const foucsHandler: FocusEventHandler<HTMLInputElement> = function (event) {
    onBlur(idSchema.$id, event.target.value);
  };

  return (
    <TextInput
      id={idSchema.$id}
      name={name}
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

export default StringField;
