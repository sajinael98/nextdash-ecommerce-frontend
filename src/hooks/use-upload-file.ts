import { useCustomMutation } from "@refinedev/core";

export function useUploadFile() {
  const { isLoading, mutateAsync, isSuccess, error, isError } =
    useCustomMutation();

  function uploadFile(file: File) {
    return mutateAsync({
      method: "post",
      url: "/files/upload",
      values: {
        file,
      },
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    });
  }

  return { uploadFile, isLoading, isSuccess, error, isError };
}
