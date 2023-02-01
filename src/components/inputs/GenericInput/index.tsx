import React, { ChangeEventHandler } from "react";
import "./styles.scss";

type Props = {
  label: string;
  type: string;
  formText: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  error: string;
  required: boolean;
  className?: string;
  disabled?: boolean;
};

export default function index({
  label,
  type,
  formText,
  value,
  onChange,
  name,
  error,
  required,
  className,
  disabled,
}: Props) {
  return (
    <div>
      {label !== "" && (
        <label className="form-label auth-form-label">{label}</label>
      )}
      <input
        type={type}
        style={{
          borderColor: error !== "" ? "red" : "",
        }}
        className={"form-control auth-form-control " + className}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        disabled={disabled}
      />
      {error !== "" && (
        <span className="warning" role="alert">
          {error}
        </span>
      )}
      {formText ? <div className="form-text">{formText}</div> : ""}
    </div>
  );
}
