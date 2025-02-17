import { TextInput } from "@mantine/core";
import { FieldProps } from "@rjsf/utils";
import React, { ChangeEventHandler, FocusEventHandler } from "react";
import SelectField from "./SelectField";
import ImageUploader from "./ImageField";

const Field: React.FC<FieldProps> = (props) => {
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
const StringField: React.FC<FieldProps> = (props) => {
  const { schema } = props;
  const { widget } = schema;
  switch (widget) {
    case "select":
      return <SelectField {...props} />;
    case "image":
      return <ImageUploader {...props} />;
    default:
      return <Field {...props} />;
  }
};

export default StringField;
