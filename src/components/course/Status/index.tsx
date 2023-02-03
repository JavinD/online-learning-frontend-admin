import React from "react";
import "./styles.scss";

type Props = {
  className: string;
  label: string | undefined;
};

export default function CourseStatus({ className, label }: Props) {
  return (
    <span className={"course-status " + className}>
      <span className="course-status-text">{label}</span>
    </span>
  );
}
