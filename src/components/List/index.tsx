import DashboardTable from "@components/table";
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Group,
  Menu,
  Switch,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDeleteMany, useResourceParams } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import {
  IconColumns,
  IconEdit,
  IconMenu2,
  IconPlus,
  IconRotate,
} from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useMemo } from "react";

interface ResourceListProps {
  columns: ColumnDef<any>[];
}
const ResourceList: React.FC<ResourceListProps> = ({ columns: cols }) => {
  const { resource } = useResourceParams();
  if (!resource?.name) {
    throw Error("this component is only used with resource.");
  }
  const { mutate } = useDeleteMany();
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "select-col",
        size: 50,
        enableColumnFilter: false,
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...cols,
      {
        accessorKey: "id",
        header: "",
        size: 30,
        cell: ({ getValue }) => (
          <ActionIcon
            size="sm"
            variant="transparent"
            component={Link}
            href={`/${resource.name}/${getValue() as number}`}
          >
            <IconEdit />
          </ActionIcon>
        ),
      },
    ],
    []
  );
  const table = useTable<any>({
    columns,
    state: {
      columnPinning: {
        right: ["id"],
      },
    },
    getRowId: (row) => row.id,
  });
  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    [table.getSelectedRowModel().rows.map((row) => row.original)]
  );
  function deleteHandler() {
    console.log(selectedRows)
    const ids = selectedRows.map((row) => row.id);
    if (!ids.length) {
      notifications.show({
        color: "red",
        message: "no rows are selected!",
      });
      return;
    }
    mutate({
      ids,
      resource: resource?.name as string,
    });
  }
  return (
    <>
      <Group justify="flex-end" mb="md">
        <Menu closeOnItemClick={false}>
          <Menu.Target>
            <Button leftSection={<IconColumns />} variant="light">
              Columns
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            {table
              .getAllColumns()
              .filter((column) => column.id !== "id")
              .map((column) => (
                <Menu.Item key={column.id}>
                  <Switch
                    label={column?.columnDef?.header?.toString() ?? ""}
                    checked={column.getIsVisible()}
                    onChange={() => column.toggleVisibility()}
                  />
                </Menu.Item>
              ))}
          </Menu.Dropdown>
        </Menu>
        <Button
          leftSection={<IconRotate />}
          variant="light"
          onClick={() => table.refineCore.tableQuery.refetch()}
        >
          Refresh
        </Button>
        <Menu>
          <Menu.Target>
            <Button leftSection={<IconMenu2 />} variant="light">
              Menu
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={deleteHandler}>Delete</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Divider orientation="vertical" />
        <Button
          leftSection={<IconPlus />}
          component={Link}
          href={`/${resource.name}/create`}
        >
          New
        </Button>
      </Group>
      <DashboardTable table={table} />
    </>
  );
};

export default ResourceList;
