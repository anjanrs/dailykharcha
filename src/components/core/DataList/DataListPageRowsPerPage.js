import React from "react";
import { noop } from "lodash";
import { withHandlers, pure, compose } from "recompose";
import T from "prop-types";

const renderDataListPageRowsPerPage = ({
  rowsPerPage,
  handleRowsPerPageChange
}) => {
  const options = [25, 50, 100, 200, 500];
  return (
    <select
      className="list__pagination_rowsPerPage"
      value={rowsPerPage}
      onChange={handleRowsPerPageChange}
    >
      {options.map(option => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
};

const DataListPageRowsPerPage = compose(
  withHandlers({
    handleRowsPerPageChange: ({ onRowsPerPageChange = noop }) => event => {
      const newRowsPerPage = parseInt(event.target.value);
      onRowsPerPageChange(newRowsPerPage);
    }
  }),
  pure
)(renderDataListPageRowsPerPage);

DataListPageRowsPerPage.propTypes = {
  rowsPerPage: T.number,
  onRowsPerPageChange: T.func
};

export default DataListPageRowsPerPage;
