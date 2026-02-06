// src/router/appRouter.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";

import { AuthLayout } from "@/layouts/AuthLayout";
import { HomeLayout } from "@/layouts/HomeLayout";

import { LoginPage } from "@/auth/pages/LoginPage";
import { RegisterPage } from "@/auth/pages/RegisterPage";
import { ProfilePage } from "@/auth/pages/ProfilePage";
import { ProfileUpdatePage } from "@/auth/pages/ProfileUpdatePage";
import { UploadPage } from "@/auth/pages/UploadPage";

import { HomePage } from "@/items/pages/HomePage";
import { SearchPage } from "@/items/pages/SearchPage";

import {
  AuthenticatedRoute,
  NotAuthenticatedRoute,
  AdminRoute,
} from "@/auth/components/routes/ProtectedRoutes";
import MyProductsPage from "@/items/pages/MyProductsPage";
import ProductPage from "@/items/pages/ProductPage";
import { UpdateProductPage } from "@/items/pages/UpdateProductPage";
import BuyPage from "@/items/pages/BuyPage";
import PurchasedPage from "@/auth/pages/PurchasedPage";
import ShoppingCart from "@/items/pages/ShoppingCart";
import BuyCartPage from "@/items/pages/BuyCartPage";
import Home from "@/admin/pages/Home";
import AdminLayout from "@/layouts/AdminLayout";
import Products from "@/admin/pages/Products";
import Categories from "@/admin/pages/Categories";
import Customers from "@/admin/pages/Customers";
import Reports from "@/admin/pages/Reports";
import { Settings } from "lucide-react";
import ContactUs from "@/auth/pages/ContactUs";

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
      { path: "myproducts", element: <MyProductsPage /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "/product/updateProduct/:id", element: <UpdateProductPage /> },
      { path: "/product/buy", element: <BuyPage /> },
      { path: "/purchasedProducts", element: <PurchasedPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/myCart", element: <ShoppingCart /> },
      { path: "/buyCart", element: <BuyCartPage /> },
      { path: "/contactUs", element: <ContactUs /> },






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
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Home/> },

      { path: "products", element: <Products /> },
      { path: "categories", element: <Categories /> },
      { path: "customers", element: <Customers /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },



    ],
  },

  // Catch-all (404)
  { path: "*", element: <Navigate to="/" /> },
]);
