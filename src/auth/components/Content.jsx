import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/items/store/products.store';
import { CustomFullScreenLoading } from './custom/CustomsFullScreenLoading';

export const Content = () => {
  const { loading, products, fetchGetAllProducts } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetAllProducts();
  }, [fetchGetAllProducts]);

  if (loading) return <CustomFullScreenLoading />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 overflow-y-auto min-h-screen">
      {products.map((product) => (
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          key={product.id}
          className="
        flex flex-col 
        w-full 
        p-2 rounded-xl gap-2 
        bg-white shadow-sm F
        hover:shadow-md transition-shadow duration-200
      "
        >
          <img
            className="w-full h-32 md:h-40 object-cover rounded-lg"
            src={product.imageurl || 'https://i.imgur.com/EJLFNOw.png'}
            alt={product.title}
          />

          <div className="px-1 flex flex-col">

            {/* Título máximo 2 líneas */}
            <p className="text-sm md:text-base font-medium line-clamp-2">
              {product.title}
            </p>



            {/* Precio más destacado */}
            <p className="text-base md:text-lg font-bold text-primary mt-1">
              ${product.price} COP
            </p>
          </div>
        </div>
      ))}
    </div>

  );
};
