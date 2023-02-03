import React from "react";

import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { decodeToken, isExpired } from "react-jwt";
import NavBarAuthenticated from "../../components/navigations/NavBarAuthenticated";

export default function LayoutPage() {
  const [cookies] = useCookies(["admin_token"]);
  const decodedToken = decodeToken(cookies.admin_token);
  const isMyTokenExpired = isExpired(cookies.admin_token);

  if (decodedToken === null || isMyTokenExpired === true) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <NavBarAuthenticated />
      <Outlet />
    </div>
  );
}
