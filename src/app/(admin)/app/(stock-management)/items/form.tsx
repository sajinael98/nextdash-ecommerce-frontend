"use client"

import {
  Button,
  Checkbox,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { BaseRecord, useCustomMutation, useList } from "@refinedev/core";
import React, { useMemo } from "react";
import { Schema } from "../../components/admin-panel/dashboard-form/types";
import ResourceForm from "../../components/admin-panel/resource-form";

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

export const ItemForm = () => {
  const schema = useMemo<Schema>(
    () => ({
      title: {
        type: "string",
        label: "Title",
        required: true,
        disabled(values) {
          return !!values.variantInformation.template;
        },
      },
      enabled: {
        type: "boolean",
        label: "Enabled",
        default: true,
      },
      websiteInformation: {
        type: "object",
        label: "Website",
        fullWidth: true,
        schema: {
          published: {
            type: "boolean",
            label: "Published",
          },
          publishedDate: {
            type: "date",
            label: "Published Date",
          },
        },
      },
      variantInformation: {
        type: "object",
        label: "Variants Information",
        fullWidth: true,
        schema: {
          hasSubItems: {
            type: "boolean",
            label: "Is Template",

            disabled(values) {
              return !values.isNew;
            },
          },
          template: {
            type: "string",
            label: "Parent Item",
            disabled(values) {
              return !!values.variantInformation.templateId;
            },
            visible(values) {
              return !!values.variantInformation.templateId;
            },
          },
          values: {
            type: "array",
            label: "Variants",
            fullWidth: true,
            validate: (value, values) => {
              return values?.variantInformation.hasSubItems
                ? isNotEmpty("Enter at least one variant")(value)
                : null;
            },
            visible(values) {
              return (
                values.variantInformation.templateId ||
                values.variantInformation.hasSubItems
              );
            },
            disabled(values) {
              return !values.isNew;
            },
            schema: {
              variantId: {
                type: "resource",
                label: "Variant",
                resource: "variants",
                optionLabel: "title",
              },
              variant: {
                type: "string",
                label: "Variant",
                view: true,
                visible: () => false,
              },
              value: {
                type: "string",
                label: "Value",
                visible(values) {
                  return !!values.value;
                },
              },
            },
            change: {
              variantId: function (value, values, { setFieldValue }) {
                if (!value) {
                  return;
                }
              },
            },
          },
        },
      },
      uoms: {
        type: "array",
        label: "Uom",
        fullWidth: true,
        required: true,
        validate: (value) => {
          if (value.length === 0) {
            return "include one uom at least.";
          }
          if (value[0].value !== 1) {
            return "first uom should have '1' as value";
          }
        },
        disabled(values) {
          return !!values.variantInformation.templateId;
        },
        schema: {
          uomId: {
            type: "resource",
            label: "Uom",
            resource: "uoms",
            optionLabel: "uom",
            required: true,
          },
          uom: {
            type: "string",
            label: "Uom",
            view: true,
            visible: () => false,
          },
          value: {
            type: "number",
            label: "Value",
            view: true,
            required: true,
          },
        },
        change: {
          uomId: function (value, values, { setFieldValue }) {
            if (!value) {
              return;
            }
          },
        },
      },
    }),
    []
  );
  return (
    <ResourceForm
      schema={schema}
      menuItems={[
        {
          label: "Create Variants",
          onClick(values) {
            modals.open({
              children: <Modal values={values} />,
            });
          },
        },
      ]}
    />
  );
};
