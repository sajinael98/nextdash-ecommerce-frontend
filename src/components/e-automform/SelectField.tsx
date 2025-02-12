import { ComboboxItem, Select } from "@mantine/core";
import { FieldProps } from "@rjsf/utils";
import React, { FocusEventHandler } from "react";

const SelectField: React.FC<FieldProps> = (props) => {
  const {
    name,
    idSchema,
    schema,
    defaultValue = "",
    formData = "",
    onChange,
    onBlur,
    readonly,
    required,
    disabled,
  } = props;
  const { enums } = schema;
  if (!enums) {
    throw Error("Enums are missing for:" + name);
  }
  const changeHandler = (value: string | null, option: ComboboxItem) =>
    onChange(value);

  const foucsHandler: FocusEventHandler<HTMLInputElement> = function (event) {
    onBlur(idSchema.$id, event.target.value);
  };

  return (
    <Select
      data={enums}
      id={idSchema.$id}
      name={name}
      defaultValue={defaultValue as string}
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

export default SelectField;
