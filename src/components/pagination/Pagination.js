import React from "react";

import "./Pagination.scss";

const Pagination = ({ next, back, page, numPages, activeStep }) => {
  const pages = () => {
    const pageArr = [];
    for (let i = 1; i < numPages + 1; i++) {
      pageArr.push(
        <div className="page-item" key={i}>
          <button
            className={`page-link ${activeStep + 1 === i ? "active" : ""}`}
            onClick={page.bind(this, i)}
            href="#"
          >
            {i}
          </button>
        </div>
      );
    }
    return pageArr;
  };

  return (
    <div className="pagination">
      <div className="page-num">
        <span>{`Page ${activeStep + 1} / ${numPages}`}</span>
      </div>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className={`page-link ${activeStep === 0 ? "disabled" : ""}`}
              tabIndex="-1"
              onClick={back}
            >
              &laquo;
            </button>
          </li>
          {}
          {pages()}
          <li className="page-item">
            <button
              className={`page-link ${
                activeStep === numPages - 1 ? "disabled" : ""
              }`}
              onClick={next}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
