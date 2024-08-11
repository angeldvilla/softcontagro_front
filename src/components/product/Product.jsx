import React from "react";
import { FaStar, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Product = ({ product, col, className }) => {
  const calculateRating = () => {
    const rating = Math.round(product?.ratings / 5);
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className="text-yellow-500" />
    ));
  };

  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className={`bg-gray-200 p-8 shadow-lg rounded-lg ${className}`}>
        <div className="mb-4 h-48 overflow-hidden">
          <Link to={`/product/${product?._id}`}>
            <img
              className="w-full h-48 object-cover rounded-md"
              src={product?.images[0]?.url}
              alt="Product Img"
            />
          </Link>
        </div>
        <div className="mt-1">
          <div className="text-3xl h-16 overflow-hidden">
            <ins>
              <Link
                to={`/product/${product?._id}`}
                className="hover:text-blue-gray-600"
              >
                {product?.name}
              </Link>
            </ins>
          </div>
          <div className="mt-6">
            <ins className="text-2xl">${product?.price} COP</ins>
          </div>
          <div className="mt-2 text-lg">Stock: {product?.stock}</div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="ratings">{calculateRating()}</div>
              <span className="ml-2">({product?.numOfReviews} Reseñas)</span>
            </div>
            <div className="product-add-btn ml-16">
              <Link
                to={`/product/${product?._id}`}
                className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-95 duration-150"
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
