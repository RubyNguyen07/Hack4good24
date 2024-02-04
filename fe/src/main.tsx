import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "@/pages/LandingPage";
import RootLayout from "./layouts/Layout";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./layouts/AdminLayout";
import CampaignMgmtPage from "./pages/CampaignMgmtPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      {
        element: <ProfileLayout />,
        path: "/profile",
        children: [{ path: "/profile", element: <ProfilePage /> }],
      },
      {
        element: <AdminLayout />,
        path: "/manage",
        children: [{ path: "/manage", element: <CampaignMgmtPage /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
