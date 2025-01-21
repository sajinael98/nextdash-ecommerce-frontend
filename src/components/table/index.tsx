import {
  ActionIcon,
  Group,
  Menu,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconCaretUpDown, IconFilter } from "@tabler/icons-react";
import {
  flexRender,
  HeaderGroup,
  Table as ReactTable,
} from "@tanstack/react-table";
import React, { Fragment } from "react";

interface TableProps {
  table: ReactTable<any>;
}

interface TableHeaderGroupProps {
  groups: HeaderGroup<any>[];
}

const TableHeaderGroup: React.FC<TableHeaderGroupProps> = ({ groups }) => {
  return groups.map((headerGroup) => (
    <Fragment key={headerGroup.id}>
      {headerGroup.headers.map((header, index) => {
        return (
          <Table.Th
            key={header.id}
            w={header.getSize()}
            {...(["right", "left"].includes(
              header.column.getIsPinned() as string
            ) && {
              styles: {
                th: {
                  position: "sticky",
                  top: 0,
                  [header.column.getIsPinned() as string]: 0,
                },
              },
            })}
          >
            <Group justify="space-between">
              {flexRender(header.column.columnDef.header, header.getContext())}
              {!header.column.getIsPinned() && (
                <Group wrap="nowrap" gap="xs">
                  <Menu position="bottom-start" closeOnItemClick={false}>
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
                        <TextInput
                          value={header.column.getFilterValue() as string}
                          onChange={(event) => {
                            header.column.setFilterValue(event.target.value);
                          }}
                        />
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
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
      <Table.ScrollContainer minWidth={200}>
        <Table
          layout="fixed"
          verticalSpacing="xs"
          horizontalSpacing="xs"
          withColumnBorders
          withRowBorders
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>#</Table.Th>
              <TableHeaderGroup groups={table.getLeftHeaderGroups()} />
              <TableHeaderGroup groups={table.getCenterHeaderGroups()} />
              <TableHeaderGroup groups={table.getRightHeaderGroups()} />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Table.Tr key={row.id}>
                <Table.Td>{index + 1}</Table.Td>
                {row.getLeftVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
                {row.getCenterVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
                {row.getRightVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
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
