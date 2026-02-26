import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { CustomFullScreenLoading } from './custom/CustomsFullScreenLoading';
import { useGetUserProducts } from '@/items/hooks/products.queries';

export const Content = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Llamada al hook de React Query
  // Renombramos 'data' a 'products' para mantener tu lógica
  const { data: products = [], isLoading, isError } = useGetUserProducts(user?.id);

  // Manejo de carga
  if (isLoading) return <CustomFullScreenLoading />;

  // Manejo de error (opcional pero recomendado)
  if (isError) return <div className="p-4 text-center">Error al cargar los productos</div>;

  return (
    <div className="grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {products.map((product) => (
        <div
          onClick={() => navigate(`/product/${product.id}`)}
          key={product.id}
          className="
            flex flex-col justify-between
            w-full p-2 rounded-xl gap-2
            bg-white shadow-sm
            hover:shadow-md transition-shadow duration-200
            min-h-[260px] md:min-h-[280px] max-h-[310px]
            overflow-hidden cursor-pointer
          "
        >
          <img
            className="w-full h-32 md:h-36 object-cover rounded-lg"
            src={product.imageurl || 'https://i.imgur.com/EJLFNOw.png'}
            alt={product.title}
          />

          <div className="flex flex-col flex-1">
            <p className="text-sm md:text-base font-medium line-clamp-2">
              {product.title}
            </p>

            <p className="text-base md:text-lg font-bold text-primary mt-1">
              ${Number(product.price).toLocaleString()} COP
            </p>

            <p className="text-base md:text-lg font-semibold text-gray-500 mt-1">
              ⭐ {product.valoration}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};