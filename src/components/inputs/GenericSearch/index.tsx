import React from "react";
import logo from "../../../assets/search_logo.png";

type Props = {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function GenericSearch({ handleSearchChange }: Props) {
  return (
    <div className="input-group mb-4">
      <span className="input-group-text bg-transparent">
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
  );
}
