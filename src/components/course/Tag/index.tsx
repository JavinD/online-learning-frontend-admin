import React from "react";
import "./styles.scss";
type Props = {
  label: string | undefined;
};

export default function CourseTag({ label }: Props) {
  return (
    <div>
      <span className="course-tag">
        <span className="course-tag-text">{label}</span>
      </span>
    </div>
  );
}
