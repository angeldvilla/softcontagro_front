import React from "react";
import Banner from "./layout/Banner";

const Contact = () => {
  return (
    <>
      <Banner
        src="https://res.cloudinary.com/hba-solver/image/upload/v1657882267/banner/bg2_a9w4ja.png"
        search="false"
        text="Contact Us"
      />
      <section className="contact-section pt-16 pb-16 bg-gray-100">
        <div className="container">
          <div className="row justify-content-center mb-10">
            <div className="col-md-6 text-center">
              <h5 className="text-3xl font-semibold">
                Get in touch! <br />
                We will contact you soon
              </h5>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="contact-form-area">
                <div className="form-wrap shadow-lg">
                  <h4 className="text-3xl font-semibold mb-4">Get In Touch</h4>
                  <p className="mb-4">
                    Your email address will not be published. Required fields
                    are marked *
                  </p>
                  <form
                    className="contact-form-title"
                    action="https://formsubmit.co/hy106625@gmail.com"
                    method="post"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your name"
                          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="text"
                          name="fname"
                          placeholder="Your Email"
                          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      </div>
                      <div className="col-span-2 mb-8">
                        <label className="block text-sm font-medium text-gray-700">
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          placeholder="Your message"
                          rows="3"
                          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        ></textarea>
                      </div>
                      <div className="col-span-2 pb-3">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row contact-info-area g-4 justify-content-center pt-16">
            <div className="col-lg-4 col-md-6">
              <div className="branch-info-item">
                <div className="branch-info-header">
                  <h4>Branch No 01</h4>
                </div>
                <div className="branch-info-body shadow-md">
                  <ul className="text-center">
                    <li>Address: 168/170, Ave 01, Mirpur DOHS, Pakistan</li>
                    <li>Email: info.example@gmail.com</li>
                    <li>Phone: +92 000 0000000</li>
                    <li>Web: www.yourwebsite.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="branch-info-item">
                <div className="branch-info-header">
                  <h4>Branch No 02</h4>
                </div>
                <div className="branch-info-body shadow-md">
                  <ul className="text-center">
                    <li>
                      Address: 150 lane Nagano Sitijet National Park, Pakistan
                    </li>
                    <li>Email: info.example@gmail.com</li>
                    <li>Phone: +92 000 0000000</li>
                    <li>Web: www.yourwebsite.com</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="branch-info-item">
                <div className="branch-info-header">
                  <h4>Branch No 03</h4>
                </div>
                <div className="branch-info-body shadow-md">
                  <ul className="text-center">
                    <li>
                      Address: 150/58 Fujimi Navana lane Sitijet Nagano Pakistan
                    </li>
                    <li>Email: info.example@gmail.com</li>
                    <li>Phone: +92 000 0000000</li>
                    <li>Web: www.yourwebsite.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
