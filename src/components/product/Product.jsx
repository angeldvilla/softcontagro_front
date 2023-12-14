import React from "react";
import { FaStar, FaArrowAltCircleRight, FaBoxOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../App1.css";

const Product = ({ product, col, className }) => {
  const calculateRating = () => {
    const rating = Math.round(product?.ratings / 5);
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className="text-yellow-500" />
    ));
  };

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div
        className={`eg-product-carde-alpha shadow-lg bg-gray-200 p-8 ${className}`}
        style={{ borderRadius: "20px" }}
      >
        <div className="eg-porduct-thumb">
          <Link to={`/product/${product?._id}`}>
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src={product?.images[0]?.url}
              alt="Product Img"
            />
          </Link>
        </div>
        <div className="eg-porduct-body -mt-1">
          <div className="eg-product-title">
            <ins>
              <Link to={`/product/${product?._id}`}>
                <span className="text-3xl overflow-hidden h-16 inline-block">{product?.name}</span>
              </Link>
            </ins>
          </div>
          <div className="eg-product-card-price mt-6">
            <ins>
              <span className="price-amount">
                <span className="text-2xl">${product?.price}</span>
              </span>
            </ins>
          </div>
          <div className="eg-product-card-price mt-6">
            <ins>
              <span className="text-lg">Stock: {product?.stock}</span>
            </ins>
          </div>

          <div className="product-card-bottom mt-16">
            <div className="product-rating">
              <div className="ratings">{calculateRating()}</div>
              <span id="no_of_reviews">({product?.numOfReviews} Reseñas)</span>
            </div>
            <div className="product-add-btn">
              <Link
                to={`/product/${product?._id}`}
                className="flex items-center justify-center hover:bg-blue-gray-900"
              >
                Ver Detalles <FaArrowAltCircleRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
