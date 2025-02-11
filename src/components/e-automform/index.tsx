import Form, { FormProps } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import React, { PropsWithChildren } from "react";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import FieldTemplate from "./FieldTemplate";
import StringField from "./StringField";

interface AutoFormProps extends Pick<FormProps, "schema" | "onChange" | "onSubmit"> {
  formValues: {
    [key: string]: any;
  };
}

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
      }}
      templates={{
        ObjectFieldTemplate,
        FieldTemplate,
      }}
      onSubmit={onSubmit}
    >
      {children}
    </Form>
  );
};

export default AutoForm;
