import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <NavLink to="/" className="sidebar-list-item">
                    <img
                        src={logo}
                        alt="home"
                        className='ww-20 md:w-20'
                    />
                </NavLink>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list' onClick={OpenSidebar}>
                <NavLink to="/admin/dashboard" className="sidebar-list-item">
                    <BsGrid1X2Fill className='icon' />
                    Dashboard
                </NavLink>

                <NavLink to="/admin/products" className="sidebar-list-item">
                    <BsFillArchiveFill className='icon' /> Products
                </NavLink>

                <NavLink to="/admin/categories" className="sidebar-list-item">
                    <BsFillGrid3X3GapFill className='icon' /> Categories
                </NavLink>

                <NavLink to="/admin/customers" className="sidebar-list-item">
                    <BsPeopleFill className='icon' /> Customers
                </NavLink>

                <NavLink to="/admin/reports" className="sidebar-list-item">
                    <BsMenuButtonWideFill className='icon' /> Reports
                </NavLink>

                <NavLink to="/admin/settings" className="sidebar-list-item">
                    <BsFillGearFill className='icon' /> Setting
                </NavLink>
            </ul>
        </aside>
    )
}

export default Sidebar