import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/products.store";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const {  fetchGetProduct } = useProductStore();

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
    <div className="p-4 flex flex-col items-center gap-4">
      <button
        onClick={() => navigate(-1)}
        className="self-start text-white p-1 hover:text-bold bg-primary rounded-xl hover:bg-blue-600"
      >
        ← Volver
      </button>

      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-80 h-auto rounded-xl shadow-md"
      />
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <h2 className="text-xl text-gray-700"> Detalles del producto  {product.description}</h2>
      <h2 className="text-2xl font-bold">{product.category}</h2>

      <p className="text-2xl font-bold">${product.price}</p>
    </div>
  );
};

export default ProductPage;
