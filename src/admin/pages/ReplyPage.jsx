import { useLocation, useNavigate } from "react-router-dom";
import { useSendReportResponse } from "../hooks/admin.hooks";
import { toast } from "sonner";




const ReplyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutateAsync: sendReportResponse, isPending } = useSendReportResponse();

    const { report } = location.state || {}; 

    if (!report) {
        return <div className="p-10 text-white">No se seleccionó ningún reporte.</div>;
    }

     const handleSendResponse = async (event) => {
        event.preventDefault(); 
        
        const formData = new FormData(event.currentTarget);
        const responseText = formData.get('reply');

        if (!responseText?.trim()) {
            return toast.error("La respuesta no puede estar vacía");
        }

        try {
            await sendReportResponse({ reportId: report.id, response: responseText });
            
            toast.success("Respuesta enviada con éxito");
            navigate('/admin/reports');
        } catch (error) {
            console.error("Error al enviar respuesta:", error);
            toast.error("Error al enviar la respuesta. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="reply-page">
            <div className="min-h-screen text-white p-8">
                <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-2xl shadow-xl">
                    <h1 className="text-2xl font-bold mb-2">Respuesta al Reporte</h1>
                    <p className="text-blue-400 text-sm mb-6">Usuario: {report.user_name}</p>

                    <div className="bg-slate-700/50 p-4 rounded-lg mb-8 border border-slate-600">
                        <h3 className="font-bold text-lg mb-2">{report.headline}</h3>
                        <p className="text-gray-300 text-sm italic">"{report.description}"</p>
                    </div>

                    <form onSubmit={handleSendResponse} className="flex flex-col gap-4">
                        <label className="font-semibold text-gray-200">Tu respuesta:</label>
                        <textarea 
                            name="reply"
                            rows="6"
                            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Escribe aquí la solución..."
                            required
                        ></textarea>
                        
                        <button 
                            type="submit"
                            disabled={isPending}
                            className={`font-bold py-3 rounded-xl transition-colors shadow-lg ${
                                isPending ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'
                            }`}
                        >
                            {isPending ? "Enviando..." : "Enviar Respuesta"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReplyPage;