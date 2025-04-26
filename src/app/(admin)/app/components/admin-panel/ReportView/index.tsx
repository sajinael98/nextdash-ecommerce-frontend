"use client";

import {
  Box,
  Button,
  Menu,
  Portal,
  ScrollArea,
  SimpleGrid,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { useCustom, useExport } from "@refinedev/core";
import { IconMenu2, IconRefresh } from "@tabler/icons-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useMemo, useRef, useState } from "react";
import AutoFormBuilder from "../auto-form-builder";
import { AutoFormBuilderHandle } from "../auto-form-builder/types";
import { ReportViewProps } from "./types";

const ReportViewSkeleton = () => {
  return (
    <Table highlightOnHover withColumnBorders withTableBorder withRowBorders>
      <Table.Thead>
        <Table.Tr>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Table.Th key={index}>
                <Skeleton h={30} />
              </Table.Th>
            ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Table.Tr key={index}>
              <Table.Td>
                <Skeleton h={30} />
              </Table.Td>
              <Table.Td>
                <Skeleton h={30} />
              </Table.Td>
              <Table.Td>
                <Skeleton h={30} />
              </Table.Td>
              <Table.Td>
                <Skeleton h={30} />
              </Table.Td>
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table>
  );
};

const ReportView: React.FC<ReportViewProps> = (props) => {
  const { filters, reportName, columns: getColumns } = props;

  const filtersFormRef = useRef<AutoFormBuilderHandle | null>(null);

  const [filterValues, setFilterValues] = useState<
    Record<string, any> | undefined
  >();

  const report = useCustom({
    method: "get",
    url: "/reports",
    meta: {
      params: {
        reportName,
        ...filterValues,
      },
    },
    queryOptions: {
      queryKey: ["report", reportName],
      enabled: false,
    },
  });

  useExport({
    
  })

  const columns = useMemo<ColumnDef<any>[]>(() => {
    if (report.isFetched) {
      return getColumns({}, report.data?.data.data);
    }
    return [];
  }, [report.data?.data]);

  const data = useMemo(() => {
    if (report.isFetched) {
      return report.data?.data.data;
    }
    return [];
  }, [report.data?.data]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    defaultColumn: {
      minSize: 200,
      maxSize: 300,
    },
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  function refreshHandler(values: Record<string, any>) {
    setFilterValues(values);
    report.refetch();
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 4 }} mb="md">
        <AutoFormBuilder
          ref={filtersFormRef}
          fields={filters}
          fieldContainer={(props, field) => (
            <>
              <Box>
                <Text>{props.label}</Text>
                {field}
              </Box>
            </>
          )}
          onSubmit={refreshHandler}
        />
      </SimpleGrid>
      <Portal target="#page-actions">
        <Menu withinPortal>
          <Menu.Target>
            <Button variant="light" leftSection={<IconMenu2 />} w={120}>
              Menu
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Print</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button
          leftSection={<IconRefresh />}
          w={120}
          onClick={() => filtersFormRef.current?.submit()}
        >
          Refresh
        </Button>
      </Portal>
      {report.isRefetching && <ReportViewSkeleton />}
      {report.isFetched && !report.isRefetching && (
        <>
          <ScrollArea w={"100%"}>
            <Table.ScrollContainer
              ref={parentRef}
              mih={virtualizer.getTotalSize()}
              mah={700}
              minWidth={200}
            >
              <Table
                fz="xs"
                highlightOnHover
                withColumnBorders
                withTableBorder
                striped
                withRowBorders
              >
                <Table.Thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <Table.Th
                          bg="light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-8))"
                          key={header.id}
                          colSpan={header.colSpan}
                          style={{ width: header.column.getSize() }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Table.Th>
                      ))}
                    </Table.Tr>
                  ))}
                </Table.Thead>
                <Table.Tbody>
                  {virtualizer.getVirtualItems().map((virtualRow, index) => {
                    const row = rows[virtualRow.index];
                    return (
                      <Table.Tr
                        key={row.id}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${
                            virtualRow.start - index * virtualRow.size
                          }px)`,
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <Table.Td key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Table.Td>
                        ))}
                      </Table.Tr>
                    );
                  })}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </ScrollArea>
          <Text fz="sm" c="dimmed" pl="xs" mb="md">
            Rows Count: {report.data?.data.data.length}
          </Text>
        </>
      )}
    </>
  );
};

export default ReportView;
