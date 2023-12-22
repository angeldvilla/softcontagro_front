import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";
import { FaCircleChevronRight } from "react-icons/fa6";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { products } = useSelector((state) => state?.products);
  const { category } = useSelector((state) => state?.category);
  const { users } = useSelector((state) => state?.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state?.allOrders
  );

  let outOfStock = 0;
  products?.products?.products?.forEach((product) => {
    if (product?.stock === 0) {
      outOfStock += 1;
    }
  });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-200">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold my-4 font-sans flex justify-center items-center">
          Admin Dashboard
        </h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full mt-8">
            <Link
              to="/admin/products"
              className="card bg-green-500 text-white h-40 flex flex-col justify-between items-center hover:scale-105 duration-300 rounded-md"
            >
              <div className="card-body">
                <p className="text-xl font-bold mb-2 text-white mt-2">
                  Productos
                </p>
                <p className="text-2xl text-center text-white">
                  {products?.products ? products?.products?.length : 0}
                </p>
              </div>
              <div className="card-footer text-white">
                <Link
                  to="/admin/products"
                  className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-105 duration-150 mb-4 mt-2"
                >
                  Ver detalles
                  <FaCircleChevronRight className="ml-2" />
                </Link>
              </div>
            </Link>

            <Link
              to="/admin/products"
              className="card bg-purple-500 text-white h-40 flex flex-col justify-between items-center hover:scale-105 duration-300 rounded-md"
            >
              <div className="card-body">
                <p className="text-xl font-bold mb-2 text-white mt-2">
                  Categorías
                </p>
                <p className="text-2xl text-center text-white">
                  {category ? category?.length : 0}
                </p>
              </div>
              <div className="card-footer text-white">
                <Link
                  to="/admin/category"
                  className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-105 duration-150 mb-4 mt-2"
                >
                  Ver detalles
                  <FaCircleChevronRight className="ml-2" />
                </Link>
              </div>
            </Link>

            <Link
              to="/admin/orders"
              className="card bg-yellow-700 text-white h-40 flex flex-col justify-between items-center hover:scale-105 duration-300 rounded-md"
            >
              <div className="card-body">
                <p className="text-xl font-bold mb-2 text-white mt-2">Pedidos</p>
                <p className="text-2xl text-center text-white">
                  {orders && orders?.length}
                </p>
              </div>
              <div className="card-footer text-white">
                <Link
                  to="/admin/orders"
                  className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-105 duration-150 mb-4 mt-2"
                >
                  Ver detalles
                  <FaCircleChevronRight className="ml-2" />
                </Link>
              </div>
            </Link>

            <Link
              to="/admin/users"
              className="card bg-red-500 text-white h-40 flex flex-col justify-between items-center hover:scale-105 duration-300 rounded-md"
            >
              <div className="card-body">
                <p className="text-xl font-bold mb-2 text-white mt-2">Usuarios</p>
                <p className="text-2xl text-center text-white">
                  {users && users.length}
                </p>
              </div>
              <div className="card-footer text-white">
                <Link
                  to="/admin/users"
                  className="flex items-center justify-center bg-blue-gray-900 text-white px-4 py-2 rounded-full hover:bg-blue-gray-800 hover:text-white hover:scale-105 duration-150 mb-4 mt-2"
                >
                  Ver detalles
                  <FaCircleChevronRight className="ml-2" />
                </Link>
              </div>
            </Link>
            <div className="card bg-blue-500 text-white h-40 flex justify-center items-center hover:scale-105 duration-300 rounded-md">
              <div>
                <p className="text-xl font-bold mb-2">Cantidad Total</p>
                <p className="text-2xl">
                  ${totalAmount && totalAmount.toFixed(2)} COP
                </p>
              </div>
            </div>

            <div className="card bg-blue-gray-500 text-white h-40 flex justify-center items-center hover:scale-105 duration-300 rounded-md">
              <div>
                <p className="text-xl font-bold mb-2 mt-2">Agotado</p>
                <p className="text-2xl text-center mb-4">{outOfStock}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
