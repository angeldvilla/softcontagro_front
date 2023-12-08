import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scrollSpy, scroller } from "react-scroll";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "../../actions/userActions";
import { getCategory } from "../../actions/categoryActions";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { Button } from "@material-tailwind/react";

import "../../App.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const scrollToSection = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Sesión cerrada!");
  };

  return (
    <>
      <header className="bg-gray-100 shadow-lg fixed top-0 w-full py-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-gray-800">
            <img
              src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702051130/SoftContAgro/eb2emrt90t6vpse9dapa.png"
              className="w-20"
              alt="logo-finca-la-lolita"
            />
          </a>

          <div className="flex items-center space-x-4">
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-4">
                <p>
                  <Link
                    to="/"
                    onClick={() => scrollToSection("inicio")}
                    className="text-md text-black 
                    hover:text-gray-700"
                  >
                    INICIO
                  </Link>
                </p>
                <p>
                  <Link
                    onClick={() => scrollToSection("productos")}
                    className="text-md text-black hover:text-gray-700"
                  >
                    NUESTROS PRODUCTOS
                  </Link>
                </p>
                <p>
                  <Link
                    to="/contact"
                    className="text-md text-black hover:text-gray-700"
                  >
                    CONTACTO
                  </Link>
                </p>
              </ul>
            </nav>

            <div className="lg:hidden">
              <Button color="gray" size="sm" onClick={() => navigate("/login")}>
                <FaUser className="mr-2" />
                {isAuthenticated ? "Perfil" : "Iniciar Sesión"}
              </Button>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <Button color="gray" size="sm">
                    <FaUser className="mr-2" />
                    {user.name}
                  </Button>
                  <ul className="hidden group-hover:block absolute top-full left-0 bg-white p-4 space-y-2">
                    {user && user.role !== "admin" && (
                      <li>
                        <Link
                          to="/orders/me"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          PEDIDOS
                        </Link>
                      </li>
                    )}
                    {user && user.role === "admin" && (
                      <li>
                        <Link
                          to="/dashboard"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          DASHBOARD
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        to="/me"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        PERFIL
                      </Link>
                    </li>
                    <li>
                      <a
                        href="/"
                        onClick={logoutHandler}
                        className="text-red-500"
                      >
                        CERRAR SESIÓN
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="flex items-center hover:bg-blue-gray-400 transition-colors duration-300"
                >
                  <FaUser className="mr-1 hover:text-2xl transition-all duration-300" />
                  INICIAR SESIÓN
                </Button>
              )}

              <Link to="/cart" className="text-gray-700 hover:text-gray-900">
                <div className="relative group">
                  <FaShoppingCart className="text-2xl hover:text-3xl transition-all duration-300" />
                  {cartItems.length > 0 && (
                    <div className="cart-items-count absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1">
                      {cartItems.length}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
