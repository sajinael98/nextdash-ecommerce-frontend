import DashboardTable from "@components/table";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Menu,
  Switch,
} from "@mantine/core";
import { useResourceParams } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import {
  IconColumns,
  IconEdit,
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
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
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
  });

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
