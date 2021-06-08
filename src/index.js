import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { SessionProvider } from "./context/Session";

ReactDOM.render(
  <SessionProvider>
    <App />
  </SessionProvider>,
  document.getElementById("root")
);
