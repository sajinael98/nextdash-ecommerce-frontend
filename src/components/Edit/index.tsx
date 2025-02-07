"use client";

import AutoForm from "@components/autoform";
import DashboardTable from "@components/table";
import { Badge, Button, Group, Menu, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  BaseRecord,
  UseFormReturnType,
  useLogList,
  useResourceParams,
} from "@refinedev/core";
import { IChangeEvent } from "@rjsf/core";
import { RJSFSchema } from "@rjsf/utils";
import {
  IconDeviceFloppy,
  IconHistoryToggle,
  IconMenu2,
} from "@tabler/icons-react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Log } from "@types";
import dayjs from "dayjs";
import { FormEvent, useEffect, useMemo } from "react";

interface EditResource {
  schema: RJSFSchema;
  form: UseFormReturnType<BaseRecord>;
  onSubmit: (data: IChangeEvent<any, any, any>, event: FormEvent<any>) => void;
  menuItems?: { label: string; onClick: VoidFunction }[];
}

const EditResource: React.FC<EditResource> = ({
  schema,
  form,
  onSubmit,
  menuItems = [],
}) => {
  const { id, identifier } = useResourceParams();
  const [visible, { open, close }] = useDisclosure(false);
  const editForm = useForm();
  const columns = useMemo<ColumnDef<Log>[]>(
    () => [
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "createdDate",
        header: "Date",
      },
      {
        accessorKey: "action",
        header: "Action",
      },
    ],
    []
  );
  const logsResults = useLogList<Log[]>({
    resource: identifier as string,
    meta: {
      id,
    },
    queryOptions: {
      enabled: visible,
    },
  });
  const logs = useMemo(() => logsResults?.data?.data ?? [], [logsResults.data]);

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  useEffect(() => {
    if (form.query?.isFetched) {
      editForm.setValues(form.query.data?.data);
      editForm.resetDirty();
    }
  }, [form.query?.isFetched]);

  const items = menuItems.map((item) => (
    <Menu.Item key={item.label} onClick={item.onClick}>
      {item.label}
    </Menu.Item>
  ));
  return (
    <>
      <Modal size="lg" title="Audit Logs" onClose={close} opened={visible}>
        <DashboardTable table={table} />
      </Modal>
      <Group mb="md" justify="space-between">
        <Text fz="h3" fw={500}>
          Resource Id: {id}
          {editForm.isDirty() ? (
            <Badge variant="dot" color="red">
              not saved
            </Badge>
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
          <Button
            w={120}
            leftSection={<IconHistoryToggle />}
            variant="light"
            onClick={() => open()}
          >
            Audit
          </Button>
          <Menu disabled={menuItems.length === 0}>
            <Menu.Target>
              <Button w={120} leftSection={<IconMenu2 />} variant="light">
                Menu
              </Button>
            </Menu.Target>
            <Menu.Dropdown>{items}</Menu.Dropdown>
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
