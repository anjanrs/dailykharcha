import React from "react";
import T from "prop-types";
import { withHandlers, pure, compose } from "recompose";
import { noop } from "lodash";

const renderDataListPagePrevious = ({ currentPageNo, handleGoToPrevious }) => {
  let classNames = "list__pagination__previous";
  if (1 === currentPageNo) {
    classNames += " active";
  }

  return (
    <div className={classNames} onClick={handleGoToPrevious}>
      Previous
    </div>
  );
};

const DataListPagePrevious = compose(
  withHandlers({
    handleGoToPrevious: ({ currentPageNo, onPageChange = noop }) => event => {
      if (currentPageNo > 1) {
        onPageChange(currentPageNo - 1);
      }
    }
  }),
  pure
)(renderDataListPagePrevious);

DataListPagePrevious.propTypes = {
  onPageChange: T.func,
  currentPageNo: T.number
};

export default DataListPagePrevious;
