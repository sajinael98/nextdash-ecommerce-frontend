import { AuditLogProvider, HttpError } from "@refinedev/core";
import { axiosInstance } from "@refinedev/simple-rest";
import { getSession } from "next-auth/react";

export const auditLogProvider: AuditLogProvider = {
    async create(params) {
        try {
            const session = await getSession();
            const { resource, meta, action, data, previousData, author } = params;
            const log = {
                resource,
                action,
                data: JSON.stringify(data),
                previousData: JSON.stringify(previousData),
                resourceId: meta?.id,
                username: author?.username
            }

            await axiosInstance.post("/backend-api/audit-logs", log, {
                headers: {
                    Authorization: 'Bearer ' + session?.user.token,
                },
            })
            return { success: true };
        } catch (err: any) {
            // const error: HttpError = {
            //     message: err.response.data,
            //     statusCode: err.statusCode,
            // };
            // throw new HttpErrorResponse(error);
        }
    },
    async get(params) {
        const resource = params.resource;
        const resourceId = params?.meta?.id
        try {
            const session = await getSession();

            return await axiosInstance.get("/backend-api/audit-logs", {
                headers: {
                    Authorization: 'Bearer ' + session?.user.token,
                },
                params: {
                    resource,
                    resourceId
                }
            })
        } catch (err: any) {
            // const error: HttpError = {
            //     message: err.response.data,
            //     statusCode: err.statusCode,
            // };
            // throw new HttpErrorResponse(error);
        }
    },
    update(params) {
        throw Error("not allowed!")
    },
}