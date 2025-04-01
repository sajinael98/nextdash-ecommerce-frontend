"use client";

import ResourceForm from "@app/(admin)/app/components/admin-panel/resource-form";
import {
  Button,
  Checkbox,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { BaseRecord, useCustomMutation, useList } from "@refinedev/core";
import React from "react";
import { itemSchema } from "../form";

const Modal: React.FC<{ values: BaseRecord }> = ({ values }) => {
  const itemId = values.id;
  const variantIds = values.variantInformation.values.map(
    (variant: { variantId: number }) => variant.variantId
  );

  const results = useList({
    resource: "variants",
    filters: [
      {
        field: "id",
        operator: "in",
        value: variantIds,
      },
    ],
    queryOptions: {
      enabled: variantIds.length > 0,
    },
  });
  const { getInputProps, onSubmit, isDirty } = useForm();
  const createSubItems = useCustomMutation();

  if (!variantIds.length) {
    notifications.show({
      color: "red",
      message: "cannot create variants because is not a tamplate item",
    });
    return;
  }

  if (results.isFetching) {
    return <div>loading</div>;
  }

  const variants = results?.data?.data;
  function submitHandler(values: { [key: string]: boolean }) {
    // Extract selected variants
    const selectedVariants = Object.entries(values)
      .filter(([, value]) => value) // Keep only truthy values
      .map(([key]) => key); // Extract the keys
    
    // Group variant values into a Map
    const variantValues = selectedVariants.reduce<{ [key: string]: string[] }>(
      (map, variantValue) => {
        const [variant, value] = variantValue.split("-");

        // Validate the split result
        if (!variant || !value) {
          console.warn(`Invalid variant format: ${variantValue}`);
          return map;
        }

        // Initialize or update the array for the variant
        let currentValues: string[];
        if (variant in map) {
          currentValues = map[variant];
        } else {
          currentValues = [];
        }

        currentValues.push(value);
        map[variant] = currentValues;
        return map;
      },
      {}
    );

    createSubItems
      .mutateAsync({
        method: "post",
        url: `/items/${itemId}/sub-items`,
        values: variantValues,
      })
      .then(() => {
        notifications.show({
          message: "variants have been created.",
        });
      });
  }
  
  return (
    <form onSubmit={onSubmit(submitHandler)}>
      <SimpleGrid cols={2}>
        {variants?.map((variant) => (
          <Stack key={variant.id}>
            <Text>{variant.title}</Text>
            {variant.values.map((value: { label: string; value: string }) => (
              <Checkbox
                size="sm"
                key={value.label}
                label={value.label}
                {...getInputProps(`${variant.id}-${value.label}`)}
              />
            ))}
          </Stack>
        ))}
      </SimpleGrid>
      <Group w="100%" justify="flex-end">
        <Button size="compact-sm" type="submit" disabled={!isDirty()}>
          Save
        </Button>
      </Group>
    </form>
  );
};
const EditItemPage = () => {
  return (
    <>
      <ResourceForm
        schema={itemSchema}
        menuItems={[
          {
            label: "Create Variants",
            onClick(values) {
              modals.open({
                children: <Modal values={values} />
              });
            },
          },
        ]}
      />
    </>
  );
};

export default EditItemPage;
