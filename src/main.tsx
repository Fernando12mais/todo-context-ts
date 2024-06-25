import React from "react";
import ReactDOM from "react-dom/client";
import { TodoContextProvider } from "./context/todo-context";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/*", element: <Navigate to={"/"} /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TodoContextProvider>
      <RouterProvider router={router} />
    </TodoContextProvider>
  </React.StrictMode>
);
