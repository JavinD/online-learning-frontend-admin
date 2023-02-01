import React from "react";

type Props = {
  label: string;
  classNames: string;
  isError: boolean;
};

export default function index({ label, classNames, isError }: Props) {
  return (
    <div>
      <button
        type="submit"
        className={`btn btn-primary btn-submit ${classNames}`}
        disabled={isError ? true : false}
      >
        {label}
      </button>
    </div>
  );
}
