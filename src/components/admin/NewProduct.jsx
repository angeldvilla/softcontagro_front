import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [catagory, setCatagory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { category } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (error) {
      toast.error("Error al crear el producto");
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/admin/products");
      toast.success("Producto creado exitosamente");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", catagory);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
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
              <form className="shadow-lg w-96 mx-auto -mt-16" onSubmit={submitHandler}>
                <h1 className="mb-4 text-2xl text-center font-sans">
                  Crear Nuevo Producto
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

                <div className="form-group mb-4">
                  <label
                    htmlFor="price_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    id="price_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description_field">Descripción</label>
                  <textarea
                    className="form-control font-sans font-light text-sm"
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="category_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Categoría
                  </label>
                  <select
                    className="form-select mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    id="category_field"
                    onChange={(e) => setCatagory(e.target.value)}
                  >
                    {category.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="stock_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="seller_field"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre Fabricante
                  </label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Elegir Imágenes
                  </label>
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
                  onClick={submitHandler}
                  className="px-2 py-3 font-sans text-md bg-orange-500 hover:bg-orange-700 rounded-md text-white mt-8 hover:scale-105 duration-150 w-full"
                  disabled={loading ? true : false}
                >
                  CREAR PRODUCTO
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default NewProduct;
