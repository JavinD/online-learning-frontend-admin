import React from "react";
import "./styles.scss";
type Props = {
  label: string | undefined;
};

export default function CourseCategory({ label }: Props) {
  return (
    <span className="course-category">
      <span className="course-category-text">{label}</span>
    </span>
  );
}
