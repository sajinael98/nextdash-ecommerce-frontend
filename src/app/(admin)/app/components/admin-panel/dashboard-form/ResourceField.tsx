import { ComboboxItem, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useSelect } from "@refinedev/core";
import React, { FocusEventHandler, useMemo, useState } from "react";
import { Field } from "./types";

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
    required,
    value,
    optionLabel,
    resource,
  } = props;
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 1000);

  if (!resource) {
    throw Error("resource are missing for: " + name);
  }

  if (!optionLabel) {
    throw Error("optionLabel are missing for: " + name);
  }

  const { query } = useSelect({
    resource,
    defaultValue: value,
    optionLabel,
    pagination: {
      current: 1,
      pageSize: 20,
      mode: "client",
    },
    filters: debouncedSearchValue
      ? [
          {
            field: optionLabel,
            operator: "contains",
            value: debouncedSearchValue,
          },
        ]
      : [],
    queryOptions: {
      initialData: () => ({ data: [], total: 0 }),
    },
    defaultValueQueryOptions: {
      initialData: () => ({ data: [], total: 0 }),
      enabled: !!value,
    },
  });

  const data = useMemo(
    () =>
      query.data?.data.map((record) => ({
        label: record[optionLabel],
        value: String(record["id"]),
      })),
    [query.data?.data]
  );
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
      required={required}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      searchable
      clearable
    />
  );
};

export default ResourceField;
