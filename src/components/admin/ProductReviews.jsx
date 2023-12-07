import React, { Fragment, useState, useEffect } from "react";
import { useTable } from "react-table";
import Sidebar from "./Sidebar";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const dispatch = useDispatch();

  const { error, reviews } = useSelector((state) => state.productReviews);
  const { isDeleted, error: deleteError } = useSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error("deleteError");
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      toast.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, productId, isDeleted, deleteError]);

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Review ID",
        accessor: "id",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "User",
        accessor: "name",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteReviewHandler(row.original.id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        ),
      },
    ],
    [deleteReviewHandler]
  );

  const data = React.useMemo(() => reviews, [reviews]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <Fragment>
      <h1>Product Reviews</h1>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <Fragment>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>

            {reviews && reviews.length > 0 ? (
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
            ) : (
              <p className="mt-5 text-center">No Reviews.</p>
            )}
          </Fragment>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </Fragment>
  );
};

export default ProductReviews;
