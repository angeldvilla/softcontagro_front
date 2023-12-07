import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error("error");
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, history]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const columns = [
    {
      Header: "User ID",
      accessor: "id",
      sortType: "basic",
    },
    {
      Header: "Name",
      accessor: "name",
      sortType: "basic",
    },
    {
      Header: "Email",
      accessor: "email",
      sortType: "basic",
    },
    {
      Header: "Role",
      accessor: "role",
      sortType: "basic",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <Fragment>
          <Link
            to={`/admin/user/${row.original.id}`}
            className="btn btn-primary py-1 px-2"
          >
            <FaPencilAlt />
          </Link>
          <button
            className="btn btn-danger py-1 px-2 ml-2"
            onClick={() => deleteUserHandler(row.original.id)}
          >
            <FaTrash />
          </button>
        </Fragment>
      ),
    },
  ];

  const data = React.useMemo(() => {
    const rows = users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    return { columns, rows };
  }, [users, columns]);

  return (
    <Fragment>
      <h1>All Users</h1>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <Fragment>
            <h1 className="my-5">All Users</h1>

            {loading ? <Loader /> : <UsersTable data={data} />}
          </Fragment>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </Fragment>
  );
};

const UsersTable = ({ data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(data);

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
  );
};

export default UsersList;
