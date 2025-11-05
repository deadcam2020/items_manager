// src/router/appRouter.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthLayout } from "@/layouts/AuthLayout";
import { HomeLayout } from "@/layouts/HomeLayout";
import { AdminLayout } from "@/layouts/AdminLayout";

import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { ProfilePage } from "@/auth/pages/ProfilePage";
import { ProfileUpdatePage } from "@/auth/pages/ProfileUpdatePage";
import { UploadPage } from "@/auth/pages/UploadPage";
import { AdminPage } from "@/auth/pages/AdminPage";

import { HomePage } from "@/items/pages/HomePage";
import { SearchPage } from "@/items/pages/SearchPage";

import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
  AdminRoute,
} from "@/auth/components/routes/ProtectedRoutes";
import MyProductsPage from "@/items/pages/MyProductsPage";
import ProductPage from "@/items/pages/ProductPage";

export const appRouter = createBrowserRouter([
  // public routes
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
    ],
  },

  // authenticated user routes
  {
    path: "/",
    element: (
      <AuthenticatedRoute>
        <HomeLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "profile/update", element: <ProfileUpdatePage /> },
      { path: "upload", element: <UploadPage /> },
      { path: "myproducts", element: <MyProductsPage/> },
      { path: "product/:id", element: <ProductPage/> }


    ],
  },

  // admin routes
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminPage /> },
    ],
  },

  // Catch-all (404)
  { path: "*", element: <Navigate to="/" /> },
]);
