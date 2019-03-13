import React from "react";
import { noop } from "lodash";
import { withHandlers, compose } from "recompose";

const renderEditAccessColumn = ({ handleEditAccessClick = noop }) => {
  return <div onClick={handleEditAccessClick}>Edit Access</div>;
};

const withCustomHandlers = withHandlers({
  handleEditAccessClick: ({ rowItem, onEditAccessClick }) => event => {
    onEditAccessClick(rowItem);
  }
});

export default compose(withCustomHandlers)(renderEditAccessColumn);
