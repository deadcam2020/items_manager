import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';


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

    const { updateUser, user } = useAuthStore();
    const [departamento, setDepartamento] = useState("");

    const handleUpdateUser = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const rawData = Object.fromEntries(formData.entries());


        const userData = Object.fromEntries(
            Object.entries(rawData).filter(([_, value]) => value?.trim() !== '')
        );


        const isUpdateuserValid = await updateUser(userData)

        if (isUpdateuserValid) {
            navigate('/profile')
        } else {
            toast.error('Error al actualizar los datos')
        }


        return console.log('Actualizando...', userData);

    }


    return (
        <>

            <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen relative ">
                <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen relative  ">
                    <h1 className="text-2xl md:text-3xl font-bold"> Actualiza tus datos  </h1>
                    <div className='w-full mt-4 h-1 bg-primary'></div>

                    {/* Datos del cliente */}


                    <form
                        onSubmit={handleUpdateUser}
                    >


                        {/* Nombres */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Nombres</p>
                            <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                                <input

                                    type="text"
                                    name='name'
                                    className='bg-transparent border-0 w-full outline-none text-sm md:text-base '
                                />
                            </div>
                        </div>

                        {/* Correo Electronico */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Correo Electronico</p>
                            <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                                <input
                                    type="email"
                                    name='email'
                                    className='bg-transparent border-0 w-full outline-none text-sm md:text-base '
                                />
                            </div>
                        </div>

                        {/* N. de documento */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>

                            <p className='font-semibold'>N. de documento</p>
                            <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                                <input
                                    type="text"
                                    name='document'
                                    className='bg-transparent border-0 w-full outline-none text-sm md:text-base '
                                />
                            </div>
                        </div>


                        {/* N. de telefono */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Teléfono</p>
                            <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>

                                <input type="text"
                                    name='phone'
                                    className='bg-transparent border-0 w-full outline-none text-sm md:text-base '
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Dirección</p>
                            <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                                <input type="text"
                                    name='adress'
                                    className='bg-transparent border-0 w-full outline-none text-sm md:text-base '
                                />
                            </div>
                        </div>


                        {/* Dirección país - departamento */}
                        <div className='w-1/3 flex flex-col gap-2 mt-5'>
                            <p className='font-semibold'>Departamento</p>
                            <div className='w-full flex items-center bg-gray-300 p-2 rounded-xl border-2 hover:border-primary'>

                                <select
                                    value={departamento}
                                    name='department'
                                    className='w-full bg-transparent outline-none text-sm md:text-base'
                                    onChange={(e) => setDepartamento(e.target.value)}
                                >

                                    <option value="">Selecciona un departamento</option>
                                    {departamentosColombia.map((dep) => (
                                        <option key={dep} value={dep}>{dep}</option>
                                    ))}

                                </select>

                            </div>
                        </div>

                        <button
                            type='submit'
                            className='absolute bg-primary right-4 text-white py-2 px-4 rounded-full mt-8 cursor-pointer z-10'>
                            Guardar
                        </button>

                    </form>


                </main>


            </div>
        </>
    )

}