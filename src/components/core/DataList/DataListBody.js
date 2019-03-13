import React from "react";
import { noop } from "lodash";
import DataListRow from "./DataListRow";
import DataListColumnHeaderRow from "./DataListColumnHeaderRow";

const DataListBody = ({
  primaryField,
  columns,
  data,
  editedRows,
  newRows,
  checkedRows,
  onSort = noop,
  currentSorts,
  onCellClick = noop,
  onRowEdit = noop,
  onRowCancel = noop,
  onRowDelete = noop,
  onRowSave = noop,
  onRowChecked = noop,
  onCheckAllRows = noop,
  allRowsChecked = false,
  validations,
  showRowSaveButton,
  showRowCancelButton,
  showRowDeleteButton,
  showSaveAllButton,
  showCancelAllButton,
  showDeleteAllButton,
  showAddNewButton
}) => {
  return (
    <div className="list__body--wrapper">
      <table className="list__body">
        <tbody>
          <DataListColumnHeaderRow
            columns={columns}
            onSort={onSort}
            currentSorts={currentSorts}
            onCheckAllRows={onCheckAllRows}
            allRowsChecked={allRowsChecked}
            showRowSaveButton={showRowSaveButton}
            showRowCancelButton={showRowCancelButton}
            showRowDeleteButton={showRowDeleteButton}
            showSaveAllButton={showSaveAllButton}
            showCancelAllButton={showCancelAllButton}
            showDeleteAllButton={showDeleteAllButton}
            showAddNewButton={showAddNewButton}
          />
          {data.map((rowItem, index) => {
            let rowId = rowItem.get("id").toString();
            let editedItem = editedRows.find(editRow => {
              return editRow.get("id").toString() === rowId;
            });

            let rowChecked = checkedRows.find(checkedRowId => {
              return checkedRowId === rowId;
            });

            let validationMsgs = validations.get(rowId);
            return (
              <DataListRow
                key={rowId}
                columns={columns}
                primaryField={primaryField}
                item={rowItem}
                editedItem={editedItem}
                rowChecked={rowChecked ? true : false}
                onCellClick={onCellClick}
                onRowEdit={onRowEdit}
                onRowCancel={onRowCancel}
                onRowSave={onRowSave}
                onRowDelete={onRowDelete}
                onRowChecked={onRowChecked}
                editMode={editedItem ? true : false}
                validationMsgs={validationMsgs}
                showRowSaveButton={showRowSaveButton}
                showRowCancelButton={showRowCancelButton}
                showRowDeleteButton={showRowDeleteButton}
                showSaveAllButton={showSaveAllButton}
                showCancelAllButton={showCancelAllButton}
                showDeleteAllButton={showDeleteAllButton}
                showAddNewButton={showAddNewButton}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataListBody;
