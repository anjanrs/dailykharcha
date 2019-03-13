import React from "react";
import { withHandlers, withProps, compose, pure } from "recompose";
import { noop } from "lodash";
import T from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

const renderDataListColumnHeaderCell = ({ title, width, handleSort }) => {
  return (
    <th
      className="list__column-header__cell"
      onClick={handleSort}
      width={width}
    >
      {title}
    </th>
  );
};

const DataListColumnHeaderCell = compose(
  withHandlers({
    handleSort: ({ currentSorts, column, onSort = noop }) => event => {
      if (!column.get("allowSort")) {
        return;
      }
      let newSortOrder = "ASC";
      let newSortField = column.get("displayField")
        ? column.get("displayField")
        : column.get("field");
      if (currentSorts.size) {
        const objExistingSort = currentSorts.find(function(objSort) {
          return objSort.get("field") === newSortField;
        });

        if (objExistingSort) {
          newSortOrder =
            objExistingSort.get("orderBy") === "ASC" ? "DESC" : "ASC";
        }
      }
      onSort(newSortField, newSortOrder);
    }
  }),
  withProps(({ column }) => {
    return { title: column.get("title"), width: column.get("width") };
  }),
  pure
)(renderDataListColumnHeaderCell);

DataListColumnHeaderCell.propTypes = {
  currentSorts: T.object,
  columns: ImmutablePropTypes.map,
  onSort: T.func
};

export default DataListColumnHeaderCell;
