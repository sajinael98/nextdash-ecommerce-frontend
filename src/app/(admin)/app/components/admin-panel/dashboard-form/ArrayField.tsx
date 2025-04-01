import { ActionIcon, Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import AutoForm, { getInitialValues, useFormContext } from ".";
import DashboardTable from "../table";
import { Field, Schema } from "./types";

const ArrayField: React.FC<Field & { schema: Schema }> = (props) => {
  const { schema, value = [], name } = props;
  const [
    createModalVisible,
    { open: showCreateModal, close: hideCreateModel },
  ] = useDisclosure(false);
  const [editModalVisible, { open: showEditModal, close: hideEditModel }] =
    useDisclosure(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const formCtx = useFormContext();
  const columns = useMemo<ColumnDef<any>[]>(
    () =>
      Object.entries(schema ?? {})
        .filter(([_, props]) => props.view)
        .map(([name, props]) => {
          return { accessorKey: name, header: props.label };
        })
        .concat([
          {
            accessorKey: "action",
            header: "",
            size: 20,
            cell(props: any) {
              const index = props.row.index;
              return (
                <>
                  <Group gap="xs" wrap="nowrap">
                    <ActionIcon
                      onClick={() => showEditModalHandler(index)}
                      size="sm"
                      variant="transparent"
                    >
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => removeRowHandler(index)}
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
        ]),
    []
  );

  const table = useReactTable({
    columns,
    data: value,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning: {
        right: ["action"],
      },
    },
  });

  function addRowHandler(values: any) {
    formCtx.insertListItem(name, values);
    hideCreateModel();
  }

  function showEditModalHandler(index: number) {
    setCurrentIndex(index);
    showEditModal();
  }

  function editRowHandler(values: any) {
    formCtx.replaceListItem(name, currentIndex, values);
    hideEditModel();
  }

  function removeRowHandler(index: number) {
    formCtx.removeListItem(name, index);
  }

  return (
    <>
      <Modal
        title={`Add ${name}`}
        opened={createModalVisible}
        onClose={hideCreateModel}
        size="lg"
        withinPortal
      >
        <AutoForm
          schema={schema}
          values={getInitialValues(schema)}
          onSubmit={addRowHandler}
          noSubmitButton
        />
      </Modal>
      <Modal
        title={`Edit ${name}`}
        opened={editModalVisible}
        onClose={hideEditModel}
        size="lg"
        withinPortal
      >
        <AutoForm
          schema={schema}
          values={value[currentIndex]}
          onSubmit={editRowHandler}
          noSubmitButton
        />
      </Modal>
      <DashboardTable table={table} />
      <Group mt="md">
        <Button variant="light" size="compact-sm" onClick={showCreateModal}>
          Add Row
        </Button>
      </Group>
    </>
  );
};

export default ArrayField;
