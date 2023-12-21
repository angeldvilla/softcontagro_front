import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { toast, Toaster } from "sonner";
import { esES } from "@mui/x-data-grid";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      toast.error("error");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("deleteError");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product deleted successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 250, flex: 0.5 },
    { field: "name", headerName: "Nombre", minWidth: 150, flex: 0.5 },
    {
      field: "description",
      headerName: "Descripción",
      minWidth: 150,
      flex: 0.5,
    },
    { field: "stock", headerName: "Stock", minWidth: 150, flex: 0.5 },
    { field: "price", headerName: "Precio", minWidth: 150, flex: 0.5 },
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
    {
      field: "numOfReviews",
      headerName: "# Reseñas",
      minWidth: 150,
      flex: 0.5,
    },
    { field: "seller", headerName: "Fabricante", minWidth: 150, flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      width: 95,
      renderCell: (params) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/product/${params.id}`} className="text-lg">
            <FaPencilAlt />
          </Link>
          <button
            className="text-lg"
            onClick={() => deleteProductHandler(params.id)}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const rows =
    products?.products?.map((product) => ({
      id: product?._id,
      name: product?.name,
      description: product?.description,
      stock: product?.stock,
      price: `$${product?.price}`,
      ratings: product?.totalPrice,
      numOfReviews: product?.numOfReviews,
      seller: product?.seller,
    })) ?? [];

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
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default ProductsList;
