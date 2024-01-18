import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProductHunt,
  FaClipboard,
  FaPlus,
  FaShoppingBasket,
  FaUsers,
  FaStar,
  FaBars,
  FaChevronRight,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";
import { Avatar } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { toast } from "sonner";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const toggleProduct = () => {
    setProductOpen(!productOpen);
    setCategoryOpen(false);
  };

  const toggleCategory = () => {
    setCategoryOpen(!categoryOpen);
    setProductOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Sesión cerrada!");
  };

  const goProfile = () => {
    navigate("/me");
  };

  return (
    <div
      className={`transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-24"
      } min-h-screen bg-blue-gray-900 text-white`}
    >
      <nav
        /*  id="sidebar" */
        className={`fixed flex flex-col items-center ${
          sidebarOpen ? "w-52" : "w-24"
        }`}
      >
        <div className="toggle-btn p-4 mb-6" onClick={toggleSidebar}>
          <FaBars className="text-white cursor-pointer text-xl" />
        </div>
        <ul
          className={`list-unstyled mt-4 ${sidebarOpen ? "visible" : "ml-1"}`}
        >
          <li className="hover:bg-gray-200 hover:text-black flex items-center">
            <Link to="/" className="flex items-center">
              <FaHome className="mr-2 text-2xl" />
              {sidebarOpen && <p>Inicio</p>}
            </Link>
          </li>
          <li className="mb-4 flex items-center hover:bg-gray-200 hover:text-black mt-6">
            <Link to="/dashboard" className="flex items-center">
              <FaTachometerAlt className="mr-2 text-xl" />
              {sidebarOpen && <p>Dashboard</p>}
            </Link>
          </li>
          <li className="mb-4">
            <div
              onClick={toggleProduct}
              className="text-white flex items-center cursor-pointer hover:bg-gray-200 hover:text-black mt-8"
            >
              <FaProductHunt className="mr-2 text-xl" />
              {sidebarOpen && <p>Productos</p>}
              {sidebarOpen && (
                <FaChevronRight
                  className={`ml-2 transition-all duration-300 transform ${
                    productOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              )}
            </div>
            {productOpen && (
              <ul className="pl-4">
                <li className="hover:bg-gray-200 hover:text-black">
                  <Link
                    to="/admin/products"
                    className="text-white flex items-center mt-2"
                  >
                    <FaClipboard className="mr-2" />{" "}
                    {sidebarOpen && <p>Todos</p>}
                  </Link>
                </li>
                <li className="hover:bg-gray-200 hover:text-black mt-4">
                  <Link
                    to="/admin/product"
                    className="text-white flex items-center"
                  >
                    <FaPlus className="mr-2" />{" "}
                    {sidebarOpen && <p>Crear producto</p>}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-4">
            <div
              onClick={toggleCategory}
              className="text-white flex items-center cursor-pointer hover:bg-gray-200 hover:text-black mt-8"
            >
              <FaBoxesStacked className="mr-2 text-xl" />
              {sidebarOpen && <p>Categorias</p>}
              {sidebarOpen && (
                <FaChevronRight
                  className={`ml-auto transition-all duration-300 transform ${
                    categoryOpen ? "rotate-90" : "rotate-0"
                  }`}
                />
              )}
            </div>
            {categoryOpen && (
              <ul className="pl-4">
                <li className="hover:bg-gray-200 hover:text-black mt-2">
                  <Link
                    to="/admin/category"
                    className="text-white flex items-center"
                  >
                    <FaClipboard className="mr-2" />{" "}
                    {sidebarOpen && <p className="ml-2">Todas</p>}
                  </Link>
                </li>
                <li className="hover:bg-gray-200 hover:text-black mt-4">
                  <Link
                    to="/admin/category/new"
                    className="text-white flex items-center"
                  >
                    <FaPlus className="mr-2" />{" "}
                    {sidebarOpen && <p className="ml-2">Crear categoria</p>}
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="hover:bg-gray-200 hover:text-black flex items-center mt-8">
            <Link to="/admin/orders" className="text-white flex items-center">
              <FaShoppingBasket className="text-2xl" />{" "}
              {sidebarOpen && <p className="ml-2">Pedidos</p>}
            </Link>
          </li>
          <li className="hover:bg-gray-200 hover:text-black flex items-center mt-8">
            <Link to="/admin/users" className="text-white flex items-center">
              <FaUsers className="text-2xl" />
              {sidebarOpen && <p className="ml-2">usuarios</p>}
            </Link>
          </li>
          <li className="hover:bg-gray-200 hover:text-black flex items-center mt-8">
            <Link to="/admin/reviews" className="text-white flex items-center">
              <FaStar className="text-2xl" />
              {sidebarOpen && <p className="ml-2">Reseñas</p>}
            </Link>
          </li>
		 <hr className="my-4 border-blue-gray-300" />
          <li className="flex items-center mt-16">
            <Avatar
              color="gray"
              size="sm"
              src={user?.user?.avatar?.url}
              onClick={goProfile}
              className="flex items-center -ml-2 cursor-pointer"
            />
            {sidebarOpen && (
              <p className="ml-2 cursor-pointer" onClick={goProfile}>
                {user?.user?.name}
              </p>
            )}
          </li>

          <li className="flex items-center mt-6">
            <button
              className="text-white hover:bg-gray-200 hover:text-black flex items-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="text-xl" />{" "}
              {sidebarOpen && <p className="ml-2">Cerrar Sesion</p>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
