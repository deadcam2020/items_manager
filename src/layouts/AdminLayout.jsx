// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-6">
      <aside className="col-span-1 bg-gray-900 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
        {/* Aquí puedes agregar enlaces o menú del admin */}
      </aside>

      <main className="col-span-5 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
