import { useState } from "react";
import { FaStar } from "react-icons/fa6";

const RateProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [valoration, setValoration] = useState(0);
  const [hover, setHover] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (valoration === 0) return alert("Selecciona una calificación");
    onSubmit(valoration);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">
          Califica este producto
        </h2>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={32}
              className={`cursor-pointer ${
                (hover || valoration) >= star
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setValoration(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};


export default RateProductModal;