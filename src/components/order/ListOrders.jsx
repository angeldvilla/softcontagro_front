import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../layout/Loader";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";
import Header from "../layout/Header";
import { FaEye } from "react-icons/fa";
import { esES } from "@mui/x-data-grid";

const ListOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, orders } = useSelector((state) => state?.myOrders);
  const { user } = useSelector((state) => state?.auth);

  const userId = user?.user?._id;


  const handleViewDetail = (id) => {
    navigate(`/order/${id}`);
  }

  useEffect(() => {
    dispatch(myOrders(userId));

    if (error) {
      toast.error("Error al cargar los pedidos");
      dispatch(clearErrors());
    }
  }, [dispatch, error, userId]);

  const columns = [
    { field: "id", headerName: "# Pedido", width: 150 },
    {
      field: "orderItems",
      headerName: "Unidades",
      width: 150,
      valueGetter: (params) => (params?.value ? params?.value.length : 0),
    },
    { field: "totalPrice", headerName: "Precio", width: 150 },
    {
      field: "orderStatus",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => (
        <p
          style={{
            color: params?.value.includes("Enviado") ? "green" : "red",
          }}
        >
          {params?.value}
        </p>
      ),
    },
    {
      field: "paidAt",
      headerName: "Pagado",
      width: 150,
    },
  ];

  const actionsColumn = {
    field: "actions",
    headerName: "Acciones",
    width: 150,
    renderCell: (params) => (
      <FaEye className="text-xl" onClick={() => handleViewDetail(params.id)} />
    ),
  };

  const rows =
    orders?.map((order) => ({
      id: order?._id,
      orderItems: order?.orderItems,
      totalPrice: `$${order?.totalPrice}`,
      orderStatus: order?.orderStatus,
      paidAt: order?.paidAt,
    })) ?? [];

  return (
    <div className="container">
      <Header />
      <p className="my-5 text-center mt-32 text-2xl">
        <b>Mis ordenes</b>
      </p>

      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            height: 400,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={[...columns, actionsColumn]}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 25 },
              },
            }}
            pageSizeOptions={[25, 50, 100]}
            autoHeight
            loading={rows.length === 0}
            pagination
          />
        </div>
      )}
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default ListOrders;
