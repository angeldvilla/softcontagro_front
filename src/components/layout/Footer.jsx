import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-area footer-design-1 bg-gray-800 text-white">
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="mb-8">
              <div className="footer-title">
                <h3 className="text-2xl font-bold mb-4">About Buy It</h3>
              </div>
              <div className="footerabout-content">
                <p>
                  Buy It Store - Pakistan's first store since 2021. We sell many
                  Category products on our web-site.
                </p>
              </div>
              <div className="footer-address mt-4">
                <ul>
                  <li>
                    <i className="las la-phone-volume"></i>
                    <span>
                      <Link to="/">+1234 5678 9123</Link>
                      <br />
                      <Link to="/">+1234 5678 9123</Link>
                    </span>
                  </li>
                  <li>
                    <i className="lar la-envelope"></i>
                    <span>
                      <Link to="/">Student@uol.com</Link>
                      <br />
                      <Link to="/">info@buyit.com</Link>
                    </span>
                  </li>
                  <li>
                    <i className="las la-map-marker"></i>
                    <span>
                      Gulburg <br />
                      Islamabad{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-8 text-center md:text-left">
              <div className="footer-logo">
                <Link to="/">
                  <img src="" alt="" />
                </Link>
              </div>
              <div className="form-design form-design-1"></div>
              <div className="footer-social pt-4 md:pt-0">
                <ul className="flex justify-center md:justify-start space-x-4">
                  <li>
                    <Link to="/">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fab fa-instagram"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fab fa-linkedin-in"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fab fa-pinterest-p"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/">
                      <i className="fab fa-twitter"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-8">
              <div className="footer-title">
                <h3 className="text-2xl font-bold">Company</h3>
              </div>
              <div className="footer-link mt-4">
                <ul>
                  <li>
                    <Link to="/">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/">Returns</Link>
                  </li>
                  <li>
                    <Link to="/">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to="/">Our Support</Link>
                  </li>
                  <li>
                    <Link to="/">Terms & Service</Link>
                  </li>
                  <li>
                    <Link to="/">Checkout</Link>
                  </li>
                  <li>
                    <Link to="/">Other Issues</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <div className="text-center md:text-left">
              <div className="copy-right-area">
                <p className="copy-text">
                  Copyright 2022 Buy it | Design By{" "}
                  <Link to="/">UOl Students</Link>
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
