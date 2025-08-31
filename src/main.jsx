import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./app/providers/AppProvider";
import { appRouter } from "./app/router";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="app-container">
      <AppProvider>
        <RouterProvider router={appRouter} />
      </AppProvider>
    </div>
  </StrictMode>
);
