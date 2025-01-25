"use client";
import AdminPanelLayout from "@components/admin-panel-layout";
import React, { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default layout;
