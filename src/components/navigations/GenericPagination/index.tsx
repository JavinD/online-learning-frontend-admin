import React from "react";
import "./styles.scss";

type Props = {
  pageTotal: number;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

export default function GenericPagination({
  pageNumber,
  pageTotal,
  setPageNumber,
}: Props) {
  const visiblePageItems = 3;
  let start = pageNumber;
  let end = start + visiblePageItems;

  if (pageTotal <= visiblePageItems) {
    start = 1;
    end = pageTotal;
  } else {
    start = pageNumber;

    if (start !== pageTotal) {
      end = pageNumber + visiblePageItems - 1;
    } else {
      end = pageTotal;
    }
  }

  return (
    <div>
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              className="page-link"
              disabled={pageNumber - 1 <= 0 ? true : false}
              tabIndex={-1}
              onClick={() => {
                setPageNumber(pageNumber - 1);
              }}
            >
              &lt;&lt;
            </button>
          </li>
          {Array.from(Array(pageTotal), (_, i) => {
            if (i + 1 >= start && i + 1 <= end) {
              return (
                <li key={i} className="page-item">
                  <button
                    className={`page-link ${
                      pageNumber === i + 1 ? "active" : ""
                    }`}
                    onClick={() => {
                      setPageNumber(i + 1);
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            }
          })}

          <li className="page-item">
            <button
              className="page-link"
              disabled={pageNumber >= pageTotal ? true : false}
              onClick={() => {
                setPageNumber(pageNumber + 1);
              }}
            >
              &gt;&gt;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
