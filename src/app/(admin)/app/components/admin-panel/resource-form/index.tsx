"use client";

import { Box, Button, Group, LoadingOverlay, Menu } from "@mantine/core";
import { BaseRecord, useForm, useResourceParams } from "@refinedev/core";
import { IconClock, IconMenu2 } from "@tabler/icons-react";
import React, { PropsWithChildren } from "react";
import AutoForm from "../dashboard-form";
import { Schema } from "../dashboard-form/types";

interface ResourceFormProps {
  schema: Schema;
  menuItems?: { label: string; onClick: (values: BaseRecord) => void }[];
}

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

  const visible = formLoading || query?.isFetching;

  return (
    <>
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
                    onClick={() => item.onClick(query?.data?.data)}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        )}
        <LoadingOverlay
          visible={visible}
          loaderProps={{ children: "Loading..." }}
        />
        {(query?.isFetched || action === "create") && (
          <AutoForm
            schema={schema}
            onSubmit={saveHandler}
            values={query?.data?.data ?? { isNew: action === "create" }}
          />
        )}
        {query?.isFetching && (
          <AutoForm schema={schema} onSubmit={saveHandler} />
        )}
      </Box>
    </>
  );
};

export default ResourceForm;
