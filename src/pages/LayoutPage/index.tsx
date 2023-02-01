import React from "react";

import { Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { decodeToken, isExpired } from "react-jwt";
import NavBarUnauthenticated from "../../components/navigations/NavBarUnauthenticated";
import NavBarAuthenticated from "../../components/navigations/NavBarAuthenticated";
import Footer from "../../components/navigations/Footer";

export default function LayoutPage() {
  const [cookies] = useCookies(["access_token"]);
  const decodedToken = decodeToken(cookies.access_token);
  const isMyTokenExpired = isExpired(cookies.access_token);

  if (decodedToken === null || isMyTokenExpired === true) {
    return (
      <div>
        <NavBarUnauthenticated />
        <Outlet />
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBarAuthenticated />
      <Outlet />
      <Footer />
    </div>
  );
}
