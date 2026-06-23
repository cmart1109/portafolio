"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import theme from "./theme";
import { LanguageProvider } from "./LanguageContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ChakraProvider>
  );
}
