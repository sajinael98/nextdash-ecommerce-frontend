"use client";

import { Box, Button, Grid, Group, List, Menu, Portal } from "@mantine/core";
import { useForm as useMantineForm } from "@mantine/form";
import { useDebouncedCallback } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import {
  BaseRecord,
  useCustomMutation,
  useForm,
  useResourceParams
} from "@refinedev/core";
import { IconDeviceFloppy, IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import {
  FieldContainer,
  FormProvider,
  getInitialValues,
  getValidate,
} from "../dashboard-form";
import { Schema } from "../dashboard-form/types";
import { ResourceFormProps } from "./types";

const setupFieldWatchers = (
  change: Record<string, Function>,
  form: ReturnType<typeof useMantineForm>,
  handler: (field: string, value: any) => void
) => {
  Object.keys(change).forEach((field) => {
    form.watch(field, ({ value }) => handler(field, value));
  });
};

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const {
    schema,
    buttons = [],
    menuItems = [],
    readOnly = false,
    change = {},
  } = props;

  const { identifier, action, id } = useResourceParams();
  if (!identifier) {
    throw Error("ResourceForm is only used with resources");
  }

  const router = useRouter();

  const form = useForm({
    onMutationSuccess(data, variables, context, isAutoSave) {
      router.replace(`/app/${identifier}/${data.data.id}`);
    },
  });

  const initialValues = useMemo(() => {
    const values = getInitialValues(schema, {});
    values["isNew"] = action === "create";
    return values;
  }, []);

  const validate = useMemo(() => getValidate(schema), []);

  const resourceForm = useMantineForm({
    initialValues,
    validate,
  });

  const generateFields = (schema: Schema, readOnly: boolean) =>
    Object.entries(schema).map(([name, props]) => (
      <FieldContainer
        key={name}
        name={name}
        {...props}
        {...(readOnly && { disabled: () => true })}
      />
    ));

  const fields = useMemo(
    () =>
      generateFields(
        schema,
        readOnly || resourceForm.getValues().status === "CONFIRMED"
      ),
    [schema, readOnly, resourceForm.getValues().status]
  );

  const fieldChangeHandler = useDebouncedCallback((field, value) => {
    change[field](value, resourceForm.getValues(), {
      setValues: resourceForm.setValues,
      setFieldValue: resourceForm.setFieldValue,
      setFieldError: resourceForm.setFieldError,
    });
  }, 500);

  setupFieldWatchers(change, resourceForm, fieldChangeHandler);

  const confirmMutation = useCustomMutation();

  const handleError = (errors: typeof resourceForm.errors) => {
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

  const saveHandler = resourceForm.onSubmit(
    (values) => form.onFinish(values),
    handleError
  );

  const handleConfirmAction = async (confirm: boolean) => {
    await confirmMutation.mutateAsync({
      method: "patch",
      url: `/${identifier}/${id}/${confirm ? "confirm" : "cancel"}`,
      values: {},
    });
    form.query?.refetch();
  };

  useEffect(() => {
    if (!form.query?.data?.data) {
      return;
    }
    const data = form.query.data?.data as BaseRecord;
    resourceForm.setValues(data);
    resourceForm.resetDirty(data);
  }, [form.query?.data?.data]);

  useEffect(() => {
    if (action === "create" && form.mutation.isSuccess) {
    }
  }, [action]);

  return (
    <FormProvider form={resourceForm}>
      <Group grow>
        <Group justify="flex-end">
          {buttons.length > 0 &&
            buttons.map((button, index) => (
              <Button
                key={index}
                onClick={() => button.onClick(resourceForm.getValues())}
              >
                {button.label}
              </Button>
            ))}
          <Menu width={200} position="bottom-end">
            <Menu.Target>
              <Button variant="light" leftSection={<IconMenu2 />}>
                Menu
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>Delete</Menu.Item>
              {menuItems.length > 0 && (
                <>
                  <Menu.Divider />
                  {menuItems.map((menuItem, index) => (
                    <Menu.Item
                      key={index}
                      onClick={() => menuItem.onClick(resourceForm.getValues())}
                    >
                      {menuItem.label}
                    </Menu.Item>
                  ))}
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      <form onSubmit={saveHandler}>
        <Grid mb="md">{fields}</Grid>
        <Group justify="flex-end">
          {resourceForm.getValues().status === "DRAFT" &&
            action === "edit" &&
            resourceForm.isDirty() && (
              <Button
                leftSection={<IconDeviceFloppy />}
                type="submit"
                loading={form.query?.isFetching || form.formLoading}
              >
                Save
              </Button>
            )}
          {resourceForm.getValues().status === "DRAFT" &&
            action === "edit" &&
            !resourceForm.isDirty() && (
              <Button
                leftSection={<IconDeviceFloppy />}
                loading={confirmMutation.isLoading}
                onClick={() => handleConfirmAction(true)}
              >
                Confirm
              </Button>
            )}

          {resourceForm.getValues().status === "CONFIRMED" &&
            action === "edit" &&
            !resourceForm.isDirty() && (
              <Button
                leftSection={<IconDeviceFloppy />}
                loading={confirmMutation.isLoading}
                onClick={() => handleConfirmAction(false)}
              >
                Cancel
              </Button>
            )}
          {action === "create" && (
            <Button
              leftSection={<IconDeviceFloppy />}
              type="submit"
              loading={form.query?.isFetching || form.formLoading}
              disabled={!resourceForm.isDirty()}
            >
              Save
            </Button>
          )}
        </Group>
      </form>
    </FormProvider>
  );
};

export default ResourceForm;
