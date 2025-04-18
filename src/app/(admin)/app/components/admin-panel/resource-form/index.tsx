"use client";

import { Box, Button, Grid, Group, Menu, Skeleton, Table } from "@mantine/core";
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
import { FieldChange, Schema } from "../dashboard-form/types";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { axiosInstance } from "@refinedev/simple-rest";

interface ResourceFormProps {
  schema: Schema;
  menuItems?: { label: string; onClick: (values: BaseRecord) => void }[];
  readOnly?: boolean;
  change?: FieldChange;
  confirmable?: boolean;
}

export const FormSkeleton = () => (
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
  const {
    schema,
    menuItems = [],
    readOnly = false,
    change = {},
    confirmable,
  } = props;
  const { identifier, action, id } = useResourceParams();
  const router = useRouter();
  const { formLoading, onFinish, query, mutation } = useForm({
    onMutationSuccess(data, variables, context, isAutoSave) {
      if (action === "create") {
        router.push(`/app/${identifier}/${data.data.id}`);
      } else {
        router.replace(`/app/${identifier}/${data.data.id}`);
      }
    },
  });

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

 async function changeStatusHandler(status: "DRAFT" | "CONFIRMED") {
   const modalConfig = {
     title: status === "DRAFT" ? "Cancel" : "Confirm",
     message: "Are you sure you want to proceed?",
     actionUri: status === "DRAFT" ? "cancel" : "confirm",
   };

   modals.openConfirmModal({
     title: modalConfig.title,
     children: modalConfig.message,
     labels: { confirm: "Yes", cancel: "No" },
     onConfirm: async () => {
       try {
         const session = await getSession();
         if (!session?.user.token) {
           throw new Error("User token is missing");
         }

         await axiosInstance.patch(
           `/backend-api/${identifier}/${id}/${modalConfig.actionUri}`,
           { status },
           {
             headers: {
               Authorization: `Bearer ${session.user.token}`,
             },
           }
         );

         query?.refetch();
       } catch (error) {
         console.error("Error updating status:", error);
         // Optionally, display an error message to the user
       }
     },
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
              {query?.data?.data.status === "CONFIRMED" && (
                <Menu.Item onClick={() => changeStatusHandler("DRAFT")}>
                  Cancel
                </Menu.Item>
              )}
              {confirmable && query?.data?.data.status === "DRAFT" && (
                <Menu.Item onClick={() => changeStatusHandler("CONFIRMED")}>
                  Confirm
                </Menu.Item>
              )}
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
        readOnly={readOnly || query?.data?.data.status === "CONFIRMED"}
        change={change}
      />
    </Box>
  );
};

export default ResourceForm;
