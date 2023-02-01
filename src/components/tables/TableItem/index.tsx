import React from "react";

type Props = {
  child: React.ReactNode;
};

export default function TableRow({ child }: Props) {
  return <td>{child}</td>;
}
