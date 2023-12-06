import { useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  return (
    loading === false && (
      <Route
        {...rest}
        render={(props) => {
          if (!isAuthenticated) {
            return <Link to="/login" />;
          }

          if (isAdmin && user.role !== "admin") {
            return <Link to="/" />;
          }

          return <Component {...props} />;
        }}
      />
    )
  );
};

export default ProtectedRoute;
