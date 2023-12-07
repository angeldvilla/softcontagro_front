import React from "react";
import Search from "./Search";

const Banner = ({ src, search, text, text2 }) => {
  return (
    <div className="relative">
      <div
        className="hero-area hero-style-one h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container relative z-10 text-center">
          <div className="hero-content-wrap">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{text}</h2>
            <p className="text-lg md:text-xl">{text2}</p>
            {search === "true" && <Search />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
