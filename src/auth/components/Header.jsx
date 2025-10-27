import React from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import { useAuthStore } from "../store/auth.store";
import { Link } from "react-router-dom";

export const Header = () => {

  const { authStatus, logout, isAdmin } = useAuthStore();


  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-purple-100 w-[calc(100%+4rem)] -mx-8 -mt-8 px-8 py-3 rounded-md shadow-sm">

      {/* <h1 className="text-2xl md:text-3xl font-bold">
        🌞 Bienvenido, <span className="text-primary">{user?.name}</span>
      </h1> */}
      <form className="w-full md:w-auto">
        <div className="relative">
          <RiSearch2Line className="absolute top-1/2 -translate-y-1/2 left-2" />
          <input
            type="text"
            className="bg-gray-100 outline-none py-2 pl-8 pr-4  rounded-xl w-full md:w-auto"
            placeholder="Buscar productos"
          />
        </div>
      </form>

      <div className="hidden md:flex gap-2">
        {authStatus === 'not-authenticated' ? (
          <Link to='/login'>
            <button className="bg-blue-500 p-1 rounded-sm border border-blue-950 text-white">
              Iniciar sesión
            </button>
          </Link>
        ) : (
          <button onClick={logout} className="p-1 rounded-sm border-gray-700 border-2">
            Cerrar sesión
          </button>
        )}

        {isAdmin() && (
          <Link to='/admin'>
            <button className="bg-red-500 p-1 rounded-sm border border-red-950 text-white">
              Admin
            </button>
          </Link>
        )}
      </div>



    </header >
  );
};

export default Header;