//Updated: 05-nov-2023 @Sakthi

//Import React Libraries
import React from "react"
import { ReactDOM } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import Webpages
import Home from "./home"
import ErrorPage from "./errorPage";


//Routing Browser - Default
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  }
])

//Creating a roor for rendering - Default
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
    <RouterProvider router={router} />
  </React.StrictMode>
);