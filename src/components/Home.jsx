import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import Banner from "./layout/Banner";
import CategorySection from "./layout/CategorySection";
import Features from "./layout/Features";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { getProducts } from "../actions/productActions";
import { toast, Toaster } from "sonner";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

const Home = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const { keyword } = useParams();

  const { category } = useSelector((state) => state.category);

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
              /* src="https://res.cloudinary.com/hba-solver/image/upload/v1657880938/banner/bg1_jszeky.png" */
              search="true"
              text="BIENVENIDOS A FINCA LA LOLITA"
              text1="Los mejores productos campesinos y la mejor calidad los encuentras en FINCA LA LOLITA"
            />
          )}
          {isHome && <CategorySection />}
          {isHome ? (
            <div className="col-lg-12 mt-5">
              <div className="section-head-style-one">
                <h2>LOS MEJORES PRODUCTOS AGRICOLAS</h2>
                <p>
                  Debido a que los productos campesinos no tienen que ser
                  sometidos a unas largas cadenas de congelamiento o de
                  almacenamiento,
                </p>

                <p>
                  no es necesario añadirle aditivos como conservantes,
                  colorantes o antihongos, siendo asi un gran beneficio para el
                  consumidor
                </p>
              </div>
            </div>
          ) : (
            <>
              {
                <Banner
                  src="https://res.cloudinary.com/hba-solver/image/upload/v1657882267/banner/bg2_a9w4ja.png"
                  search="false"
                  text="Search Items"
                />
              }
              <div className="col-lg-12 mt-5">
                <div className="section-head-style-one">
                  <h2>LISTA DE PRODUCTOS</h2>
                </div>
              </div>
            </>
          )}

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <div className="col-6 col-md-3 mt-5 mb-5">
                  <div className="px-5">
                    {/* ... Rest of the code for filters */}
                  </div>
                </div>
              ) : null}

              <div className={`${keyword ? "col-6 col-md-9" : "col-12"}`}>
                <div className="row">
                  {keyword ? (
                    products.map((product) => (
                      <Product key={product.id} product={product} col={4} />
                    ))
                  ) : (
                    <Carousel>
                      {products.map((product) => (
                        <Product key={product.id} product={product} col={3} />
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          </section>

          {resPerPage <= count && (
            <div className="flex justify-center mt-5">
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
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
                    } relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium cursor-pointer`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}

          <Features />
        </div>
      )}
      <Toaster position="top-right" richColors />
      <Footer />
    </div>
  );
};

export default Home;
