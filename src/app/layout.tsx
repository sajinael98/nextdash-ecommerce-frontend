import {
  ColorSchemeScript,
  DirectionProvider,
  MantineProvider
} from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import RefineProvider from "@providers/refine-provider";
import React, { PropsWithChildren, Suspense } from "react";

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html dir="ltr">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Suspense>
          <DirectionProvider detectDirection>
            <MantineProvider
              defaultColorScheme="light"
              forceColorScheme="light"
            >
              <RefineProvider>{children}</RefineProvider>
            </MantineProvider>
          </DirectionProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
