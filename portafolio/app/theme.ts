import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
    pixel: "var(--font-pixel)",
  },
  colors: {
    brand: {
      50: "#f3ebff",
      100: "#dcc9ff",
      200: "#c3a4ff",
      300: "#a97fff",
      400: "#9059ff",
      500: "#7735ff",
      600: "#5d27cc",
      700: "#431b99",
      800: "#2b1066",
      900: "#160734",
    },
    surface: {
      950: "#070709",
      900: "#0f0f14",
      800: "#181821",
      700: "#22222d",
    },
  },
  styles: {
    global: {
      body: {
        bg: "surface.950",
        color: "gray.100",
        overflowX: "hidden",
      },
      "::selection": {
        bg: "brand.500",
        color: "white",
      },
      /* Custom modern scrollbar styles */
      "::-webkit-scrollbar": {
        width: "8px",
      },
      "::-webkit-scrollbar-track": {
        bg: "surface.950",
      },
      "::-webkit-scrollbar-thumb": {
        bg: "brand.800",
        borderRadius: "4px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        bg: "brand.600",
      },
    },
  },
});

export default theme;
