import React from "react";
import logo from "../../../assets/search_logo.png";

type Props = {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GenericSearch({ handleSearchChange }: Props) {
  return (
    <div>
      <div className="input-group">
        <span className="input-group-text bg-transparent" id="basic-addon1">
          <img src={logo} alt="logo" />
        </span>
        <input
          onChange={handleSearchChange}
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </div>
    </div>
  );
}
