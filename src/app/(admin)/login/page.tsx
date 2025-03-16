"use client";

import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  LoadingOverlay,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLogin } from "@refinedev/core";
import Image from "next/image";

const LoginPage = () => {
  const { getInputProps, onSubmit, ...form } = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "system-admin",
      password: "123456",
    },
    validate: {
      username: (value) => (value ? null : "required"),
      password: (value) => {
        if (!value) {
          return "required";
        }
        return value.length < 6
          ? "password length should not be less than 6 digits."
          : null;
      },
    },
  });
  const { mutate: signIn, isLoading, isSuccess, reset } = useLogin();

  const signInHandler = onSubmit((values) => {
    signIn(values, {
      onSuccess(data, _variables, _context) {
        if (!data.success) {
          form.setFieldError("password", data.error?.message);
          reset();
        }
      },
    });
  });

  const formLoading = isLoading || isSuccess;

  return (
    <Container bg="dark.7" styles={{ root: { height: "100vh" } }} fluid>
      <Flex justify="center" align="center" h="100%">
        <Box flex={1} h="60%" pos="relative" visibleFrom="md">
          <Image src={"/login.svg"} fill alt="authentication vector" />
        </Box>
        <Flex flex={1} justify="center" align="center" mih="100%">
          <Paper
            onSubmit={signInHandler}
            component="form"
            radius="md"
            bg="dark"
            withBorder
            p="xl"
            h="100%"
            styles={{
              root: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "stretch",
                gap: "var(--mantine-spacing-md)",
                position: "relative",
              },
            }}
          >
            <LoadingOverlay visible={formLoading} />
            <Title order={2}>Welcome To NextDash</Title>
            <TextInput label="Username" {...getInputProps("username")} />
            <PasswordInput label="Password" {...getInputProps("password")} />
            <Anchor>Forget your password?</Anchor>
            <Button type="submit" disabled={formLoading}>
              Sign In
            </Button>
          </Paper>
        </Flex>
      </Flex>
    </Container>
  );
};

export default LoginPage;
