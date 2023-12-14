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
import { toast, Toaster } from "sonner";
import { useLocation, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [catagory, setCatagory] = useState("");
  const [rating, setRating] = useState(0);
  const location = useLocation();
  const { keyword } = useParams();

  const dispatch = useDispatch();
  const { category } = useSelector((state) => state?.category);

  const { loading, products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      return toast.error("error");
    }
    dispatch(getProducts(keyword, currentPage, price, catagory, rating));
  }, [dispatch, error, keyword, currentPage, price, catagory, rating]);

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
              search="true"
              text="BIENVENIDOS A FINCA LA LOLITA"
              text1="Los mejores productos campesinos y la mejor calidad los encuentras en FINCA LA LOLITA"
            />
          )}

          {/* Categorias */}
          {isHome && <CategorySection />}

          {/* Productos */}
          {isHome ? null : (
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
                  <div className="row">
                    {keyword && (
                      <div className="col-6 col-md-3 mt-5 mb-5">
                        <div className="px-5">
                          <hr className="my-5" />

                          <div className="mt-5">
                            <h4 className="mb-3">Categorías</h4>

                            <ul className="pl-0">
                              {category.map((category) => (
                                <li
                                  style={{
                                    cursor: "pointer",
                                    listStyleType: "none",
                                  }}
                                  key={category._id}
                                  onClick={() => setCatagory(category.name)}
                                >
                                  {category.name}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <hr className="my-3" />

                          <div className="mt-5">
                            <h4 className="mb-3">Calificaciones</h4>

                            <ul className="pl-0">
                              {[5, 4, 3, 2, 1].map((star) => (
                                <li
                                  style={{
                                    cursor: "pointer",
                                    listStyleType: "none",
                                  }}
                                  key={star}
                                  onClick={() => setRating(star)}
                                >
                                  <div className="rating-outer">
                                    <div
                                      className="rating-inner"
                                      style={{
                                        width: `${star * 20}%`,
                                      }}
                                    ></div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={`${keyword ? "col-6 col-md-9" : "col-12"}`}>
                      <div className="row">
                        {keyword ? (
                          products.map((product) => (
                            <Product
                              key={product?._id}
                              product={product}
                              col={4}
                            />
                          ))
                        ) : (
                          <Carousel>
                            {products.map((product) => (
                              <Product
                                key={product?._id}
                                product={product}
                                col={3}
                              />
                            ))}
                          </Carousel>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
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
