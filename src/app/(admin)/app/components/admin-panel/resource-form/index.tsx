"use client";

import {
  Box,
  Button,
  Grid,
  Group,
  LoadingOverlay,
  Menu,
  SimpleGrid,
  Skeleton,
} from "@mantine/core";
import { BaseRecord, useForm, useResourceParams } from "@refinedev/core";
import { IconClock, IconMenu2 } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";
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

const ResourceForm: React.FC<ResourceFormProps> = (props) => {
  const { schema, menuItems = [] } = props;
  const { identifier, action } = useResourceParams();
  const { formLoading, onFinish, query } = useForm();

  if (!identifier) {
    throw Error("This component is allowed only for resources.");
  }

  function saveHandler(values: BaseRecord) {
    onFinish(values);
  }

  if (formLoading || query?.isFetching) {
    return <FormSkeleton />;
  }

  return (
    <Box h={400} pos="relative">
      {action === "edit" && (
        <Group justify="flex-end" pos="absolute" top={-40} right={0}>
          <Button leftSection={<IconClock />} variant="light">
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
