import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="footer-area footer-design-1 text-white">
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mb-8">
              <div className="footer-title">
                <h3 className="text-2xl font-bold mb-4 font-sans">
                  SoftContAgro
                </h3>
              </div>
              <div className="footerabout-content">
                <p className="text-xl">
                  Primera tienda virtual en La Unión Valle desde 2021.
                </p>
              </div>
              <div className="footer-address mt-8">
                <ul>
                  <p className="flex items-center text-lg">
                    <FaPhone className="mr-2" />
                    +57 312558468
                  </p>
                  <p className="flex items-center text-lg">
                    <FaEnvelope className="mr-2" />
                    fincalalolita@gmail.com
                  </p>
                  <p className="flex items-center text-lg">
                    <FaLocationDot className="mr-2" />
                    Colombia - La Union, Valle
                  </p>
                </ul>
              </div>
            </div>
            <div className="mb-8 text-center md:text-left">
              <div className="footer-logo">
                <a href="/">
                  <img
                    src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702051130/SoftContAgro/eb2emrt90t6vpse9dapa.png"
                    alt="logo"
                    className="w-80"
                  />
                </a>
              </div>
              <div className="form-design form-design-1"></div>
            </div>
            <div className="mb-8">
              <div className="footer-title">
                <h3 className="text-2xl font-bold font-sans">
                  Redes Sociales
                </h3>
              </div>
              <div className="footer-link mt-4">
                <ul>
                  <p className="flex items-center text-xl">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </p>
                  <p className="flex items-center text-xl">
                    <FaInstagram className="mr-2" /> Instagram
                  </p>
                  <p className="flex items-center text-xl">
                    <FaTwitter className="mr-2" /> Twitter
                  </p>
                  <p className="flex items-center text-xl">
                    <FaYoutube className="mr-2" />
                    Youtube
                  </p>
                  <p className="flex items-center text-xl"></p>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="text-center md:text-left">
              <div className="copy-right-area">
                <p className="copy-text">
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
