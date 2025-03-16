import { axiosInstance } from "@refinedev/simple-rest";
import CredentialsProvider from "next-auth/providers/credentials";

export const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text" },
    password: { label: "Password", type: "password" },
  },

  authorize(credentials, req) {
    return axiosInstance
      .post("http://localhost:8080/sys-auth/login", {
        username: credentials?.username,
        password: credentials?.password,
      })
      .then((response) => {
        const { username: name, profileImage: image, ...user } = response.data;
        return {
          name,
          image,
          ...user,
        };
      });
  },
});
