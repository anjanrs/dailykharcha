import React from "react";
import T from "prop-types";
import { compose, withHandlers, pure } from "recompose";
import { noop } from "lodash";

const renderDataListPageNext = ({
  currentPageNo,
  totalPages,
  handleGoToNext
}) => {
  let classNames = "list__pagination__next";
  if (totalPages === currentPageNo) {
    classNames += " active";
  }
  return (
    <div className={classNames} onClick={handleGoToNext}>
      Next
    </div>
  );
};

const DataListPageNext = compose(
  withHandlers({
    handleGoToNext: ({
      currentPageNo,
      totalPages,
      onPageChange = noop
    }) => event => {
      if (currentPageNo < totalPages) {
        onPageChange(currentPageNo + 1);
      }
    }
  }),
  pure
)(renderDataListPageNext);

DataListPageNext.propTypes = {
  onPageChange: T.func,
  currentPageNo: T.number,
  totalPages: T.number
};

export default DataListPageNext;
