import React, { ChangeEventHandler } from "react";
import "./styles.scss";

type Props = {
  label: string;
  formText: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  name: string;
  error: string;
  required: boolean;
};

export default function GenericTextArea({
  label,
  formText,
  value,
  onChange,
  name,
  error,
  required,
}: Props) {
  return (
    <div>
      <label className="form-label auth-form-label">{label}</label>
      <textarea
        style={{
          borderColor: error !== "" ? "red" : "",
        }}
        className="form-control auth-form-control"
        value={value}
        onChange={onChange}
        name={name}
        required={true}
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
