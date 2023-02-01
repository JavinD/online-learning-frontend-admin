import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./style.scss";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-container">
      <div className="text-center">
        <h1>
          <span className="fade-in" id="digit1">
            4
          </span>
          <span className="fade-in" id="digit2">
            0
          </span>
          <span className="fade-in" id="digit3">
            4
          </span>
        </h1>
        <h3 className="fadeIn">PAGE NOT FOUND</h3>
        <button
          onClick={() => {
            navigate("/");
          }}
          type="button"
          name="button"
        >
          Return To Home
        </button>
      </div>
    </div>
  );
}
