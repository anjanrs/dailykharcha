import React from "react";
import T from "prop-types";
import { noop } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CmdButton from "../../CmdButton";

const DataDetailActions = ({
  onSave,
  onDelete,
  onCancel,
  onAddNew,
  showSaveButton,
  showCancelButton,
  showDeleteButton,
  showAddNewButton
}) => {
  return (
    <div className="detail-actions">
      {showSaveButton && (
        <CmdButton type="save" active={true} onClickHandler={onSave}>
          <FontAwesomeIcon icon="save" />
          &nbsp; Save
        </CmdButton>
      )}
      {showDeleteButton && (
        <CmdButton type="delete" active={true} onClickHandler={onDelete}>
          <FontAwesomeIcon icon="trash-alt" />
          &nbsp; Delete
        </CmdButton>
      )}
      {showCancelButton && (
        <CmdButton type="cancel" active={true} onClickHandler={onCancel}>
          <FontAwesomeIcon icon="undo" />
          &nbsp; Cancel
        </CmdButton>
      )}
      {showAddNewButton && (
        <CmdButton type="add-new" active={true} onClickHandler={onAddNew}>
          <FontAwesomeIcon icon="plus" />
          &nbsp; Add New
        </CmdButton>
      )}
    </div>
  );
};

DataDetailActions.propTypes = {
  onSave: T.func,
  onDelete: T.func,
  onCancel: T.func,
  onAddNew: T.func,
  showSaveButton: T.bool,
  showCancelButton: T.bool,
  showDeleteButton: T.bool,
  showAddNewButton: T.bool
};

DataDetailActions.defaultProps = {
  onSave: noop,
  onDelete: noop,
  onCancel: noop,
  onAddNew: noop,
  showSaveButton: true,
  showCancelButton: true,
  showDeleteButton: true,
  showAddNewButton: true
};

export default DataDetailActions;
