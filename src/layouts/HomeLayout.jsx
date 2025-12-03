// src/layouts/HomeLayout.jsx
import { Sidebar } from "@/auth/components/Sidebar";
import { Header } from "@/auth/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import FiltersBar from "@/auth/components/FiltersBar";

export const HomeLayout = () => {
const location = useLocation()

const isSearchPage = location.pathname === "/search";

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen">
        <Header />


        {isSearchPage && <FiltersBar/>}

        
        {/* Aquí se renderizan las páginas hijas */}
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;