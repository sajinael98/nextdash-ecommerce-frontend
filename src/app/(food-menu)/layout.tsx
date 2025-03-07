"use client";

import {
  Box,
  colorsTuple,
  createTheme,
  MantineProvider,
  useDirection,
} from "@mantine/core";
import Image from "next/image";
import React, { PropsWithChildren, useEffect } from "react";

const theme = createTheme({
  colors: {
    mPrimary: colorsTuple("rgba(27, 63, 1, 1)"),
  },
  primaryColor: "mPrimary",
  primaryShade: 8,
});

const FoodMenuLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { setDirection } = useDirection();

  useEffect(() => {
    setDirection("rtl");
    return () => {
      setDirection("ltr");
    };
  }, []);

  return (
    <>
      <Image
        src="/food-menu/welcome.jpeg"
        alt="background"
        layout="fill"
        objectFit="cover"
        style={{zIndex: -1}}
      />
      <Box
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          "background-color": "rgba(255, 255, 255, 00)",
          "-webkit-backdrop-filter": "blur(5px)",
          "backdrop-filter": "blur(5px)",
        }}
      />
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </>
  );
};

export default FoodMenuLayout;
