import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "../../actions/userActions";
import { getCategory } from "../../actions/categoryActions";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Button, Avatar } from "@material-tailwind/react";
import "../../App.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Sesión cerrada!");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      const mobileMenuButton = document.querySelector(".mobile-menu-button");
      const mobileMenu = document.querySelector(".mobile-menu");
      const lgHiddenButton = document.querySelector(".lg\\:hidden");

      if (
        mobileMenuButton &&
        isMobileMenuOpen &&
        !mobileMenuButton.contains(event.target) &&
        mobileMenu &&
        !mobileMenu.contains(event.target) &&
        lgHiddenButton &&
        !lgHiddenButton.contains(event.target)
      ) {
        toggleMobileMenu();
      }
    };

    document.addEventListener("click", closeMenuOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [isMobileMenuOpen, toggleMobileMenu]);

  return (
    <>
      <header className="bg-gray-100 shadow-lg fixed top-0 w-full py-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <img
              src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702051130/SoftContAgro/eb2emrt90t6vpse9dapa.png"
              className="w-20"
              alt="logo-finca-la-lolita"
            />
          </Link>

          <div className="flex items-center space-x-4">
            <nav className="hidden lg:block">
              <ul className="flex items-center space-x-4">
                <p>
                  <Link
                    to="/"
                    className="text-md text-black hover:text-gray-700"
                  >
                    INICIO
                  </Link>
                </p>
                <p>
                  <Link
                    to="/about-us"
                    className="text-md text-black hover:text-gray-700"
                  >
                    SOBRE NOSOTROS
                  </Link>
                </p>
                <p>
                  <Link
                    to="/products"
                    onClick={() => toggleMobileMenu()}
                    className="text-md text-black hover:text-gray-700"
                  >
                    PRODUCTOS
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
              <Button
                color="gray"
                size="sm"
                onClick={() => toggleMobileMenu()}
                className="flex items-center"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </Button>
            </div>

            {isMobileMenuOpen && (
              <div className="lg:hidden mobile-menu absolute top-16 right-0 bg-white w-48 mt-2 rounded-md shadow-md">
                <ul className="space-y-2 p-4">
                  {!isAuthenticated && (
                    <>
                      <p>
                        <Link
                          to="/"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          INICIO
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/about-us"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          SOBRE NOSOTROS
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/products"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          PRODUCTOS
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/contact"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          CONTACTO
                        </Link>
                      </p>
                      <hr />
                      <Button
                        color="gray"
                        size="sm"
                        onClick={() => navigate("/login")}
                        className="flex items-center hover:bg-blue-gray-400 transition-colors duration-300"
                      >
                        <FaUser className="mr-1" />
                        INICIAR SESIÓN
                      </Button>
                      <Button
                        color="gray"
                        size="sm"
                        onClick={() => navigate("/cart")}
                        className="flex items-center mobile-menu-button"
                      >
                        <FaShoppingCart className="mr-1 hover:text-2xl transition-all duration-300" />
                        CARRITO ({cartItems.length})
                      </Button>
                    </>
                  )}

                  {isAuthenticated && (
                    <>
                      <p>
                        <Link
                          to="/"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black text-sm hover:text-gray-700"
                        >
                          INICIO
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/about-us"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black text-sm hover:text-gray-700"
                        >
                          SOBRE NOSOTROS
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/products"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black text-sm hover:text-gray-700"
                        >
                          PRODUCTOS
                        </Link>
                      </p>
                      <p>
                        <Link
                          to="/contact"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black text-sm hover:text-gray-700"
                        >
                          CONTACTO
                        </Link>
                      </p>
                      <hr />

                      <p className="flex items-center text-sm hover:text-gray-600">
                        {user?.user?.name.toUpperCase()}
                      </p>
                      <hr />
                      <p className="flex items-center text-sm hover:text-gray-600">
                        <Link
                          to="/orders/me"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          PEDIDOS
                        </Link>
                      </p>
                      {user && user?.user?.role === "admin" && (
                        <p className="flex items-center text-sm hover:text-gray-600">
                          <Link
                            to="/dashboard"
                            onClick={() => toggleMobileMenu()}
                            className="text-md text-black hover:text-gray-700"
                          >
                            DASHBOARD
                          </Link>
                        </p>
                      )}
                     {/*  <p className="flex items-center text-sm hover:text-gray-600">
                        <Link
                          to="/me/favorites"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          FAVORITOS
                        </Link>
                      </p> */}
                      <p className="flex items-center text-sm hover:text-gray-600">
                        <Link
                          to="/me"
                          onClick={() => toggleMobileMenu()}
                          className="text-md text-black hover:text-gray-700"
                        >
                          PERFIL
                        </Link>
                      </p>
                      <Button
                        color="gray"
                        size="sm"
                        onClick={() => navigate("/cart")}
                        className="flex items-center mobile-menu-button"
                      >
                        <FaShoppingCart className="mr-1 hover:text-2xl transition-all duration-300" />
                        CARRITO ({cartItems.length})
                      </Button>
                      <hr />
                      <p className="flex items-center text-sm hover:text-gray-600">
                        <a
                          href="/"
                          onClick={() => {
                            logoutHandler();
                            toggleMobileMenu();
                          }}
                          className="text-red-700 hover:text-red-900"
                        >
                          CERRAR SESIÓN
                        </a>
                      </p>
                    </>
                  )}
                </ul>
              </div>
            )}

            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative group">
                  <Avatar
                    color="gray"
                    size="sm"
                    src={user?.user?.avatar?.url}
                    className="flex items-center"
                  />
                  <ul className="hidden group-hover:block absolute top-full left-0 bg-white p-4 space-y-2">
                    <p className="flex items-center text-sm hover:text-gray-600">
                      {user?.user?.name.toUpperCase()}
                    </p>
                    <hr />
                    <p className="flex items-center text-sm hover:text-gray-600">
                      <Link
                        to="/orders/me"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        PEDIDOS
                      </Link>
                    </p>
                    {user && user?.user?.role === "admin" && (
                      <p className="flex items-center text-sm hover:text-gray-600">
                        <Link
                          to="/dashboard"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          DASHBOARD
                        </Link>
                      </p>
                    )}
                   {/*  <p className="flex items-center text-sm hover:text-gray-600">
                      <Link
                        to="/me/favorites"
                        onClick={() => toggleMobileMenu()}
                        className="text-md text-black hover:text-gray-700"
                      >
                        FAVORITOS
                      </Link>
                    </p> */}
                    <p className="flex items-center text-sm hover:text-gray-600">
                      <Link
                        to="/me"
                        className="text-gray-700 hover:text-gray-900"
                      >
                        PERFIL
                      </Link>
                    </p>
                    <hr />
                    <p className="flex items-center text-sm hover:text-gray-600">
                      <a
                        href="/"
                        onClick={logoutHandler}
                        className="text-red-700 hover:text-red-900"
                      >
                        CERRAR SESIÓN
                      </a>
                    </p>
                  </ul>
                </div>
              ) : (
                <Button
                  color="gray"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="flex items-center hover:bg-blue-gray-400 transition-colors duration-300"
                >
                  <FaUser className="mr-1" />
                  INICIAR SESIÓN
                </Button>
              )}

              <Link to="/cart" className="text-gray-700 hover:text-gray-900">
                <div className="relative group">
                  <FaShoppingCart className="text-2xl hover:text-3xl transition-all duration-300" />
                  {cartItems.length > 0 && (
                    <div className="cart-items-count absolute -top-5 -right-2 bg-red-700 text-white rounded-full px-2">
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
