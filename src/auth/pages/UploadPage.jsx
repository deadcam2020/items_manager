import React, { useRef, useState } from 'react'

import { MdAttachMoney } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '@/items/store/products.store';
import { toast } from 'sonner';




export const UploadPage = () => {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const { uploadProduct, loading } = useProductStore()



    const handleImageClick = () => fileInputRef.current.click();


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setSelectedImage(URL.createObjectURL(file));
    };

    const handleUploadProduct = async (e) => {
        e.preventDefault();

        const file = fileInputRef.current.files[0]

        if (!file) {
            toast.error('Debe selccionar una imagen del producto')
            return
        }

        const formData = new FormData(e.target)

        const producData = {
            title: formData.get("title"),
            description: formData.get("description"),
            price: parseFloat(formData.get("price")),
            category: formData.get("category"),
        }

        const ok = await uploadProduct(producData, file)

        if (ok) {
            toast.success('El producto se ha guardado')
            navigate('/profile');
        } else {
            toast.error('Error al guardar producto')
        }

    };


    return (

        <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen">
            <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen">
                <h1 className="text-2xl md:text-3xl font-bold mb-4">Sube tus productos</h1>

                <form onSubmit={handleUploadProduct} className="flex flex-col gap-4">
                    <div
                        className="relative cursor-pointer group"
                        onClick={handleImageClick}
                    >
                        <img
                            className="w-32 h-32 rounded-sm object-contain border-2 border-primary shadow-md transition-transform duration-200 group-hover:scale-105"
                            src={
                                selectedImage ||
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
                            name="title"
                            type="text"
                            className="bg-gray-300 p-2 rounded-xl border-2 hover:border-primary outline-none"
                            required
                        />
                    </div>

                    <div className="w-2/3 flex flex-col gap-2">
                        <label className="font-semibold">Descripción</label>
                        <textarea
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
