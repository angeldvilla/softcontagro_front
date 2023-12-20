import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "@material-tailwind/react";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <Header />
          <Card className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-md mt-16">
            <p className="text-3xl font-bold mb-5">Mi Perfil</p>
            <div className="flex justify-between mt-8">
              <div className="w-full md:w-1/4">
                <img
                  className="rounded-full w-48 h-50"
                  src={user?.user?.avatar?.url}
                  alt={user?.user?.name}
                />

                <Link to="/me/update">
                  <button className="text-white bg-orange-500 hover:bg-orange-700 border-0 py-2 px-4 focus:outline-none rounded-full text-md mt-5 md:mt-8 md:ml-6">
                    <p>Editar perfil</p>
                  </button>
                </Link>
              </div>

              <div className="w-full md:w-1/2">
                <div className="mb-5">
                  <p className="text-xl font-bold">Nombre Completo</p>
                  <p>{user?.user?.name}</p>
                </div>

                <div className="mb-5">
                  <p className="text-xl font-bold">Correo Electronico</p>
                  <p>{user?.user?.email}</p>
                </div>

                <div className="mb-5">
                  <p className="text-xl font-bold">Se unió</p>
                  <p>{String(user?.user?.createdAt).substring(0, 10)}</p>
                </div>

                {user.role !== "admin" && (
                  <Link to={`/orders/me/${user?.user?._id}`}>
                    <button className="text-white bg-green-500 hover:bg-green-700 border-0 py-2 px-4 focus:outline-none rounded-full text-lg mt-5 md:mt-8">
                      <p>Mis pedidos</p>
                    </button>
                  </Link>
                )}

                <hr className="my-5" />

                <Link to="/password/update">
                  <button className="text-white bg-blue-500 hover:bg-blue-700 border-0 py-2 px-4 focus:outline-none rounded-full text-lg mt-5 md:mt-8">
                    <p>Cambiar contraseña</p>
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
