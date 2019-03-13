import React from "react";
import { noop } from "lodash";
import T from "prop-types";
import { withHandlers, pure, compose } from "recompose";

const renderPagination = ({
  currentPageNo,
  handlePageNumberClick,
  totalPages
}) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <li
        key={i}
        className={i === currentPageNo ? "active" : ""}
        onClick={handlePageNumberClick(i)}
      >
        {i}
      </li>
    );
  }
  return <ul className="list__pagination__numbers">{pages}</ul>;
};

const DataListPageNumbers = compose(
  withHandlers({
    handlePageNumberClick: ({ onPageChange = noop }) => pageno => event => {
      onPageChange(pageno);
    }
  }),
  pure
)(renderPagination);
// const ListPagination = renderPagination;

DataListPageNumbers.propTypes = {
  onPageChange: T.func,
  totalPages: T.number,
  currentPageNo: T.number
};

export default DataListPageNumbers;
