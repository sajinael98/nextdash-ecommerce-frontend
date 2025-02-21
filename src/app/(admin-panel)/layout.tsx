"use client";
import AdminPanelLayout from "@components/admin-panel-layout";
import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <AdminPanelLayout>{children}</AdminPanelLayout>;
};

export default Layout;
