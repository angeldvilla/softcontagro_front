import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaLocationArrow,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer-area footer-design-1 text-white">
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mb-8">
              <div className="footer-title">
                <h3 className="text-2xl font-bold mb-4 hover:text-3xl transition-all duration-300">
                  SoftContAgro
                </h3>
              </div>
              <div className="footerabout-content">
                <p className="text-xl hover:text-2xl transition-all duration-300">
                  Primera tienda virtual en La Unión Valle desde 2021.
                </p>
              </div>
              <div className="footer-address mt-8">
                <ul>
                  <li className="flex items-center text-lg hover:text-2xl transition-all duration-300">
                    <FaPhone className="mr-2" />
                    +57 312558468
                  </li>
                  <li className="flex items-center text-lg hover:text-2xl transition-all duration-300">
                    <FaEnvelope className="mr-2" />
                    fincalalolita@gmail.com
                  </li>
                  <li className="flex items-center text-lg hover:text-2xl transition-all duration-300">
                    <FaLocationArrow className="mr-2" />
                    Colombia - La Union, Valle
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-8 text-center md:text-left">
              <div className="footer-logo">
                <a href="/">
                  <img
                    src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702051130/SoftContAgro/eb2emrt90t6vpse9dapa.png"
                    alt="logo"
                    className="w-80 hover:w-96 transition-all duration-300"
                  />
                </a>
              </div>
              <div className="form-design form-design-1"></div>
            </div>
            <div className="mb-8">
              <div className="footer-title">
                <h3 className="text-2xl font-bold hover:text-3xl transition-all duration-300">
                  Redes Sociales
                </h3>
              </div>
              <div className="footer-link mt-4">
                <ul>
                  <li className="flex items-center text-xl hover:text-2xl transition-all duration-300">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </li>
                  <li className="flex items-center text-xl hover:text-2xl transition-all duration-300">
                    <FaInstagram className="mr-2" /> Instagram
                  </li>
                  <li className="flex items-center text-xl hover:text-2xl transition-all duration-300">
                    <FaTwitter className="mr-2" /> Twitter
                  </li>
                  <li className="flex items-center text-xl hover:text-2xl transition-all duration-300">
                    <FaYoutube className="mr-2" />
                    Youtube
                  </li>
                  <li className="flex items-center text-xl hover:text-2xl transition-all duration-300"></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="text-center md:text-left">
              <div className="copy-right-area">
                <p className="copy-text hover:text-lg transition-all duration-300">
                  Copyright © {new Date().getFullYear()} Finca La Lolita.
                  <a href="/">Todos los derechos reservados</a>
                </p>
              </div>
            </div>
            <div className="footer-card-support"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
