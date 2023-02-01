import React from "react";
import "./styles.scss";

type Props = {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
};

export default function GenericButton({
  label,
  onClick,
  disabled,
  type,
  icon,
}: Props) {
  return (
    <div>
      <button
        type={type}
        className="btn generic-btn"
        onClick={onClick}
        disabled={disabled}
      >
        <div className="row justify-content-center align-items-center">
          {icon && <div className="icon col-3">{icon}</div>}
          <div className="col">{label}</div>
        </div>
      </button>
    </div>
  );
}
