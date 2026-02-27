import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/products.store";
import { useAuthStore } from "@/auth/store/auth.store";
import { toast } from "sonner";
import { useAddToCart } from "../hooks/products.mutatios";
import { useGetProduct } from "../hooks/products.queries";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // <-- cantidad
  // const { fetchGetProduct, fetchAddToCart } = useProductStore();

  const { data: productData = [] } = useGetProduct(id)
  const { mutateAsync: addToCartAsync, isPending } = useAddToCart()
  const { user } = useAuthStore()


 



if (!productData) return <p className="p-4">Cargando...</p>;

const increase = () => {
  if (quantity < productData.stock) {
    setQuantity(quantity + 1);
  } else {
    alert("No puedes comprar más unidades que el stock disponible.");
  }
}
const decrease = () => setQuantity((q) => Math.max(1, q - 1));

const handleBuy = () => {
  navigate("/product/buy", {
    state: {
      productId: productData.id,
      seller_id: productData.uid,
      seller: productData.seller,
      title: productData.title,
      price: productData.price,
      imageurl: productData.imageurl,
      quantity,
    },
  });
};

const handleAddToCart = async () => {

  try {
    await addToCartAsync({ id: productData.id, uid: user.id, quantity })
    toast.success('Se agregó al carrito')

  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error('No se pudo agregar al carrito')

  }
}


return (
  <>
    <div className="container mx-auto px-4 py-10 w-100 text-black">
      <div className="flex flex-col md:flex-row gap-10">

        {/* product image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={productData.imageurl}
            alt={productData.title}
            className="rounded-xl w-full max-w-md object-cover"
          />
        </div>

        {/* product info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <p className="text-gray-400 font-semibold">{productData.sold} vendidos</p>


          <h1 className="text-3xl font-bold">{productData.title}</h1>

          <p className="text-gray-700">{productData.description}</p>

          <p className="text-2xl font-bold text-primary">${Number(productData.price).toLocaleString()} COP</p>

          <div className="flex flex-col -gap-2">
            <p>
              <span className="font-semibold">Categoría: </span>
              {productData.category}
            </p>
            <p>
              <span className="font-semibold">Condición: </span>
              {productData.status}
            </p>
            <p>
              <span className="font-semibold">Vendedor: </span>
              {productData.seller}
            </p>
          </div>

          <p>
            <span className="font-semibold">Stock: </span>
            {productData.stock}
          </p>

          {/* quantity selector */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Cantidad:</p>

            <div className="flex items-center gap-3">
              <button
                onClick={decrease}
                className="px-3 py-2 border border-gray-300 rounded-lg text-lg font-bold"
              >
                −
              </button>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-16 text-center border border-gray-300 rounded-lg py-2"
              />

              <button
                onClick={increase}
                className="px-3 py-2 border border-gray-300 rounded-lg text-lg font-bold"
              >
                +
              </button>


            </div>
          </div>

          <button
            onClick={handleBuy}
            className="bg-primary font-semibold hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-fit cursor-pointer"
          >
            Comprar
          </button>


          <button
            onClick={handleAddToCart}
            className=" flex flex-row items-center bg-primary font-semibold hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-fit cursor-pointer"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  </>
);
};

export default ProductPage;
