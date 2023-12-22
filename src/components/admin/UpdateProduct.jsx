import React, { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);

  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state?.productDetails);
  const { category } = useSelector((state) => state?.category);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state?.product);

  const productId = id;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (product?.product?._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product?.product?.name);
      setPrice(product?.product?.price);
      setDescription(product?.product?.description);
      setCategoryName(product?.product?.categoryName);
      setSeller(product?.product?.seller);
      setStock(product?.product?.stock);
      setOldImages(product?.product?.images);
    }

    if (error) {
      toast.error("Error al cargar el producto");
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error("Error al actualizar el producto");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/products");
      toast.success("Producto actualizado correctamente");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, product, productId]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", categoryName);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(product?.product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

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
              <form
                className="shadow-lg w-96 mx-auto -mt-16"
                onSubmit={submitHandler}
              >
                <h1 className="mb-4 text-2xl text-center font-sans">
                  Actualizar Producto
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
                  <label htmlFor="price_field">Precio</label>
                  <input
                    type="text"
                    id="price_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
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
                  <label htmlFor="category_field">Categoría</label>
                  <select
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    id="category_field"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    {category.map((categorie) => (
                      <option key={categorie?._id} value={categorie?.name}>
                        {categorie?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="stock_field">Stock</label>
                  <input
                    type="number"
                    id="stock_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="seller_field">Nombre Fabricante</label>
                  <input
                    type="text"
                    id="seller_field"
                    className="form-input mt-1 block w-full rounded-md border-gray-300 font-sans font-light text-sm"
                    value={seller}
                    onChange={(e) => setSeller(e.target.value)}
                  />
                </div>

                <div className="form-group font-sans font-light">
                  <label>Elegir imáges</label>

                  <div className="custom-file">
                    <input
                      type="file"
                      name="product_images"
                      className="custom-file-input font-sans text-sm font-light"
                      id="customFile"
                      onChange={onChange}
                      multiple
                    />
                  </div>

                  {oldImages &&
                    oldImages.map((img) => (
                      <img
                        key={img}
                        src={img.url}
                        alt={img.url}
                        className="mt-3 mr-2"
                        width="155"
                        height="52"
                      />
                    ))}

                  {imagesPreview.map((img) => (
                    <img
                      src={img}
                      key={img}
                      alt="Images Preview"
                      className="mt-3 mr-2"
                      width="155"
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
                  ACTUALIZAR PRODUCTO
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

export default UpdateProduct;
