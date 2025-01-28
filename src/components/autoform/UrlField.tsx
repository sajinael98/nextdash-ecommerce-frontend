import { Select } from "@mantine/core";
import { FieldProps } from "@rjsf/utils";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@refinedev/simple-rest";
import { useSession } from "next-auth/react";

const UrlField: React.FC<FieldProps<any, any, any>> = (props) => {
  const {
    id,
    name,
    schema,
    onChange,
    onBlur,
    onFocus,
    defaultValue = "",
  } = props;

  const session = useSession();
  if (!schema.url) {
    throw Error(`url is required for ${name}`);
  }

  const { data, isFetching } = useQuery({
    queryKey: [name],
    queryFn: ({ signal }) =>
      axiosInstance.get(`/backend-api/${schema.url}`, {
        headers: {
          Authorization: `Bearer ${session.data?.user.token}`,
        },
        signal,
      }),
    initialData: () => [],
  });

  return (
    <Select
      id={id}
      name={name}
      data={data?.data}
      onChange={(value) => onChange(value)}
      onBlur={(event) => onBlur(id as string, event.target.value)}
      onFocus={(event) => onFocus(id as string, event.target.value)}
      disabled={isFetching}
      defaultValue={defaultValue as string}
    />
  );
};

export default UrlField;
