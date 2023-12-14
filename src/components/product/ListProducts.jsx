import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import Loader from "../layout/Loader";
import Header from "../layout/Header";
import Banner from "../layout/Banner";
import Footer from "../layout/Footer";
import { getProducts } from "../../actions/productActions";
import { toast } from "sonner";
import { useLocation, useParams } from "react-router-dom";

const ListProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const { keyword } = useParams();

  /*   const { category } = useSelector((state) => state?.category); */

  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return toast.error("error");
    }
    dispatch(getProducts(keyword, currentPage, price, catagory, rating));
  }, [dispatch, error, keyword, currentPage, price, catagory, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }
  let isProduct = false;
  if (location.pathname === "/products") {
    isProduct = true;
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Header />
          {isProduct ? (
            <div className="col-lg-12">
              <div className="section-head-style-one mt-36">
                <h2>PRODUCTOS DISPONIBLES "FINCA LA LOLITA"</h2>
                <p>
                  Bienvenido al menú de nuestros productos campesinos, insumos y
                  herramientas agrícolas. Aquí encontrarás todos los productos
                  disponibles en nuestra Finca La Lolita.
                </p>
                <p>
                  No es necesario añadirle aditivos como conservantes,
                  colorantes o antihongos, siendo así un gran beneficio para el
                  consumidor.
                </p>
              </div>
            </div>
          ) : (
            <>
              {
                <Banner
                  src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702490860/SoftContAgro/xqpiazpgjfpcm7gaw19u.jpg"
                  search="false"
                  text="Productos encontrados"
                />
              }
              <div className="col-lg-12 mt-20">
                <div className="section-head-style-one">
                  <h2>LISTA DE PRODUCTOS</h2>
                </div>
              </div>
            </>
          )}
          {resPerPage <= count && (
            <div className="flex justify-center mt-5">
              <nav
                className="relative z-0 inline-flex -space-x-px gap-2"
                aria-label="Pagination"
              >
                {Array.from({
                  length: Math.ceil(productsCount / resPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPageNo(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-f96822 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-200"
                    } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium cursor-pointer rounded-md`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}
          <section
            id="products"
            className="mt-12 flex items-center justify-center"
          >
            <div className={`${keyword ? "col-6 col-md-9" : "col-12"}`}>
              <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-5 mt-2">
                {keyword
                  ? products.map((product, index) => (
                      <Product
                        key={index}
                        product={product}
                        col={4}
                        className="hover:scale-105 duration-150"
                      />
                    ))
                  : products.map((product, index) => (
                      <Product
                        key={index}
                        product={product}
                        col={4}
                        className="hover:scale-105 duration-150"
                      />
                    ))}
              </div>
            </div>
          </section>
          {resPerPage <= count && (
            <div className="flex justify-center mt-5">
              <nav
                className="relative z-0 inline-flex -space-x-px gap-2"
                aria-label="Pagination"
              >
                {Array.from({
                  length: Math.ceil(productsCount / resPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPageNo(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-f96822 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-200"
                    } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium cursor-pointer rounded-md`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};
export default ListProducts;
