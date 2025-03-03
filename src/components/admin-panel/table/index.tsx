import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Menu,
  Table,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCaretUpDown, IconDatabase, IconFilter } from "@tabler/icons-react";
import {
  Column,
  flexRender,
  HeaderGroup,
  Table as ReactTable,
} from "@tanstack/react-table";
import React, { Fragment, useEffect } from "react";

interface TableProps {
  table: ReactTable<any>;
}

interface TableHeaderGroupProps {
  groups: HeaderGroup<any>[];
}

interface FilterProps {
  column: Column<any>;
}

const Filter: React.FC<FilterProps> = ({ column }) => {
  const { getInputProps, onSubmit, setFieldValue } = useForm({
    [column.id]: "",
  });

  function submitHandler(values: any) {
    column.setFilterValue(values[column.id]);
  }

  useEffect(() => {
    setFieldValue(column.id, column.getFilterValue());
  }, []);

  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <TextInput mb="md" {...getInputProps(column.id)} />
      <Group justify="flex-end">
        <Button size="compact-sm" type="submit">
          Filter
        </Button>
      </Group>
    </form>
  );
};
const TableHeaderGroup: React.FC<TableHeaderGroupProps> = ({ groups }) => {
  return groups.map((headerGroup) => (
    <Fragment key={headerGroup.id}>
      {headerGroup.headers.map((header, index) => {
        return (
          <Table.Th
            key={header.id}
            w={
              header?.column?.columnDef?.size ??
              header.getSize() < header.getSize()
                ? header.column.columnDef.size
                : header.getSize()
            }
            {...(["right", "left"].includes(
              header.column.getIsPinned() as string
            ) && {
              styles: {
                th: {
                  position: "sticky",
                  right: 0,
                  [header.column.getIsPinned() as string]: 0,
                  background: "var(--mantine-dashboard-bg)",
                },
              },
            })}
          >
            <Group justify="space-between">
              {flexRender(header.column.columnDef.header, header.getContext())}
              {!header.column.getIsPinned() && (
                <Group wrap="nowrap" gap="xs">
                  {header.column.getCanFilter() && (
                    <Menu closeOnItemClick={false}>
                      <Menu.Target>
                        <ActionIcon
                          size="sm"
                          variant="transparent"
                          {...(!!header.column.getFilterValue() && {
                            color: "green",
                          })}
                        >
                          <IconFilter />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Search</Menu.Label>
                        <Menu.Item>
                          <Filter column={header.column} />
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                  {header.column.getCanSort() && (
                    <Menu position="bottom-start">
                      <Menu.Target>
                        <ActionIcon size="sm" variant="transparent">
                          <IconCaretUpDown />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Label>Sort By</Menu.Label>
                        <Menu.Item
                          onClick={() => header.column.toggleSorting(false)}
                        >
                          ASC
                        </Menu.Item>
                        <Menu.Item
                          onClick={() => header.column.toggleSorting(true)}
                        >
                          DESC
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  )}
                </Group>
              )}
            </Group>
          </Table.Th>
        );
      })}
    </Fragment>
  ));
};

const DashboardTable: React.FC<TableProps> = ({ table }) => {
  return (
    <>
      <Table.ScrollContainer
        minWidth={200}
        // {...(table.getRowCount() !== 0 && { h: 100, mah: 500 })}
        styles={{
          scrollContainerInner: {
            minHeight: 100,
            maxHeight: 500,
          },
        }}
      >
        <Table
          layout="fixed"
          verticalSpacing="xs"
          horizontalSpacing="xs"
          withRowBorders
          withTableBorder
          styles={{
            td: {
              padding: 5,
            },
            th: {
              padding: 5,
            },
          }}
        >
          <Table.Thead>
            <Table.Tr>
              <TableHeaderGroup groups={table.getLeftHeaderGroups()} />
              <TableHeaderGroup groups={table.getCenterHeaderGroups()} />
              <TableHeaderGroup groups={table.getRightHeaderGroups()} />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {table.getRowCount() === 0 && (
              <Table.Tr>
                <Table.Td colSpan={table.getAllColumns().length + 1}>
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    h={200}
                  >
                    <ThemeIcon variant="transparent">
                      <IconDatabase />
                    </ThemeIcon>
                    <Text>No Data</Text>
                  </Flex>
                </Table.Td>
              </Table.Tr>
            )}
            {table.getRowModel().rows.map((row, index) => (
              <Table.Tr key={row.id}>
                {row.getLeftVisibleCells().map((cell) => (
                  <Table.Td
                    key={cell.id}
                    styles={(theme) => ({
                      td: {
                        position: "sticky",
                        right: 0,
                        background: "var(--mantine-dashboard-bg)",
                      },
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
                {row.getCenterVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
                {row.getRightVisibleCells().map((cell) => (
                  <Table.Td
                    key={cell.id}
                    styles={(theme) => ({
                      td: {
                        position: "sticky",
                        right: 0,
                        background: "var(--mantine-dashboard-bg)",
                      },
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Group mt="md">
        <Text size="sm" c="dimmed">
          Count: {table.getRowCount()}
        </Text>
      </Group>
    </>
  );
};

export default DashboardTable;
