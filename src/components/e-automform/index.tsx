import Form, { FormProps } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import React, { PropsWithChildren } from "react";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import FieldTemplate from "./FieldTemplate";
import StringField from "./StringField";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import ArrayFieldItemTemplate from "./ArrayFieldItemTemplate";
import { RegistryFieldsType } from "@rjsf/utils";
import NumberField from "./NumberField";
import BooleanField from "./BooleanField";

interface AutoFormProps
  extends Pick<FormProps, "schema" | "onChange" | "onSubmit"> {
  formValues: {
    [key: string]: any;
  };
}

const s: RegistryFieldsType = {};

const AutoForm: React.FC<PropsWithChildren<AutoFormProps>> = (props) => {
  const { schema, formValues, children, onChange, onSubmit } = props;

  return (
    <Form
      schema={schema}
      onChange={onChange}
      validator={validator}
      formData={formValues}
      fields={{
        StringField,
        NumberField,
        BooleanField,
      }}
      templates={{
        ObjectFieldTemplate,
        FieldTemplate,
        ArrayFieldTemplate,
        ArrayFieldItemTemplate,
      }}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  );
};

export default AutoForm;
