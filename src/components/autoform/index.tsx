"use client";

import DashboardTable from "@components/table";
import {
  Accordion,
  ActionIcon,
  Button,
  Checkbox,
  Grid,
  GridCol,
  Group,
  Modal,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useSelect } from "@refinedev/core";
import Form, { FormProps } from "@rjsf/core";
import {
  ArrayFieldTemplateProps,
  getSubmitButtonOptions,
  ObjectFieldTemplateProps,
  RegistryFieldsType,
  SubmitButtonProps,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { IconDeviceFloppy, IconEdit, IconTrash } from "@tabler/icons-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import {
  ChangeEvent,
  ComponentType,
  FocusEvent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import UrlField from "./UrlField";

interface AutoFormProps
  extends Pick<FormProps, "schema" | "formData" | "onSubmit" | "onChange"> {
  formLoading?: boolean;
}

//templates
const ArrayFieldTemplate: ComponentType<
  ArrayFieldTemplateProps<any, any, any>
> = (props) => {
  const { items, onAddClick, formData, schema, title } = props;
  const [visible, { close, open }] = useDisclosure();
  const [currentRow, setCurrentRow] = useState<number>(-1);
  const [filters, setfilters] = useState([]);
  function openModalHandler(index: number) {
    setCurrentRow(index);
    open();
    console.log(index);
  }
  const columns = Object.entries(schema.items.properties)
    .filter(([_, props]) => (props as { view?: boolean })?.view)
    .reduce(
      (cols, [field, { title }]) => {
        cols.push({
          id: field,
          header: title,
          accessorKey: field,
        });
        return cols;
      },
      [
        {
          accessorKey: "action",
          header: "",
          size: 20,
          cell(props) {
            const index = props.row.index;
            const item = items[index];
            return (
              <>
                <Group gap="xs" wrap="nowrap">
                  <ActionIcon
                    onClick={() => openModalHandler(index)}
                    size="sm"
                    variant="transparent"
                  >
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => item.onDropIndexClick(index)()}
                    size="sm"
                    variant="transparent"
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </>
            );
          },
        },
      ]
    );

  const table = useReactTable({
    columns,
    data: formData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnPinning: {
        right: ["action"],
      },
    },
    defaultColumn: {
      size: 200,
    },
  });

  useEffect(() => {
    if (currentRow > -1 && !visible) {
      open();
    }
  }, [currentRow, visible]);

  useEffect(() => {
    if (currentRow !== -1 && !visible) {
      setCurrentRow(-1);
    }
  }, [visible]);

  return (
    <>
      {currentRow > -1 && (
        <Modal
          title={`${title} row: ${currentRow}`}
          opened={visible}
          onClose={close}
          size="xl"
        >
          {items[currentRow].children}
        </Modal>
      )}
      <Text>
        {title}{" "}
        <Text size="sm" c="dimmed" span>
          (count: {formData.length})
        </Text>
      </Text>
      <DashboardTable table={table} />
      <Button
        onClick={() => {
          onAddClick();
          table.setColumnFilters([]);
        }}
        variant="outline"
        size="compact-sm"
        w={120}
      >
        Add
      </Button>
    </>
  );
};

const ObjectFieldTemplate: ComponentType<
  ObjectFieldTemplateProps<any, any, any>
