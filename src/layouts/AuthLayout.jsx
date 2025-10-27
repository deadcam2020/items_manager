// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06001e]">
      <div className="bg-white shadow-lg rounded-2xl  w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
