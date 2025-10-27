import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/auth.store';



export const ProfilePage = () => {
    const navigate = useNavigate();

    const { user } = useAuthStore();

    return (
        <>
            <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen relative">
                <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen relative">
                    <h1 className="text-2xl md:text-3xl font-bold">Perfíl</h1>
                    <div className="w-full mt-4 h-1 bg-primary"></div>

                    {/* Datos del cliente */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {/* Nombres */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold">Nombres</p>
                            <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
                                <h2>{user.name}</h2>
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold">Correo electrónico</p>
                            <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
                                <h2>{user.email}</h2>
                            </div>
                        </div>

                        {/* Documento */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold">Documento</p>
                            <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
                                <h2>{user.document}</h2>
                            </div>
                        </div>

                        {/* N. Celular */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold">N. Celular</p>
                            <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
                                <h2>{user.phone}</h2>
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold">Dirección</p>
                            <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
                                <h2>{user.adress}</h2>
                            </div>
                        </div>

                        {/* Departamento */}
                        <div className="flex flex-col gap-2">
                            <p className="text-gray-500 font-semibold">Departamento</p>
                            <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
                                <h2>{user.department}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Botón */}
                    <button
                        onClick={() => navigate("/profile/update")}
                        className="absolute bg-primary right-4 text-white py-2 px-4 rounded-full mt-8 cursor-pointer z-10"
                    >
                        Actualizar datos
                    </button>
                </main>
            </div>

        </>
    )
}
