import React from "react";
import T from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { compose, withHandlers, pure } from "recompose";
import { noop } from "lodash";
import { List } from "immutable";

import ValidationMsgs from "../../ValidationMsgs";
import ControlField from "../../ControlField";

const renderDataListCell = ({
  editMode = true,
  displayValue,
  editValue,
  column,
  invalidMsgs,
  rowItem,
  handleCellValueChange = noop,
  handleCellClick
}) => {
  let {
    type,
    field,
    editControl,
    linkOption,
    CustomCellComponent
  } = column.toJS();
  let typeForDisplay = type === "editable" ? "label" : type;
  //if thers is not editControl default type is label
  let controlType = !editControl ? "label" : editControl.type;

  return (
    type !== "hidden" && (
      <div className="cell-wrapper" onClick={handleCellClick}>
        <div>
          {type === "custom" && <CustomCellComponent rowItem={rowItem} />}

          {// (!editMode || (type !== "editable" && type !== "custom"))
          (!editMode || type === "label" || type === "link") && (
            <ControlField
              name={`edit-${field}`}
              value={displayValue}
              field={field}
              type={typeForDisplay}
              {...linkOption}
            />
          )}
        </div>

        {editMode && type === "editable" && (
          <ControlField
            {...editControl}
            onValueChange={handleCellValueChange}
            name={`edit-${field}`}
            value={editValue}
            field={field}
            type={controlType}
          />
        )}
        <ValidationMsgs messages={invalidMsgs && invalidMsgs.toJS()} />
      </div>
    )
  );
};

const DataListCell = compose(
  withHandlers({
    handleCellValueChange: ({ onEdit = noop, column }) => (field, newValue) => {
      onEdit(field, newValue);
    },
    handleCellClick: ({
      column,
      onCellClick = noop,
      editMode = false
    }) => event => {
      // const { type } = column.toJS();
      // if (type === "editable" && !editMode) {
      onCellClick(column);
      // }
    }
  }),
  pure
)(renderDataListCell);

DataListCell.propTypes = {
  editMode: T.bool,
  column: ImmutablePropTypes.map.isRequired,
  rowItem: ImmutablePropTypes.map.isRequired,
  invalidMsgs: ImmutablePropTypes.list,
  displayValue: T.string,
  editValue: T.string,
  onEdit: T.func,
  onCellClick: T.func
};

DataListCell.deafultProps = {
  editMode: false,
  invalidMsgs: List(),
  displayValue: "",
  editValue: "",
  onEdit: noop,
  onCellClick: noop
};

export default DataListCell;
