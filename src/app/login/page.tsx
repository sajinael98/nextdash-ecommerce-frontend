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
import img from "../../../public/undraw_secure-login_m11a.svg";

const LoginPage = () => {
  const { getInputProps, onSubmit } = useForm({
    initialValues: {
      username: "system-admin",
      password: "123456",
    },
  });
  const { mutate: signIn, isLoading, isSuccess } = useLogin();

  const signInHandler = onSubmit((values) => {
    signIn(values);
  });

  return (
    <Container bg="dark.7" styles={{ root: { height: "100vh" } }} fluid>
      <Flex justify="center" align="center" h="100%">
        <Box flex={1} h="60%" pos="relative" visibleFrom="md">
          <Image src={img} fill alt="authentication vector" />
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
            <LoadingOverlay visible={isLoading || isSuccess} />
            <Title order={2}>Welcome To NextDash</Title>
            <TextInput label="Username" {...getInputProps("username")} />
            <PasswordInput label="Password" {...getInputProps("password")} />
            <Anchor>Forget your password?</Anchor>
            <Button type="submit">Sign In</Button>
          </Paper>
        </Flex>
      </Flex>
    </Container>
  );
};

export default LoginPage;
