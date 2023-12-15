import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import ListReviews from "../review/ListReviews";
import Header from "../layout/Header";
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
import RelatedProducts from "./RelatedProducts";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaStar,
  FaCartPlus,
} from "react-icons/fa";
import { Textarea } from "@material-tailwind/react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
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
    dispatch(addItemToCart(id, quantity));
    toast.success("Agregado al carrito");
  };

  const nameCat = category.find(
    (cat) => cat._id === product?.product?.category
  );

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

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("text-orange-500");

            setRating(this.starValue);
          } else {
            star.classList.remove("text-orange-500");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("text-yellow-500");
          } else {
            star.classList.remove("text-yellow-500");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("text-yellow-500");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", id);

    dispatch(newReview(formData));
  };

  const calculateRating = () => {
    const rating = Math.round(product?.ratings / 5);
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
          <section className="flex items-center mt-16 justify-center h-screen">
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
                                      style={{ objectFit: "contain" }}
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
                    <p className="mb-4">{product?.description}</p>
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
                            <FaArrowCircleUp />
                          </button>
                          <button
                            onClick={decreaseQty}
                            className="text-2xl text-gray-700 focus:outline-none"
                          >
                            <FaArrowCircleDown className="mt-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={addToCart}
                        disabled={product.product?.stock || quantity === 0}
                        className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-105 duration-150 ml-8"
                      >
                        <Link to="/cart">
                          Añadir al carrito
                          <FaCartPlus className="ml-2" />
                        </Link>
                      </button>
                    </div>
                    <ul className="prod-info">
                      <li>
                        <span>Cantidad:</span>
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
                        {product?.product?.category}
                      </li>
                      <li>
                        {user ? (
                          <button
                            id="review_btn"
                            type="button"
                            className="btn btn-primary mt-4"
                            data-toggle="modal"
                            data-target="#ratingModal"
                            onClick={setUserRatings}
                          >
                            Envíe su opinión
                          </button>
                        ) : (
                          <div className="alert alert-danger mt-5 mb-2">
                            <p>Inicie sesión para publicar su reseña.</p>
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
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-body mt-2 mb-2">
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
                            <div className="col-span-2 mb-8">
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
                                className="flex items-center justify-center bg-orange-700 text-white px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white hover:scale-105 duration-150 font-sans text-md"
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

          <RelatedProducts category={product.category} />

          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </div>
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default ProductDetails;
