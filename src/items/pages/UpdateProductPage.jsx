import React, { useEffect, useRef, useState } from 'react'

import { MdAttachMoney } from "react-icons/md";
import { useNavigate, useParams } from 'react-router-dom';
import { useProductStore } from '@/items/store/products.store';
import { toast } from 'sonner';




export const UpdateProductPage = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const { updateProductWithImage, updateProductWithoutImage, loading, fetchGetProduct } = useProductStore()
    const { id } = useParams();
    const [product, setProduct] = useState(null);


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
                    });
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };



        getProduct();
    }, [id, fetchGetProduct]);

    if (!product) return <p className="p-4">Cargando...</p>;



    const handleImageClick = () => fileInputRef.current.click();


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedImage(URL.createObjectURL(file));
    };

    const handleUpdateProduct = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const rawData = Object.fromEntries(formData.entries());
        const file = fileInputRef.current.files[0]


        const productData = Object.fromEntries(
            Object.entries(rawData).filter(([_, value]) => value?.trim() !== '')
        );

        if (productData.price) {
            productData.price = parseFloat(productData.price);
        }

        let isUpdatedProductValid;
        if (!file) {
             isUpdatedProductValid = await updateProductWithoutImage({ id, productData })
        } else {
             isUpdatedProductValid = await updateProductWithImage({ id, productData, file })

        }


        if (isUpdatedProductValid) {
            navigate('/myproducts')
            toast.success('Datos actualizados')

        } else {
            toast.error('Error al actualizar los datos')
        }


        return console.log('Actualizando...', productData);

    }


    return (

        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
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
                            className="bg-gray-300 p-2 rounded-xl border-2 hover:border-primary outline-none h-20"
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
                                step="0.01"
                                className="bg-transparent border-0 w-full outline-none"
                                required
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
                        disabled={loading}
                        className="bg-primary text-white py-2 px-4 rounded-full mt-8 hover:font-semibold hover:border-2 hover:bg-blue-600 hover:border-primary text-sm self-end"
                    >
                        {loading ? "Subiendo..." : "Subir producto"}
                    </button>
                </form>
            </main>
        </div>
    )
}
