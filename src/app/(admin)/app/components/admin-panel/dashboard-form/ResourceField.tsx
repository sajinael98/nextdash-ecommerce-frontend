import { ComboboxItem, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { LogicalFilter, useDataProvider } from "@refinedev/core";
import { useQuery } from "@tanstack/react-query";
import React, { FocusEventHandler, useMemo, useState } from "react";
import { useFormContext } from ".";
import { ResourceField as Field } from "./types";

const ResourceField: React.FC<
  Field & {
    resource: string | undefined;
    optionLabel: string;
  }
> = (props) => {
  const {
    name,
    defaultValue = "",
    onChange,
    onBlur,
    value,
    optionLabel = "title",
    resource,
    filters,
  } = props;
  if (!resource) {
    throw Error("resource are missing for: " + name);
  }
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 1000);
  const formCtx = useFormContext();
  const dataProvider = useDataProvider();

  const filtersArr = useMemo(() => {
    const filterList: LogicalFilter[] = filters
      ? filters(formCtx.getValues())
      : [];
    if (debouncedSearchValue) {
      filterList.push({
        field: optionLabel,
        operator: "contains",
        value: debouncedSearchValue,
      });
    }
    if (value) {
      filterList.push({
        field: "id",
        operator: "eq",
        value,
      });
    }
    return filterList;
  }, [debouncedSearchValue, formCtx.getValues(), value]);

  const query = useQuery({
    queryKey: ["select", resource, filtersArr],
    queryFn: ({ signal }) =>
      dataProvider().getList({
        resource,
        filters: filtersArr,
        pagination: {
          current: 0,
          mode: "client",
          pageSize: 20,
        },
        meta: {
          extraParams: {
            fields: "id," + optionLabel,
          },
        },
      }),
    initialData: () => [],
  });

  const data = useMemo(() => {
    return query.data?.map(
      (record: { [optionLabel]: unknown; id: number }) => ({
        label: record[optionLabel],
        value: String(record["id"]),
      })
    );
  }, [query.data]);
  const changeHandler = (value: string | null, option: ComboboxItem) =>
    onChange(value ? +value : null);

  const foucsHandler: FocusEventHandler<HTMLInputElement> = function (event) {
    onBlur(event.target.value);
  };

  return (
    <Select
      data={data}
      name={name}
      defaultValue={defaultValue as string}
      value={String(value || "")}
      onChange={changeHandler}
      onFocus={foucsHandler}
      onBlur={foucsHandler}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchable
      clearable
    />
  );
};

export default ResourceField;
