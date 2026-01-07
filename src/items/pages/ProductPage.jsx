import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/products.store";
import { useAuthStore } from "@/auth/store/auth.store";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // <-- cantidad
  const { fetchGetProduct, fetchAddToCart } = useProductStore();
  const { user } = useAuthStore()

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchGetProduct(id);
        if (data) {
          setProduct({
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            imageurl: data.imageurl,
            category: data.category,
            seller: data.seller,
            uid: data.uid,
            stock: data.stock,
            sold: data.sold,
            status: data.status
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [id, fetchGetProduct]);

  if (!product) return <p className="p-4">Cargando...</p>;

  const increase = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      alert("No puedes comprar más unidades que el stock disponible.");
    }
  }
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleBuy = () => {
    navigate("/product/buy", {
      state: {
        productId: product.id,
        seller_id: product.uid,
        seller: product.seller,
        title: product.title,
        price: product.price,
        imageurl: product.imageurl,
        quantity,
      },
    });
  };

  const handleAddToCart = async () => {
    const ok = await fetchAddToCart({ id: product.id, uid: user.id, quantity })

    if (ok) {
      toast.success('Se agregó al carrito')
    }else{
      toast.error('No se pudo agregar al carrito')

    }

  };




  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">

          {/* product image */}
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={product.imageurl}
              alt={product.title}
              className="rounded-xl w-full max-w-md object-cover"
            />
          </div>

          {/* product info */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <p className="text-gray-400 font-semibold">{product.sold} vendidos</p>


            <h1 className="text-3xl font-bold">{product.title}</h1>

            <p className="text-gray-700">{product.description}</p>

            <p className="text-2xl font-bold text-primary">${Number(product.price).toLocaleString()} COP</p>

            <div className="flex flex-col -gap-2">
              <p>
                <span className="font-semibold">Categoría: </span>
                {product.category}
              </p>
              <p>
                <span className="font-semibold">Condición: </span>
                {product.status}
              </p>
              <p>
                <span className="font-semibold">Vendedor: </span>
                {product.seller}
              </p>
            </div>

            <p>
              <span className="font-semibold">Stock: </span>
              {product.stock}
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
