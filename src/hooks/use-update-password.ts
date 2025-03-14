import { useCustomMutation } from "@refinedev/core";

export function useUpdateUserPassword() {
  const { mutateAsync, isLoading, error, isSuccess } = useCustomMutation();

  function updatePassword(userId: number, password: string) {
    return mutateAsync({
      method: "patch",
      url: `/sys-auth/${userId}/password`,
      values: {
        password,
      },
      successNotification(_data, _values, _resource) {
        return {
          type: "success",
          message: "password has been updated successfully.",
        };
      },
    });
  }
  
  return {
    updatePassword,
    error,
    isLoading,
    isSuccess
  }
}
