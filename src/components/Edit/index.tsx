"use client";

import AutoForm from "@components/autoform";
import { Badge, Button, Group, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  BaseRecord,
  UseFormReturnType,
  useResourceParams,
} from "@refinedev/core";
import { IChangeEvent } from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import { IconHistoryToggle, IconMenu2 } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FormEvent } from "react";

interface EditResource {
  schema: RJSFSchema;
  form: UseFormReturnType<BaseRecord>;
  onSubmit: (data: IChangeEvent<any, any, any>, event: FormEvent<any>) => void;
}

const EditResource: React.FC<EditResource> = ({ schema, form, onSubmit }) => {
  const { id } = useResourceParams();
  return (
    <>
      <Group mb="md" justify="space-between">
        <Text fz="h3" fw={500}>
          Resource Id: {id} <Badge variant="dot">saved</Badge>
          <Text fz="sm" c="dimmed">
            Last Modified Date:{" "}
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
        formData={form.query?.data?.data}
        formLoading={form.formLoading || form.query?.isFetching}
        onSubmit={onSubmit}
        schema={schema}
      />
    </>
  );
};

export default EditResource;
