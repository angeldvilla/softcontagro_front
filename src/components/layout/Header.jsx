import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { logout } from "../../actions/userActions";
import "../../App.css";
import { getCategory } from "../../actions/categoryActions";

const Header = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  return (
    <Fragment>
      <header
        className="header-1 shadow-lg fixed-top mb-5"
        style={{ backgroundColor: "#e3e1e1", padding: "0" }}
      >
        <div className="container-fluid">
          <div className="row justify-between">
            <div className="col-lg-5 col-md-5 col-sm-2 col-8 flex items-center">
              <nav className="main-nav hidden lg:block">
                <ul className="flex items-center">
                  <li className="menu-item">
                    <Link to="/" className="menu-link">
                      Hamza
                    </Link>
                  </li>
                  <li>
                    <ul className="flex">
                      <li>
                        <nav className="main-nav hidden lg:block">
                          <ul className="flex items-center">
                            <li className="menu-item relative">
                              <Link to="" className="menu-link">
                                Categories
                                <ul className="submenu-home1">
                                  {category.map((category) => (
                                    <li key={category._id}>
                                      <Link to={`/search/${category.name}`}>
                                        {category.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <Link to="/contact" className="menu-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav className="main-nav block lg:hidden">
                <ul className="flex items-center">
                  {user ? (
                    <>
                      <li className="menu-item relative">
                        <Link to="#" className="menu-link">
                          Menu
                          <ul className="submenu-home1">
                            {user && user.role !== "admin" ? (
                              <li>
                                <Link to="/orders/me">Orders</Link>
                              </li>
                            ) : (
                              <li>
                                <Link to="/dashboard">Dashboard</Link>
                              </li>
                            )}
                            <li>
                              <Link to="/me">Profile</Link>
                            </li>
                            <li>
                              <Link to="/" onClick={logoutHandler}>
                                Logout
                              </Link>
                            </li>
                          </ul>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="menu-item">
                        <Link to="/login">
                          <i className="las la-user"></i>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2 col-4">
              <Link to="/" className="header-1-logo text-center">
                <img src="/images/header-1-logo.svg" alt="" />
              </Link>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-8 hidden sm:block">
              <div className="header-right-area flex justify-end items-center">
                <div className="header-1-icons">
                  <ul className="flex">
                    {isAuthenticated ? (
                      <>
                        <li className="menu-item relative">
                          <nav className="main-nav hidden lg:block">
                            <ul className="flex items-center">
                              <li className="menu-item relative">
                                <figure className="avatar avatar-nav">
                                  <img
                                    src={user.avatar && user.avatar.url}
                                    alt={user && user.name}
                                    className="rounded-circle"
                                  />
                                </figure>
                                <Link to="#" className="menu-link ">
                                  {user.name}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-caret-down-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                  </svg>
                                </Link>
                                <ul className="submenu-home1">
                                  {user && user.role !== "admin" ? (
                                    <li>
                                      <Link to="/orders/me">Orders</Link>
                                    </li>
                                  ) : (
                                    <li>
                                      <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                  )}
                                  <li>
                                    <Link to="/me">Profile</Link>
                                  </li>
                                  <Link
                                    to="/"
                                    className="text-danger"
                                    onClick={logoutHandler}
                                  >
                                    Logout
                                  </Link>
                                </ul>
                              </li>
                            </ul>
                          </nav>
                        </li>
                      </>
                    ) : (
                      <li className="menu-item">
                        <Link to="/login">
                          <i className="fa fa-user mt-3"></i>
                        </Link>
                      </li>
                    )}

                    <li className="menu-item">
                      <Link to="/cart" style={{ textDecoration: "none" }}>
                        <div className="cart-btn relative mt-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-minecart"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7H1.102z" />
                          </svg>
                          <div className="cart-items-count">
                            {cartItems.length}
                          </div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="header-1-contact flex items-center">
                  <div className="contact-num">
                    <span>Hot Line Number</span>
                    <p>+92 318 1575228</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Toaster position="top-center" richColors />
    </Fragment>
  );
};

export default Header;
