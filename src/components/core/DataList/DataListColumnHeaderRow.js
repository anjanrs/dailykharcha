import React from "react";
import DataListColumnHeaderCell from "./DataListColumnHeaderCell";
import CheckBox from "../CheckBox";

const DataListColumnHeaderRow = ({
  columns,
  onSort,
  currentSorts,
  onCheckAllRows,
  allRowsChecked = false,
  showRowSaveButton,
  showRowCancelButton,
  showRowDeleteButton,
  showSaveAllButton,
  showCancelAllButton,
  showDeleteAllButton,
  showAddNewButton
}) => {
  const chkOptons = [{ value: "1", displayValue: "" }];
  const chkValues = allRowsChecked ? ["1"] : [];
  return (
    <tr className="list__column-header">
      {showDeleteAllButton && (
        <th className="list__column-header__cell checkbox-cell">
          <CheckBox
            name={`chk-all`}
            options={chkOptons}
            value={chkValues}
            handleValueChange={onCheckAllRows}
          />
        </th>
      )}
      {columns.map(column => {
        return (
          column.get("type") !== "hidden" && (
            <DataListColumnHeaderCell
              key={column.get("field")}
              column={column}
              onSort={onSort}
              currentSorts={currentSorts}
            />
          )
        );
      })}
      {(showRowSaveButton || showRowCancelButton || showRowDeleteButton) && (
        <th className="list__column-header__cell">Action</th>
      )}
    </tr>
  );
};

export default DataListColumnHeaderRow;
