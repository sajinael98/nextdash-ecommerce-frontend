import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Menu,
  Skeleton,
  Switch,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CanAccess, useDeleteMany, useResourceParams } from "@refinedev/core";
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
import DashboardTable from "../table";

interface ResourceListProps {
  columns: ColumnDef<any>[];
}

const ResourceListSkeleton = () => (
  <Box pos="relative">
    <Group justify="flex-end" pos="absolute" top={-40} right={0}>
      <Skeleton w={120} h={40} />
      <Skeleton w={120} h={40} />
      <Skeleton w={120} h={40} />
      <Divider orientation="vertical" />
      <Skeleton w={120} h={40} />
    </Group>
    <Box pt="md">
      <Skeleton h={300} />
    </Box>
  </Box>
);

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
        size: 70,
        enableColumnFilter: false,
        header: ({ table }) => (
          <Checkbox
            label="#"
            labelPosition="left"
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            label={row.index + 1}
            labelPosition="left"
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
          <CanAccess action="update">
            <ActionIcon
              size="sm"
              variant="transparent"
              component={Link}
              href={`/app/${resource.name}/${getValue() as number}`}
            >
              <IconEdit />
            </ActionIcon>
          </CanAccess>
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
    defaultColumn: {
      size: 200,
      minSize: 200,
    },
    getRowId: (row) => row.id,
  });
  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    [table.getSelectedRowModel().rows.map((row) => row.original)]
  );
  function deleteHandler() {
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

  if (table.refineCore.tableQuery.isFetching) {
    return <ResourceListSkeleton />;
  }

  return (
    <CanAccess action="read">
      <Box pos="relative">
        <Group justify="flex-end" pos="absolute" top={-40} right={0}>
          <Menu closeOnItemClick={false}>
            <Menu.Target>
              <div>
                <Button
                  leftSection={<IconColumns />}
                  variant="light"
                  visibleFrom="md"
                >
                  Columns
                </Button>
                <ActionIcon hiddenFrom="md" variant="light">
                  <IconColumns />
                </ActionIcon>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              {table
                .getAllColumns()
                .filter((column) => !["id", "select-col"].includes(column.id))
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
            visibleFrom="md"
          >
            Refresh
          </Button>
          <ActionIcon
            hiddenFrom="md"
            variant="light"
            onClick={() => table.refineCore.tableQuery.refetch()}
          >
            <IconRotate />
          </ActionIcon>
          <Menu>
            <Menu.Target>
              <div>
                <Button
                  leftSection={<IconMenu2 />}
                  variant="light"
                  visibleFrom="md"
                >
                  Menu
                </Button>
                <ActionIcon variant="light" hiddenFrom="md">
                  <IconMenu2 />
                </ActionIcon>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <CanAccess action="delete">
                <Menu.Item onClick={deleteHandler}>Delete</Menu.Item>
              </CanAccess>
            </Menu.Dropdown>
          </Menu>
          <Divider orientation="vertical" />
          <CanAccess action="create">
            <Button
              leftSection={<IconPlus />}
              component={Link}
              href={`/app/${resource.name}/create`}
              visibleFrom="md"
            >
              New
            </Button>
            <ActionIcon
              component={Link}
              href={`/${resource.name}/create`}
              hiddenFrom="md"
            >
              <IconPlus />
            </ActionIcon>
          </CanAccess>
        </Group>
        <Box pt="md">
          <DashboardTable table={table} />
        </Box>
      </Box>
    </CanAccess>
  );
};

export default ResourceList;
