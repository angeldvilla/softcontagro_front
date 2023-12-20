import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Header from "../layout/Header";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import {
  FaCirclePlus,
  FaCircleMinus,
  FaTrash,
  FaTruckFast,
} from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsClipboard2Fill } from "react-icons/bs";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.products);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) return;
    dispatch(addItemToCart(id, newQty));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="container mx-auto my-32">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <Header />
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center mt-2">
              <h2 className="text-4xl font-sans">Tu carrito está vacío</h2>
              <p className="text-gray-500 text-xl">
                ¡Descubre nuestros productos y encuentra algo que te guste!
              </p>
              <img
                src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1702060515/SoftContAgro/duepw2xuctrk12bssy2u.png"
                alt="Empty Cart"
                className="w-80 h-50 mt-16"
              />
            </div>
          ) : (
            <>
              <p className="text-4xl mb-4">Tus Productos Agregados</p>
              <div className="flex flex-col lg:flex-row justify-between my-8 w-full">
                <div className="lg:w-8/12">
                  {cartItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center justify-between border-b border-gray-300 py-4"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                        <Link
                          to={`/product/${item.product}`}
                          className="text-blue-500 hover:underline-none focus:outline-none hover:scale-105 duration-150"
                        >
                          <p>{item.name}</p>
                        </Link>
                      </div>

                      <div className="flex items-center space-x-4">
                        <p className="text-gray-700">${item.price} COP</p>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              decreaseQty(item.product, item.quantity)
                            }
                            className="text-xl text-gray-500 focus:outline-none hover:scale-105 duration-150"
                          >
                            <FaCircleMinus />
                          </button>
                          <p className="mx-2">{item.quantity}</p>
                          <button
                            onClick={() =>
                              increaseQty(
                                item.product,
                                item.quantity,
                                item.stock
                              )
                            }
                            className="text-xl text-gray-500 focus:outline-none hover:scale-105 duration-150"
                          >
                            <FaCirclePlus />
                          </button>
                        </div>
                        <p className="text-gray-700">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeCartItemHandler(item.product)}
                        className="text-red-600 hover:text-red-800 focus:outline-none hover:scale-105 duration-150"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="lg:w-4/12 mt-4 lg:mt-0 lg:ml-8">
                  <div className="bg-gray-100 p-4">
                    <h4 className="text-2xl mb-4 font-sans">
                      Resumen del pedido
                    </h4>
                    <div className="flex justify-between">
                      <BsClipboard2Fill className="mr-2 text-xl" />
                      <p className="-ml-60">Stock:</p>
                      <p>
                        {cartItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )} Unidades
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <FaTruckFast className="mr-8 text-xl" />
                      <p className="-ml-72">Envío:</p>
                      <p className="text-green-600">Gratuito</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <AiFillDollarCircle className="mr-2 text-xl" />
                      <p className="-ml-60">Total:</p>
                      <p>
                        $
                        {cartItems
                          .reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                          .toFixed(0)}
                        <span className="ml-1">COP</span>
                      </p>
                    </div>
                    <button
                      onClick={checkoutHandler}
                      className="bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg font-sans hover:bg-blue-700 hover:scale-105 duration-150"
                    >
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
