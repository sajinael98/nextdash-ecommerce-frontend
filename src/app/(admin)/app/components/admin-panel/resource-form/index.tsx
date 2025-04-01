"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  Menu,
  Skeleton,
  Table
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  BaseRecord,
  useForm,
  useLogList,
  useResourceParams,
} from "@refinedev/core";
import { IconClock, IconMenu2 } from "@tabler/icons-react";
import React from "react";
import AutoForm from "../dashboard-form";
import { Schema } from "../dashboard-form/types";

interface ResourceFormProps {
  schema: Schema;
  menuItems?: { label: string; onClick: (values: BaseRecord) => void }[];
}

const FormSkeleton = () => (
  <Box pos="relative">
    <Group justify="flex-end" pos="absolute" top={-40} right={0}>
      <Skeleton w={120} h={40} />
      <Skeleton w={120} h={40} />
    </Group>
    <Grid mb="md">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Skeleton h={10} w={80} mb="sm" />
        <Skeleton h={40} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Skeleton h={10} w={80} mb="sm" />
        <Skeleton h={40} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Skeleton h={10} w={80} mb="sm" />
        <Skeleton h={40} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Skeleton h={10} w={80} mb="sm" />
        <Skeleton h={40} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Skeleton h={10} w={80} mb="sm" />
        <Skeleton h={200} />
      </Grid.Col>
    </Grid>
    <Group justify="flex-end">
      <Skeleton w={120} h={40} />
    </Group>
  </Box>
);

const AuditContent: React.FC<{ resource: string; id: number }> = (props) => {
  const { id, resource } = props;
  const { data, isFetching } = useLogList({
    resource,
    meta: {
      id,
    },
  });

  if (isFetching) {
    return <div>loading...</div>;
  }
  
  return (
    <Table striped highlightOnHover withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Action</Table.Th>
          <Table.Th>Date</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data?.data?.map((log, index) => (
          <Table.Tr key={index}>
            <Table.Td>{log.username}</Table.Td>
            <Table.Td>{log.action}</Table.Td>
            <Table.Td>{log.createdDate}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const { schema, menuItems = [] } = props;
  const { identifier, action, id } = useResourceParams();
  const { formLoading, onFinish, query } = useForm();

  if (!identifier) {
    throw Error("This component is allowed only for resources.");
  }

  function saveHandler(values: BaseRecord) {
    onFinish(values);
  }

  function auditHandler() {
    if (!id) {
      return;
    }
    modals.open({
      title: "History",
      size: "lg",
      children: (
        <AuditContent resource={identifier as string} id={id as number} />
      ),
    });
  }

  if (formLoading || query?.isFetching) {
    return <FormSkeleton />;
  }

  return (
    <Box pos="relative">
      {action === "edit" && (
        <Group justify="flex-end" pos="absolute" top={-40} right={0}>
          <Button
            leftSection={<IconClock />}
            onClick={auditHandler}
            variant="light"
          >
            Audit
          </Button>
          <Menu>
            <Menu.Target>
              <Button leftSection={<IconMenu2 />} variant="light">
                Menu
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.label}
                  onClick={() => item.onClick(query?.data?.data ?? {})}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Group>
      )}
      <AutoForm
        schema={schema}
        onSubmit={saveHandler}
        values={query?.data?.data ?? { isNew: action === "create" }}
      />
    </Box>
  );
};

export default ResourceForm;
