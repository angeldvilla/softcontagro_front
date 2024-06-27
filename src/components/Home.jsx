import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layout/Loader";
import Banner from "./layout/Banner";
import CategorySection from "./layout/CategorySection";
import Product from "./product/Product";
import Features from "./layout/Features";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { getProducts } from "../actions/productActions";
import { getCategory } from "../actions/categoryActions";
import { toast, Toaster } from "sonner";
import { useLocation, useParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state?.products);

  useEffect(() => {
    if (error) {
      toast.error("Error al cargar los productos");
    }

    dispatch(getCategory());
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  let isHome = false;
  if (location.pathname === "/") {
    isHome = true;
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          {isHome && (
            <Banner
              src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702013780/SoftContAgro/wb8utjwtm4mzxlsfif7e.jpg"
              search="false"
              text="BIENVENIDOS A FINCA LA LOLITA"
              text1="Los mejores productos campesinos y la mejor calidad los encuentras en FINCA LA LOLITA"
            />
          )}

          {/* Categorias */}
          {isHome && <CategorySection />}

          {/* Productos */}
          {!isHome ? (
            <div className="col-lg-12 mt-32">
              <div className="section-head-style-one">
                <h2>LISTA DE PRODUCTOS</h2>
                <div className="col-12">
                  <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-5 mt-2">
                    {products &&
                      products.map((product) => {
                        return (
                          <Product
                            key={product._id}
                            product={product}
                            col={4}
                          />
                        );
                      })}
                  </div>
                </div>
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
              </div>
            </div>
          ) : null}

          <Features />
        </div>
      )}
      <Toaster position="top-right" richColors />
      <Footer />
    </div>
  );
};

export default Home;