> = ({ properties, idSchema, title }) => {
  const items = (
    <Grid align="flex-end">
      {properties.map((p) => {
        let lg = 6;
        if (["array", "object"].includes(p.content.props.schema.type)) {
          lg = 12;
        }

        return (
          <GridCol key={p.name} span={{ lg }}>
            {p.content}
          </GridCol>
        );
      })}
    </Grid>
  );

  if (idSchema.$id !== "root") {
    return (
      <Accordion variant="separated" defaultValue={idSchema.$id}>
        <Accordion.Item value={idSchema.$id}>
          <Accordion.Control>{title}</Accordion.Control>
          <Accordion.Panel>{items}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  }
  return items;
};

const ButtonTemplates: Partial<{
  SubmitButton: ComponentType<SubmitButtonProps<any, any, any>>;
}> = {
  SubmitButton: (props) => {
    const { uiSchema } = props;
    const { norender, submitText } = getSubmitButtonOptions(uiSchema);
    if (norender) {
      return null;
    }
    return (
      <Group justify="flex-end" my="md">
        <Button leftSection={<IconDeviceFloppy />} type="submit">
          {submitText}
        </Button>
      </Group>
    );
  },
};

//fields
const fields: RegistryFieldsType<any, any, any> = {
  StringField: (props) => {
    const {
      formData,
      id,
      name,
      required,
      disabled,
      readonly,
      onChange,
      onBlur,
      onFocus,
      autoFocus,
      rawErrors,
      hideError,
      defaultValue,
      schema,
    } = props;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.value);

    const blurHandler = (e: FocusEvent<HTMLInputElement>) =>
      onBlur(id as string, e.target.value);

    const focusHandler = (e: FocusEvent<HTMLInputElement>) =>
      onFocus(id as string, e.target.value);

    const hasError = (rawErrors ?? []).length > 0 && !hideError;
    const format = schema?.format ?? "";
    switch (format) {
      case "date": {
        return (
          <DateInput
            id={id}
            name={name}
            value={(formData && new Date(formData)) ?? undefined}
            onChange={(value) => {
              const formattedDate = dayjs(value).format("YYYY-MM-DD");
              onChange(formattedDate);
            }}
            onBlur={blurHandler}
            onFocus={focusHandler}
            required={required}
            readOnly={readonly}
            disabled={disabled}
            autoFocus={autoFocus}
            error={hasError}
            defaultValue={defaultValue}
            valueFormat="YYYY-MM-DD"
          />
        );
      }

      case "custom-url": {
        return <UrlField {...props} />;
      }
      default: {
        return (
          <TextInput
            id={id}
            name={name}
            value={formData ?? ""}
            onChange={changeHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            required={required}
            readOnly={readonly}
            disabled={disabled}
            autoFocus={autoFocus}
            error={hasError}
            defaultValue={defaultValue ?? ""}
          />
        );
      }
    }
  },
  NumberField: (props) => {
    const {
      formData,
      id,
      name,
      required,
      disabled,
      readonly,
      onChange,
      onBlur,
      onFocus,
      autoFocus,
      rawErrors,
      hideError,
      defaultValue,
      schema,
    } = props;
    const resource = schema.resource ?? "";
    if (!!resource && !schema.optionLabel) {
      throw Error(`optionLabel is required for ${id}`);
    }
    const changeHandler = (value: string | number) => onChange(value);

    const blurHandler = (e: FocusEvent<HTMLInputElement>) =>
      onBlur(id as string, e.target.value);

    const focusHandler = (e: FocusEvent<HTMLInputElement>) =>
      onFocus(id as string, e.target.value);

    const hasError = (rawErrors ?? []).length > 0 && !hideError;
    const { options, query } = useSelect({
      defaultValue: String(formData),
      resource,
      optionLabel: schema.optionLabel,
      queryOptions: {
        enabled: !!resource,
      },
    });
    if (resource) {
      return (
        <Select
          id={id}
          name={name}
          data={options.map((option) => ({
            ...option,
            value: option.value.toString(),
          }))}
          onChange={(value) => {
            if (value == null) {
              onChange(value);
            }
            onChange(parseInt(value as string));
          }}
          value={String(formData)}
          onBlur={blurHandler}
          onFocus={focusHandler}
          required={required}
          readOnly={readonly}
          disabled={disabled || query.isFetching}
          autoFocus={autoFocus}
          error={hasError}
          defaultValue={defaultValue}
        />
      );
    }
    return (
      <NumberInput
        id={id}
        name={name}
        value={formData}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        required={required}
        readOnly={readonly}
        disabled={disabled}
        autoFocus={autoFocus}
        error={hasError}
        defaultValue={defaultValue}
      />
    );
  },
  BooleanField: (props) => {
    const {
      formData,
      schema,
      id,
      required,
      disabled,
      readonly,
      onChange,
      onBlur,
      onFocus,
      autoFocus,
      rawErrors,
      name,
      hideError,
    } = props;

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
      onChange(e.target.checked);

    const blurHandler = (e: FocusEvent<HTMLInputElement>) =>
      onBlur(id as string, e.target.checked);

    const focusHandler = (e: FocusEvent<HTMLInputElement>) =>
      onFocus(id as string, e.target.checked);

    const hasError = (rawErrors ?? []).length > 0 && !hideError;

    return (
      <Checkbox
        name={name}
        id={id}
        label={schema.title}
        checked={formData}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        required={required}
        readOnly={readonly}
        disabled={disabled}
        autoFocus={autoFocus}
        error={hasError}
      />
    );
  },
};
const AutoForm: React.FC<PropsWithChildren<AutoFormProps>> = (props) => {
  const { schema, onSubmit, formData, onChange, children } = props;
  return (
    <Form
      formData={formData}
      validator={validator}
      schema={schema}
      templates={{ ArrayFieldTemplate, ObjectFieldTemplate, ButtonTemplates }}
      fields={fields}
      onChange={onChange}
      onSubmit={(data) => {
        const formData = Object.entries(data.formData).reduce(
          (data, [key, value]) => {
            if (
              typeof value === "object" &&
              value !== null &&
              !Array.isArray(value)
            ) {
              Object.assign(data, value);
            } else {
              data[key] = value;
            }
            return data;
          },
          {}
        );
        // console.log(formData);
        onSubmit(data.formData);
      }}
    >
      {children}
    </Form>
  );
};

export default AutoForm;
