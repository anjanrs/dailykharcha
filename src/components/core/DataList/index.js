import React from "react";
import { withHandlers, compose, lifecycle, pure } from "recompose";
import { fromJS, List } from "immutable";
import { connect } from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import T from "prop-types";
import { noop } from "lodash";

import { datalistActions, datalistSelectors } from "./redux";
import DataListBody from "./DataListBody";
import DataListPagination from "./DataListPagination";
import DataListFilter from "./DataListFilter";
import DataListHeader from "./DataListHeader";
import ConfirmModalBox from "../ConfirmModalBox";
import {
  handleRowsPerPageChange,
  handlePageChange,
  handleSort,
  handleFilter,
  handleRowEdit,
  handleCellClick,
  handleRowCancel,
  handleRowDelete,
  handleRowSave,
  handleSaveAll,
  handleCancelAll,
  handleCheckRow,
  handleCheckAllRows,
  handleDeleteAll,
  handleConfirmDelete,
  handleCancelDelete,
  handleAddNew
} from "./utils/handlers";

import Spinner from "../Spinner";
import "./style/index.scss";

const renderDataList = ({
  name,
  title,
  primaryField,
  // columns,
  datalistState,
  listEditMode,
  handlePageChange,
  handleSort,
  // onFilterValueChange,
  handleRowsPerPageChange,
  handleCellClick,
  handleFilter,
  handleRowEdit,
  handleRowCancel,
  handleRowSave,
  handleRowDelete,
  handleSaveAll,
  handleDeleteAll,
  handleCancelAll,
  handleCheckRow,
  handleCheckAllRows,
  handleAddNew,
  handleConfirmDelete,
  handleCancelDelete,
  allRowsChecked = false,
  showRowCancelButton,
  showRowSaveButton,
  showRowDeleteButton,
  showSaveAllButton,
  showCancelAllButton,
  showDeleteAllButton,
  showAddNewButton
}) => {
  return (
    <React.Fragment>
      <ConfirmModalBox
        id={`${name}-confirm-modal-box`}
        isOpen={datalistState.get("showConfirmDelete")}
        onConfirmClick={handleConfirmDelete}
        onCancelClick={handleCancelDelete}
        onCloseClick={handleCancelDelete}
        onOverlayClick={handleCancelDelete}
      />
      {datalistState.get("loading") && <Spinner id={`${name}-spinner`} />}
      <div id={name} className="list">
        {datalistState.get("filters").size > 0 && (
          <DataListFilter
            filters={datalistState.get("filters")}
            onFilter={handleFilter}
          />
        )}
        <DataListHeader
          onSaveAll={handleSaveAll}
          onDeleteAll={handleDeleteAll}
          onCancelAll={handleCancelAll}
          onAddNew={handleAddNew}
          listEditMode={listEditMode}
          title={title}
          showSaveAllButton={showSaveAllButton}
          showCancelAllButton={showCancelAllButton}
          showDeleteAllButton={showDeleteAllButton}
          showAddNewButton={showAddNewButton}
        />
        <div className="list-body-pagination--wrapper">
        <DataListBody
          primaryField={primaryField}
          columns={datalistState.get("columns")}
          data={datalistState.getIn(["results", "data"])}
          onSort={handleSort}
          currentSorts={datalistState.get("sorts")}
          onCellClick={handleCellClick}
          onRowEdit={handleRowEdit}
          onRowCancel={handleRowCancel}
          onRowDelete={handleRowDelete}
          onRowSave={handleRowSave}
          onRowChecked={handleCheckRow}
          onCheckAllRows={handleCheckAllRows}
          allRowsChecked={allRowsChecked}
          editedRows={datalistState.get("editedRows")}
          newRows={datalistState.get("newRows")}
          checkedRows={datalistState.get("checkedRows")}
          validations={datalistState.get("validations")}
          showRowCancelButton={showRowCancelButton}
          showRowSaveButton={showRowSaveButton}
          showRowDeleteButton={showRowDeleteButton}
          showSaveAllButton={showSaveAllButton}
          showCancelAllButton={showCancelAllButton}
          showDeleteAllButton={showDeleteAllButton}
          showAddNewButton={showAddNewButton}
        />
        <DataListPagination
          currentPageNo={datalistState.get("pageNo")}
          totalRows={datalistState.getIn(["results", "count"])}
          rowsPerPage={datalistState.get("rowsPerPage")}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ dataLists }, ownProps) => {
  const datalistState = datalistSelectors.getListState(
    dataLists,
    ownProps.name
  );
  return {
    datalistState,
    listEditMode: datalistSelectors.islistEditMode(datalistState),
    allRowsChecked: datalistSelectors.isAllRowsChecked(datalistState)
  };
};

