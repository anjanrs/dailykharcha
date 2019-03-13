import React from "react";
import T from "prop-types";
import { noop } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CmdButton from "../CmdButton";

const DataListBulkActions = ({
  onSaveAll,
  onDeleteAll,
  onCancelAll,
  onAddNew,
  listEditMode,
  showSaveAllButton,
  showCancelAllButton,
  showDeleteAllButton,
  showAddNewButton
}) => {
  return (
    <div className="list__bulk-actions">
      {showSaveAllButton && (
        <CmdButton
          type="bulk-save"
          active={listEditMode}
          onClickHandler={onSaveAll}
        >
          <FontAwesomeIcon icon="save" />
          &nbsp; Save All
        </CmdButton>
      )}
      {showDeleteAllButton && (
        <CmdButton
          type="bulk-delete"
          active={true}
          onClickHandler={onDeleteAll}
        >
          <FontAwesomeIcon icon="trash-alt" />
          &nbsp; Delete
        </CmdButton>
      )}
      {showCancelAllButton && (
        <CmdButton
          type="bulk-cancel"
          active={listEditMode}
          onClickHandler={onCancelAll}
        >
          <FontAwesomeIcon icon="undo" />
          &nbsp; Cancel
        </CmdButton>
      )}
      {showAddNewButton && (
        <CmdButton type="bulk-add-new" active={true} onClickHandler={onAddNew}>
          <FontAwesomeIcon icon="plus" />
          &nbsp; Add New
        </CmdButton>
      )}
    </div>
  );
};

DataListBulkActions.propTypes = {
  onSaveAll: T.func,
  onDeleteAll: T.func,
  onCancelAll: T.func,
  onAddNew: T.func,
  showSaveAllButton: T.bool,
  showCancelAllButton: T.bool,
  showDeleteAllButton: T.bool,
  showAddNewButton: T.bool
};

DataListBulkActions.defaultProps = {
  onSaveAll: noop,
  onDeleteAll: noop,
  onCancelAll: noop,
  onAddNew: noop,
  showSaveAllButton: true,
  showCancelAllButton: true,
  showDeleteAllButton: true,
  showAddNewButton: true
};

export default DataListBulkActions;
