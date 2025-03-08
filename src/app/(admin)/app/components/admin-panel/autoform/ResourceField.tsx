import { ComboboxItem, Select } from "@mantine/core";
import { useSelect } from "@refinedev/core";
import { FieldProps } from "@rjsf/utils";
import React, { FocusEventHandler, useMemo } from "react";

const SelectField: React.FC<FieldProps> = (props) => {
  const {
    name,
    idSchema,
    schema,
    defaultValue = "",
    formData = "",
    onChange,
    onBlur,
    readonly,
    required,
    disabled,
  } = props;
  const { resource, optionLabel } = schema;
  if (!resource) {
    throw Error("resource are missing for: " + name);
  }

  if (!optionLabel) {
    throw Error("optionLabel are missing for: " + name);
  }

  const { query } = useSelect({
    resource,
    defaultValue: formData,
    optionLabel,
    pagination: {
      current: 1,
      pageSize: 20,
      mode: "client",
    },

    queryOptions: {
      initialData: () => ({ data: [], total: 0 }),
    },
    defaultValueQueryOptions: {
      initialData: () => ({ data: [], total: 0 }),
      enabled: !!formData,
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
    onBlur(idSchema.$id, event.target.value);
  };

  return (
    <Select
      data={data}
      id={idSchema.$id}
      name={name}
      defaultValue={defaultValue as string}
      value={String(formData || "")}
      onChange={changeHandler}
      onFocus={foucsHandler}
      onBlur={foucsHandler}
      readOnly={readonly}
      required={required}
      disabled={disabled ?? query.isFetching}
    />
  );
};

export default SelectField;
