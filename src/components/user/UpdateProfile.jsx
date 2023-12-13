import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const UpdateProfile = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dxe4igvmq/image/upload/v1701735128/avatars/vq3vfsnac9izn50yvgpw.png"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user?.user?.name);
      setEmail(user?.user?.email);
      setAvatarPreview(user?.user?.avatar?.url);
    }

    if (error) {
      toast.error("Error para actualizar datos del perfil");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Perfil actualizada con exito");
      dispatch(loadUser());

      navigate("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated, user]);

  const submitHandler = (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("avatar", avatar);

      dispatch(updateProfile(formData));
      toast.success("Perfil actualizada con exito");
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar perfil");
    }
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <p className="mt-2 mb-5 text-2xl">Actualiza tu perfil</p>

            <div className="form-group mb-4">
              <label htmlFor="email_field" className="text-lg">Nombre Completo</label>
              <input
                type="name"
                id="name_field"
                className="form-control font-sans font-light"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="email_field" className="text-lg">Correo Electronico</label>
              <input
                type="email"
                id="email_field"
                className="form-control font-sans font-light"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-6">
              <label htmlFor="avatar_upload" className="text-lg">Foto</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file mt-4">
                  <label className="custom-file-label text-lg" htmlFor="customFile" >
                    Elegir Foto
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input font-sans font-light"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="text-white bg-orange-500 hover:bg-orange-700 border-0 py-2 px-4 focus:outline-none rounded-full text-md mt-5 md:mt-8"
              disabled={loading ? true : false}
            >
              Actualizar
            </Button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default UpdateProfile;
