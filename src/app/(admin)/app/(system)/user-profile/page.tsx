"use client";

import { useRef } from "react";
import { Avatar, Button, Group, Input, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSession } from "next-auth/react";
import { useCustomMutation, useGetIdentity } from "@refinedev/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import AutoForm from "../components/admin-panel/autoform";
import { useUpdateUserPassword } from "@hooks/use-update-password";
import { useUpdateResourceValue } from "@hooks/use-update-resource-value";
import { useUploadFile } from "@hooks/use-upload-file";

interface UserProfile {
  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  image: string | undefined;
}

const userProfileSchema = {
  type: "object",
  properties: {
    accountInformation: {
      title: "Account Information",
      type: "object",
      properties: {
        firstName: { title: "First Name", type: "string" },
        lastName: { title: "Last Name", type: "string" },
        email: { title: "Email", type: "string" },
      },
    },
  },
};

const passwordSchema = {
  type: "object",
  properties: {
    password: { type: "string", widget: "password" },
  },
};

const UserProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateResourceValue } = useUpdateResourceValue();
  const { update } = useSession();
  const { data, isFetching } = useGetIdentity<UserProfile>({
    queryOptions: {
      select(data: any) {
        const [firstName, lastName] = data?.fullName.split(" ");
        return {
          id: data.id,
          firstName,
          lastName,
          email: data?.email,
          image: data.image,
        };
      },
      initialData: () => ({
        id: undefined,
        email: undefined,
        firstName: undefined,
        image: undefined,
        lastName: undefined,
      }),
    },
  });
  const { uploadFile, isLoading } = useUploadFile();
  const { updatePassword } = useUpdateUserPassword();
  const [
    isPasswordUpdateModalVisible,
    {
      open: showPasswordUpdateModalVisible,
      close: hidePasswordUpdateModalVisible,
    },
  ] = useDisclosure(false);
  const { mutateAsync: updateProfile } = useCustomMutation();

  if (isFetching) {
    return <div>loading...</div>;
  }

  const uploadImageHandler = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    const files = fileInputRef?.current?.files;
    if (files && files.length > 0) {
      const image = files[0];
      uploadFile(image).then((file) => {
        const imageUrl = file.data;
        updateResourceValue(
          "sysusers",
          data?.id as number,
          "profileImage",
          imageUrl
        ).then(() => {
          update({ image: imageUrl });
        });
      });
    }
  };

  const updateProfileHandler = (values: any) => {
    const { formData } = values;
    const { accountInformation } = formData;

    updateProfile({
      method: "patch",
      url: `/users/${data?.id}/update-profile`,
      values: accountInformation,
      successNotification(_data, _values, _resource) {
        return {
          type: "success",
          message: "Profile has been updated successfully.",
        };
      },
    }).then(() => {
      update({
        fullName: `${accountInformation.firstName} ${accountInformation.lastName}`,
        email: accountInformation.email,
      });
    });
  };

  return (
    <>
      <Modal
        title="Update Password"
        opened={isPasswordUpdateModalVisible}
        onClose={hidePasswordUpdateModalVisible}
        withinPortal
      >
        <AutoForm
          schema={passwordSchema}
          formValues={{}}
          onSubmit={(form) =>
            updatePassword(data?.id as number, form.formData.password).then(
              () => hidePasswordUpdateModalVisible()
            )
          }
        >
          <Group justify="flex-end">
            <Button
              type="submit"
              mt="md"
              leftSection={<IconDeviceFloppy />}
              loading={isLoading}
            >
              Update
            </Button>
          </Group>
        </AutoForm>
      </Modal>
      <Group justify="space-between" align="flex-start" mb="md">
        <Group>
          <Avatar
            h={120}
            w={120}
            onClick={uploadImageHandler}
            styles={{ root: { cursor: "pointer" } }}
            src={data?.image ? `/backend-api/files/${data.image}` : undefined}
          />
          <Input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            styles={{ wrapper: { display: "none" } }}
          />
          <div>
            <Text c="dimmed">
              Full Name:
              <Text
                fw={500}
                c="white"
              >{`${data?.firstName} ${data?.lastName}`}</Text>
            </Text>
            <Text c="dimmed">
              Email:
              <Text fw={500} c="white">
                {data?.email}
              </Text>
            </Text>
          </div>
        </Group>
        <Button
          mt="md"
          variant="light"
          onClick={showPasswordUpdateModalVisible}
        >
          Update Password
        </Button>
      </Group>
      <AutoForm
        formValues={{ accountInformation: data }}
        schema={userProfileSchema}
        onSubmit={updateProfileHandler}
      >
        <Group justify="flex-end">
          <Button type="submit" mt="md" leftSection={<IconDeviceFloppy />}>
            Save
          </Button>
        </Group>
      </AutoForm>
    </>
  );
};

export default UserProfilePage;
