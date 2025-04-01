"use client";

import { Anchor, Breadcrumbs, Title } from "@mantine/core";
import { useBreadcrumb, useResourceParams } from "@refinedev/core";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

const DashboardTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const { breadcrumbs } = useBreadcrumb();
  const { identifier } = useResourceParams();
  return (
    <>
      <Breadcrumbs>
        {breadcrumbs.map((b) => (
          <Anchor
            key={b.label}
            {...(!!b?.href && {
              component: Link,
              href: b.href,
            })}
          >
            {b.label}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Title tt="capitalize" mb="md">
        {identifier}
      </Title>
      {children}
    </>
  );
};

export default DashboardTemplate;
