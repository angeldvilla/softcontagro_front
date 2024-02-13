import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { utils, writeFileXLSX } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa6";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import { toast, Toaster } from "sonner";
import { esES } from "@mui/x-data-grid";

const OrdersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  const { loading, error, orders } = useSelector((state) => state?.allOrders);
  const { users } = useSelector((state) => state?.allUsers);
  const { isDeleted } = useSelector((state) => state?.order);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.error("Error al cargar los pedidos");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Pedido eliminado exitosamente");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const confirmDeleteOrder = (rowId) => {
    const rowSelect = rows.find((row) => row.id === rowId);
    console.log(rowSelect);

    if (rowSelect) {
      setDeleteId(rowSelect.id);
      handleOpen();
    }
  };

  const deleteOrderHandler = async () => {
    if (deleteId !== null) {
      await dispatch(deleteOrder(deleteId));
    }
    setOpenModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 90, flex: 0.5 },
    { field: "user", headerName: "Cliente", minWidth: 150, flex: 0.5 },
    {
      field: "shippingInfo",
      headerName: "Datos",
      minWidth: 280,
      flex: 0.5,
    },
    { field: "orderItems", headerName: "Compra", minWidth: 180, flex: 0.5 },
    {
      field: "itemsPrice",
      headerName: "SubTotal",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: "paymentInfo",
      headerName: "Pago",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <span
          className={
            params.value === "Pagado"
              ? "text-green-500 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Estado",
      minWidth: 90,
      flex: 0.5,
      renderCell: (params) => (
        <span
          className={
            params.value === "Enviado"
              ? "text-green-500 font-bold"
              : "text-red-500 font-bold"
          }
        >
          {params.value}
        </span>
      ),
    },
    { field: "paidAt", headerName: "Pagado", minWidth: 115, flex: 0.5 },
    {
      field: "images",
      headerName: "Imagenes",
      minWidth: 90,
      flex: 0.5,
      renderCell: (params) => (
        <div>
          {params.value && params.value.length > 0 ? (
            params.value.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-16 h-12 mx-1"
              />
            ))
          ) : (
            <img
              src="https://res.cloudinary.com/dxe4igvmq/image/upload/v1701550801/SoftContAgro/nge2uvmygtkzovgywh3w.png"
              alt="Imagen por defecto"
              className="w-16 h-12 mx-1"
            />
          )}
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 95,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/order/${params.id}`} className="text-lg">
            <FaPencilAlt className="text-blue-600 hover:text-blue-800" />
          </Link>
          <button
            className="text-lg"
            onClick={() => confirmDeleteOrder(params.id)}
          >
            <FaTrash className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      ),
    },
  ];

  const rows =
    orders?.map((order) => ({
      id: order?._id,
      user: `${users?.map((user) =>
        user?._id === order?.user ? user?.name : "Desconocido"
      )}`,
      shippingInfo: `${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.phoneNo}, ${order?.shippingInfo?.country}`,
      orderItems: order?.orderItems
        ?.map((item) => `${item?.name}: ${item?.quantity} X $${item?.price}`)
        .join(", "),
      paymentInfo: `${
        order?.paymentInfo?.status === "succeeded" ? "Pagado" : "No Pagado"
      }`,
      orderStatus: order?.orderStatus,
      itemsPrice: `$${order?.itemsPrice}`,
      totalPrice: `$${order?.totalPrice}`,
      paidAt: order?.paidAt,
      deliveredAt: order?.deliveredAt,
      images: order?.orderItems?.map((item) => item?.image),
    })) ?? [];

    const onExportCSV = () => {
      const wb = utils.book_new();
  
      utils.book_append_sheet(
        wb,
        utils.json_to_sheet(orders),
        "Datos de Pedidos"
      );
  
      writeFileXLSX(wb, "DatosPedidos.xlsx");
    };
  
    const onExportPDF = () => {
      const unit = "pt";
      const size = "A4";
      const orientation = "portrait";
  
      const doc = new jsPDF(orientation, unit, size);
  
      autoTable(doc, {
        head: [columns.map((col) => col.header)],
        body: orders.map((row) => columns.map((col) => row[col.field])),
      });
  
      doc.save("DatosPedidos.pdf");
    };


  return (
    <div className="flex mx-w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col items-center w-full p-4">
        <p className="my-5 text-center mt-16 text-2xl">
          <b>Todos los pedidos</b>
        </p>
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full max-w-screen-xl flex flex-col items-center">
            <div className="flex items-center justify-between gap-2 mb-4 mt-4">
              <span className="font-sans mt-2 mb-2">Exportar</span>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-md hover:scale-105 duration-300"
                onClick={onExportCSV}
              >
                <RiFileExcel2Fill className="text-xl hover:scale-105 duration-300" />
              </button>

              <button
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-md hover:scale-105 duration-300"
                onClick={onExportPDF}
              >
                <FaRegFilePdf className="text-xl hover:scale-105 duration-300" />
              </button>
            </div>
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              columns={columns}
              rows={rows}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 25 },
                },
              }}
              pageSizeOptions={[25, 50, 100]}
              autoHeight
              disableRowSelectionOnClick
              disableColumnSelector
              loading={rows?.length === 0}
              components={{
                Toolbar: GridToolbarContainer,
              }}
              componentsProps={{
                toolbar: {
                  buttons: [
                    <GridToolbarColumnsButton key="columns" />,
                    <GridToolbarFilterButton key="filter" />,
                  ],
                },
              }}
            />
          </div>
        )}
        <Toaster position="top-right" richColors closeButton />
        <Dialog
          open={openModal}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Eliminar Pedido</DialogHeader>
          <DialogBody>
            Estas apunto de eliminar este pedido. ¿Estas seguro?
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
              variant="gradient"
              color="green"
              onClick={deleteOrderHandler}
            >
              <span>Confirmar</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default OrdersList;