const withConnect = connect(
  mapStateToProps,
  datalistActions
);

const withEventHandlers = withHandlers({
  handleRowsPerPageChange,
  handlePageChange,
  handleSort,
  handleFilter,
  handleRowEdit,
  handleCellClick,
  handleRowCancel,
  handleRowDelete,
  handleRowSave,
  handleSaveAll,
  handleCancelAll,
  handleCheckRow,
  handleCheckAllRows,
  handleDeleteAll,
  handleConfirmDelete,
  handleCancelDelete,
  handleAddNew
});

const withLifeCycle = lifecycle({
  componentWillMount() {
    const {
      filters,
      sorts,
      pageNo,
      rowsPerPage,
      endpoints,
      columns,
      initAction,
      name
    } = this.props;
    let newListState = datalistSelectors.getInitListState();
    newListState = newListState.set("filters", filters);
    newListState = newListState.set("sorts", sorts);
    newListState = newListState.set("pageNo", pageNo);
    newListState = newListState.set("rowsPerPage", rowsPerPage);
    newListState = newListState.set("endpoints", endpoints);
    newListState = newListState.set("columns", columns);
    initAction(newListState, name);
  }
});

const DataList = compose(
  withConnect,
  withEventHandlers,
  withLifeCycle,
  pure
)(renderDataList);

DataList.propTypes = {
  name: T.string,
  primaryField: T.string,
  columns: ImmutablePropTypes.list,
  sorts: ImmutablePropTypes.list,
  filters: ImmutablePropTypes.list,
  pageNo: T.number,
  rowsPerPage: T.number,
  endpoints: ImmutablePropTypes.map,
  api: T.string,
  title: T.string,
  showRowCancel: T.bool,
  showRowSave: T.bool,
  showRowDelete: T.bool,
  showSaveAll: T.bool,
  showCancelAll: T.bool,
  showDeleteAll: T.bool,
  showAddNew: T.bool,
  onFilterClick: T.func,
  onRowEdit: T.func,
  onCellClick: T.func,
  onRowCancelClick: T.func,
  onRowDeleteClick: T.func,
  onRowSaveClick: T.func,
  onSaveAllClick: T.func,
  onCancelAllClick: T.func,
  onDeleteAllClick: T.func,
  onAddNewClick: T.func,
  onCheckRowClick: T.func,
  onCheckAllClick: T.func,
  onDeleteConfirmClick: T.func
};

DataList.defaultProps = {
  primaryField: "id",
  columns: ImmutablePropTypes.list,
  sorts: fromJS([{ field: "id", orderBy: "DESC" }]),
  filters: List(),
  pageNo: 1,
  rowsPerPage: 25,
  title: "",
  showRowCancelButton: true,
  showRowSaveButton: true,
  showRowDeleteButton: true,
  showSaveAllButton: true,
  showCancelAllButton: true,
  showDeleteAllButton: true,
  showAddNewButton: true,
  onFilterClick: noop,
  onRowEdit: noop,
  onCellClick: noop,
  onRowCancelClick: noop,
  onRowDeleteClick: noop,
  onRowSaveClick: noop,
  onSaveAllClick: noop,
  onCancelAllClick: noop,
  onDeleteAllClick: noop,
  onAddNewClick: noop,
  onCheckRowClick: noop,
  onCheckAllClick: noop,
  onDeleteConfirmClick: noop
};

export default DataList;
