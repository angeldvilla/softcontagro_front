import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import Header from "../layout/Header";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
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
    history.push("/login?redirect=shipping");
  };

  return (
    <div className="container mx-auto my-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center">
          <Header />
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center mt-28">
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
                        to={`/products/${item.product}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                      <p className="text-gray-700">${item.price}</p>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            decreaseQty(item.product, item.quantity)
                          }
                          className="text-xl text-gray-500 focus:outline-none"
                        >
                          -
                        </button>
                        <p className="mx-2">{item.quantity}</p>
                        <button
                          onClick={() =>
                            increaseQty(item.product, item.quantity, item.stock)
                          }
                          className="text-xl text-gray-500 focus:outline-none"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-700">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeCartItemHandler(item.product)}
                      className="text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="lg:w-4/12 mt-4 lg:mt-0">
                <div className="bg-gray-100 p-4">
                  <h4 className="text-2xl mb-4">Resumen del pedido</h4>
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p>
                      ${cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Est. total:</p>
                    <p>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={checkoutHandler}
                    className="bg-blue-500 text-white py-2 px-4 mt-4 hover:bg-blue-700"
                  >
                    Verificar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
