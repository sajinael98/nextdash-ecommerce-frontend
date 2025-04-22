import React, { useEffect, useMemo } from "react";
import { QueryField as Field } from "./types";
import { useFormContext } from ".";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@refinedev/simple-rest";
import { Select } from "@mantine/core";
import { getSession } from "next-auth/react";

const QueryField: React.FC<Field> = (props) => {
  const { query: getUrl, onChange, ...fieldProps } = props;
  const { getValues, setFieldValue } = useFormContext();
  const url = useMemo(() => getUrl(getValues()), [getValues()]);

  const query = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const session = await getSession();

      return axiosInstance.get(`/backend-api/${url}`, {
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      });
    },
    enabled: !!url,
  });

  useEffect(() => {
    if (!url) {
      return;
    }

    query.refetch();
  }, [url]);

  const data = useMemo(() => {
    return (
      query.data?.data?.map((d) => {
        return {
          label: String(d.label),
          value: String(d.value),
        };
      }) ?? []
    );
  }, [query.data?.data]);

  return (
    <Select
      data={data}
      {...fieldProps}
      onChange={(value) => {
        onChange(value)
        setFieldValue(props.name.replace("Id", ""), data.find(d => d.value === value).label)
      }}
      defaultValue={String(fieldProps.defaultValue)}
      value={String(fieldProps.value)}
      clearable
    />
  );
};

export default QueryField;
