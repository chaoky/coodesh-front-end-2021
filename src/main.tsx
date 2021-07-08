import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { RouteProvider } from "./hooks/router";

ReactDOM.render(
  <React.StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
