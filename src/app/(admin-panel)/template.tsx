"use client";

import { Authenticated, useResourceParams } from "@refinedev/core";
import React, { PropsWithChildren } from "react";

const DashboardTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  const { identifier, action = "" } = useResourceParams();
  return (
    <Authenticated
      key={`${identifier}-action`}
      params={{
        identifier,
        action,
      }}
    >
      {children}
    </Authenticated>
  );
};

export default DashboardTemplate;
