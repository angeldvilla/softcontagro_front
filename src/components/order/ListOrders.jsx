import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../layout/Loader";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";
import Header from "../layout/Header";
import { FaEye } from "react-icons/fa";

const ListOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      toast.error("Error al cargar los pedidos");
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", width: 150 },
    {
      field: "orderItems",
      headerName: "Num of Items",
      width: 150,
      valueGetter: (params) => (params.value ? params.value.length : 0),
    },
    { field: "totalPrice", headerName: "Amount", width: 150 },
    {
      field: "orderStatus",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <p
          style={{
            color: params.value.includes("Entregado") ? "green" : "red",
          }}
        >
          {params.value}
        </p>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Link to={`/order/${params.row._id}`} className="btn btn-primary">
          <FaEye />
        </Link>
      ),
    },
  ];

  const rows =
    orders?.map((order) => ({
      id: order.id,
      orderItems: order.orderItems,
      totalPrice: `$${order.totalPrice}`,
      orderStatus: order.orderStatus,
      actions: order,
      _id: order._id,
    })) ?? [];

  return (
    <div className="container">
      <Header />
      <h1 className="my-5 text-center">
        <b>Mis ordenes</b>
      </h1>

      {loading ? (
        <Loader />
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
          />
        </div>
      )}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default ListOrders;
