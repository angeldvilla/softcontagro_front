import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { toast, Toaster } from "sonner";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id;

  const { error } = useSelector((state) => state?.user);
  const { user } = useSelector((state) => state?.userDetails);


  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user?.name);
      setEmail(user?.email);
      setRole(user?.role);
    }

    if (error) {
      toast.error("Error al actualizar el usuario");
      dispatch(clearErrors());
    }
  }, [dispatch, error, navigate, userId, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(userId, formData, navigate));
  };

  return (
    <div className="flex mx-w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="col-12 col-md-10 mt-5 ml-auto mr-auto">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mt-2 mb-5 font-sans text-2xl">
                Actualizar Usuario
              </h1>

              <div className="form-group mb-8">
                <label htmlFor="name_field" className="text-xl">
                  Nombre
                </label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control font-sans text-lg font-light"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group mb-8">
                <label htmlFor="email_field" className="text-xl">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control font-sans text-lg font-light"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group mb-8">
                <label htmlFor="role_field" className="text-xl">
                  Rol
                </label>

                <select
                  id="role_field"
                  className="form-control font-sans text-lg font-light"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <button
                onClick={submitHandler}
                className="px-1 py-2 font-sans text-sm bg-orange-500 hover:bg-orange-700 rounded-md text-white mt-8 hover:scale-105 duration-150 w-full"
              >
                Actualizar Usuario
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default UpdateUser;
