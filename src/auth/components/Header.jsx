import React, { useState } from "react";
// Icons
import { RiSearch2Line } from "react-icons/ri";
import { useAuthStore } from "../store/auth.store";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo.png'

export const Header = () => {

  const { authStatus, logout, isAdmin } = useAuthStore();
const navigate  = useNavigate()
  const [search, setSearch ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!search.trim()) return;

    navigate(`search?query=${search}`)

  }

  return (
   <header className="flex flex-col gap-4 bg-purple-100 w-[calc(100%+4rem)] -mx-8 -mt-8 px-8 py-3 rounded-md shadow-sm md:flex-row md:items-center md:justify-between">

  {/* CONTENEDOR: Logo + Input  */}
  <div className="flex w-100 items-center gap-3">
    <Link to="/">
      <img
        src={logo}
        alt="home"
        className="w-20 md:w-20"
      />
    </Link>


    <form 
    onSubmit={handleSubmit}
    className="flex-1">
      <div className="relative">
        <button
        type="submit"
        className="hover:cursor-pointer"
        >
        <RiSearch2Line 
         className="absolute top-1/2 -translate-y-1/2 left-2" />
        </button>
        <input
        value={search}
        onChange={(e) => {setSearch(e.target.value)}}
          type="text"
          className="bg-gray-100 outline-none py-2 pl-8 pr-4 rounded-xl w-full"
          placeholder="Buscar productos"
        />
      </div>
    </form>

  </div>

  {/* Botones (solo desktop) */}
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

</header>

  );
};

export default Header;