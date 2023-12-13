import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error("Error al actualizar contraseña");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Contraseña actualizada con exito");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <div>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5 text-2xl font-sans">
              Actualizar contraseña
            </h1>

            <div className="mb-4 relative">
              <label for="old_password_field" className="text-lg font-sans">
                Contraseña actual
              </label>
              <div className="flex items-center border-gray-300">
                <input
                  type={showOldPassword ? "text" : "password"}
                  id="old_password_field"
                  className="w-full py-2 focus:outline-none mb-2 pr-10 font-sans font-light"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <div
                  className="cursor-pointer absolute right-2 top-1/5 transform -translate-y-1/2"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4 relative">
              <label for="new_password_field" className="text-lg font-sans">
                Nueva contraseña
              </label>
              <div className="flex items-center border-gray-300">
                <input
                  type={showPassword ? "text" : "password"}
                  id="new_password_field"
                  className="w-full py-2 focus:outline-none mb-2 pr-10 font-sans font-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="cursor-pointer absolute right-2 top-1/5 transform -translate-y-1/2"
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

            <Button
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-700 border-0 py-2 px-4 focus:outline-none rounded-full text-md mt-5 md:mt-8"
              disabled={loading ? true : false}
            >
              Actualizar contraseña
            </Button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default UpdatePassword;
