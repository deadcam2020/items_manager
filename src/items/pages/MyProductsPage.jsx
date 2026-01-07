import { useAuthStore } from '@/auth/store/auth.store'
import React, { useEffect } from 'react'
import { useProductStore } from '../store/products.store'
import { CustomFullScreenLoading } from '@/auth/components/custom/CustomsFullScreenLoading'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const MyProductsPage = () => {

  const { user } = useAuthStore()
  const { products, loading, fetchUserProducts, deleteProduct } = useProductStore()
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
  const handleDeleteProduct = async (id) => {
    const confirmed = confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (!confirmed) return;


    const ok = await deleteProduct(id);


    if (!ok) {
      toast.error("No se pudo eliminar este producto");
    } else {
      toast.success("Producto eliminado correctamente");
    }
  }

  const handleEditProduct = async () => {

  }


  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">

      {products.map((product) => (
        <div
          onClick={() => navigate(`/product/updateProduct/${product.id}`)}
          key={product.id}
          className="
        flex flex-col justify-between     /* Mantiene botones abajo */
    w-full
    p-2 rounded-xl gap-2
    bg-white shadow-sm
    hover:shadow-md transition-shadow duration-200
    min-h-[280px]  
      "
        >
          <img
            className="w-full h-32 md:h-40 object-cover rounded-lg"
            src={product.imageurl || 'https://i.imgur.com/EJLFNOw.png'}
            alt={product.title}
          />

          <div className="flex flex-col justify-between flex-1">

            {/* Título máximo 2 líneas */}
            <p className="text-sm md:text-base font-medium line-clamp-2">
              {product.title}
            </p>



            {/* Precio más destacado */}
            <p className="text-base md:text-lg font-bold text-primary mt-1">
              ${Number(product.price).toLocaleString()} COP
            </p>

            <div className="p-1 flex flex-row gap-1" >

              <button
                onClick={(e) => {
                  e.stopPropagation(); //  evita que el click suba al div
                  handleDeleteProduct(product.id);
                }}
                className="bg-red-500 p-1 rounded-sm border border-red-500 text-white hover:font-bold cursor-pointer "
              >
                Eliminar
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // evita que se dispare el onClick del contenedor padre
                  navigate(`/product/updateProduct/${product.id}`);
                }}
                className="bg-primary p-1 rounded-sm text-white hover:font-bold cursor-pointer"
              >
                Editar
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}

export default MyProductsPage
