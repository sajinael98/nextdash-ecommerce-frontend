import { MantineColor } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { NotificationProvider } from "@refinedev/core";

export const notificationProvider: NotificationProvider = {
  open(params) {
    const types: { [key: string]: MantineColor } = {
      error: "red",
    };
    notifications.show({
      color: types[params.type],
      title: params.message,
      message: params.description,
    });
  },
  close(key) {
    // throw Error("close is not implemented in NotificationProvider");
  },
};
