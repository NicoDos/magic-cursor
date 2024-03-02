import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MagicCursor, MagicCursorProvider } from "../../lib";

import "./index.css";
import "../../lib/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MagicCursorProvider thickness={2}>
      <MagicCursor />
      <App />
    </MagicCursorProvider>
  </React.StrictMode>
);
