import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import {
  FaTruckFast,
  FaCashRegister,
  FaClipboardList,
  FaMoneyBill,
  FaAddressCard,
  FaHouse,
  FaPhone,
} from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }
  }, [dispatch, error, id]);

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <Header />
          <h1 className="text-3xl font-bold my-5 mt-32 font-sans">
            Detalles del pedido
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="order-details">
              <p className="text-2xl my-5">Pedido #{order._id}</p>
              <hr className="border border-gray-300 my-4" />

              <div className="mb-4">
                <p className="flex items-center text-2xl font-sans font-bold">
                  <FaTruckFast className="mr-1 text-xl" />
                  Datos de envío
                </p>

                <p className="flex items-center font-bold mt-6">
                  <FaAddressCard className="-mt-1.2 mr-2 text-lg" />
                  Nombre Completo:{" "}
                  <span className="ml-2 font-normal">{user?.name}</span>
                </p>
                <p className="flex items-center font-bold mt-6">
                  <FaPhone className="-mt-1.2 mr-2 text-lg" />
                  Teléfono:{" "}
                  <span className="ml-2 font-normal">
                    {shippingInfo && shippingInfo.phoneNo}
                  </span>
                </p>
                <p className="flex items-center font-bold mt-6">
                  <FaHouse className="-mt-1.2 mr-2 text-lg" />
                  Dirección:
                  <span className="ml-2 font-normal">{shippingDetails}</span>
                </p>
                <p className="flex items-center font-bold mt-6">
                  <AiFillDollarCircle className="mr-1" />
                  Total:{" "}
                  <span className="ml-2 font-normal">${totalPrice} COP</span>
                </p>
              </div>

              <hr className="border border-gray-300 my-4" />

              <div className="flex items-center">
                <p className="text-lg font-bold my-4 flex items-center">
                  <FaMoneyBill className="mr-2 text-lg" />
                  Estado del pago:
                  <span
                    className={
                      isPaid ? "text-green-500 ml-2" : "text-red-500 ml-2"
                    }
                  >
                    {isPaid ? "Pagado" : "No pagado"}
                  </span>
                </p>
              </div>

              <div className="flex items-center">
                <p className="text-lg font-bold my-4 flex items-center">
                  <FaClipboardList className="mr-1 text-lg" />
                  Estado del pedido:
                  <span
                    className={
                      order.orderStatus &&
                      String(order.orderStatus).includes("Enviado")
                        ? "text-green-500 ml-2"
                        : "text-red-500 ml-2"
                    }
                  >
                    {orderStatus}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold font-sans flex items-center mb-4">
                <FaCashRegister className="mr-1 text-lg" />
                Productos encargados
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {orderItems &&
                  orderItems.map((item, index) => (
                    <Link
                      key={index}
                      to={`/product/${item.product}`}
                      className="text-blue-500 font-semibold block mb-2"
                    >
                      <div
                        className="bg-white p-4 rounded-lg shadow-md hover:scale-105 duration-150"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-32 w-full object-cover mb-4"
                        />
                        {item.name}
                        <p className="text-gray-500">${item.price} COP</p>
                        <p className="text-gray-500">
                          Stock: {item.quantity} kg(s)
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" richColors closeButton />
      <Footer />
    </div>
  );
};

export default OrderDetails;
