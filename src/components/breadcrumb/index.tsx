import { Breadcrumbs, Text } from "@mantine/core";
import { useBreadcrumb } from "@refinedev/core";
import Link from "next/link";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumbs className="breadcrumb">
      <Text c="dimmed">Pages</Text>
      {breadcrumbs.slice(0, 1).map((breadcrumb) => {
        return (
          <Text
            c="dimmed"
            href={breadcrumb.href || ("" as string)}
            key={`breadcrumb-${breadcrumb.label}`}
            component={Link}
          >
            {breadcrumb.label}
          </Text>
        );
      })}
    </Breadcrumbs>
  );
};
