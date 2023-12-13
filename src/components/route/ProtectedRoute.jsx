import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, /* user */ } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  /* if (isAuthenticated && user.role !== "admin") {
    return <Navigate to="/" />;
  } */

  return children;
};

export default ProtectedRoute;
