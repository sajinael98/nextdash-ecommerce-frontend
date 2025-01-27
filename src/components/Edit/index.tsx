"use client";

import AutoForm from "@components/autoform";
import { Badge, Button, Group, Menu, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  BaseRecord,
  UseFormReturnType,
  useResourceParams,
} from "@refinedev/core";
import { IChangeEvent } from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import {
  IconDeviceFloppy,
  IconHistoryToggle,
  IconMenu2,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { FormEvent, useEffect } from "react";

interface EditResource {
  schema: RJSFSchema;
  form: UseFormReturnType<BaseRecord>;
  onSubmit: (data: IChangeEvent<any, any, any>, event: FormEvent<any>) => void;
}

const EditResource: React.FC<EditResource> = ({ schema, form, onSubmit }) => {
  const { id } = useResourceParams();
  const {} = useDisclosure();
  const editForm = useForm();
  useEffect(() => {
    if (form.query?.isFetched) {
      editForm.setValues(form.query.data?.data);
      editForm.resetDirty();
    }
  }, [form.query?.isFetched]);
  return (
    <>
      <Group mb="md" justify="space-between">
        <Text fz="h3" fw={500}>
          Resource Id: {id}
          {editForm.isDirty() ? (
            <Badge variant="dot" color="red">not saved</Badge>
          ) : (
            <Badge variant="dot">saved</Badge>
          )}
          <Text fz="sm" c="dimmed">
            Last Modified Date:
            {dayjs(form.query?.data?.data.lastModifiedDate).format(
              "YYYY-MM-DD hh:mm:ss"
            )}
          </Text>
        </Text>
        <Group>
          <Button w={120} leftSection={<IconHistoryToggle />} variant="light">
            Audit
          </Button>
          <Menu>
            <Menu.Target>
              <Button w={120} leftSection={<IconMenu2 />} variant="light">
                Menu
              </Button>
            </Menu.Target>
          </Menu>
        </Group>
      </Group>
      <AutoForm
        formData={editForm.values}
        formLoading={form.formLoading || form.query?.isFetching}
        onSubmit={onSubmit}
        schema={schema}
        onChange={(data, id) => {
          editForm.setValues(data.formData);
        }}
      >
        <Group justify="flex-end" mt="md">
          <Button
            disabled={!editForm.isDirty()}
            type="submit"
            leftSection={<IconDeviceFloppy />}
          >
            Submit
          </Button>
        </Group>
      </AutoForm>
    </>
  );
};

export default EditResource;
