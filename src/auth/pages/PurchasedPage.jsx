import { useEffect, useState } from 'react'
import { useProductStore } from '@/items/store/products.store'
import { useAuthStore } from '../store/auth.store'
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDF from '../components/PDF';
import RateProductModal from '@/items/components/RateProductModal';
import { toast } from 'sonner';
import { useUserPurchasedProducts } from '@/items/hooks/products.queries';
import { useAddValoration } from '@/items/hooks/products.mutatios';


const PurchasedPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user } = useAuthStore()
  // const { purchasedProducts, fetchUserPurchasedProducts, loading, addValoration } = useProductStore()
const {data: purchases = [], isLoading} = useUserPurchasedProducts(user?.id)
const {mutateAsync: addValoration} = useAddValoration()

 console.log(purchases);
 

  if (isLoading) return <p>Cargando compras...</p>


  const handleRatingSubmit = async (rating) => {
    if (!selectedProduct) return;

    const ok = await addValoration({
      id: selectedProduct,
      valoration: rating,
    });

    if (ok) {
      toast.success("Gracias por tu calificación ");
      setOpen(false);
      setSelectedProduct(null);
    }
  };


  return (

    <>
      <ul className="flex flex-col gap-4 mt-4">

        {purchases.map((item) => (
          <li
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-4 flex gap-4 items-center border border-gray-200 max-w-lg w-full mx-auto  "
          >
            <div className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[120px]">
              <img
                src={item.imageurl || "https://i.imgur.com/EJLFNOw.png"}
                alt={item.title}
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
                  <p className="text-base font-semibold text-right ">{item.quantity}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">

                <div className="gap-4">
                  <PDFDownloadLink
                    document={<PDF item={item} />}
                    fileName={`factura-${item.title}.pdf`}
                    className="text-blue-600 underline text-sm"
                  >
                    {({ isLoading }) =>
                      isLoading ? "Generando PDF..." : "Descargar factura"
                    }
                  </PDFDownloadLink>
                </div>

                <button
                  onClick={() => {
                    setSelectedProduct(item.product_id);
                    setOpen(true);
                  }}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500"
                >
                  Calificar producto
                </button>


              </div>

            </div>

          </li>
        ))}

      </ul>

      <RateProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleRatingSubmit}
      />



    </>
  )
}

export default PurchasedPage
