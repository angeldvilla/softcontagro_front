import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [dispatch, error, isDeleted, history]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "id",
      },
      {
        Header: "No of Items",
        accessor: "orderItems.length",
      },
      {
        Header: "Amount",
        accessor: "totalPrice",
        Cell: ({ value }) => `$${value}`,
      },
      {
        Header: "Status",
        accessor: "orderStatus",
        Cell: ({ value }) => (
          <p style={{ color: value.includes("Delivered") ? "green" : "red" }}>
            {value}
          </p>
        ),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div>
            <Link
              to={`/admin/order/${row.original.id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteOrderHandler(row.original.id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      },
    ],
    [deleteOrderHandler]
  );

  const data = React.useMemo(() => orders, [orders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div>
      <h1>All Orders</h1>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <div>
            <h1 className="my-5">All Orders</h1>

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

export default OrdersList;
