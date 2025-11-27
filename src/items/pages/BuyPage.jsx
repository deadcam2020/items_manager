import { useAuthStore } from "@/auth/store/auth.store";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useProductStore } from "../store/products.store";

const BuyPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
const {user} = useAuthStore()
const {saveSale} = useProductStore()

  // Si el usuario llega sin estado, lo devolvemos a productos
  if (!state) {
    navigate("/");
    toast.error("No se pudo ingresar a la compra")
    return null;
  }

  const { productId, title, price, imageurl, quantity, seller_id, seller } = state;

  const total = price * quantity;

  const handlePurchase = async() => {

    const saleData =  {
        buyer_id: user.id,
        title,
        seller_id,
        imageurl,
        seller_name: seller,
        buyer_name: user.name,
        product_id: productId,
        unit_price: parseInt(price),
        quantity,
        payment_method: user.payment_method,
      }

      const ok = await saveSale(saleData)

      if (ok) {
        navigate("/")
        toast.success("Su compra ha sido exitosa")
      }
 
  };

  if (!user) return <p className="p-4">Cargando...</p>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">Confirmar compra</h1>

      {/* Card principal */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col gap-6">

        {/* Producto */}
        <div className="flex gap-4 items-center">
          <img
            src={imageurl}
            alt={title}
            className="w-24 h-24 rounded-lg object-cover shadow"
          />
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-gray-600">Precio: ${price.toLocaleString()} COP</p>
            <p className="text-gray-600">Cantidad: {quantity}</p>
          </div>
        </div>

        {/* Totales */}
        <div className="border-t pt-4">
          <p className="text-lg font-semibold">
            Total: <span className="text-primary">${total.toLocaleString()} COP</span>
          </p>
        </div>

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

        {/* Botón */}
        <button
          onClick={handlePurchase}
          className="bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
        >
          Confirmar compra
        </button>

      </div>
    </div>
  );
};

export default BuyPage;
