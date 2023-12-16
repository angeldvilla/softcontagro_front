import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

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
    paymentInfo && paymentInfo.status === "Completado" ? true : false;

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <h1>Detalles del pedido</h1>
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Pedido # {order._id}</h1>

              <h4 className="mb-4">Datos de envío</h4>
              <p>
                <b>Nombre Completo:</b> {user && user?.user?.name}
              </p>
              <p>
                <b>Telefono:</b> {shippingInfo && shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Dirección:</b>
                {shippingDetails}
              </p>
              <p>
                <b>Precio:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Pago</h4>
              <p className={isPaid ? "text-green-500" : "text-red-500"}>
                <b>{isPaid ? "Pagado" : "No pagado"}</b>
              </p>

              <h4 className="my-4">Estado del pedido:</h4>
              <p
                className={
                  order.orderStatus &&
                  String(order.orderStatus).includes("Entregado")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Productos encargados:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item) => (
                    <div key={item.product} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="85"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price} COP</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>Stock: {item.quantity} kg(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
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
