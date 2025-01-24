import DashboardTable from "@components/table";
import { ActionIcon, Button, Group, LoadingOverlay } from "@mantine/core";
import { useResourceParams } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { IconEdit, IconPlus } from "@tabler/icons-react";
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
        size: 50,
        cell: ({ getValue }) => (
          <ActionIcon
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
