import React, { useState, useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { AiFillDollarCircle } from "react-icons/ai";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { path } from "../../constants/path";
import axios from "axios";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
  if (orderInfo) {
    order.itemsPrice = Number(orderInfo.itemsPrice);
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = Number(orderInfo.totalPrice);
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    document.querySelector("#pay_btn").disabled = true;

    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post(
        `${path}/api/v1/payment/process`,
        paymentData,
        config
      );

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.user?.name,
            email: user?.user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        // El pago se procesa o no
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          // Agregar la información de paidAt y user a la orden antes de enviarla al servidor
          const today = new Date().toISOString().split("T")[0];
          const userId = user && user.user && user.user._id;

          
          order.paidAt = today;
          order.deliveredAt = today;
          order.orderStatus =  "Enviado";
          order.user = userId;

          dispatch(createOrder(order));

          // Limpiar la sesión después de completar el pedido
          sessionStorage.removeItem("orderInfo");

          navigate("/success");
        } else {
          toast.error("Hay algún problema durante el procesamiento del pago.");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4 font-sans text-xl">
              Información de la tarjeta
            </h1>
            <div className="form-group">
              <label
                htmlFor="card_num_field"
                className="font-sans text-lg font-light"
              >
                Número de tarjeta
              </label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control font-sans font-light mb-4"
                options={options}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="card_exp_field"
                className="font-sans text-lg font-light"
              >
                Caducidad de la tarjeta
              </label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control font-sans font-light mb-4"
                options={options}
              />
            </div>

            <div className="form-group">
              <label
                htmlFor="card_cvc_field"
                className="font-sans text-lg font-light"
              >
                Tarjeta CVC
              </label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control font-sans font-light mb-14"
                options={options}
              />
            </div>

            <button
              type="button"
              id="pay_btn"
              onClick={handleOpen}
              className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105 duration-150 "
            >
              <p className="text-lg flex items-center">
                Pagar <AiFillDollarCircle className="ml-3 mr-0.5" />
                {`${orderInfo && orderInfo.totalPrice} COP`}
              </p>
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" richColors closeButton />
      <Dialog
        open={openModal}
        /* handler={() => setOpenModal(false)} */
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Confirmar pago</DialogHeader>
        <DialogBody>
          Estas apunto de realizar un pago para la compra. ¿Estas seguro?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpenModal(false)}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button
            /* id="pay_btn" */
            variant="gradient"
            color="green"
            onClick={(e) => {
              setOpenModal(false);
              submitHandler(e);
            }}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Payment;
