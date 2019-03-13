import React from "react";
import T from "prop-types";
import { noop } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CmdButton from "../../CmdButton";

const DataListCellAction = ({
  onCancel = noop,
  onDelete = noop,
  onSave = noop,
  editMode = false,
  showRowSaveButton,
  showRowCancelButton,
  showRowDeleteButton
}) => {
  return (
    <div>
      {showRowCancelButton && (
        <CmdButton active={editMode} type="cancel" onClickHandler={onCancel}>
          <FontAwesomeIcon title="cancel" icon="undo" />
        </CmdButton>
      )}
      {showRowSaveButton && (
        <CmdButton active={editMode} type="save" onClickHandler={onSave}>
          <FontAwesomeIcon title="save" icon="save" />
        </CmdButton>
      )}
      {showRowDeleteButton && (
        <CmdButton active={true} type="delete" onClickHandler={onDelete}>
          <FontAwesomeIcon title="delete" icon="trash-alt" />
        </CmdButton>
      )}
    </div>
  );
};

DataListCellAction.prototype = {
  onCancel: T.fnc,
  onDelete: T.fnc,
  onSave: T.fnc,
  editMode: T.bool,
  showRowSaveButton: T.bool,
  showRowCancelButton: T.bool,
  showRowDeleteButton: T.bool
};

DataListCellAction.defaultProps = {
  onCancel: noop,
  onDelete: noop,
  onSave: noop,
  editMode: false,
  showRowSaveButton: true,
  showRowCancelButton: true,
  showRowDeleteButton: true
};

export default DataListCellAction;
