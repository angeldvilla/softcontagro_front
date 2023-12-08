import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { Input, Textarea, Button } from "@material-tailwind/react";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <div className="col-md-6 text-center mb-10">
          <h5 className="text-3xl font-semibold mt-32">
            ¡Ponerse en contacto! <br />
            Lo contactaremos pronto
          </h5>
        </div>
        <div className="w-full max-w-2xl">
          <div className="contact-form-area">
            <div className="form-wrap shadow-lg p-8">
              <h4 className="text-3xl font-semibold mb-4">
                Ponerse en contacto
              </h4>
              <p className="mb-4">
                Su dirección de correo electrónico no será publicada. Campos
                requeridos están marcados *
              </p>
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                action="https://formsubmit.co/hy106625@gmail.com"
                method="post"
              >
                <div className="mb-4">
                  <label className="text-sm text-gray-700">
                    Nombre Completo
                  </label>
                  <Input
                    type="text"
                    name="nombreCompleto"
                    placeholder="Su nombre completo"
                    size="lg"
                    className="border-black mt-1"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="text-sm text-gray-700">
                    Correo Electrónico
                  </label>
                  <Input
                    type="email"
                    name="correoElectronico"
                    placeholder="Su correo electrónico"
                    size="lg"
                    className="border-black mt-1"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    required
                  />
                </div>
                <div className="col-span-2 mb-8">
                  <label className="text-sm text-gray-700">Mensaje</label>
                  <Textarea
                    name="mensaje"
                    placeholder="Su mensaje"
                    rows="3"
                    size="lg"
                    outline="true"
                    required
                    className="!border-black mt-1"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div className="col-span-2 pb-3">
                  <Button
                    type="submit"
                    className="focus:outline-none hover:bg-blue-gray-600 bg-gray-800"
                  >
                    Enviar mensaje
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
