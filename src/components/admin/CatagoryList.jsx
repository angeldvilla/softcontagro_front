import React, { Fragment, useEffect } from "react";
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

const CategorysList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, category } = useSelector((state) => state.category);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.dltCategory
  );

  useEffect(() => {
    dispatch(getCategory());

    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("deleteError");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Category deleted successfully");
      history.push("/admin/Category");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, toast, error, deleteError, isDeleted, history]);

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
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteCategoryHandler(row.original.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => category, [category]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const deleteCategoryHandler = (id) => {
    dispatch(dltCategory(id));
  };

  return (
    <Fragment>
      <h1>All Categories</h1>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <Fragment>
            <h1 className="my-5">All Categories</h1>

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
          </Fragment>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </Fragment>
  );
};

export default CategorysList;
