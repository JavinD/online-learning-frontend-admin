import React, { MouseEventHandler, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { chooseBadgeByLevel } from "../../../assets/badges";
import { RootState } from "../../../store";
import {
  fetchUserDetails,
  UserDispatch,
} from "../../../store/slices/user/userSlice";
import "./style.scss";

export default function NavBar() {
  const [cookies, removeCookie] = useCookies(["access_token"]);
  const { user } = useSelector((state: RootState) => state.user);
  const userDispatch: UserDispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const level = useRef(0);

  useEffect(() => {
    if (user?.level) {
      level.current = user?.level_id;
    }
  }, [user]);

  useEffect(() => {
    userDispatch(fetchUserDetails(cookies.access_token));
  }, [userDispatch, cookies.access_token]);

  const logOut: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      removeCookie("access_token", { path: "/" });
      navigate("/user-login");
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
                Home
              </NavLink>

              <NavLink className="nav-link ms-lg-5" to="/course">
                Courses
              </NavLink>

              {/* navbar dropdown user */}
              <div className="nav-item dropdown">
                <button
                  className="btn nav-link dropdown-toggle ms-lg-5"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {chooseBadgeByLevel(level.current)}
                </button>
                <ul
                  className={"dropdown-menu " + (showDropdown ? "show" : "")}
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <NavLink className="dropdown-item" to="/user/course">
                      My Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/user/favorite">
                      My Favorites
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/user/cart">
                      My Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/user/invoice">
                      My Invoices
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/user/reward">
                      My Rewards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/user/profile">
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      onClick={logOut}
                      className="dropdown-item"
                      to="/user-login"
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
