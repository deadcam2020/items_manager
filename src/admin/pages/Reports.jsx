import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminReports } from "../hooks/admin.hooks";

const Reports = () => {

    const {data: reports = []} = useAdminReports()
    const [expandedId, setExpandedId] = useState(null);
    const navigate = useNavigate();

    // Función para alternar la expansión
    const toggleReport = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
    };

    return (
        <div className="reports-container">

        <div className="p-6  min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-8 text-center text-white">Reports</h1>

            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
                {reports.map((report) => {
                    const isExpanded = expandedId === report.id;

                    return (
                        <div
                            key={report.id}
                            onClick={() => toggleReport(report.id)}
                            className={`cursor-pointer transition-all duration-300 border border-gray-700 rounded-xl overflow-hidden ${isExpanded ? 'bg-slate-800' : 'bg-slate-800/50 hover:bg-slate-800'
                                }`}
                        >
                            {/* CABECERA (Siempre visible) */}
                            <div className="p-4 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-blue-400 font-bold uppercase">{report.user_name}</p>
                                    <h2 className="font-semibold text-lg">{report.headline}</h2>
                                    <span className={`text-xs ${report.status === 'resolved' ? 'text-green-400' : 'text-red-400'} font-semibold`}>{report.status}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-400">{formatDate(report.created_at)}</span>

                                    <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>
                            </div>

                            {/* CONTENIDO DESPLEGABLE (Solo si isExpanded es true) */}
                            {isExpanded && (
                                <div className="p-4 border-t border-gray-700 bg-slate-800 animate-in slide-in-from-top-2 duration-300">
                                    <p className="text-gray-300 mb-4">{report.description}</p>

                                    {report.image_url && (
                                        <div className="mb-4 rounded-lg overflow-hidden border border-gray-600">
                                            <img
                                                src={report.image_url}
                                                alt="Reporte"
                                                className="w-full max-h-64 object-contain bg-black"
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-green-400 uppercase">
                                            Estado: {report.status}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                            }}
                                            className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                navigate(`/admin/reports/reply/${report.id}`, { state: { report } });
                                            }}
                                            className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                        >
                                            Responder
                                        </button>

                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
};

export default Reports;