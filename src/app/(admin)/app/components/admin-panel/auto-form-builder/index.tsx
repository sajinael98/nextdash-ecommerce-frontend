"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";

import {
  Checkbox,
  Fieldset,
  List,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { BaseRecord, useSelect } from "@refinedev/core";
import { FormProvider, useFormContext } from "../dashboard-form";
import {
  AutoFormBuilderHandle,
  AutoFormBuilderProps,
  BaseFieldConfig,
  FieldComponentMap,
  FieldProps,
  ObjectFieldConfig,
  ResourceFieldProps,
  Schema,
  SelectFieldProps,
  Types
} from "./types";

const TextField: React.FC<FieldProps> = (props) => {
  const { name } = props;
  const form = useFormContext();
  return <TextInput size="sm" {...form.getInputProps(name)} />;
};

const NumberField: React.FC<FieldProps> = (props) => {
  const { name } = props;
  const form = useFormContext();
  return <NumberInput size="sm" {...form.getInputProps(name)} />;
};

const BooleanField: React.FC<FieldProps> = (props) => {
  const { name } = props;
  const form = useFormContext();
  return <Checkbox {...form.getInputProps(name, { type: "checkbox" })} />;
};

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { name, data = [] } = props;
  const form = useFormContext();
  return <Select size="sm" data={data} {...form.getInputProps(name)} />;
};

const ResourceField: React.FC<ResourceFieldProps> = (props) => {
  const { name, resource, optionLabel = "title" } = props;

  const form = useFormContext();

  const { options, query } = useSelect({
    resource,
    optionLabel: (item: Record<string, string>) => item[optionLabel],
  });

  const data = useMemo(() => {
    if (query.isFetched) {
      return options;
    }
    return [];
  }, [query.isFetched, options]);

  return <Select size="sm" data={data} {...form.getInputProps(name)} />;
};

const DateField: React.FC<FieldProps> = (props) => {
  const { name } = props;
  const form = useFormContext();
  return <DateInput size="sm" {...form.getInputProps(name)} />;
};

const ObjectField: React.FC<ObjectFieldConfig> = (props) => {
  const { schema } = props;
  return <AutoFormBuilder {...schema} />;
};

const fieldMap: FieldComponentMap = {
  string: TextField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  resource: ResourceField,
  select: SelectField,
  object: ObjectField,
};

function getField(
  type: Types
):
  | React.FC<FieldProps>
  | React.FC<SelectFieldProps>
  | React.FC<ResourceFieldProps> {
  const Component = fieldMap[type];
  if (!Component) throw new Error(`${type} is not supported.`);
  return Component;
}

function getValidate(schema: Schema) {
  return Object.entries(schema)
    .filter(
      ([field, props]) => props.required || !!props.validate //|| props.type === "object"
    )
    .reduce<Record<string, any>>((validate, [field, props]) => {
      if (props.type === "object") {
        const obj = getValidate(props.schema);
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

const getDefault = (props: BaseFieldConfig) => {
  switch (props.type) {
    case "string":
      return props.defaultValue ?? "";
    case "object":
      return Object.entries(props?.schema ?? {}).reduce<Record<string, any>>(
        (obj, [name, props]) => {
          obj[name] = getDefault(props);
          return obj;
        },
        {}
      );
    // case "array": {
    //   return [];
    // }
    // case "image": {
    //   return props.default;
    // }
    case "boolean": {
      return props.defaultValue ?? false;
    }
    case "resource": {
      return props.defaultValue;
    }
    case "number": {
      return props.defaultValue ?? 0;
    }
    case "select": {
      return props.defaultValue;
    }
    case "date": {
      return props.defaultValue ?? null;
    }
  }
};

export const AutoFormBuilder = forwardRef<
  AutoFormBuilderHandle,
  AutoFormBuilderProps
>((props, ref) => {
  const {
    fields,
    fieldContainer,
    change = {},
    values = {},
    onSubmit,
    readonly,
    isDirty = () => {},
    formContainer,
  } = props;

  const form = useForm({
    validate: getValidate(fields),
    initialValues: getInitialValues(fields, values),
  });

  const fieldChangeHandler = useDebouncedCallback((field, value) => {
    change[field](value, form.getValues(), {
      setValues: form.setValues,
      setFieldValue: form.setFieldValue,
      setFieldError: form.setFieldError,
    });
  }, 500);

  Object.keys(change).forEach((field) => {
    form.watch(field, ({ value }) => fieldChangeHandler(field, value));
  });

  const visibleFields = useMemo(() => {
    return Object.entries(fields).filter(([name, props]) =>
      props.visible ? props.visible(form.values) : true
    );
  }, [fields, form.values]);

  const formFields = visibleFields.map(([name, props]) => {
    const {
      label,
      type,
      defaultValue,
      disabled = () => false,
      required = false,
      description,
      ...fieldProps
    } = props;

    const Field = getField(type);
    const { error } = form.getInputProps(name);

    const shouldDisabled = readonly || disabled(form.values);

    const FieldContainer = fieldContainer(
      props,
      <Fieldset disabled={shouldDisabled} variant="unstyled">
        <Field name={name} {...fieldProps} />
      </Fieldset>
    );

    return FieldContainer;
  });

  const handleError = (errors: typeof form.errors) => {
    if (Object.keys(errors).length) {
      modals.open({
        title: "Missing Values",
        children: (
          <List spacing="xs" size="sm">
            {Object.entries(errors).map(([field, msg]) => (
              <List.Item key={field}>
                <strong>{field}</strong>: {msg}
              </List.Item>
            ))}
          </List>
        ),
      });
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      submit: () => form.onSubmit(onSubmit, handleError)(),
      values: form.getValues(),
      setValues: form.setValues,
      resetDirty: () => form.resetDirty(form.getValues()),
    }),
    [form]
  );

  useEffect(() => {
    isDirty(form.isDirty());
  });
  return <FormProvider form={form}>{formContainer(formFields)}</FormProvider>;
});

export default AutoFormBuilder;

AutoFormBuilder.displayName = "AutoFormBuilder";
