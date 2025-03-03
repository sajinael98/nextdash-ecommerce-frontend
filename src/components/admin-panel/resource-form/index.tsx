"use client";

import AutoForm from "@components/admin-panel/autoform";
import {
  Badge,
  Box,
  Button,
  Container,
  Group,
  LoadingOverlay,
  Menu,
  Title,
} from "@mantine/core";
import { createFormContext, FormValidateInput } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { BaseRecord, useResourceParams } from "@refinedev/core";
import { IChangeEvent } from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { IconDeviceFloppy } from "@tabler/icons-react";
import React from "react";

interface MenuItem {
  label: string;
  onClick: (data: any) => void;
}

interface ResourceFormProps {
  formValues?: BaseRecord;
  validate?: FormValidateInput<BaseRecord>;
  onSubmit: (values: BaseRecord) => void;
  schema: RJSFSchema;
  loading: boolean;
  menuItems?: MenuItem[];
}

const [FormProvider, _, useForm] = createFormContext<BaseRecord>();

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const {
    formValues = {},
    onSubmit,
    schema,
    validate,
    loading,
    menuItems = [],
  } = props;

  const { identifier, action } = useResourceParams();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: formValues,
    validate,
  });

  if (!identifier) {
    throw Error("ResourceForm is used only with resources.");
  }

  const formChangeHandler = useDebouncedCallback(
    (event: IChangeEvent, fieldId?: string) => {
      if (!fieldId || !validate) return;
      const field = fieldId
        .substring(5)
        .split("_")
        .map((part, index) =>
          index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join("");

      form.setFieldValue(field, event.formData[field]);

      const { hasError, error } = form.validateField(field);
      hasError &&
        notifications.show({
          title: field,
          message: error,
          color: "red",
        });
    },
    500
  );
  const values = Object.keys(form.getValues()).length
    ? form.getValues()
    : formValues;
  return (
    <FormProvider form={form}>
      <Container size="xl" pos="relative">
        <LoadingOverlay visible={loading} />
        <Group mb="md" justify="space-between">
          <Box>
            <Title tt="capitalize" order={2}>
              {identifier} Form
              <Badge
                ml="sm"
                variant="light"
                color={action === "create" ? "red" : "green"}
              >
                {action === "create" ? "not saved" : "old"}
              </Badge>
            </Title>
          </Box>
          <Box>
            <Menu>
              <Menu.Target>
                <Button variant="light">Menu</Button>
              </Menu.Target>
              {Boolean(menuItems.length) && (
                <Menu.Dropdown>
                  {menuItems.map((item, index) => (
                    <Menu.Item
                      key={index}
                      onClick={() => item.onClick(formValues)}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              )}
            </Menu>
          </Box>
        </Group>
        <AutoForm
          formValues={values}
          schema={schema}
          onChange={formChangeHandler}
          onSubmit={(data) => {
            const hasErros = form.validate().hasErrors;
            if (hasErros) {
              return;
            }

            onSubmit(data.formData);
          }}
        >
          <Group mt="md" justify="flex-end">
            <Button type="submit" leftSection={<IconDeviceFloppy />}>
              Save
            </Button>
          </Group>
        </AutoForm>
      </Container>
    </FormProvider>
  );
};

export default ResourceForm;
