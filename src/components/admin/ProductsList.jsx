import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTable } from "react-table";
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

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        sort: "asc",
      },
      {
        Header: "Name",
        accessor: "name",
        sort: "asc",
      },
      {
        Header: "Price",
        accessor: "price",
        sort: "asc",
      },
      {
        Header: "Stock",
        accessor: "stock",
        sort: "asc",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Link
              to={`/admin/product/${row.original._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <FaPencilAlt />
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(row.original._id)}
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    [deleteProductHandler]
  );

  const data = React.useMemo(() => products, [products]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div>
      <h1>All Products</h1>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <div>
            <h1 className="my-5">All Products</h1>

            {loading ? (
              <Loader />
            ) : (
              <table {...getTableProps()} className="table">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default ProductsList;
