import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Textarea } from "@material-tailwind/react";
import { Rating } from "@material-tailwind/react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state?.productDetails
  );
  const { user } = useSelector((state) => state?.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state?.newReview
  );
  const { category } = useSelector((state) => state?.category);

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getProducts());

    if (error) {
      toast.error("Error al cargar el producto");
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error("Error al enviar la reseña");
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Reseña enviada con exito");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, reviewError, success, id]);

  const addToCart = () => {
    try {
      if (product?.product?.stock === 0) {
        toast.error("No hay stock disponible");
      } else if (quantity === 0) {
        toast.error("Por favor, ingrese una cantidad");
      } else {
        dispatch(addItemToCart(id, quantity));
        toast.success("Agregado al carrito");
        navigate("/cart");
      }
    } catch (error) {
      toast.error("Error al agregar al carrito");
    }
  };

  const categoryName = category.find(
    (cat) => cat._id === product?.product?.category
  )?.name;

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= (product?.product?.stock || 0)) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 0) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const setUserRatings = (value) => {
    setRating(value === rating ? 0 : value);
  };

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));
  };

  const calculateRating = () => {
    const rating = Math.round(product?.product?.ratings / 5);
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className="text-yellow-500" />
    ));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <section className="flex items-center mt-14 justify-center h-screen">
            <div className="container mt-48">
              {/*   <h1 className="text-3xl font-bold mt-32 mb-8 font-sans flex items-center">
                {product?.product?.name}
              </h1> */}
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                  <div className="product-details-gallery">
                    <div className="flex">
                      <div className="w-3/4">
                        <div className="tab-content" id="v-pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="v-pills-img1"
                            role="tabpanel"
                          >
                            <div className="gallery-big-image shadow-lg">
                              {product?.product?.images &&
                                product?.product?.images?.map(
                                  (image, index) => (
                                    <img
                                      key={index}
                                      className="w-full h-auto rounded-lg"
                                      src={image?.url}
                                      alt={product?.product?.name}
                                    />
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="prod-details-content">
                    <p className="text-3xl font-bold mb-4">
                      {product?.product?.name}
                    </p>
                    <p className="border-b-2 pb-2 mb-10">
                      <span className="text-xl font-bold">Precio: </span>
                      <span className="text-xl font-bold">
                        ${product?.product?.price} COP
                      </span>
                    </p>
                    <p className="mb-8 -mt-4">
                      {product?.product?.description}
                    </p>
                    <div className="prod-quantity flex items-center mb-10">
                      <div className="quantity flex items-center">
                        <input
                          className="count p-1"
                          type="number"
                          value={quantity}
                          readOnly
                        />
                        <div className="flex flex-col ml-4">
                          <button
                            onClick={increaseQty}
                            className="text-2xl text-gray-700 focus:outline-none"
                          >
                            <AiOutlinePlusCircle />
                          </button>
                          <button
                            onClick={decreaseQty}
                            className="text-2xl text-gray-700 focus:outline-none"
                          >
                            <AiOutlineMinusCircle className="mt-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={addToCart}
                        className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-105 duration-150 ml-8 font-sans"
                      >
                        Añadir al carrito
                        <FaCartPlus className="ml-3" />
                      </button>
                    </div>
                    <ul className="prod-info">
                      <li>
                        <span>Stock:</span>
                        <b
                          className={
                            product?.product?.stock
                              ? "text-green-700"
                              : "text-red-700"
                          }
                        >
                          {product?.product?.stock
                            ? product?.product?.stock
                            : "Agotado"}
                        </b>
                      </li>
                      <li>
                        <span>Categoria:</span>
                        {categoryName}
                      </li>
                      <li>
                        {user ? (
                          <>
                            <div className="flex items-center mt-2 mb-4">
                              <div className="mr-2">Calificación:</div>
                              <Rating
                                value={rating}
                                precision={0}
                                onChange={(value) => setUserRatings(value)}
                              />
                            </div>
                            <button
                              id="review_btn"
                              onClick={reviewHandler}
                              disabled={rating === 0}
                              className="btn btn-primary mt-4 mb-6 text-white hover:scale-105 duration-150 disabled:text-gray-400"
                              data-toggle="modal"
                              data-target="#ratingModal"
                            >
                              Envíe su calificación
                            </button>
                          </>
                        ) : (
                          <div className="alert alert-danger mt-5 mb-2">
                            <p>Inicie sesión para publicar su calificación.</p>
                          </div>
                        )}
                      </li>
                    </ul>
                    <hr />
                    <div className="rating w-50">
                      <div
                        className="modal fade"
                        id="ratingModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="ratingModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog mb-8" role="document">
                          <div className="modal-content">
                            <div className="modal-body -mt-20 mb-2">
                              <div className="ratings">{calculateRating()}</div>
                              <p className="ml-2">
                                ({product?.product?.numOfReviews} Reseñas)
                              </p>
                            </div>
                            <div className="modal-header mb-4">
                              <p className="modal-title" id="ratingModalLabel">
                                Deje una breve opinión sobre este producto
                              </p>
                            </div>
                            <div className="col-span-2">
                              <Textarea
                                name="opinion"
                                placeholder="Su Opinión"
                                rows="3"
                                size="lg"
                                outline="true"
                                required
                                className="!border-black mt-1 mb-4"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                labelProps={{
                                  className:
                                    "before:content-none after:content-none",
                                }}
                              />
                              <button
                                className="btn btn-primary  hover:scale-105 duration-150 bg-orange-700 text-white px-4 py-2 rounded-full hover:bg-orange-500 font-sans"
                                onClick={reviewHandler}
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                Enviar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
          <Toaster position="top-right" richColors closeButton />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
