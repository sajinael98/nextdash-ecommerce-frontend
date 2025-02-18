import { axiosInstance } from "@refinedev/simple-rest";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials, req) {
    const response = await axiosInstance.post(
      "http://localhost:8080/sys-auth/login",
      {
        username: credentials?.username,
        password: credentials?.password,
      }
    );
    const { id, username, email, token, roles, permissions, profileImage: image, fullName } = response.data;
    return {
      id,
      username,
      email,
      token,
      roles,
      permissions,
      image,
      fullName,
    };
  },
});
