import React from "react";
import { compose, withPropsOnChange, pure } from "recompose";
import T from "prop-types";
import { noop } from "lodash";
import DataListPageNext from "./DataListPageNext";
import DataListPageRowsPerPage from "./DataListPageRowsPerPage";
import DataListPageNumbers from "./DataListPageNumbers";
import DataListPagePrevious from "./DataListPagePrevious";

const renderDataListPagination = ({
  currentPageNo,
  totalRows,
  rowsPerPage,
  onPageChange,
  totalPages,
  onRowsPerPageChange
}) => {
  const props = {
    currentPageNo,
    totalRows,
    rowsPerPage,
    onPageChange,
    totalPages,
    onRowsPerPageChange
  };
  const startRow = (currentPageNo - 1) * rowsPerPage + 1;
  const endRow = startRow + rowsPerPage - 1;
  return (
    <div className="list__pagination">
      <div className="list__pagination--info">
        {`Showing ${startRow} to ${endRow} of total ${totalRows}`}
      </div>
      <div className="list__pagination--paging">
        <DataListPagePrevious {...props} />
        <DataListPageNumbers {...props} />
        <DataListPageNext {...props} />
        <DataListPageRowsPerPage {...props} />
      </div>
    </div>
  );
};

const DataListPagination = compose(
  withPropsOnChange(
    ["totalRows", "rowsPerPage"],
    ({ totalRows, rowsPerPage }) => {
      const totalPages = Math.ceil(totalRows / rowsPerPage);
      return { totalPages };
    }
  ),
  pure
)(renderDataListPagination);

DataListPagination.propTypes = {
  onPageChange: T.func,
  onRowsPerPageChange: T.func,
  totalRows: T.number,
  rowsPerPage: T.number,
  currentPageNo: T.number
};

DataListPagination.defaultProps = {
  onPageChange: noop,
  onRowsPerPageChange: noop,
  rowsPerPage: 50,
  currentPageNo: 1
};
export default DataListPagination;
