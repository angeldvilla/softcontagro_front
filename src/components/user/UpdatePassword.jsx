import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const UpdatePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

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
            <div className="form-group">
              <label for="old_password_field" className="text-lg font-sans">
                Contraseña actual
              </label>
              <input
                type="password"
                id="old_password_field"
                className="form-control text-lg"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label for="new_password_field" className="text-lg font-sans">
                Nueva contraseña
              </label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
