import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { theme as chakraTheme } from "@chakra-ui/react";

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props: any) => ({
      dialog: {
        bg: mode("white", "#141214")(props),
      },
    }),
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "gray.700")(props),
    },
  }),
};

const fonts = {
  ...chakraTheme,
  heading: "NotoSans",
  body: "NotoSans",
};

const colors = {};

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const theme = extendTheme({ config, fonts, colors, components, styles });
export default theme;
