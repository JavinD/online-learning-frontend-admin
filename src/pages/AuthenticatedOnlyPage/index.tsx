import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { isExpired, decodeToken } from "react-jwt";

export default function AuthenticatedOnlyPage() {
  let location = useLocation();
  const [cookies] = useCookies(["admin_token"]);
  const decodedToken = decodeToken(cookies.admin_token);
  const isMyTokenExpired = isExpired(cookies.admin_token);
  // if not auth then redirect to login page

  if (decodedToken === null || isMyTokenExpired === true) {
    return <Navigate to="admin-login" replace state={{ from: location }} />;
    // TODO Add location and replace from react router
  }

  return <Outlet />;
}
