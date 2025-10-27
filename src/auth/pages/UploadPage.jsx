import React from 'react'

import { MdAttachMoney } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";




export const UploadPage = () => {


    // todo: handleItemsUpload()
    const handleItemsUpload = () => {
        return console.log('Subiendo archivo');

    }

    return (

        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
            <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen  ">
                <h1 className="text-2xl md:text-3xl font-bold"> Sube tus productos  </h1>

                {/* formulario de subida */}
                <form onSubmit={handleItemsUpload}>


                    <div className='w-full flex flex-col gap-2 mt-5'>
                        <p className='font-semibold'>Título</p>
                        <div className='w-2/3 flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                            <input type="text"
                                className='bg-transparent border-0 w-full outline-none text-sm md:text-base ' />
                        </div>
                    </div>

                    <div className='w-2/3 flex flex-col gap-2 mt-5'>
                        <p className='font-semibold'>Descripción</p>
                        <div className='w-full- flex items-center bg-gray-300 p-2 h-20 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                            <input type="text"
                                className='bg-transparent border-0 w-full outline-none text-sm md:text-base ' />
                        </div>
                    </div>


                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2 mt-5">
                        <p className="font-semibold">Sube una imagen</p>

                        <label className="w-full flex items-center bg-gray-300 p-2 h-20 rounded-xl gap-2 border-2 hover:border-primary cursor-pointer overflow-hidden">
                            <RiImageAddFill className="text-2xl shrink-0" />
                            <span className="text-sm md:text-base truncate">Seleccionar imagen</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                            />
                        </label>
                    </div>


                    <div className='w-1/3 flex flex-col gap-2 mt-5'>
                        <p className='font-semibold'>Precio</p>
                        <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                            <MdAttachMoney />
                            <input type="text"
                                className='bg-transparent border-0 w-full outline-none text-sm md:text-base ' />
                        </div>
                    </div>

                    <div className='w-1/3 flex flex-col gap-2 mt-5'>
                        <p className='font-semibold'>Categoría</p>
                        <div className='w-full- flex items-center bg-gray-300 p-2 rounded-xl gap-2 border-2 hover:border-2 hover:border-primary'>
                            <input type="text"
                                className='bg-transparent border-0 w-full outline-none text-sm md:text-base ' />
                        </div>
                    </div>



                    <button
                        type='submit'
                        className='absolute bg-primary right-10 text-white py-2 px-4 rounded-full mt-8 cursor-pointer z-10  hover:font-semibold hover:border-2 hover:border-primary text-sm'
                    //disabled={isLogging}
                    >
                        Subir producto
                    </button>

                </form>

            </main>
        </div>

    )
}
