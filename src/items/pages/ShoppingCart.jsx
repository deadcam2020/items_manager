import { useEffect } from 'react'
import { useProductStore } from '@/items/store/products.store.js'
import { useAuthStore } from '@/auth/store/auth.store';


const ShoppingCart = () => {

  const { user } = useAuthStore()
  const { purchasedProducts, fetchUserPurchasedProducts, loading } = useProductStore()

  useEffect(() => {
    if (user?.id) {
      fetchUserPurchasedProducts(user.id)
    }
  }, [user?.id])

  if (loading) return <p>Cargando compras...</p>



  return (
    <ul className="flex flex-col gap-4 mt-4">

      {purchasedProducts.map((item) => (
        <li
          key={item.id}
          className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center border border-gray-200 max-w-lg w-full mx-auto  "
        >
          <div className="min-w-[90px] min-h-[90px] max-w-[100px] max-h-[100px]">
            <img
              src={item.imageurl || "https://i.imgur.com/EJLFNOw.png"}
              alt="producto"
              className="w-full h-full object-cover rounded-xl border"
            />
          </div>

          <div className="flex flex-col w-full">

            {/* Estado y Título */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-500">{item.status}</p>
                <h2 className="text-lg font-bold text-gray-900">
                  {item.title || "Producto sin nombre"}
                </h2>
              </div>
            </div>

            {/* Precio y cantidad */}
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-sm text-gray-600">Precio</p>
                <p className="text-base font-semibold text-primary">
                  ${Number(item.unit_price).toLocaleString()} COP
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Cantidad</p>
                <p className="text-base font-semibold">{item.quantity}</p>
              </div>
            </div>

           

          </div>

        </li>
      ))}

    </ul>
  )
}

export default ShoppingCart;
