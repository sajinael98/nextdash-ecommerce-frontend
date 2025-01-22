"use client";

import {
  Button,
  Container,
  Flex,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLogin } from "@refinedev/core";

const LoginPage = () => {
  const { getInputProps, onSubmit } = useForm({
    initialValues: {
      username: "system-admin",
      password: "123456",
    },
  });
  const { mutate: signIn } = useLogin();

  function signInHandler(values: { username: string; password: string }) {
    signIn(values);
  }
  return (
    <Container bg="dark.8" styles={{ root: { height: "100vh" } }} fluid>
      <Flex justify="center" align="center" h="100%">
        <Paper p="md" w={300} bg="dark.6" shadow="md">
          <form onSubmit={onSubmit(signInHandler)}>
            <TextInput
              label="Username"
              mb="md"
              c="white"
              {...getInputProps("username")}
            />
            <PasswordInput
              label="Password"
              mb="md"
              c="white"
              {...getInputProps("password")}
            />
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </form>
        </Paper>
      </Flex>
    </Container>
  );
};

export default LoginPage;
