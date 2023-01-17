import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "../config/theme";
import store from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </DndProvider>
    </ChakraProvider>
  );
}
