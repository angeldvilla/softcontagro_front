import React, { useState, useEffect } from "react";
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
import { FaTrash } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { toast, Toaster } from "sonner";
import { esES } from "@mui/x-data-grid";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOpen = () => {
    setOpenModal(!openModal);
  };

  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state?.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state?.review
  );

  useEffect(() => {
    if (error) {
      toast.error("Error al obtener las reseñas");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("Error al eliminar la reseña");
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      toast.success("Reseña eliminada con exito");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, productId, isDeleted, deleteError]);

  const confirmDeleteReview = (rowId) => {
    const rowSelect = rows.find((row) => row.id === rowId);
    console.log(rowSelect);

    if (rowSelect) {
      setDeleteId(rowSelect.id);
      handleOpen();
    }
  };

  const deleteReviewHandler = async () => {
    if (!productId) {
      toast.error("Por favor, seleccione un producto");
    }
    if (deleteId !== null) {
      dispatch(deleteReview(deleteId, productId));
    }
    setOpenModal(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 220, flex: 0.5 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 95,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <button
            className="text-lg"
            onClick={() => confirmDeleteReview(params.id)}
          >
            <FaTrash className="text-red-600 hover:text-red-800" />
          </button>
        </div>
      ),
    },
  ];

  const rows =
    reviews?.map((review) => ({
      id: review?._id,
    })) ?? [];

  return (
    <div className="flex mx-w-full">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="col-12 col-md-10 mt-5">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="productId_field" className="text-lg">
                  Ingrese el ID del Producto
                </label>
                <input
                  type="text"
                  id="productId_field"
                  className="form-control font-sans text-lg"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <button
                id="search_button"
                type="submit"
                className="px-1 py-2 font-sans text-sm bg-gray-800 hover:bg-blue-gray-600 rounded-md text-white mt-8 hover:scale-105 duration-150 w-full focus:outline-none"
              >
                BUSCAR
              </button>
            </form>
          </div>
        </div>

        {reviews && reviews.length > 0 ? (
          <div className="w-full max-w-screen-xl flex flex-col items-center">
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
        ) : (
          <p className="mt-5 text-center">No hay reseñas</p>
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
        <DialogHeader>Eliminar Reseña</DialogHeader>
        <DialogBody>
          Estas apunto de eliminar esta reseña. ¿Estas seguro?
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
            onClick={deleteReviewHandler}
          >
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ProductReviews;
