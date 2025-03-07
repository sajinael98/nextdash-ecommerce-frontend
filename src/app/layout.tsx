import {
  ColorSchemeScript,
  DirectionProvider
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
            <RefineProvider>{children}</RefineProvider>
          </DirectionProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
