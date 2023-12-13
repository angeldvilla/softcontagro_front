import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import Loader from "../layout/Loader";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

const ListOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders()); 

    if (error) {
      toast.error("Error al cargar los pedidos");
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "id",
      },
      {
        Header: "Num of Items",
        accessor: "orderItems",
        Cell: ({ value }) => (value ? value.length : 0),
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
          <Link to={`/order/${row.original._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => orders, [orders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="container">
      <h1 className="my-5 text-center">
        <b>Mis ordenes</b>
      </h1>

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
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default ListOrders;
