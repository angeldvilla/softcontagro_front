import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserCircle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
const NewUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userData;

  const [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dxe4igvmq/image/upload/v1701735128/avatars/vq3vfsnac9izn50yvgpw.png"
  );
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dxe4igvmq/image/upload/v1701735128/avatars/vq3vfsnac9izn50yvgpw.png"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error("Correo o contraseña incorrectos");
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate]);

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
      toast.success("Usuario creado con exito!");
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
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full h-screen-xl flex flex-col items-center">
            <div className="wrapper my-5">
              <form
                className="shadow-lg w-96 mx-auto -mt-16"
                onSubmit={submitHandler}
              >
                <h1 className="mb-4 text-2xl text-center font-sans">
                  Crear nuevo usuario
                </h1>

                <div className="form-group mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <div className="flex items-center border-gray-300">
                    <FaUserCircle className="mr-2 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nombre Completo"
                      className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                      value={name}
                      onChange={onchange}
                    />
                  </div>
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico
                  </label>
                  <div className="flex items-center border-gray-300">
                    <FaEnvelope className="mr-2 text-gray-500" />
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Correo Electrónico"
                      className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                      value={email}
                      onChange={onchange}
                    />
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="contraseña"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <div className="flex items-center border-gray-300 relative">
                    <FaLock className="mr-2 text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"} // Usa el estado showPassword para cambiar entre text y password
                      id="contraseña"
                      name="password"
                      placeholder="Contraseña"
                      className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                      value={password}
                      onChange={onchange}
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
                          style={{
                            width: "100%",
                            height: "100%",
                            marginTop: "2em",
                          }}
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
                        className="custom-file-input font-sans text-md"
                        id="customFile"
                        onChange={onchange}
                      />
                    </div>
                  </div>
                </div>

                <button
                  id="login_button"
                  onClick={submitHandler}
                  className="px-2 py-3 font-sans text-md bg-orange-500 hover:bg-orange-700 rounded-md text-white mt-8 hover:scale-105 duration-150 w-full"
                  disabled={loading ? true : false}
                >
                  CREAR USUARIO
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default NewUser;
