"use client";

import {
  BaseRecord,
  useCreate,
  useList,
  useResourceParams,
  useUpdate,
} from "@refinedev/core";
import React, { useMemo } from "react";
import AutoForm from "../dashboard-form";
import { Schema } from "../dashboard-form/types";
import { FormSkeleton } from "../resource-form";

interface SettingFormProps {
  schema: Schema;
}
const SettingForm: React.FC<SettingFormProps> = (props) => {
  const { schema } = props;
  const { identifier: setting } = useResourceParams();
  if (!setting) {
    throw Error("only for setting form ");
  }
  const query = useList({
    resource: "settings",
    filters: [{ field: "title", operator: "eq", value: setting }],
    meta: {
      extraParams: {
        fields: "id,data",
      },
    },
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });

  const create = useCreate({
    resource: "settings",
  });

  const update = useUpdate({
    resource: "settings",
  });

  const values = useMemo(() => {
    if (query.isFetched) {
      return JSON.parse(query.data?.data[0].data);
    }
    return {};
  }, [query.isFetched, query.data?.data]);

  async function saveHandler(values: BaseRecord) {
    try {
      const payload = {
        resource: "settings",
        values: {
          title: setting,
          data: JSON.stringify(values),
        },
      };
      if (query.data?.total) {
        await update.mutateAsync({
          id: query.data.data[0].id,
          ...payload,
        });
      } else {
        await create.mutateAsync(payload);
      }
    } finally {
      query.refetch();
    }
  }

  if (query.isFetching || create.isLoading) {
    return <FormSkeleton />;
  }

  return <AutoForm onSubmit={saveHandler} values={values} schema={schema} />;
};

export default SettingForm;
