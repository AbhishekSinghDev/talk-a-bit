import "./App.css";
import Router from "./routes/Router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChakraProvider } from "@chakra-ui/react";
import ChatContextProvider from "./context/ChatContextProvider";

function App() {
  return (
    <ChatContextProvider>
      <ChakraProvider>
        <main>
          <Router />
          <ToastContainer />
        </main>
      </ChakraProvider>
    </ChatContextProvider>
  );
}

export default App;
