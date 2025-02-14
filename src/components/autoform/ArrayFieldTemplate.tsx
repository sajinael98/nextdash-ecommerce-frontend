"use client";

import DashboardTable from "@components/table";
import { ActionIcon, Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ArrayFieldTemplateProps } from "@rjsf/utils";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";

const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = (props) => {
  const { items, onAddClick, formData, schema, title } = props;
  const [visible, { close, open }] = useDisclosure();
  const [currentRow, setCurrentRow] = useState<number>(-1);

  function openModalHandler(index: number) {
    setCurrentRow(index);
    open();
  }

  const columns = useMemo(
    () =>
      Object.entries(schema.items.properties)
        .filter(([_, props]) => (props as { view?: boolean })?.view)
        .reduce(
          (cols, [field, { title }]) => {
            cols.push({
              id: field,
              header: title,
              accessorKey: field,
            });
            return cols;
          },
          [
            {
              accessorKey: "action",
              header: "",
              size: 20,
              cell(props) {
                const index = props.row.index;
                const item = items[index];
                return (
                  <>
                    <Group gap="xs" wrap="nowrap">
                      <ActionIcon
                        onClick={() => openModalHandler(index)}
                        size="sm"
                        variant="transparent"
                      >
                        <IconEdit />
                      </ActionIcon>
                      <ActionIcon
                        onClick={() => item?.onDropIndexClick(index)()}
                        size="sm"
                        variant="transparent"
                      >
                        <IconTrash />
                      </ActionIcon>
                    </Group>
                  </>
                );
              },
            },
          ]
        ),
    [items]
  );

  const table = useReactTable({
    columns,
    data: formData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnPinning: {
        right: ["action"],
      },
    },
    defaultColumn: {
      size: 200,
    },
  });

  useEffect(() => {
    if (currentRow > -1 && !visible) {
      open();
    }
  }, [currentRow, visible]);

  useEffect(() => {
    if (currentRow !== -1 && !visible) {
      setCurrentRow(-1);
    }
  }, [visible]);

  return (
    <>
      {currentRow > -1 && (
        <Modal
          title={`${title} row: ${currentRow + 1}`}
          opened={visible}
          onClose={close}
          size="xl"
        >
          {items[currentRow].children}
        </Modal>
      )}
      <DashboardTable table={table} />
      <Button
        onClick={() => {
          onAddClick();
          table.setColumnFilters([]);
        }}
        variant="outline"
        size="compact-sm"
        w={120}
      >
        Add
      </Button>
    </>
  );
};
export default ArrayFieldTemplate;
