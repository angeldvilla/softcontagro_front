import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import "../../App1.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  // Calcular precios de pedidos
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.19 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <div>
      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Datos de envío</h4>
          <p>
            <b>Nombre:</b> {user && user?.user?.name}
          </p>
          <p>
            <b>Telefono:</b> {shippingInfo.phoneNo}
          </p>
          <p>
            <b>Dirección:</b> {shippingInfo.address}
          </p>
          <p>
            <b>Ciudad:</b> {shippingInfo.city}
          </p>
          <p>
            <b>Codigo Postal:</b> {shippingInfo.postalCode}
          </p>
          <p className="mb-4">
            <b>País:</b> {shippingInfo.country}
          </p>

          <hr />
          <h4 className="mt-4">Productos de su carrito:</h4>

          {cartItems.map((item, index) => (
            <div>
              <div className="cart-item my-1" key={index}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item.image}
                      alt="Laptop"
                      height="45"
                      width="100"
                    />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Resumen del pedido</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">${itemsPrice} COP</span>
            </p>
            <p>
              Envío:{" "}
              <span className="order-summary-values">${shippingPrice} COP</span>
            </p>
            <p>
              Impuesto:{" "}
              <span className="order-summary-values">${taxPrice} COP</span>
            </p>

            <hr />

            <p>
              Total:{" "}
              <span className="order-summary-values text-green-500">
                ${totalPrice} COP
              </span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
            >
              Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
