import React from "react";
import T from "prop-types";
import { noop } from "lodash";

import DataDetailActions from "../DataDetailActions";

const DataDetailHeader = ({
  onSave,
  onDelete,
  onCancel,
  onAddNew,
  title,
  showSaveButton,
  showCancelButton,
  showDeleteButton,
  showAddNewButton
}) => {
  return (
    <div className="detail__header">
      <div className="detail__title">{title}</div>
      <DataDetailActions
        onSave={onSave}
        onDelete={onDelete}
        onCancel={onCancel}
        onAddNew={onAddNew}
        showSaveButton={showSaveButton}
        showCancelButton={showCancelButton}
        showDeleteButton={showDeleteButton}
        showAddNewButton={showAddNewButton}
      />
    </div>
  );
};

DataDetailHeader.propTypes = {
  onSave: T.func,
  onDelete: T.func,
  onCancel: T.func,
  onAddNew: T.func,
  title: T.string,
  showSaveButton: T.bool,
  showCancelButton: T.bool,
  showDeleteButton: T.bool,
  showAddNewButton: T.bool
};
DataDetailHeader.defaultProps = {
  onSave: noop,
  onDelete: noop,
  onCancel: noop,
  onAddNew: noop,
  title: "",
  showSaveButton: true,
  showCancelButton: true,
  showDeleteButton: true,
  showAddNewButton: true
};
export default DataDetailHeader;
