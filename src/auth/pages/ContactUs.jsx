import { MdOutlineMailOutline } from "react-icons/md";
import { FaFacebook, FaInstagramSquare , FaLinkedin } from "react-icons/fa";

const ContactUs = () => {
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
                        <FaInstagramSquare  size={24} className="hover:cursor-pointer " />
                        <FaLinkedin  size={24} className="hover:cursor-pointer" />
                    </div>
                </div>

                {/* report form */}
<div className="flex flex-col gap-6  p-8 rounded-xl  w-full max-w-lg">
  <div>
    <h2 className="text-2xl font-bold text-gray-800">Reportar un problema</h2>
  </div>

  <form className="flex flex-col gap-5">

     <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">Encabezado</label>
      <textarea 
        rows="1" 
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all resize-none"
      />
    </div>
    {/* Campo de Descripción */}
    <div className="flex flex-col gap-2">
      <label className="font-medium text-gray-700">Descripción del error</label>
      <textarea 
        rows="4" 
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all resize-none"
      />
    </div>

    {/* Uploader de Imagen */}
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input 
          type="file" 
          accept="image/*"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-black file:text-white
            hover:file:bg-gray-800 cursor:pointer"
        />
      </div>
    </div>

    {/* Botón de envío */}
    <button 
      type="submit" 
      className="mt-2 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-md"
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