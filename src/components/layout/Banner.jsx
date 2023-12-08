import React from "react";
import Search from "./Search";

const Banner = ({ src, search, text, text1 }) => {
  return (
    <div className="relative">
      <div
        className="h-screen flex items-center justify-center text-white relative"
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="container relative z-10 text-center">
          <div className="hero-content-wrap">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{text}</h1>
            <h5 className="text-2xl md:text-2xl font-bold mb-4">{text1}</h5>
            {search === "true" && <Search />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
