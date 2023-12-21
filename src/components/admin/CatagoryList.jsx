import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  dltCategory,
  clearErrors,
} from "../../actions/categoryActions";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate } from "react-router-dom";

const CategorysList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, category } = useSelector((state) => state.category);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.dltCategory
  );

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    dispatch(getCategory());

    if (error) {
      toast.error("Error al cargar las categorias");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("Error al eliminar la categoria");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Categoria eliminada correctamente");
      navigate("/admin/Category");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, navigate]);

  const deleteCategoryHandler = (id) => {
    dispatch(dltCategory(id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteCategoryHandler(row.original.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    [deleteCategoryHandler]
  );

  const data = React.useMemo(() => category, [category]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
        <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <div>
            <h1 className="my-5">Todas las categorias</h1>

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
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default CategorysList;
