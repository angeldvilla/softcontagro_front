import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div>
      <div
        className="row justify-content-center"
        style={{ marginTop: "200px" }}
      >
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Su pedido se ha realizado con éxito.</h2>

          <Link to="/orders/me">Ir a pedidos</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
