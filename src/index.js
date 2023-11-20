//Updated: 19-nov-2023 @Sakthi

//Import React Libraries
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Import Webpages
import Home from "./components/Home/home"
import Payment from "./components/Payment/MakePayment/payment";
import ErrorPage from "./components/Error/errorPage"
import AddBeneficiary from "./components/Payment/AddBeneficiary/addBeneficiary";
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup"


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
    path: "/addbeneficiary",
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