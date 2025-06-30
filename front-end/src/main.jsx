import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginSection from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import MarketplaceHome from "./pages/Marketplace/marketplaceHome.jsx";
import DetailProduct from "./pages/Marketplace/DetailProduct.jsx";
import AllProducts from "./pages/Marketplace/AllProducts.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import DashboardProducts from "./pages/Dashboard/DashboardProducts.jsx";
import DashboardAddProducts from "./pages/Dashboard/DashboardAddProducts.jsx";
import DashboardEditProducts from "./pages/Dashboard/DashboardEditProducts.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/loginsection",
    element: <LoginSection />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Dashboard/DashboardHome",
    element: <DashboardHome />,
  },
  // {
  //   path: "/editpesanan/:id",
  //   element: <EditPesanan />,
  // },
  {
    path: "/Marketplace/MarketplaceHome",
    element: <MarketplaceHome />,
  },
  {
    path: "/Marketplace/DetailProduct/:id",
    element: <DetailProduct />,
  },
  {
    path: "/Marketplace/AllProducts",
    element: <AllProducts />,
  },
  {
    path: "/Dashboard/DashboardProducts",
    element: <DashboardProducts />,
  },
  {
    path: "/Dashboard/DashboardAddProducts",
    element: <DashboardAddProducts />,
  },
  {
    path: "/Dashboard/DashboardEditdProducts/:id",
    element: <DashboardEditProducts />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
