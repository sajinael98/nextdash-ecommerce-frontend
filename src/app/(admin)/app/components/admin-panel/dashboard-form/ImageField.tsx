import { ActionIcon, Box, FileInput, Image } from "@mantine/core";
import { useCustomMutation } from "@refinedev/core";
import { FieldProps } from "@rjsf/utils";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Field } from "./types";

const ImageField: React.FC<Field> = (props) => {
  const { name, value: image, onChange, required } = props;
  const [value, setValue] = useState<File | null>(null);
  const { isLoading, mutateAsync } = useCustomMutation();

  useEffect(() => {
    if (value) {
      mutateAsync({
        method: "post",
        url: "/files/upload",
        values: {
          file: value,
        },
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
        .then((r) => {
          onChange(r.data);
        })
        .catch((err) => {
          setValue(null);
        });
    }
  }, [value]);

  function deleteFileHandler() {
    onChange(undefined);
    setValue(null);
  }
  return (
    <>
      {!image && (
        <FileInput
          value={value}
          onChange={setValue}
          clearable
          disabled={isLoading}
          name={name}
          required={required}
        />
      )}
      {image && (
        <Box pos="relative" w={100} h={100}>
          <ActionIcon
            pos="absolute"
            size="xs"
            radius="50%"
            top={5}
            right={5}
            color="red"
            variant="light"
            onClick={deleteFileHandler}
          >
            <IconTrash />
          </ActionIcon>
          <Image
            w={100}
            h={100}
            radius="md"
            mt="md"
            src={`/backend-api/files/${image}`}
            alt={name}
          />
        </Box>
      )}
    </>
  );
};

export default ImageField;
