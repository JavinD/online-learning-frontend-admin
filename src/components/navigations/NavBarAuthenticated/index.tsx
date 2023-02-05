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
            <span className="me-1">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.673 5.606a3326.02 3326.02 0 0 1-5.671-2.674L.138 8.524l2.03.98L2 9.531V20h1v-9.626l.72-.124.28.135v5.288c0 .914 5.206 3.533 6.249 4.049a3.89 3.89 0 0 0 3.48-.026C20 16.486 20 15.895 20 15.673v-5.288l3.854-1.857s-3.8-1.801-6.181-2.922zM19 15.504a51.526 51.526 0 0 1-5.726 3.302 2.884 2.884 0 0 1-2.582.02A40.184 40.184 0 0 1 5 15.521v-4.655l7 3.373 7-3.373zm-7-2.373L5.416 9.958l6.469-1.115-.17-.987-7.85 1.354-1.403-.676 9.537-4.495c.825.393 8.523 4.014 9.542 4.494z" />
                <path fill="none" d="M0 0h24v24H0z" />
              </svg>
            </span>
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
