import { MdOutlineMailOutline } from "react-icons/md";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { useAuthStore } from "../store/auth.store";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const { createReport, user } = useAuthStore()
  const { selectedImage, setSelectedImage } = useState(null)
  const fileInputRef = useRef(null)

  const handleimageClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(URL.createObjectURL(file));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0]

    if (!file) {
      toast.error('Debe selccionar una imagen del error')
      return
    }
    const formData = new FormData(e.target)

    const reportData = {
      headline: formData.get("headline"),
      description: formData.get("description"),
      uid: user.id,
    }

    const ok = await createReport(reportData, file)

    if (ok) {
      toast.success('El reporte se ha enviado')
      navigate('/')
    } else {
      toast.error('Error al enviar el reporte')
    }
  }

  return (
    <div className="p-5 text-black font-['Times_New_Roman']">
      <div className="flex flex-col gap-4 mt-20 md:flex-row md:items-center md:justify-around">

        {/* Company contacts */}
        <div className="flex flex-col gap-8">
          <p className="text-2xl font-semibold">Contáctanos</p>

          <p className="max-w-100">
            Si quieres reportar errores, por favor usa el formulario de contacto.
          </p>

          <div className="flex items-center gap-2">
            <MdOutlineMailOutline size={24} />
            <span className="text-lg">camilocontreras2019@gmail.com</span>
          </div>

          <div className="flex items-center gap-2">
            <FaFacebook size={24} className="hover:cursor-pointer" />
            <FaInstagramSquare size={24} className="hover:cursor-pointer " />
            <FaLinkedin size={24} className="hover:cursor-pointer" />
          </div>
        </div>

        {/* report form */}
        <div className="flex flex-col gap-6  p-8 rounded-xl  w-full max-w-lg">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Reportar un problema</h2>
          </div>

          <form onSubmit={handleSubmitReport} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Encabezado</label>
              <input
                name="headline"
                type="text"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                required
              />
            </div>
            {/* Campo de Descripción */}
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-700">Descripción del error</label>
              <input
                name="description"
                type="text"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                required
              />
            </div>

            {/* Uploader de Imagen */}
            <div className="flex flex-col gap-2">
              <div className="relative"
                onClick={handleimageClick}
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-black file:text-white
            hover:file:bg-primary cursor:pointer"
                />
              </div>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="mt-2 bg-primary text-white py-3 rounded-lg font-bold hover:cursor-pointer transition-colors shadow-md"
            >
              Enviar reporte
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;