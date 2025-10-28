import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateProfileImage } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdateProfileImage = async () => {
    const file = fileInputRef.current.files[0];

    if (!file) {
      toast.error('Seleccione una imagen primero');
      return;
    }

    const ok = await updateProfileImage(file);

    if (ok) toast.success('Imagen subida correctamente');
    else toast.error('Error al subir imagen');
  };

  return (
    <div className="grid lg:grid-cols-4 xl:grid-cols-6 min-h-screen relative">
      <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 p-8 min-h-screen relative">
        <h1 className="text-2xl md:text-3xl font-bold">Perfíl</h1>
        <div className="w-full mt-4 h-1 bg-primary"></div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <div className="relative cursor-pointer group" onClick={handleImageClick}>
            <img
              className="w-32 h-32 rounded-full object-contain border-4 border-primary shadow-md transition-transform duration-200 group-hover:scale-105"
              src={
                selectedImage ||
                user.imageurl ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
              }
              alt="Foto de perfíl"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <button
            onClick={handleUpdateProfileImage}
            className="bg-primary text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-600 transition"
          >
            Actualizar foto
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <InfoItem label="Nombres" value={user.name} />
          <InfoItem label="Correo electrónico" value={user.email} />
          <InfoItem label="Documento" value={user.document} />
          <InfoItem label="N. Celular" value={user.phone} />
          <InfoItem label="Dirección" value={user.adress} />
          <InfoItem label="Departamento" value={user.department} />
        </div>

        <button
          onClick={() => navigate('/profile/update')}
          className="absolute bg-primary right-4 text-white py-2 px-4 rounded-full mt-8 cursor-pointer hover:bg-blue-600 z-10"
        >
          Actualizar datos
        </button>
      </main>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex flex-col gap-2">
    <p className="text-gray-500 font-semibold">{label}</p>
    <div className="inline-flex items-center bg-gray-200 p-2 rounded-xl font-bold max-w-max">
      <h2>{value || 'Sin dato'}</h2>
    </div>
  </div>
);
