import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div
      className="checkout-progress d-flex justify-content-center "
      style={{ marginTop: "120px" }}
    >
      {shipping ? (
        <Link to="/shippping">
          <div className="triangle2-active"></div>
          <div className="step active-step">Envío</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Envío</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {confirmOrder ? (
        <Link to="/order/confirm">
          <div className="triangle2-active"></div>
          <div className="step active-step">Confirmar pedido</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Confirmar pedido</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}

      {payment ? (
        <Link to="/payment">
          <div className="triangle2-active"></div>
          <div className="step active-step">Pago</div>
          <div className="triangle-active"></div>
        </Link>
      ) : (
        <Link to="#!" disabled>
          <div className="triangle2-incomplete"></div>
          <div className="step incomplete">Pago</div>
          <div className="triangle-incomplete"></div>
        </Link>
      )}
    </div>
  );
};

export default CheckoutSteps;
