import {
  DataProvider,
  DeleteOneResponse,
  GetOneResponse,
  HttpError,
} from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { AxiosError } from "axios";
import { getSession } from "next-auth/react";

function errorHandler(error: AxiosError<any> | any) {
  const err: HttpError = {
    message: error.response?.data,
    statusCode: error.response?.status ?? 500,
  };
  return Promise.reject(err);
}

async function getCommonHeaders(
  resource: string,
  action: "create" | "update" | "read" | "delete" = "read"
) {
  const session = await getSession();

  return {
    Authorization: "Bearer " + session?.user.token,
    "x-entity": resource,
    "x-action": action,
  };
}

const dataProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  getList: async ({ resource, pagination, sorters, filters }) => {
    const headers = await getCommonHeaders(resource);
    const params = {
      page: pagination?.current ?? 1,
      size: pagination?.pageSize ?? 20,
      filters,
      sorters,
    };
    try {
      const response = await axiosInstance.get(apiUrl + `/${resource}`, {
        headers,
        params,
      });

      return response.data;
    } catch (error) {
      return errorHandler(error);
    }
  },
  create: async function ({ resource, variables }) {
    const headers = await getCommonHeaders(resource, "create");
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/${resource}`,
        variables,
        {
          headers,
        }
      );

      return response.data;
    } catch (error) {
      errorHandler(error);
    }
  },
  update: async function ({ resource, id, variables }) {
    const headers = await getCommonHeaders(resource, "update");
    try {
      const response = await axiosInstance.patch(
        `${apiUrl}/${resource}/${id}`,
        variables,
        {
          headers,
        }
      );

      return { data: response.data };
    } catch (error) {
      return errorHandler(error);
    }
  },
  deleteOne: async function ({ resource, id }) {
    const headers = await getCommonHeaders(resource, "delete");
    try {
      await axiosInstance.delete(`${apiUrl}/${resource}/${id}`, {
        headers,
      });

      return { data: { id } } as DeleteOneResponse<any>;
    } catch (error) {
      return errorHandler(errorHandler);
    }
  },
  getOne: async function ({ resource, id, meta }) {
    const headers = await getCommonHeaders(resource, "read");
    try {
      const response = await axiosInstance.get(`${apiUrl}/${resource}/${id}`, {
        headers,
      });

      return {
        data: response.data,
      } as GetOneResponse<any>;
    } catch (error) {
      return errorHandler(error);
    }
  },
  async custom(params) {
    const session = await getSession();
    const headers = {
      Authorization: "Bearer " + session?.user.token,
      ...params.headers,
    };
    console.log(params.payload);
    switch (params.method) {
      case "post":
        return axiosInstance.post(`${apiUrl}/${params.url}`, params.payload, {
          headers,
        });

      case "patch":
        return axiosInstance.patch(`${apiUrl}/${params.url}`, params.payload, {
          headers,
        });
      default:
        throw Error(params.method + "not implement yet");
    }
  },
});

export const defaultDataProvider = dataProvider("/backend-api");
