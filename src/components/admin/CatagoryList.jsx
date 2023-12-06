import React, { Fragment, useEffect } from "react";
import { MDBDataTable } from "mdbreact";

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

  const setCategorys = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Action",
          field: "actions",
        },
      ],
      rows: [],
    };

    category.forEach((category) => {
      data.rows.push({
        id: category._id,
        name: category.name,
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteCategoryHandler(category._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteCategoryHandler = (id) => {
    dispatch(dltCategory(id));
  };

  return (
    <Fragment>
      <h1>All Category</h1>
      <div className="row mt-5">
        <div className="col-12 col-md-2 mt-4">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10 mt-5">
          <Fragment>
            <h1 className="my-5">All Categorys</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCategorys()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </Fragment>
  );
};

export default CategorysList;
