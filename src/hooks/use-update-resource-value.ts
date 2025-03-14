import { useApiUrl, useCustomMutation } from "@refinedev/core";

export function useUpdateResourceValue() {
  const { mutateAsync, isLoading, error, isError, isSuccess } = useCustomMutation();

  function updateResourceValue(
    resource: string,
    resourceId: number,
    column: string,
    value: any
  ) {
    return mutateAsync({
      method: "patch",
      url: `/resources/${resource}/${resourceId}`,
      values: {
        column,
        value,
      },
    });
  }
  return { updateResourceValue, isLoading, error, isSuccess };
}
