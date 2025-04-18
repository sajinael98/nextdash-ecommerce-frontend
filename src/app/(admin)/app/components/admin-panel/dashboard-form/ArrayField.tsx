import { ActionIcon, Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { BaseRecord } from "@refinedev/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import AutoForm, { useFormContext } from ".";
import DashboardTable from "../table";
import { ArrayField as Field, Schema } from "./types";

function getValue(obj: Record<string, object>, key: string) {
  if (typeof obj !== "object" || obj === null || typeof key !== "string") {
    return undefined;
  }

  const keys = key.split(".");

  let current = obj;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }

  return current;
}

const ArrayField: React.FC<Field & { schema: Schema }> = (props) => {
  const { schema, value = [], name, change } = props;
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
                      onClick={() => editRowHandler(index)}
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
  function addRowHandler() {
    const modalId = "add" + name;
    function submitHandler(values: BaseRecord) {
      formCtx.insertListItem(name, values);
      console.log(formCtx.getValues());
      formCtx.setFieldValue(name, [...getValue(formCtx.getValues(), name)]);
      modals.close(modalId);
    }
    modals.open({
      modalId,
      title: "Add Row",
      children: (
        <AutoForm schema={schema} onSubmit={submitHandler} change={change} />
      ),
      size: "lg",
    });
  }

  function editRowHandler(index: number) {
    const modalId = "edit" + name + index;
    function submitHandler(values: BaseRecord) {
      formCtx.replaceListItem(name, index, values);
      formCtx.setFieldValue(name, [...getValue(formCtx.getValues(), name)]);
      modals.close(modalId);
    }
    modals.open({
      modalId,
      title: "Edit Row: " + index,
      children: (
        <AutoForm
          schema={schema}
          onSubmit={submitHandler}
          values={getValue(formCtx.getValues(), name)[index]}
          change={change}
        />
      ),
      size: "lg",
    });
  }

  function removeRowHandler(index: number) {
    formCtx.removeListItem(name, index);
  }
  return (
    <>
      <DashboardTable table={table} />
      <Group mt="sm">
        <Button variant="light" size="compact-sm" onClick={addRowHandler}>
          Add Row
        </Button>
      </Group>
    </>
  );
};

export default ArrayField;
