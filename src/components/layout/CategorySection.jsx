import React from "react";
import { useSelector } from "react-redux";
/* import { Link } from "react-router-dom"; */
import "../../App1.css";
const CategorySection = () => {
  const { category } = useSelector((state) => state?.category);
  return (
    <div className="category-area-start category-style-one mt-100 position-relative">
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div className="row">
          <div className="col-lg-12">
            <div className="section-head-style-one">
              <h2>CATEGORÍAS</h2>
              <p>Tenemos variedad de categorías disponibles de los productos que estás buscando.</p>
            </div>
          </div>
        </div>
        <div className="row">
          {category?.map((category, idx) => {
            return (
              <div
                key={idx}
                className="col-lg-2 col-md-3 col-sm-6 category-box-alpha shadow-sm hover:scale-105 duration-150 hover:text-white"
                style={{ borderRadius: "20px" }}
              >
                <div className=" flex flex-col items-center justify-center">
                  <p className="text-xl mb-4">
                      {category?.name}
                  </p>
                    <img
                      src={category?.images[0]?.url}
                      alt="imagenes-categorias"
                      className="w-96 rounded-md"
                    />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
