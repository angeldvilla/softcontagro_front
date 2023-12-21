import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaProductHunt, FaClipboard, FaPlus, FaShoppingBasket, FaUsers, FaStar, FaBars } from "react-icons/fa";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className={`${sidebarOpen ? 'w-20' : 'w-64'}`}>
      <nav id="sidebar" className={`bg-red-800 ${sidebarOpen ? 'w-20' : 'w-32'}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          <FaBars className="text-white cursor-pointer" />
        </div>
        <ul className="list-unstyled components mt-4">
          <li>
            <Link to="/dashboard" className="text-white">
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <a
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className={`dropdown-toggle text-white ${sidebarOpen ? 'show' : ''}`}
            >
              <FaProductHunt /> Products
            </a>
            <ul
              className={`collapse list-unstyled ${sidebarOpen ? 'show' : ''}`}
              id="productSubmenu"
            >
              <li>
                <Link to="/admin/products" className="text-white">
                  <FaClipboard /> All
                </Link>
              </li>
              <li>
                <Link to="/admin/product" className="text-white">
                  <FaPlus /> Create
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="#categorySubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className={`dropdown-toggle text-white ${sidebarOpen ? 'show' : ''}`}
            >
              <FaProductHunt /> Category
            </a>
            <ul
              className={`collapse list-unstyled ${sidebarOpen ? 'show' : ''}`}
              id="categorySubmenu"
            >
              <li>
                <Link to="/admin/category" className="text-white">
                  <FaClipboard /> All
                </Link>
              </li>
              <li>
                <Link to="/admin/category/new" className="text-white">
                  <FaPlus /> Create
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/admin/orders" className="text-white">
              <FaShoppingBasket /> Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="text-white">
              <FaUsers /> Users
            </Link>
          </li>
          <li>
            <Link to="/admin/reviews" className="text-white">
              <FaStar /> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
