import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders, totalAmount, loading } = useSelector(
    (state) => state.allOrders
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
    <div className="flex ">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`flex-1 ml-64 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <h1 className="text-3xl font-bold my-4">Admin Dashboard</h1>

        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <div className="card bg-primary text-white h-40">
                <div className="card-body">
                  <p className="text-center text-xl font-bold">
                    Total Amount
                    <br />
                    <span className="text-2xl">
                      ${totalAmount && totalAmount.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              <Link to="/admin/products" className="card bg-success text-white h-40">
                <div className="card-body">
                  <p className="text-center text-xl font-bold">
                    Products
                    <br />
                    <span className="text-2xl">{products && products.length}</span>
                  </p>
                </div>
                <div className="card-footer text-white flex justify-between">
                  <span>View Details</span>
                  <i className="fa fa-angle-right"></i>
                </div>
              </Link>

              <Link to="/admin/orders" className="card bg-danger text-white h-40">
                <div className="card-body">
                  <p className="text-center text-xl font-bold">
                    Orders
                    <br />
                    <span className="text-2xl">{orders && orders.length}</span>
                  </p>
                </div>
                <div className="card-footer text-white flex justify-between">
                  <span>View Details</span>
                  <i className="fa fa-angle-right"></i>
                </div>
              </Link>

              <Link to="/admin/users" className="card bg-info text-white h-40">
                <div className="card-body">
                  <p className="text-center text-xl font-bold">
                    Users
                    <br />
                    <span className="text-2xl">{users && users.length}</span>
                  </p>
                </div>
                <div className="card-footer text-white flex justify-between">
                  <span>View Details</span>
                  <i className="fa fa-angle-right"></i>
                </div>
              </Link>

              <div className="card bg-warning text-white h-40">
                <div className="card-body">
                  <p className="text-center text-xl font-bold">
                    Out of Stock
                    <br />
                    <span className="text-2xl">{outOfStock}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
