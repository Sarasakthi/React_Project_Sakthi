//Updated: 10-nov-2023 @Sakthi

//Import React Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import Webpages
import Home from "./home"
import Payment from "./payment";
import ErrorPage from "./errorPage";
import AddBeneficiary from "./addBeneficiary";
import Login from "./login";
import Signup from "./signup"


//Routing Browser - Default
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/addBeneficiary",
    element: <AddBeneficiary />,
  }
])

//Creating a roor for rendering - Default
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);