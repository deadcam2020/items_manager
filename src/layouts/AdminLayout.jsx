import { useState } from "react";
import '../admin/admin.css'
import { Outlet } from "react-router-dom";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";

const AdminLayout = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />

        <Outlet />
    </div>
  );
};

export default AdminLayout;
