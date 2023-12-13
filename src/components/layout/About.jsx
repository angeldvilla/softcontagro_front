import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Button, Typography, Avatar, Card } from "@material-tailwind/react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-20">
      <Header />
      <div className="max-w-5xl mx-auto mt-20">
        <Typography className="text-3xl font-sans">Sobre Nosotros</Typography>

        <div className="mt-8 flex flex-col lg:flex-row items-center lg:items-start">
          <div className="lg:mr-16">
            <Avatar
              src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702051130/SoftContAgro/eb2emrt90t6vpse9dapa.png"
              alt="finca-la-lolita"
              size="xl"
              className="w-50 h-auto hover:scale-105 duration-150"
            />
            <Typography className="font-sans text-center text-xl mt-8 mb-8">
              ¿Quienes Somos?
            </Typography>
            <Typography className="mt-4 text-gray-600">
              Finca La Lolita se dedica a la comercialización de productos
              agrícolas y campesinos en La Unión, Valle del Cauca, Colombia.
              Estamos comprometidos con ofrecer productos de alta calidad a
              nuestros clientes, eliminando intermediarios y promoviendo la
              prosperidad de nuestra comunidad.
            </Typography>
          </div>

          <div className="mt-8 lg:mt-0">
            <Typography className="text-2xl font-sans -mt-8">
              Nuestras Marcas
            </Typography>
            <div className="flex flex-col mt-2">
              <Card>
                <img
                  src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702490830/SoftContAgro/azcag7umugwru71wnsqx.jpg"
                  alt="Marca 2"
                  className="w-100 object-cover rounded-md border-2 border-gray-900 hover:scale-105 duration-150"
                />
              </Card>
              <Card className="mt-4">
                <img
                  src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702490860/SoftContAgro/hijh24wfyjak5obdjzyl.jpg"
                  alt="Marca 2"
                  className="w-100 object-cover mt-4 rounded-md border-2 border-gray-900 hover:scale-105 duration-150"
                />
              </Card>
            </div>
            <div className="flex items-center justify-center -mt-8">
              <Button
                onClick={() => window.open("https://instagram.com")}
                className="mt-20 bg-purple-600 px-4 hover:scale-105 duration-150 hover:bg-purple-800"
              >
                <FaInstagram />
              </Button>
              <Button
                onClick={() => window.open("https://facebook.com")}
                className="mt-20 bg-blue-600 px-4 ml-6 hover:scale-105 duration-150 hover:bg-blue-800"
              >
                <FaFacebook />
              </Button>
              <Button
                onClick={() => window.open("https://youtube.com")}
                className="mt-20 bg-red-600 px-4 ml-6 hover:scale-105 duration-150 hover:bg-red-800"
              >
                <FaYoutube />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
