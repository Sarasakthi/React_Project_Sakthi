//Updated: 10-nov-2023 @Sakthi

//Import React Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import Webpages
import Home from "./home"
import Payment from "./payment";
import ErrorPage from "./errorPage";
import Contact from "./contact";


//Routing Browser - Default
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/contact",
    element: <Contact />,
  }
])

//Creating a roor for rendering - Default
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);