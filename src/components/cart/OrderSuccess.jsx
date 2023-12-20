import React from "react";
import { Link } from "react-router-dom";
import Header from "../layout/Header";

const OrderSuccess = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto my-16 text-center mt-32">
        <div className="max-w-md mx-auto bg-white rounded p-8 shadow-lg">
          <img
            className="mx-auto mb-8"
            src="/images/order_success.png"
            alt="Order Success"
            width="120"
            height="120"
          />

          <p className="text-2xl font-semibold mb-4">
            ¡Su pedido se ha realizado con éxito!
          </p>

          <p className="text-gray-700 mb-8">
            Gracias por elegirnos. Su pedido está en proceso y le mantendremos
            informado sobre su estado.
          </p>

          <Link
            to="/orders/me"
            className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-md hover:scale-105 duration-150 hover:text-white "
          >
            Ir a mis pedidos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
