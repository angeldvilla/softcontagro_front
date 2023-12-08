import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../layout/Loader";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }

    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(!email || !password) {
      return toast.error("Por favor, rellene todos los campos");
    }
    dispatch(login(email, password));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Header isLogin={true} />
          <form
            className="max-w-md mx-auto p-20 rounded-lg shadow-lg mt-12"
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <div className="mb-4">
              <h3 className="text-3xl font-semibold mb-6 text-center">
                Iniciar Sesión
              </h3>
              <label htmlFor="email_field" className="sr-only">
                Correo Electrónico
              </label>
              <div className="flex items-center border-gray-300">
                <FaEnvelope className="mr-2 text-gray-500" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="Correo Electrónico"
                  className="w-full py-2 text-gray-700 focus:outline-none mb-2"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password_field" className="sr-only">
                Contraseña
              </label>
              <div className="flex items-center border-gray-300">
                <FaLock className="mr-2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-2 text-gray-700 focus:outline-none mb-2 pr-10"
                />
                <div
                  className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <label></label>
              <Link
                to="/password/forgot"
                className="text-blue-500 hover:underline"
              >
                ¿Contraseña olvidada?
              </Link>
            </div>
            <div className="mt-6">
              <button
                className="primary--btn login-btn w-full"
                onClick={submitHandler}
                style={{ border: "none", background: "none" }}
              >
                <span className="primary--btn login-btn rounded-full w-full">
                  INGRESAR
                </span>
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      )}
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Login;