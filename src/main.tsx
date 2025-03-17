import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#E3FCEC", // verde menta claro
      100: "#C6F6D5", // verde claro
      500: "#319795", // verde azulado
      700: "#285E61", // verde profundo
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
