import React, { useEffect } from 'react'
import { useProductStore } from '../store/products.store'
import { MdDelete } from 'react-icons/md';
import { useAuthStore } from '@/auth/store/auth.store';

const BuyCartPage = () => {
  const { user } = useAuthStore()
  const { cartProducts, fetchGetCartProducts } = useProductStore()

  useEffect(() => {
    fetchGetCartProducts()
  }, []);
  
  
  const total = cartProducts.reduce((acc, item) => {
    return acc + item.price * item.quantity
  }, 0)
  console.log(total);

  return (
    <>
      <div className="container mx-auto px-4 py-10 max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">Confirmar compra</h1>

        {/* Card principal */}
        <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-6">


          {/* Dirección */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-1">Dirección de envío</h3>
            <p className="text-gray-700">{user.adress || "No tienes dirección registrada."}</p>
          </div>

          {/* Métodos de pago */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Método de pago</h3>

            <p>
              {user.payment_method}
            </p>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2"># de cuenta</h3>

            <p>
              {user.payment_account}
            </p>
          </div>

          {/* productos */}
          <ul className='flex-col gap-2 mt-4'>

            {cartProducts.map((item) => (
              <li
                key={item.id}
                className='bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center border border-gray-200 max-w-lg w-full mx-auto '
              >

                <div className='min-w-[90px] min-h-[90px] max-w-[100px] max-h-[100px]'>
                  <img
                    src={item.imageurl || 'https://i.imgur.com/EJLFNOw.png'}
                    alt={item.title}
                    className='w-full h-full object-cover rounded-xl border'
                  />
                </div>

                <div className='flex-col w-full'>

                  <div className='flex justify-betwenn items-start'>
                    <div >
                      <p className='text-sm font-semibold text-gray-500'>{item.status}</p>
                      <h2 className="text-lg font-bold text-gray-900">
                        {item.title || "Producto sin nombre"}
                      </h2>
                    </div>
                  </div>

                  <div className="flex justify-between mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Precio</p>
                      <p className="text-base font-semibold text-primary">
                        ${Number(item.price).toLocaleString()} COP
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

          {/* Totales */}
          <div className="border-t pt-4">
            <p className="text-lg font-semibold">
              Total: <span className="text-primary">${total} COP</span>
            </p>
          </div>

             {/* Botón */}
        <button
          // onClick={handlePurchase}
          className="bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
        >
          Confirmar compra
        </button>

        </div>
      </div>

    </>
  )
}

export default BuyCartPage
