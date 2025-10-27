// src/layouts/HomeLayout.jsx
import { Sidebar } from "@/auth/components/Sidebar";
import { Header } from "@/auth/components/Header";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen">
        <Header />
        {/* <div className="w-full mt-4 h-1 bg-primary"></div> */}

        {/* Aquí se renderizan las páginas hijas */}
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
