"use client";

import {
  Accordion,
  Button,
  Grid,
  Group,
  Menu,
  Portal,
  Text,
} from "@mantine/core";
import {
  BaseRecord,
  useCustomMutation,
  useForm,
  useResourceParams,
} from "@refinedev/core";
import { IconDeviceFloppy, IconMenu2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import AutoFormBuilder from "../auto-form-builder";
import { AutoFormBuilderHandle } from "../auto-form-builder/types";
import { ResourceFormProps } from "./types";

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const {
    schema,
    buttons = [],
    menuItems = [],
    readOnly = false,
    change = {},
    confirmable,
  } = props;

  const { identifier, action, id } = useResourceParams();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const formRef = useRef<AutoFormBuilderHandle | null>(null);
  const router = useRouter();
  const form = useForm({
    onMutationSuccess: (data) => {
      router.replace(`/app/${identifier}/${data.data.id}`);
    },
  });
  const confirmMutation = useCustomMutation();

  useEffect(() => {
    const data = form.query?.data?.data as BaseRecord | undefined;
    if (data) {
      formRef.current?.setValues(data);
      formRef.current?.resetDirty();
    }
  }, [form.query?.data?.data]);

  const handleConfirmAction = async (confirm: boolean) => {
    await confirmMutation.mutateAsync({
      method: "patch",
      url: `/${identifier}/${id}/${confirm ? "confirm" : "cancel"}`,
      values: {},
    });
    form.query?.refetch();
  };

  if (!identifier) {
    throw new Error("ResourceForm is only used with resources");
  }

  const renderActionButtons = () => {
    const status = formRef.current?.values.status;
    const isLoading = form.query?.isFetching || form.formLoading;
    const shouldSaveButtonDisabled = !isDirty;
    const saveButton = (
      <Button
        leftSection={<IconDeviceFloppy />}
        type="submit"
        loading={isLoading}
        disabled={shouldSaveButtonDisabled}
        onClick={formRef.current?.submit}
      >
        Save
      </Button>
    );

    const confirmButton = (
      <Button
        leftSection={<IconDeviceFloppy />}
        loading={confirmMutation.isLoading}
        onClick={() => handleConfirmAction(true)}
      >
        Confirm
      </Button>
    );

    const cancelButton = (
      <Button
        leftSection={<IconDeviceFloppy />}
        loading={confirmMutation.isLoading}
        onClick={() => handleConfirmAction(false)}
      >
        Cancel
      </Button>
    );

    if (action === "create") {
      return saveButton;
    }
    if (action === "edit") {
      if (status === "DRAFT") {
        console.log(confirmButton, isDirty);
        if (confirmButton && !isDirty) {
          return confirmButton;
        } else {
          return saveButton;
        }
      }
      if (status === "CONFIRMED" && !isDirty) {
        return cancelButton;
      }
    }
    return null;
  };

  const formValues = formRef.current?.values as Record<string, any>;

  return (
    <>
      <Portal target="#page-actions">
        {buttons.map((button, index) => (
          <Button key={index} onClick={() => button.onClick(formValues)}>
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
                    onClick={() => menuItem.onClick(formValues)}
                  >
                    {menuItem.label}
                  </Menu.Item>
                ))}
              </>
            )}
          </Menu.Dropdown>
        </Menu>
      </Portal>

      {form.query && (
        <>
          <AutoFormBuilder
            formContainer={(form) => <Grid>{form}</Grid>}
            readonly={readOnly}
            onSubmit={(values) => {
              form.onFinish(values);
            }}
            change={change}
            fields={schema}
            ref={formRef}
            fieldContainer={(props, field) => {
              if (props.type === "object") {
                return (
                  <Grid.Col span={{ base: 12 }}>
                    <Accordion variant="separated">
                      <Accordion.Item value={props.label}>
                        <Accordion.Control>{props.label}</Accordion.Control>
                        <Accordion.Panel>{field}</Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </Grid.Col>
                );
              }
              return (
                <Grid.Col span={{ base: 12, md: 6 }}>
                  <Text>{props.label}</Text>
                  {field}
                </Grid.Col>
              );
            }}
            isDirty={(dirty) => setIsDirty(dirty)}
          />

          <Group justify="flex-end">{renderActionButtons()}</Group>
        </>
      )}
    </>
  );
};

export default ResourceForm;
