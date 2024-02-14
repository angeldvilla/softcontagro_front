import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { utils, writeFileXLSX } from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaRegFilePdf } from "react-icons/fa6";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { toast, Toaster } from "sonner";
import { esES } from "@mui/x-data-grid";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      toast.error("Error al cargar los productos");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("Error al eliminar el producto");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Producto eliminado correctamente");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const confirmeDeleteProduct = (rowId) => {
    const rowSelect = rows.find((row) => row.id === rowId);
    console.log(rowSelect);

    if (rowSelect) {
      setDeleteId(rowSelect.id);
      handleOpen();
    }
  };

  const deleteProductHandler = async () => {
    if (deleteId !== null) {
      await dispatch(deleteProduct(deleteId));
    }
    setOpenModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 220, flex: 0.5 },
    { field: "name", headerName: "Nombre", minWidth: 150, flex: 0.5 },
    {
      field: "description",
      headerName: "Descripción",
      minWidth: 150,
      flex: 0.5,
    },
    { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.5 },
    { field: "price", headerName: "Precio", minWidth: 100, flex: 0.5 },
    {
      field: "ratings",
      headerName: "Calificacion",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => (
        <span>
          {params.row.ratings
            ? params.row.ratings.toFixed(2)
            : "No hay calificaciones"}
        </span>
      ),
    },
    { field: "seller", headerName: "Fabricante", minWidth: 150, flex: 0.5 },
    {
      field: "images",
      headerName: "Imagenes",
      minWidth: 100,
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
          <Link to={`/admin/product/${params.id}`} className="text-lg">
            <FaPencilAlt className="text-blue-600 hover:text-blue-800" />
          </Link>
          <button
            className="text-lg"
            onClick={() => confirmeDeleteProduct(params.id)}
          >
            <FaTrash className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      ),
    },
  ];

  const rows =
    products?.products?.map((product) => ({
      id: product?._id,
      name: product?.name,
      description: product?.description,
      images: product?.images?.map((image) => image?.url),
      stock: product?.stock,
      price: `$${product?.price}`,
      ratings: product?.totalPrice,
      numOfReviews: product?.numOfReviews,
      seller: product?.seller,
    })) ?? [];

  const onExportCSV = () => {
    const wb = utils.book_new();

    const sheetData = rows.map((product) => ({
      ID: product.id,
      Nombre: product.name,
      Descripción: product.description,
      Stock: product.stock,
      Precio: product.price,
      Calificación: product.ratings ? product.ratings.toFixed(2) : "No hay calificaciones",
      Fabricante: product.seller,
      Imágenes: product.images.join(", "),
    }));

    utils.book_append_sheet(
      wb,
      utils.json_to_sheet(sheetData),
      "Datos de Productos"
    );

    writeFileXLSX(wb, "DatosProductos.xlsx");
  };

  const onExportPDF = () => {
    const unit = "pt";
    const size = "";
    const orientation = "portrait";

    const doc = new jsPDF(orientation, unit, size);

    autoTable(doc, {
      head: [
        [
          "ID",
          "Nombre",
          "Descripción",
          "Stock",
          "Precio",
          "Calificación",
          "Fabricante",
          "Imágenes",
        ],
      ],
      body: rows.map((product) => [
        product.id,
        product.name,
        product.description,
        product.stock,
        product.price,
        product.ratings ? product.ratings.toFixed(2) : "No hay calificaciones",
        product.seller,
        product.images.join(", "),
      ]),
    });

    doc.save("DatosProductos.pdf");
  };

  return (
    <div className="flex mx-w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col items-center w-full p-4">
        <p className="my-5 text-center mt-16 text-2xl">
          <b>Todos los productos</b>
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
      </div>
      <Toaster position="top-right" richColors closeButton />
      <Dialog
        open={openModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Eliminar Producto</DialogHeader>
        <DialogBody>
          Estas apunto de eliminar este producto. ¿Estas seguro?
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
            onClick={deleteProductHandler}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProductsList;
