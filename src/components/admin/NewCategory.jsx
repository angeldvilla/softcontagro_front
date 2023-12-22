import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NEW_CATRGORY_RESET } from "../../constants/categoryConstants";
import { newCategory, clearErrors } from "../../actions/categoryActions";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, success } = useSelector(
    (state) => state?.newCategory
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (error) {
      toast.error("Error al crear la categoria");
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/category");
      toast.success("Categoria creada exitosamente");
      dispatch({ type: NEW_CATRGORY_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newCategory(formData));
  };
  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
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
              <form className="shadow-lg w-96 mx-auto" onSubmit={submitHandler}>
                <h1 className="mb-4 text-2xl text-center font-sans">
                  Nueva Categoría
                </h1>

                <div className="form-group mb-4">
                  <label
                    htmlFor="name_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Elegir imágenes</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input font-sans font-light text-sm"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                  </div>

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="55"
                      height="52"
                    />
                  ))}
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="px-2 py-3 font-sans text-md bg-orange-500 hover:bg-orange-700 rounded-md text-white mt-8 hover:scale-105 duration-150 w-full"
                  disabled={loading ? true : false}
                >
                  CREAR CATEGORIA
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default NewCategory;
