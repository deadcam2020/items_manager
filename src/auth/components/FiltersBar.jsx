import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RiFilter3Line, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";

const FiltersBar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const [min, setMin] = useState(queryParams.get("min") || "");
  const [max, setMax] = useState(queryParams.get("max") || "");
  const [status, setStatus] = useState(queryParams.get("status") || "");

  const [open, setOpen] = useState(false); // 👈 toggle de visibilidad

  const query = queryParams.get("query") || "";

  const applyFilters = () => {
    const params = new URLSearchParams();
    params.set("query", query);

    if (min) params.set("min", min);
    if (max) params.set("max", max);
    if (status) params.set("status", status);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white shadow-sm p-3 rounded-md mt-2">

      {/* HEADER de filtros con botón toggle */}
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2">
          <RiFilter3Line className="text-lg" />
          <h3 className="font-semibold text-sm">Filtros</h3>
        </div>

        {open ? (
          <RiArrowUpSLine className="text-2xl" />
        ) : (
          <RiArrowDownSLine className="text-2xl" />
        )}
      </div>

      {/* CONTENIDO — OCULTABLE */}
      <div className={`grid transition-all overflow-hidden duration-300 ease-in-out
        ${open ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"}
      `}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden">

          <input
            type="number"
            placeholder="Precio mínimo"
            className="bg-gray-100 p-2 rounded-md"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />

          <input
            type="number"
            placeholder="Precio máximo"
            className="bg-gray-100 p-2 rounded-md"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />

          <select
            className="bg-gray-100 p-2 rounded-md"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Estado: Todos</option>
            <option value="new">Nuevo</option>
            <option value="used">Usado</option>
          </select>

          <button
            onClick={applyFilters}
            className="bg-primary text-white p-2 rounded-md hover:bg-primary-dark"
          >
            Aplicar
          </button>

        </div>
      </div>

    </div>
  );
};

export default FiltersBar;
