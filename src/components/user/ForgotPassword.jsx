import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword, clearErrors } from "../../actions/userActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Input } from "@material-tailwind/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error("Error al enviar correo");
      dispatch(clearErrors());
    }

    if (message) {
      toast.success("Correo enviado con éxito");
    }
  }, [dispatch, error, message]);

  const submitHandler = (e) => {
    if (e.target.value === "") {
      return toast.error("Por favor, ingrese su correo electrónico");
    }
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Header />
        <div className="col-10 col-lg-5">
          <form
            className="max-w-md mx-auto p-20 rounded-lg shadow-lg mt-12"
            onSubmit={submitHandler}
          >
            <h1 className="text-2xl mb-5">Si has olvidado tu contraseña</h1>
            <div className="form-group">
              <label htmlFor="email_field">Ingrese su correo electrónico</label>
              <Input
                type="email"
                name="correoElectronico"
                placeholder="Su correo electrónico"
                size="lg"
                className="!border-black mt-1"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              onClick={submitHandler}
              className=" bg-gray-900 text-white rounded-full py-3 p-12 mt-12 hover:bg-blue-gray-600 transition-all duration-300"
              disabled={loading ? true : false}
            >
              Enviar correo electrónico
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-500 hover:underline">
              <p>Volver a inicio de sesión</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default ForgotPassword;
