import { useLocation, useNavigate } from "react-router-dom";

const ReplyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log('entrando a replyPAge');
    
    
    // Extraemos el reporte del state de la navegación
    const { report } = location.state || {}; 

    // Si alguien entra a la URL directamente sin pasar por la lista, no habrá datos
    if (!report) {
        return <div className="p-10 text-white">No se seleccionó ningún reporte.</div>;
    }

    return (
        <div className="reply-page">

        <div className="min-h-screen text-white p-8">
        

            <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-2xl shadow-xl">
                <h1 className="text-2xl font-bold mb-2">Respuesta al Reporte</h1>
                <p className="text-blue-400 text-sm mb-6">Usuario: {report.user_name}</p>

                {/* Resumen del reporte original */}
                <div className="bg-slate-700/50 p-4 rounded-lg mb-8 border border-slate-600">
                    <h3 className="font-bold text-lg mb-2">{report.headline}</h3>
                    <p className="text-gray-300 text-sm italic">"{report.description}"</p>
                    {report.image_url && (
                        <img src={report.image_url} alt="Evidencia" className="mt-4 rounded-md max-h-60" />
                    )}
                </div>

                {/* Formulario de respuesta */}
                <form className="flex flex-col gap-4">
                    <label className="font-semibold text-gray-200">Tu respuesta:</label>
                    <textarea 
                        rows="6"
                        className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Escribe aquí la solución o respuesta para el usuario..."
                    ></textarea>
                    
                    <button 
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                    >
                        Enviar Respuesta
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default ReplyPage;