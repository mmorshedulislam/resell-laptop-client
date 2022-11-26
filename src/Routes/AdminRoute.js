import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Loading from "../Shared/Loading";

const AdminRoute = ({ children }) => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, adminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (adminLoading) {
    return <Loading />;
  }

  if (!isAdmin) {
    logOut();
    return (
      <Navigate to={"/dashboard"} state={{ from: location }} replace></Navigate>
    );
  }

  return children;
};

export default AdminRoute;
