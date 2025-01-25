import { DataProvider, HttpError } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { getSession } from "next-auth/react";

export const dataProvider: DataProvider = {
  getApiUrl: () => "/backend-api",
  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const session = await getSession();
    return axiosInstance
      .get(`/backend-api/${resource}`, {
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
        params: {
          page: pagination?.current,
          size: pagination?.pageSize,
          filters,
          sorters,
        },
      })
      .then((res) => res.data)
      .catch((err) => {
        const error: HttpError = {
          message: err.response.data,
          statusCode: err.statusCode,
        };
        throw new Error("");
      });
  },
  create: async ({ resource, variables, meta }) => {
    const session = await getSession();
    return axiosInstance
      .post(`/backend-api/${resource}`, variables, {
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      })
      .catch((err) => {
        const error: HttpError = {
          message: err.response.data,
          statusCode: err.statusCode,
        };
        throw new Error("");
      });
  },
  update: async ({ resource, id, variables, meta }) => {
    const session = await getSession();
    return axiosInstance
      .patch(`/backend-api/${resource}/${id}`, variables, {
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      })
      .catch((err) => {
        let message = err.response.data;
        if (typeof message === "object") {
          message = Object.entries(message).reduce(
            (msg, [key, value]) => msg + "\n" + `${key}: ${value}`,
            ""
          );
        }
        const error: HttpError = {
          message,
          statusCode: err.statusCode,
        };
        throw new Error("");
      });
  },
  deleteOne: async ({ resource, id, variables, meta }) => {
    const session = await getSession();
    return axiosInstance
      .delete(`/backend-api/${resource}/${id}`, {
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      })
      .catch((err) => {
        const error: HttpError = {
          message: err.response.data,
          statusCode: err.statusCode,
        };
        throw new Error("");
      });
  },
  getOne: async ({ resource, id, meta }) => {
    const session = await getSession();
    return axiosInstance
      .get(`/backend-api/${resource}/${id}`, {
        headers: {
          Authorization: "Bearer " + session?.user.token,
        },
      })
      .then((res) => {
        return {
          data: {
            ...res.data,
          },
        };
      })
      .catch((err) => {
        const error: HttpError = {
          message: err.response.data,
          statusCode: err.statusCode,
        };
        throw new Error("");
      });
  },
  async custom({ method, url, payload }) {
    const session = await getSession();

    switch (method) {
      case "get":
        return axiosInstance
          .get(`/backend-api/${url}`, {
            headers: {
              Authorization: "Bearer " + session?.user.token,
            },
          })
          .catch((err) => {
            const error: HttpError = {
              message: err.response.data,
              statusCode: err.statusCode,
            };
            throw new Error("");
          });
      case "post":
        return axiosInstance
          .post(`/backend-api/${url}`, payload, {
            headers: {
              Authorization: "Bearer " + session?.user.token,
            },
          })
          .catch((err) => {
            const error: HttpError = {
              message: err.response.data,
              statusCode: err.statusCode,
            };
            throw new Error("");
          });
      case "patch":
        return axiosInstance
          .patch(`/backend-api/${url}`, payload, {
            headers: {
              Authorization: "Bearer " + session?.user.token,
            },
          })
          .catch((err) => {
            const error: HttpError = {
              message: err.response.data,
              statusCode: err.statusCode,
            };
            throw new Error("");
          });
      case "delete":
        return axiosInstance
          .delete(`/backend-api/${url}`, {
            headers: {
              Authorization: "Bearer " + session?.user.token,
            },
          })
          .catch((err) => {
            const error: HttpError = {
              message: err.response.data,
              statusCode: err.statusCode,
            };
            throw new Error("");
          });
    }
    return axiosInstance.get(url);
  },
};
