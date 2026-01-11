import "./index.css";
import "./i18n/i18n";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";
import { applyTheme, getInitialTheme } from "./theme/theme";

applyTheme(getInitialTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
