import React from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-unauth navbar-expand-lg fixed-top">
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
              <NavLink className="nav-link ms-lg-5" to="/user-login">
                Login
              </NavLink>
              <NavLink className="nav-link ms-lg-5" to="/register">
                Register
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
