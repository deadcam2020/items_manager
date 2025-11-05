import { useAuthStore } from '@/auth/store/auth.store'
import React, { useEffect } from 'react'
import { useProductStore } from '../store/products.store'
import { CustomFullScreenLoading } from '@/auth/components/custom/CustomsFullScreenLoading'
import { Link, useNavigate } from 'react-router-dom'

const MyProductsPage = () => {

    const { user } = useAuthStore()
    const { products, loading, fetchUserProducts } = useProductStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.id) {
            fetchUserProducts(user.id);
        }
    }, [user]);

    if (loading) {
        return (
            <CustomFullScreenLoading />
        )
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
                <p className="text-lg font-semibold mb-2">Aún no tienes productos</p>
                <p className="text-sm">Sube uno desde la sección “Subir productos”.</p>
            </div>
        );
    }

    //todo: editar y eliminar productos del cliente

    

    return (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 overflow-y-auto  min-h-screen">
      {products.map((product) => (
        <div
        onClick={() => { navigate(`/product/${product.id}`) }}
          key={product.id}
          className="flex flex-col w-full max-w-xs h-auto p-2 rounded-xl gap-2 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <img
            className="w-full h-40 object-cover rounded-lg"
            src={product.imageurl || "https://i.imgur.com/EJLFNOw.png"}
            alt={product.title}
          />
          <div className="p-1 flex flex-col">
            <p className="text-m font-medium break-words">{product.title}</p>
            <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-primary mt-1">${product.price}</p>
          </div>

            <div className="p-1 flex flex-row gap-1" >

            <button 

            className="bg-red-500 p-1 rounded-sm border border-red-500 text-white hover:font-bold cursor-pointer ">
              Eliminar
            </button>

             <button 

             className="bg-primary p-1 rounded-sm   text-white hover:font-bold cursor-pointer ">
              Editar
            </button>
            </div>
         
        </div>
      ))}
    </div>
    )
}

export default MyProductsPage
