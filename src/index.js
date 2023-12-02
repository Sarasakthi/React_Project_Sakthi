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
import Signout from "./components/Signout/signout";


//Routing Browser - Default
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/addbeneficiary",
    element: <AddBeneficiary />,
  },
  {
    path: "/signout",
    element: <Signout />,
  }
])

//Creating a roor for rendering - Default
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode> 
  //enabling React Strict mode renders useEffect twice
    <RouterProvider router={router} />
  //</React.StrictMode>
);