import React, { useEffect, useRef, useState } from 'react'

import { MdAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '@/items/store/products.store';
import { toast } from 'sonner';
import { useUpdateProductFull } from '../hooks/products.mutatios';
import { useGetProduct } from '../hooks/products.queries';



export const UpdateProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    // 1. Obtenemos los datos automáticamente
    const { data: product, isLoading } = useGetProduct(id);

    // 2. Preparamos la mutación
    const { mutateAsync: updateProduct, isPending } = useUpdateProductFull();

    if (isLoading) return <p className="p-4">Cargando datos del producto...</p>;
    if (!product) return <p className="p-4">Producto no encontrado</p>;

    const handleUpdateProduct = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const file = fileInputRef.current.files[0];

        // Limpiamos campos vacíos y formateamos números
        const productData = Object.fromEntries(
            Object.entries(Object.fromEntries(formData)).filter(([_, v]) => v?.trim() !== '')
        );
        productData.price = parseFloat(productData.price);
        productData.stock = parseInt(productData.stock);

        try {
            await updateProduct({
                id,
                productData,
                file,
                oldImageId: product.imageid // Enviamos el ID actual por si se reemplaza
            });

            toast.success('Producto actualizado con éxito');
            navigate('/myproducts');
        } catch (error) {
            const msg = error?.response?.data?.error || error.message || 'Error al actualizar';
            toast.error(msg);
        }
    };

    const handleImageClick = () => fileInputRef.current.click();

    const handleFileChange = (event) => {

        const file = event.target.files[0];

        if (file) setSelectedImage(URL.createObjectURL(file));

    };

    return (

        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen text-black">
            <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Actualiza tu producto</h1>

                <form onSubmit={handleUpdateProduct} className="flex flex-col gap-4">
                    <div
                        className="relative cursor-pointer group"
                        onClick={handleImageClick}
                    >
                        <img
                            className="w-32 h-32 rounded-sm object-contain border-2 border-primary shadow-md transition-transform duration-200 group-hover:scale-105"
                            src={
                                selectedImage ||
                                product.imageurl ||
                                "https://i.imgur.com/EJLFNOw.png"
                            }
                            alt="Foto del producto"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <div className="w-2/3 flex flex-col gap-2">
                        <label className="font-semibold">Título</label>
                        <input
                            defaultValue={product.title}
                            name="title"
                            type="text"
                            className="bg-gray-300 p-2 rounded-xl border-2 hover:border-primary outline-none"
                            required
                        />
                    </div>

                    <div className="w-2/3 flex flex-col gap-2">
                        <label className="font-semibold">Descripción</label>
                        <textarea
                            defaultValue={product.description}

                            name="description"
                            className="bg-gray-300 no-scrollbar p-2 rounded-xl border-2 hover:border-gray-200 outline-none h-20"
                            required
                        />
                    </div>

                    <div className="w-1/3 flex flex-col gap-2">
                        <label className="font-semibold">Precio</label>
                        <div className="flex items-center bg-gray-300 p-2 rounded-xl border-2 hover:border-primary">
                            <MdAttachMoney />
                            <input
                                defaultValue={product.price}

                                name="price"
                                type="number"
                                className="bg-transparent border-0 w-full outline-none"
                                required
                            />
                        </div>
                    </div>


                    <div className="w-1/3 flex flex-col gap-2">
                        <label className="font-semibold">Stock</label>
                        <div className="flex items-center bg-gray-300 p-2 rounded-xl border-2 hover:border-primary">
                            <input
                                defaultValue={product.stock}

                                name="stock"
                                type="number"
                                className="bg-transparent border-0 w-full outline-none"

                            />
                        </div>
                    </div>

                    <div className="w-1/3 flex flex-col gap-2">
                        <label className="font-semibold">Categoría</label>
                        <input
                            defaultValue={product.category}

                            name="category"
                            type="text"
                            className="bg-gray-300 p-2 rounded-xl border-2 hover:border-primary outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-white py-2 px-4 rounded-full mt-8 hover:font-semibold hover:border-2 hover:bg-blue-600 hover:border-primary text-sm self-end"
                    >
                        {isLoading ? "Subiendo..." : "Actualizar producto"}
                    </button>
                </form>
            </main>
        </div>
    )
}
