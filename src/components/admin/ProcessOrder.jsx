import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
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
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { FaCreditCard } from "react-icons/fa";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { loading, order = {} } = useSelector((state) => state?.orderDetails);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;
  const { error, isUpdated } = useSelector((state) => state?.order);

  const orderId = id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId]);

  const updateOrderHandler = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <div className="flex mx-w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="order-details">
            <h2 className="text-2xl my-5">Pedido # {order._id}</h2>

            <hr className="border border-gray-300 my-4" />

            {/* DATOS DE ENVIO */}
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

            {/* PAGO */}
            <div className="flex flex-col items-center">
              <p className="font-bold my-4 flex items-center">
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
              <p className="font-bold my-4 flex items-center">
                <FaCreditCard className="mr-2 text-lg" />
                Stripe ID:
                <span className="ml-2 font-light">
                  {paymentInfo && paymentInfo.id}
                </span>
              </p>
              <p className="font-bold my-4 flex items-center">
                <FaClipboardList className="mr-2 text-lg" />
                Estado del Pedido:
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

            {/* DETALLER DEL PEDIDO */}
            <div className="mt-8">
              <h4 className="text-xl font-bold font-sans flex items-center mb-4">
                <FaCashRegister className="mr-1 text-lg" />
                Datos de compra
              </h4>

              <hr className="border border-gray-300 my-4" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {orderItems &&
                  orderItems.map((item) => (
                    <Link to={`/product/${item.product}`}>
                      <div
                        key={item.product}
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

            {/* ACTUALIZAR ESTADO DEL PEDIDO */}
            <hr className="border border-gray-300 my-4" />
            <div className="col-12 col-lg-3 mt-5">
              <p className="my-4 font-sans text-xl font-bold">
                Estado del pedido
              </p>

              <div className="form-group">
                <select
                  className="form-control font-sans text-sm font-light"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="En Proceso">En Proceso</option>
                  <option value="Enviado">Enviado</option>
                </select>
              </div>

              <button
                className="px-1 py-2 font-sans text-sm bg-orange-500 hover:bg-orange-700 rounded-md text-white mt-8 hover:scale-105 duration-150 w-full mb-8"
                onClick={() => updateOrderHandler(order._id)}
              >
                Actualizar Estado
              </button>
            </div>
          </div>
        </div>
      )}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default ProcessOrder;
