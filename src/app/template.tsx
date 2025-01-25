"use client";

import { useDocumentTitle } from "@mantine/hooks";
import { useResourceParams } from "@refinedev/core";
import React, { PropsWithChildren } from "react";

const Template: React.FC<PropsWithChildren> = ({ children }) => {
  const { identifier } = useResourceParams();
  useDocumentTitle(identifier as string);
  return children;
};

export default Template;
