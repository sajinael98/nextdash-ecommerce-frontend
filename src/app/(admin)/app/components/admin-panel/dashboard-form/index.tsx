"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Fieldset,
  Grid,
  List,
  Text,
} from "@mantine/core";
import { createFormContext, isNotEmpty } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { BaseRecord } from "@refinedev/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React, { useMemo } from "react";
import BooleanField from "./BooleanFIeld";
import NumberField from "./NumberField";
import SelectField from "./SelectField";
import StringField from "./StringField";
import {
  AutoFormProps,
  BaseSchemaField,
  Fields,
  ObjectSchemaField,
  Schema,
} from "./types";
import ResourceField from "./ResourceField";
import ObjectField from "./ObjectField";
import ArrayField from "./ArrayField";
import DateField from "./DataField";
import QueryField from "./QueryField";

export const [FormProvider, useFormContext, useForm] =
  createFormContext<BaseRecord>();

function getField(name: string, props: BaseSchemaField) {
  switch (props.type) {
    case "string":
      return StringField;
    case "number":
      return NumberField;
    case "boolean":
      return BooleanField;
    case "select":
      return SelectField;
    case "resource":
      return ResourceField;
    case "object":
      return ObjectField;
    case "array":
      return ArrayField;
    case "date":
      return DateField;
    case "query":
      return QueryField;
    default:
      throw Error("Not supported");
  }
}

export const FieldContainer: React.FC<Fields & { name: string }> = (props) => {
  const {
    label,
    name,
    type,
    description,
    fullWidth,
    required,
    validate,
    default: _,
    visible = () => true,
    disabled = () => false,
    ...schemaProps
  } = props;
  const formCtx = useFormContext();
  const Field = getField(name, props);
  const { error, ...fieldProps } = formCtx.getInputProps(name);
  const shouldRendered = useMemo(
    () => visible(formCtx.getValues()),
    [formCtx.getValues()]
  );
  if (!shouldRendered) {
    return undefined;
  }

  return (
    <Grid.Col span={fullWidth ? 12 : { base: 12, md: 6 }}>
      <Fieldset
        legend={
          <Text>
            {!["object", "boolean"].includes(type) && label}
            {required && (
              <Text pos="relative" top={-5} c="red.8" fz="xs" span>
                &#9733;
              </Text>
            )}
          </Text>
        }
        variant="unstyled"
        disabled={disabled(formCtx.getValues())}
      >
        {type === "object" && (
          <Accordion variant="contained">
            <AccordionItem value={name}>
              <Accordion.Control>{label}</Accordion.Control>
              <Accordion.Panel>
                <Field name={name} {...fieldProps} {...schemaProps} />
              </Accordion.Panel>
            </AccordionItem>
          </Accordion>
        )}
        {type !== "object" && (
          <Field name={name} {...fieldProps} {...schemaProps} {...(type === "boolean" && {label: label})} />
        )}

        {description && (
          <Text fz="xs" c="dimmed">
            {description}
          </Text>
        )}
        {error && (
          <Text fz="xs" c="red.8">
            {error}
          </Text>
        )}
      </Fieldset>
    </Grid.Col>
  );
};

const getDefault = (props: BaseSchemaField) => {
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
      return [];
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
      return props.default ?? 0;
    }
    case "select": {
      return undefined;
    }
    case "date": {
      return props.default ?? null;
    }
  }
};

export function getInitialValues(
  schema: Schema,
  values: Record<string, unknown>
) {
  return Object.entries(schema).reduce<Record<string, any>>(
    (obj, [name, props]) => {
      if (name in values) {
        obj[name] = values[name];
      } else {
        obj[name] = getDefault(props);
      }
      return obj;
    },
    values
  );
}

export function getValidate(schema: Schema) {
  return Object.entries(schema)
    .filter(
      ([field, props]) =>
        props.required || !!props.validate || props.type === "object"
    )
    .reduce<Record<string, any>>((validate, [field, props]) => {
      if (props.type === "object") {
        const obj = getValidate(props.schema as ObjectSchemaField);
        if (Object.keys(obj)) {
          validate[field] = obj;
        }
      } else {
        if (props.required) {
          validate[field] = (value: any, values: BaseRecord) => {
            const isEmpty = isNotEmpty("required")(value);
            if (isEmpty) {
              return isEmpty;
            }
            if (props?.validate) {
              return props?.validate(value, values);
            }
          };
        } else {
          validate[field] = props.validate;
        }
      }

      return validate;
    }, {});
}

const AutoForm: React.FC<AutoFormProps> = (props) => {
  const {
    loading,
    schema = {},
    values = {},
    onSubmit,
    noSubmitButton,
    readOnly,
    change = {},
  } = props;
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
    <FieldContainer
      key={name}
      name={name}
      {...props}
      {...(readOnly && {
        disabled: (values) => true,
      })}
    />
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
        {!readOnly && (
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
        )}
      </Grid.Col>
    </Grid>
  );

  const handleError = (errors: typeof form.errors) => {
    if (Object.keys(errors).length) {
      modals.open({
        title: "Missing Values",
        children: (
          <>
            <List>
              {Object.entries(errors).map(([field, msg]) => (
                <List.Item key={field}>
                  {field}: {msg}
                </List.Item>
              ))}
            </List>
          </>
        ),
      });
    }
  };

  const fieldChangeHandler = useDebouncedCallback((field, value) => {
    change[field](value, form.getValues(), {
      setValues: form.setValues,
      setFieldValue: form.setFieldValue,
      setFieldError: form.setFieldError,
    });
  }, 1000);

  Object.keys(change).forEach((field) => {
    form.watch(field, ({ value }) => fieldChangeHandler(field, value));
  });

  return (
    <FormProvider form={form}>
      {!noSubmitButton && (
        <form onSubmit={form.onSubmit(onSubmit, handleError)}>{content}</form>
      )}
      {noSubmitButton && content}
    </FormProvider>
  );
};

export default AutoForm;
