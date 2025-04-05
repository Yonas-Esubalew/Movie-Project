import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const AdminRouters = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("user from router", userInfo);
  return (
    <div>
      <Outlet />
    </div>
  );

  // : (
  //   <Navigate to={"/login"} replace />
  // )
};

export default AdminRouters;
