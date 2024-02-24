import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App";
import { RouterProvider } from "react-router-dom";



const rootElement = document.getElementById("root");

if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
      <RouterProvider router={router} />
  );
} else {
  console.error("Failed to find the root element");
}
