import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const colors = {
  brand: {
    black: "#000",
    white: "#fff",
    background: "#E5E5E5",
    error: "#E53E3E",
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: {
    body: {
      bg: "brand.background",
    },
  },
};

const theme = extendTheme({ colors, config, styles });

export { theme };
