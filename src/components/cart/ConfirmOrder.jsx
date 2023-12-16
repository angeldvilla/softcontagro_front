import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import {
  FaTruckFast,
  FaCashRegister,
  FaClipboardList,
  FaMoneyBill,
  FaAddressCard,
  FaHouse,
  FaLocationDot,
  FaPhone,
  FaCity, 
  FaMapPin  
} from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";

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
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(0);

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

      <div className="container mx-auto my-8 p-8 bg-white shadow-md">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-2/3 mb-8 md:mb-0">
            <div className="flex items-center">
              <FaClipboardList className="flex items-center -mt-4 mr-2 text-2xl" />
              <p className="text-3xl font-semibold mb-4">Datos de envío</p>
            </div>
            <hr className="mb-5"/>
            <div className="flex items-center mb-2">
              <FaAddressCard className="-mt-2 mr-2 text-lg" />
              <p className="mb-2">
                <b>Nombre Completo:</b> {user && user?.user?.name}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone  className="-mt-2 mr-2 text-lg" />
              <p className="mb-2">
                <b>Telefono:</b> {shippingInfo.phoneNo}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaHouse className="-mt-2 mr-2 text-lg" />
              <p className="mb-2">
                <b>Dirección:</b> {shippingInfo.address}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaCity  className="-mt-2 mr-2 text-lg" />
              <p className="mb-2">
                <b>Ciudad:</b> {shippingInfo.city}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapPin  className="-mt-2 mr-2 text-lg" />
              <p className="mb-2">
                <b>Codigo Postal:</b> {shippingInfo.postalCode}
              </p>
            </div>
            <div className="flex items-center mb-2">
              <FaLocationDot  className="-mt-4 mr-2 text-lg" />
              <p className="mb-4">
                <b>País:</b> {shippingInfo.country}
              </p>
            </div>

            <hr className="my-4" />

            <p className="text-xl font-semibold mt-4">
              Productos de su carrito:
            </p>

            {cartItems.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center">
                  <div className="w-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-500 hover:underline"
                    >
                      <p>{item.name}</p>
                    </Link>
                    <p>
                      {item.quantity} x ${item.price} ={" "}
                      <span className="font-semibold">
                        ${item.quantity * item.price.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
              </div>
            ))}
          </div>

          <div className="md:w-1/3 ml-5">
            <div className="bg-gray-100 p-4 rounded-md">
              <h4 className="text-2xl font-semibold mb-4 font-sans">
                Resumen del pedido
              </h4>
              <div className="flex mb-2">
                <FaMoneyBill className="mr-1 text-lg" />
                <p>Subtotal: ${itemsPrice.toFixed(2)} COP</p>
              </div>
              <div className="flex mt-2 mb-2">
                <FaTruckFast className="mr-1 text-xl" />
                <p>Envío: ${shippingPrice.toFixed(2)} COP</p>
              </div>
              <div className="flex">
                <FaCashRegister className="mr-1 text-md" />
                <p>Impuesto: ${taxPrice.toFixed(0)} COP</p>
              </div>

              <hr className="my-4" />

              <p className="text-xl flex items-center">
                <AiFillDollarCircle className="mr-1" />
                Total:
                <span className="text-green-500 ml-2 font-semibold">
                  ${totalPrice} COP
                </span>
              </p>

              <hr className="my-4" />

              <button
                id="checkout_btn"
                className="bg-orange-800 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 duration-150"
                onClick={processToPayment}
              >
                <p>Proceder al pago</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
