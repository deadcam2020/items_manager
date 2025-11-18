import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/products.store";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { fetchGetProduct } = useProductStore();

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
            imageUrl: data.imageurl,
            category: data.category,
            seller: data.seller
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };



    getProduct();
  }, [id, fetchGetProduct]);

  if (!product) return <p className="p-4">Cargando...</p>;

  return (
    <>
     
      

      <div className="container mx-auto px-4 py-10 ">

        <div className="flex flex-col md:flex-row gap-10">

          {/* product image */}
          <div className="md:w.1/2 flex justify-center items-center">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="rounded-xl w-full max-w-md object-cover"
            />
          </div>


          {/* product info */}
          <div className="md:w-1/2 flex flex-col gap-4">

            <h1 className="text-3xl font-bold ">{product.title}</h1>

            <p className="text-gray-700">{product.description}</p>

            <p className="text-2xl font-bold text-primary">${product.price} COP</p>

            <div className="flex flex-col -gap-2">
              <p><span className="font-semibold">Categoría: </span>{product.category}</p>
              <p><span className="font-semibold">Condición </span>TODO</p>
              <p><span className="font-semibold">Vendedor </span>{product.seller}</p>
            </div>

            <button
            className="bg-primary font-semibold hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4 w-fit cursor-pointer"
            //TODO OnClick
            >
              Comprar
            </button>

          </div>


        </div>

      </div>

    </>
  );
};

export default ProductPage;
