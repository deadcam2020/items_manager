import { useProductStore } from "@/items/store/products.store";
import { useEffect } from "react";

const Reports = () => {
    const { getReports, reports } = useProductStore()
    useEffect(() => {
        getReports()
    }, [getReports])

const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


    return (
        <div className="reports-container">
            <h1 className="text-white font-semibold">Reports</h1>
            <div className="reports-grid" >
                {reports.map((report) => (
                    <div
                        className="report-card"
                        key={report.id}>

                        <div>
                            <p className="text-sm text-gray-300 font-semibold"> {report.user_name}</p>
                            <p className="font-semibold text-xl"> {report.headline}</p>
                            <p> {report.description}</p>
                        </div>
                        <p className="text-sm text-gray-400 self-end">
                            {formatDate(report.created_at)}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Reports;