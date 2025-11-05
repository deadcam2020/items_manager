import React, { use } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlinePersonSearch } from "react-icons/md";
import { RiMore2Fill, RiCloseFill, RiUpload2Line } from "react-icons/ri";
import { useAuthStore } from '../store/auth.store';

export const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const { authStatus, logout, isAdmin, user } = useAuthStore();

    return (
        <>
            <div className={`bg-[#06001e] min-h-screen fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${showMenu ? "left-0" : "-left-full"
                }`}> "


                {/* profile */}
                <div className='flex flex-col not-visited:items-center justify-center p-8  gap-2 h-[30vh] cursor-pointer'
                >
                    <img src={user.imageurl}
                        className='w-15 h-15 rounded-full objet-cover'
                        alt="" />

                    <p 
                    onClick={() => navigate("/profile")}

                    className='text-white font-bold text-xl hover:text-primary '>{user?.name}</p>
                </div>

                <div className="bg-[#16006c] p-8 rounded-tr-[100px] h-[70vh] flex flex-col justify-between gap-8 ">

                    {/* nav */}
                    <div >
                        <nav className="flex flex-col gap-8 text-white" >

                            <Link
                                to='/'
                                className='flex items-center gap-4 text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#06001e]/40 transition-colors'
                            >

                                <AiOutlineHome /> Home
                            </Link>

                            <Link
                                to='/upload'
                                className='flex items-center gap-4 text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#06001e]/40 transition-colors'
                            >

                                <RiUpload2Line /> Subir productos
                            </Link>


                            <Link
                                to='/myproducts'
                                className='flex items-center gap-4 text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#06001e]/40 transition-colors'
                            >

                                <MdOutlinePersonSearch /> My products
                            </Link>

                            <div className="flex flex-col gap-2 mt-4 md:hidden">
                                {authStatus === 'not-authenticated' ? (
                                    <Link to='/login'>
                                        <button className="bg-blue-500 p-1 rounded-sm border border-blue-950 text-white w-full">
                                            Iniciar sesión
                                        </button>
                                    </Link>
                                ) : (
                                    <button onClick={logout} className="p-1 rounded-sm border-gray-700 border-2 w-full">
                                        Cerrar sesión
                                    </button>
                                )}

                                {isAdmin() && (
                                    <Link to='/admin'>
                                        <button className="bg-red-500 p-1 rounded-sm border border-red-950 text-white w-full">
                                            Admin
                                        </button>
                                    </Link>
                                )}
                            </div>

                        </nav>
                    </div>

                    <div className='flex flex-col text-white gap-1 bg-[#06001e]/60 rounded-xl p-4'>
                        <p>Having problems?</p>
                        <a href="">Contact us</a>
                    </div>

                </div>
            </div>

            <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden fixed right-4 bottom-4 text-2xl bg-[#06001e] p-2.5 rounded-full text-white z-50"
            >
                {showMenu ? <RiCloseFill /> : <RiMore2Fill />}
            </button>
        </>
    )
}
