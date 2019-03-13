import React from "react";
import { noop } from "lodash";
import { compose, withHandlers, pure } from "recompose";
import { Map, List } from "immutable";
import T from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

import DataListCell from "../DataListCell";
import DataListCellAction from "../DataListCellAction";
import CheckBox from "../../CheckBox";

const renderDataListRow = ({
  primaryField,
  item,
  editedItem,
  columns,
  handleEdit = noop,
  handleCancel = noop,
  handleDelete = noop,
  handleSave = noop,
  handleCellClick = noop,
  handleRowChecked = noop,
  editMode,
  rowChecked,
  validationMsgs,
  showRowCancelButton,
  showRowSaveButton,
  showRowDeleteButton,
  showDeleteAllButton
}) => {
  const chkOptons = [
    { value: item.get(primaryField).toString(), displayValue: "" }
  ];
  const chkValues = rowChecked ? [item.get(primaryField).toString()] : [];
  const isRowInvalid = validationMsgs && !validationMsgs.get("valid");
  return (
    <tr
      className={
        "list__row" +
        (editMode ? " editView " : "") +
        (isRowInvalid ? " invalid " : "")
      }
    >
      {showDeleteAllButton && (
        <td className="list-cell">
          <CheckBox
            name={`chk-${primaryField}`}
            handleValueChange={handleRowChecked}
            options={chkOptons}
            value={chkValues}
          />
        </td>
      )}
      {columns.map(column => {
        let cellValue =
          item.get(column.get("field")) !== null &&
          item.get(column.get("field")) !== undefined
            ? item.get(column.get("field")).toString()
            : "";

        let displayValue = column.get("displayField")
          ? item.get(column.get("displayField")) !== null &&
            item.get(column.get("displayField")) !== undefined
            ? item.get(column.get("displayField")).toString()
            : ""
          : cellValue;
        let editValue = cellValue;
        if (editedItem) {
          editValue =
            editedItem.get(column.get("field")) !== null &&
            editedItem.get(column.get("field")) !== undefined
              ? editedItem.get(column.get("field")).toString()
              : "";
        }

        let invalidMsgs = List();

        if (isRowInvalid) {
          invalidMsgs = validationMsgs.getIn([
            "msgs",
            column.get("field").toString()
          ]);
        }

        return (
          column.get("type") !== "hidden" && (
            <td className={"list-cell"} key={column.get("field")}>
              <DataListCell
                editMode={editMode}
                column={column}
                displayValue={displayValue}
                editValue={editValue}
                onEdit={handleEdit}
                invalidMsgs={invalidMsgs}
                onCellClick={handleCellClick}
                rowItem={item}
              />
            </td>
          )
        );
      })}
      {(showRowSaveButton || showRowCancelButton || showRowDeleteButton) && (
        <td className="action__column">
          <DataListCellAction
            editMode={editMode}
            onCancel={handleCancel}
            onDelete={handleDelete}
            onSave={handleSave}
            showRowCancelButton={showRowCancelButton}
            showRowSaveButton={showRowSaveButton}
            showRowDeleteButton={showRowDeleteButton}
          />
        </td>
      )}
    </tr>
  );
};

const DataListRow = compose(
  // withState("editMode", "setEditMode", ({ editMode }) => {
  //   return editMode;
  // }),
  withHandlers({
    handleEdit: ({ item, editedItem, onRowEdit = noop }) => (
      field,
      newValue
    ) => {
      let editedRowItem = item;
      if (editedItem) {
        editedRowItem = editedItem.set(field, newValue);
      } else {
        editedRowItem = item.set(field, newValue);
      }
      onRowEdit(editedRowItem);
    },
    handleCancel: ({ item, onRowCancel = noop }) => event => {
      onRowCancel(item);
    },
    handleSave: ({ editMode, editedItem, onRowSave = noop }) => event => {
      onRowSave(editedItem);
    },
    handleDelete: ({ item, onRowDelete = noop }) => event => {
      onRowDelete(item);
    },
    handleCellClick: ({ item, editMode, onCellClick }) => column => {
      onCellClick(item, column, editMode);
    },
    handleRowChecked: ({ onRowChecked = noop, item }) => newValues => {
      const checked = newValues.length ? true : false;
      onRowChecked(checked, item.get("id").toString());
    }
  }),
  pure
)(renderDataListRow);

DataListRow.propTypes = {
  primaryField: T.string,
  item: ImmutablePropTypes.map,
  editedItem: ImmutablePropTypes.map,
  columns: ImmutablePropTypes.list.isRequired,
  onRowEdit: T.func,
  onRowCancel: T.func,
  onRowDelete: T.func,
  onRowSave: T.func,
  onCellClick: T.func,
  onRowChecked: T.func,
  editMode: T.bool,
  rowChecked: T.bool,
  validationMsgs: ImmutablePropTypes.map,
  showRowCancelButton: T.bool,
  showRowSaveButton: T.bool,
  showRowDeleteButton: T.bool,
  showDeleteAllButton: T.bool
};

DataListRow.defaultProps = {
  primaryField: "id",
  item: Map(),
  editedItem: Map(),
  onRowEdit: noop,
  onRowCancel: noop,
  onRowDelete: noop,
  onRowSave: noop,
  onCellClick: noop,
  onRowChecked: noop,
  editMode: false,
  rowChecked: false,
  validationMsgs: Map(),
  showRowCancelButton: true,
  showRowSaveButton: true,
  showRowDeleteButton: true,
  showDeleteAllButton: true
};
export default DataListRow;
