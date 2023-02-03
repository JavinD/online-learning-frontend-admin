import React, { MouseEventHandler, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { UserDispatch } from "../../../store/slices/admin/userSlice";
import "./style.scss";

export default function NavBar() {
  const [cookies, removeCookie] = useCookies(["admin_token"]);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const logOut: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      removeCookie("admin_token", { path: "/" });
      navigate("/admin-login");
    } else {
    }
  };

  return (
    <div>
      <nav className="navbar navbar-auth navbar-expand-lg fixed-top">
        <div className="container">
          <NavLink to="" className="navbar-brand brand-text">
            DigiEdu
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink className="nav-link ms-lg-5" aria-current="page" to="">
                Dashboard
              </NavLink>
              {/* navbar dropdown user */}
              <div className="nav-item dropdown">
                <button
                  className="btn nav-link dropdown-toggle ms-lg-5"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Admin
                </button>
                <ul
                  className={"dropdown-menu " + (showDropdown ? "show" : "")}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <NavLink className="dropdown-item" to="/course">
                      Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/invoice">
                      Invoices
                    </NavLink>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      onClick={logOut}
                      className="dropdown-item"
                      to="/admin-login"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
