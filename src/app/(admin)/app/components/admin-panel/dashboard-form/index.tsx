"use client";

import { Accordion, Button, Fieldset, Grid, Text } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { BaseRecord } from "@refinedev/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React, { useCallback, useEffect, useMemo } from "react";
import ArrayField from "./ArrayField";
import BooleanField from "./BooleanFIeld";
import ImageField from "./ImageField";
import NumberField from "./NumberField";
import ObjectField from "./ObjectField";
import ResourceField from "./ResourceField";
import StringField from "./StringField";
import { AutoFormProps, Schema, SchemaField } from "./types";

export const [FormProvider, useFormContext, useForm] =
  createFormContext<BaseRecord>();

export const FieldContainer: React.FC<SchemaField> = (props) => {
  const {
    name,
    label,
    type,
    dependsOn = "() => true",
    disabled = "() => false",
    fullWidth,
    description,
    required = false,
    schema,
    optionLabel,
    resource,
  } = props;

  const formCtx = useFormContext();
  const formValues = formCtx.getValues();

  const shouldRenderField = useMemo(
    () => eval(dependsOn)(formValues),
    [formValues]
  );
  const shouldDisableField = useMemo(
    () => eval(disabled)(formValues),
    [formValues]
  );

  const handleFieldReset = useCallback(() => {
    if (formValues[name]) {
      formCtx.setFieldValue(name, null);
    }
  }, [formValues]);

  const field = useMemo(() => {
    switch (type) {
      case "string":
        return (
          <StringField
            name={name}
            required={required}
            {...formCtx.getInputProps(name)}
          />
        );
      case "object": {
        return (
          <Accordion variant="separated" defaultValue={name}>
            <Accordion.Item value={name}>
              <Accordion.Control h={40}></Accordion.Control>
              <Accordion.Panel>
                <ObjectField
                  name={name}
                  required={required}
                  schema={schema as Schema}
                  {...formCtx.getInputProps(name)}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        );
      }
      case "array": {
        return (
          <ArrayField
            name={name}
            required={required}
            schema={schema as Schema}
            {...formCtx.getInputProps(name)}
          />
        );
      }
      case "image": {
        return (
          <ImageField
            name={name}
            required={required}
            {...formCtx.getInputProps(name)}
          />
        );
      }
      case "resource": {
        return (
          <ResourceField
            name={name}
            required={required}
            optionLabel={optionLabel as string}
            resource={resource}
            {...formCtx.getInputProps(name)}
          />
        );
      }
      case "boolean": {
        return (
          <BooleanField
            name={name}
            required={required}
            {...formCtx.getInputProps(name)}
          />
        );
      }
      case "number": {
        return (
          <NumberField
            name={name}
            required={required}
            {...formCtx.getInputProps(name)}
          />
        );
      }
      default:
        throw new Error(`Unsupported field type: ${type}`);
    }
  }, [formValues, formCtx.errors]);

  useEffect(() => {
    if (!shouldRenderField) {
      handleFieldReset();
    }
  }, [shouldRenderField]);

  if (!shouldRenderField) {
    return null;
  }

  return (
    <Grid.Col span={fullWidth ? 12 : { base: 12, md: 6 }}>
      <Fieldset legend={label} variant="unstyled" disabled={shouldDisableField}>
        {field}

        {description && (
          <Text fz="xs" c="dimmed">
            {description}
          </Text>
        )}
      </Fieldset>
    </Grid.Col>
  );
};

export function getInitialValues(schema: Schema, values = {}) {
  const getDefault = (props: SchemaField) => {
    switch (props.type) {
      case "string":
        return props.default ?? "";
      case "object":
        return Object.entries(props?.schema ?? {}).reduce<Record<string, any>>(
          (obj, [name, props]) => {
            obj[name] = getDefault(props);
            return obj;
          },
          {}
        );
      case "array": {
        return [
          Object.entries(props?.schema ?? {}).reduce<Record<string, any>>(
            (obj, [name, props]) => {
              obj[name] = getDefault(props);
              return obj;
            },
            {}
          ),
        ];
      }
      case "image": {
        return undefined;
      }
      case "boolean": {
        return props.default ?? false;
      }
      case "resource": {
        return undefined;
      }
      case "number": {
        return 0;
      }
      default:
        throw Error(`field type:[${props.type}] is not supported`);
    }
  };

  if (Object.keys(values).length) {
    return values;
  }

  return Object.entries(schema).reduce<Record<string, any>>(
    (obj, [name, props]) => {
      obj[name] = getDefault(props);
      return obj;
    },
    {}
  );
}

export function getValidate(schema: Schema) {
  return Object.entries(schema)
    .filter(([field, props]) => !!props.validate || props.type === "object")
    .reduce<Record<string, any>>((validate, [field, props]) => {
      if (props.type === "object") {
        const obj = getValidate(props.schema as Schema);
        if (Object.keys(obj)) {
          validate[field] = obj;
        }
      } else {
        validate[field] = props.validate;
      }
      return validate;
    }, {});
}
const AutoForm: React.FC<AutoFormProps> = (props) => {
  const { loading, schema = {}, values = {}, onSubmit, noSubmitButton } = props;

  const initialValues = useMemo<Record<string, any>>(
    () => getInitialValues(schema, values),
    []
  );
  const validate = useMemo(() => getValidate(schema), []);
  const form = useForm({
    initialValues,
    validate,
  });

  const fields = Object.entries(schema).map(([name, props]) => (
    <FieldContainer key={name} {...props} />
  ));

  const content = (
    <Grid>
      {fields}
      <Grid.Col
        span={12}
        styles={{
          col: {
            display: "flex",
            justifyContent: "flex-end",
          },
        }}
      >
        <Button
          leftSection={<IconDeviceFloppy />}
          loading={loading}
          disabled={!form.isDirty()}
          {...(noSubmitButton && {
            onClick: () => form.onSubmit(onSubmit)(),
          })}
          {...(!noSubmitButton && {
            type: "submit",
          })}
        >
          Save
        </Button>
      </Grid.Col>
    </Grid>
  );
  return (
    <FormProvider form={form}>
      {!noSubmitButton && (
        <form onSubmit={form.onSubmit(onSubmit)}>{content}</form>
      )}
      {noSubmitButton && content}
    </FormProvider>
  );
};

export default AutoForm;
