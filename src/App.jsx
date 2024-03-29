import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import RegisterForm from "./components/user/Register";
import Contact from "./components/Contact";
import About from "./components/layout/About";
import ListProducts from "./components/product/ListProducts";

// Componentes de carrito
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

// Componentes de pedidos
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

// Componentes de usuarios
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Importacion de admin
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import NewCategory from "./components/admin/NewCategory";
import CategorysList from "./components/admin/CatagoryList";
import NewUser from "./components/admin/NewUser";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadStripeApiKey /* loadUser */ } from "./actions/userActions";
import { useDispatch, useSelector } from "react-redux";

// Pagos
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const dispatch = useDispatch();
  const stripeApiKey = useSelector((state) => state.auth.stripeKey);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      /* dispatch(loadUser()); */
      dispatch(loadStripeApiKey());
    }
  }, [dispatch, user]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<About />} />
      <Route path="/products" element={<ListProducts />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Rutas del carrito */}
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirm"
        element={
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
        }
      />
      {stripeApiKey && (
        <Route
          path="/payment"
          element={
            <Elements stripe={stripeApiKey && loadStripe(stripeApiKey)}>
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            </Elements>
          }
        />
      )}

      {/* Rutas de usuario */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset/:token" element={<NewPassword />} />

      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me/update/:id"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/password/update"
        element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/me/:id"
        element={
          <ProtectedRoute>
            <ListOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        }
      />

      {/* Rutas de administrador */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <ProductsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product"
        element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/product/:id"
        element={
          <ProtectedRoute>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/category"
        element={
          <ProtectedRoute>
            <CategorysList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/category/new"
        element={
          <ProtectedRoute>
            <NewCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <OrdersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/order/:id"
        element={
          <ProtectedRoute>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user/new"
        element={
          <ProtectedRoute>
            <NewUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/user/:id"
        element={
          <ProtectedRoute>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute>
            <ProductReviews />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
