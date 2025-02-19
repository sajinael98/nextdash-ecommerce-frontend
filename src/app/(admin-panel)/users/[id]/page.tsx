"use client";

import ResourceForm from "@components/resource-form";
import { Button, Group, PasswordInput } from "@mantine/core";
import { useField } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useCustomMutation, useForm } from "@refinedev/core";
import React from "react";
import { userSchema } from "../form";

interface UpdatePasswordModalProps {
  onSubmit: (password: string) => void;
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  onSubmit,
}) => {
  const fld = useField({
    initialValue: "",
    validate: (value) =>
      value.length < 6 ? "password must be at least 6 digits" : null,
  });

  async function updateHandler() {
    const isInvalid = await fld.validate();
    if (isInvalid) {
      return;
    }
    onSubmit(fld.getValue());
    modals.close("update-password-modal");
  }

  return (
    <>
      <PasswordInput label="New Password" {...fld.getInputProps()} />
      <Group justify="flex-end" mt="md">
        <Button onClick={updateHandler}>Update</Button>
      </Group>
    </>
  );
};

const EditUserPage: React.FC<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const { mutate: updatePassword } = useCustomMutation();
  const form = useForm();

  function submitHandler(values: any) {
    form.onFinish(values);
  }

  function updatePasswordHandler(password: string) {
    updatePassword({
      method: "patch",
      url: `/sys-auth/${id}/password`,
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

  const updatePasswordModal = () =>
    modals.openConfirmModal({
      title: "Update Passowrd",
      modalId: "update-password-modal",
      children: <UpdatePasswordModal onSubmit={updatePasswordHandler} />,
      confirmProps: { display: "none" },
      cancelProps: { display: "none" },
    });

  return (
    <ResourceForm
      loading={form.formLoading}
      formValues={form.query?.data?.data}
      schema={userSchema}
      onSubmit={submitHandler}
      menuItems={[
        {
          label: 'Update Password',
          onClick(data) {
              updatePasswordModal()
          },
        }
      ]}
    />
  );
};

export default EditUserPage;
