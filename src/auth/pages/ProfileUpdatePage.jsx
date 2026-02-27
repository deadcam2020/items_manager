import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';
import { useUpdateUserProfile } from '../hooks/auth.hooks';

const departamentosColombia = [
    "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá",
    "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba",
    "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena",
    "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío",
    "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima",
    "Valle del Cauca", "Vaupés", "Vichada"
];

export const ProfileUpdatePage = () => {
    const navigate = useNavigate();
    const {  user } = useAuthStore();
   const { mutate: updateProfile, data: updatedUser, isPending, isSuccess} = useUpdateUserProfile();


    const [departamento, setDepartamento] = useState(user.department || "");
    const [paymentMethod, setPaymentMethod] = useState(user.payment_method || "cash");
    const [paymentAccount, setPaymentAccount] = useState(user.payment_account || "");

    const handleUpdateUser = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const rawData = Object.fromEntries(formData.entries());

        // eliminar valores vacíos
        const userData = Object.fromEntries(
            Object.entries(rawData).filter(([_, value]) => value?.trim() !== '')
        );

        // Si selecciona efectivo, no mandar cuenta
        if (userData.payment_method === "cash") {
            userData.payment_account = null;
        }

        updateProfile(userData);

        if (!isSuccess) { //aunque se actualce el usuario da "false" en isSuccess, por eso se hace esta validación extra
            navigate('/profile');
            toast.success('Datos actualizados');
        } else {
            toast.error('Error al actualizar los datos');
        }
    }

    return (
        <>
            <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen relative text-black ">
                <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen relative">
                    <h1 className="text-2xl md:text-3xl font-bold"> Actualiza tus datos </h1>
                    <div className='w-full mt-4 h-1 bg-primary'></div>

                    <form onSubmit={handleUpdateUser}>
                        
                        {/* Nombres */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Nombres</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <input
                                    defaultValue={user.name}
                                    type="text"
                                    name='name'
                                    className='bg-transparent w-full outline-none'
                                />
                            </div>
                        </div>

                        {/* Correo */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Correo Electrónico</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <input
                                    defaultValue={user.email}
                                    type="email"
                                    name='email'
                                    className='bg-transparent w-full outline-none'
                                />
                            </div>
                        </div>

                        {/* Documento */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>N. de documento</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <input
                                    defaultValue={user.document}
                                    type="text"
                                    name='document'
                                    className='bg-transparent w-full outline-none'
                                />
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Teléfono</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <input
                                    defaultValue={user.phone}
                                    type="text"
                                    name='phone'
                                    className='bg-transparent w-full outline-none'
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Dirección</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <input
                                    defaultValue={user.adress}
                                    type="text"
                                    name='adress'
                                    className='bg-transparent w-full outline-none'
                                />
                            </div>
                        </div>

                        {/* Departamento */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Departamento</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <select
                                    name='department'
                                    value={departamento}
                                    onChange={(e) => setDepartamento(e.target.value)}
                                    className='w-full bg-transparent outline-none'
                                >
                                    <option value="">Selecciona un departamento</option>
                                    {departamentosColombia.map((dep) => (
                                        <option key={dep} value={dep}>{dep}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* MÉTODO DE PAGO */}
                        <div className='w-1/3 flex flex-col gap-2 mt-10'>
                            <p className='font-semibold'>Método de pago</p>
                            <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                <select
                                    name='payment_method'
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className='w-full bg-transparent outline-none'
                                >
                                    <option value="cash">Efectivo</option>
                                    <option value="nequi">Nequi</option>
                                    <option value="bancolombia">Bancolombia</option>
                                    <option value="card">Tarjeta</option>
                                </select>
                            </div>
                        </div>

                        {/* NÚMERO DE CUENTA / TARJETA */}
                        {paymentMethod !== "cash" && (
                            <div className='w-1/3 flex flex-col gap-2 mt-5'>
                                <p className='font-semibold'>Número de cuenta / tarjeta</p>
                                <div className='w-full bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>
                                    <input
                                        defaultValue={paymentAccount}
                                        type="text"
                                        name='payment_account'
                                        className='bg-transparent w-full outline-none'
                                        placeholder="Ej: 3001234567"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {/* BOTÓN GUARDAR */}
                        <button
                        disabled={isPending}
                            type='submit'
                            className='absolute bg-primary right-4 text-white py-2 px-4 rounded-full mt-8 cursor-pointer hover:bg-blue-600 z-10'
                        >
                            Guardar
                        </button>

                    </form>
                </main>
            </div>
        </>
    )
}
