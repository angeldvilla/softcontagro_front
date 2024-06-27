import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children }) => {
  const { loading, user, isAuthenticated } = useSelector(
    (state) => state?.auth
  );

  if (loading) {
    return <Loader />;
  }

  if (user === null && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
