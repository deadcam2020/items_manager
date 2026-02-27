import { useEffect } from 'react'
import { useProductStore } from '@/items/store/products.store.js'
import { useAuthStore } from '@/auth/store/auth.store';
import { MdDelete } from "react-icons/md";
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import CustomFullScreenMessage from '@/auth/components/custom/CustomFullScreenMessage';
import { CustomFullScreenLoading } from '@/auth/components/custom/CustomsFullScreenLoading';
import { useCart } from '../hooks/products.queries';
import { useDeleteCart, useDeleteFromCart } from '../hooks/products.mutatios';

const ShoppingCart = () => {

  const { user } = useAuthStore()
  const { data: cart = [], isLoading } = useCart(user?.id)
  const { mutateAsync: deleteProductFromCart } = useDeleteFromCart()
  const { mutateAsync: deleteCart } = useDeleteCart()

  if (isLoading) return <CustomFullScreenLoading message={"Cargando"} />

  const handleDeleteProduct = async (id) => {
    const confirmed = confirm("¿Estás seguro de que quieres eliminar este producto?");
    if (!confirmed) return;

    //todo
    const ok = await deleteProductFromCart(id);

    if (!ok) {
      toast.error("No se pudo eliminar este producto");
    } else {
      toast.success("Producto eliminado correctamente");
    }
  }
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) return <CustomFullScreenMessage message="No has agregado productos al carrito" />


  const handleDeleteCart = async () => {
    const confirmed = confirm("¿Estás seguro de que quieres eliminar todo el carrito?");
    if (!confirmed) return;
    try {
      await deleteCart(user?.id);
      toast.success("Carrito eliminado correctamente");
    } catch (error) {
      toast.error("No se pudo eliminar el carrito");
    }
  }

    return (
      <>
        {/* Lista del carrito */}
        <ul className="flex flex-col gap-4 mt-4 pb-36">
          {cart.map((item) => (
            <li
              key={item.cart_item_id}
              className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center border border-gray-200 max-w-xl w-full mx-auto"
            >
              {/* Imagen */}
              <div className="min-w-[90px] min-h-[90px] max-w-[100px] max-h-[100px]">
                <img
                  src={item.imageurl || "https://i.imgur.com/EJLFNOw.png"}
                  alt="producto"
                  className="w-full h-full object-cover rounded-xl border"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col w-full">
                {/* Estado y título */}
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">{item.status}</p>
                    <h2 className="text-lg font-bold text-gray-900">
                      {item.title || "Producto sin nombre"}
                    </h2>
                  </div>
                </div>

                {/* Precio / cantidad / eliminar */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-sm text-gray-600">Precio</p>
                    <p className="text-base font-semibold text-primary">
                      ${Number(item.price).toLocaleString()} COP
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Cantidad</p>
                    <p className="text-base font-semibold text-gray-800 text-right">{item.quantity}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(item.cart_item_id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-400 cursor-pointer"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Caja fija del total */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] p-4 border-t">
          <div className="flex justify-between max-w-xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <p className="text-xl md:text-2xl font-bold text-gray-900">
              Total:{" "}
              <span className="text-primary">
                ${total.toLocaleString()} COP
              </span>
            </p>

            {/* Botón de compra */}
            <Link to="/buyCart">
              <button className="w-full md:w-auto bg-primary text-white py-2 px-5 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all cursor-pointer">
                Proceder a la compra
              </button>
            </Link>

            {/* todo           */}
            <button
              onClick={() => {
                handleDeleteCart();
              }}
              className="md:w-auto bg-red-500 text-white px-5 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all cursor-pointer">
              Eliminar carrito
            </button>
          </div>
        </div>
      </>

    )
  }

  export default ShoppingCart;
