import { Breadcrumbs, Text } from "@mantine/core";
import { useBreadcrumb } from "@refinedev/core";
import Link from "next/link";

export const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  return (
    <Breadcrumbs className="breadcrumb">
      <Text>Pages</Text>
      {breadcrumbs.map((breadcrumb) => {
        return (
          <Text href={breadcrumb.href as string} key={`breadcrumb-${breadcrumb.label}`} component={Link}>{breadcrumb.label}</Text>
        );
      })}
    </Breadcrumbs>
  );
};
