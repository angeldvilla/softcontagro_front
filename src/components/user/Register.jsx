import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  FaEnvelope,
  FaLock,
  FaUserCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const RegisterForm = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dxe4igvmq/image/upload/v1701735128/avatars/vq3vfsnac9izn50yvgpw.png"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dxe4igvmq/image/upload/v1701735128/avatars/vq3vfsnac9izn50yvgpw.png"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      toast.error("Correo o contraseña incorrectos");
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    try {
      e.preventDefault();
      if (!name || !email || !password) {
        return toast.error("Por favor, rellene todos los campos");
      }

      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("password", password);
      formData.set("avatar", avatar);

      dispatch(register(formData));
      toast.success("Registro exitoso!");
    } catch (error) {
      toast.error("Error al registrar el usuario");
      console.error("Error en el registro:", error);
    }
  };

  const onchange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <Header />
        <form
          className="max-w-md mx-auto p-8 rounded-lg shadow-lg mt-12"
          /* encType="multipart/form-data" */
          onSubmit={submitHandler}
        >
          <h1 className="text-center text-3xl font-bold mt-10 mb-5 font-sans">
            Registro de Usuario
          </h1>
          <div className="mb-4">
            <label htmlFor="name_field" className="sr-only">
              Nombre
            </label>
            <div className="flex items-center border-gray-300">
              <FaUserCircle className="mr-2 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Nombre Completo"
                value={name}
                onChange={onchange}
                className="w-full py-2 text-gray-700 focus:outline-none mb-2 font-sans"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email_field" className="sr-only">
              Correo Electrónico
            </label>
            <div className="flex items-center border-gray-300">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="text"
                name="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={onchange}
                className="w-full py-2 text-gray-700 focus:outline-none mb-2 font-sans"
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
                onChange={onchange}
                className="w-full py-2 text-gray-700 focus:outline-none mb-2 pr-10 font-sans"
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
          <div className="mb-14">
            <label htmlFor="avatar_upload">Avatar</label>
            <div className="flex items-center">
              <div>
                <figure className="avatar mr-3">
                  <img
                    src={avatarPreview}
                    className="rounded-full"
                    alt="Avatar Preview"
                    style={{ width: "100%", height: "100%", marginTop: "2em" }}
                  />
                </figure>
              </div>
              <div className="custom-file">
                <label className="custom-file-label" htmlFor="customFile">
                  Elegir Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="custom-file-input font-sans"
                  id="customFile"
                  onChange={onchange}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button
              className="primary--btn login-btn w-full"
              onClick={submitHandler}
              style={{ border: "none", background: "none" }}
            >
              <button className="primary--btn login-btn rounded-full w-full font-sans text-sm">
                CREAR CUENTA
              </button>
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="top-right" richColors />
      <Footer />
    </div>
  );
};

export default RegisterForm;
