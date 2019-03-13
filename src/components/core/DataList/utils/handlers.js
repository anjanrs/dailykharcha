import { noop } from "lodash";
import { Map, List, fromJS } from "immutable";
import { validateItems } from "../../../../utils/dataValidation";

export const handleRowsPerPageChange = ({
  datalistState,
  changeRowsPerPageAction,
  name
}) => newRowsPerPage => {
  let newListState = datalistState.set("pageNo", 1);
  newListState = newListState.set("rowsPerPage", newRowsPerPage);
  changeRowsPerPageAction(newListState, name);
};

export const handlePageChange = ({
  datalistState,
  changePageNoAction,
  name
}) => newPageNo => {
  let newListState = datalistState.set("pageNo", newPageNo);
  changePageNoAction(newListState, name);
};

export const handleSort = ({ datalistState, changeSortAction, name }) => (
  newField,
  newOrder
) => {
  let newListState = datalistState.set(
    "sorts",
    fromJS([{ field: newField, orderBy: newOrder }])
  );
  changeSortAction(newListState, name);
};

export const handleFilter = props => newFilter => {
  if (props.onFilterClick === noop) {
    handleFilterDefault(props)(newFilter);
  } else {
    props.onFilterClick(props)(newFilter);
  }
};

export const handleFilterDefault = ({
  datalistState,
  changeFilterAction,
  name
}) => newFilters => {
  let newListState = datalistState.set("filters", newFilters);
  newListState = newListState.set("pageNo", 1);
  changeFilterAction(newListState, name);
};

export const handleRowEdit = props => editedRowItem => {
  if (props.onRowEdit === noop) {
    handleRowEditDefault(props)(editedRowItem);
  } else {
    props.onRowEdit(props)(editedRowItem);
  }
};

export const handleRowEditDefault = ({
  primaryField,
  datalistState,
  updateEditedRowsAction,
  name
}) => editedRowItem => {
  let editedRows = datalistState.get("editedRows");
  editedRows = editedRows.map(editedRow => {
    if (editedRow.get(primaryField) === editedRowItem.get(primaryField)) {
      return editedRowItem;
    } else {
      return editedRow;
    }
  });
  let existingEditedRow = editedRows.find(editedRow => {
    return editedRow.get(primaryField) === editedRowItem.get(primaryField);
  });
  if (!existingEditedRow) {
    editedRows = editedRows.push(editedRowItem);
  }
  let newListState = datalistState.set("editedRows", editedRows);
  updateEditedRowsAction(newListState, name);
};

export const handleCellClick = props => (item, column, editMode) => {
  if (props.onCellClick === noop) {
    handleCellClickDefault(props)(item, column, editMode);
  } else {
    props.onCellClick(props)(item, column);
  }
};

export const handleCellClickDefault = props => (item, column, editMode) => {
  if (column.get("type") === "editable" && !editMode) {
    handleRowEditDefault(props)(item);
  }
};
export const handleRowCancel = props => cancelRowItem => {
  if (props.onRowCancelClick === noop) {
    handleRowCancelDefault(props)(cancelRowItem);
  } else {
    props.onRowCancelClick(props)(cancelRowItem);
  }
};

export const handleRowCancelDefault = ({
  primaryField,
  datalistState,
  updateEditedRowsAction,
  name
}) => cancelRowItem => {
  const cancelRowId = cancelRowItem.get(primaryField).toString();
  let editedRows = datalistState.get("editedRows");

  //remove canceled row from the editedRows
  editedRows = editedRows.filter(editedRow => {
    return editedRow.get(primaryField) !== cancelRowItem.get(primaryField);
  });
  //update the editedRows
  let newListState = datalistState.set("editedRows", editedRows);

  //remove canceled row from the fetched row if its a new row
  if (cancelRowId.indexOf("new") > -1) {
    let fetchedRows = datalistState.getIn(["results", "data"]);
    fetchedRows = fetchedRows.filter(fetchedRow => {
      return fetchedRow.get(primaryField) !== cancelRowItem.get(primaryField);
    });
    newListState = newListState.setIn(["results", "data"], fetchedRows);
  }
  let validations = newListState.get("validations");
  validations = validations.delete(cancelRowId);
  newListState = newListState.set("validations", validations);
  updateEditedRowsAction(newListState, name);
};

export const handleRowDelete = props => deleteRowItem => {
  if (props.onRowDeleteClick === noop) {
    handleRowDeleteDefault(props)(deleteRowItem);
  } else {
    props.onRowDeleteClick(props)(deleteRowItem);
  }
};

export const handleRowDeleteDefault = ({
  datalistState,
  deleteRowsAction,
  deleteRowsInitiateAction,
  name
}) => deleteRowItem => {
  const { id } = deleteRowItem.toJS();
  const toDeleteIds = fromJS([id]);
  deleteRowsInitiateAction(toDeleteIds, name);
};

export const handleRowSave = props => editedRowItem => {
  if (props.onRowSaveClick === noop) {
    handleRowSaveDefault(props)(editedRowItem);
  } else {
    props.onRowSaveClick(props)(editedRowItem);
  }
};

export const handleRowSaveDefault = ({
  datalistState,
  saveRowsAction,
  validateItemsAction,
  columns,
  name
}) => editedRowItem => {
  let toSaveItems = [];
  const editedRows = [editedRowItem.toJS()];
  const validations = validateItems(editedRows, columns.toJS());

  //update validation state
  validateItemsAction(fromJS(validations), name);

  //check if item ok to save
  for (let objItem of editedRows) {
    if (validations[objItem["id"]]["valid"]) {
      toSaveItems.push(objItem);
    }
  }

  if (toSaveItems.length > 0) {
    const args = fromJS({
      toSaveItems: toSaveItems,
      columns: columns.toJS(),
      endpoints: datalistState.get("endpoints").toJS()
    });
    saveRowsAction(args, name);
  }
};

export const handleSaveAll = props => event => {
  if (props.onSaveAllClick === noop) {
    handleSaveAllDefult(props)(event);
  } else {
    props.onSaveAllClick(props)(event);
  }
};

export const handleSaveAllDefult = ({
  datalistState,
  saveRowsAction,
  validateItemsAction,
  columns,
  name
}) => event => {
  let toSaveItems = [];
  const editedRows = datalistState.get("editedRows").toJS();
  const validations = validateItems(editedRows, columns.toJS());

  //update validation state
  validateItemsAction(fromJS(validations), name);

  //check if item ok to save
  for (let objItem of editedRows) {
    if (validations[objItem["id"]]["valid"]) {
      toSaveItems.push(objItem);
    }
  }

  if (toSaveItems.length > 0) {
    const args = fromJS({
      toSaveItems: toSaveItems,
      columns: columns.toJS(),
      endpoints: datalistState.get("endpoints").toJS()
    });
    saveRowsAction(args, name);
  }
};

export const handleCancelAll = props => event => {
  if (props.onCancelAllClick === noop) {
    handleCancelAllDefault(props)(event);
  } else {
    props.onCancelAllClick(props)(event);
  }
};

export const handleCancelAllDefault = ({
  datalistState,
  updateEditedRowsAction,
  name
}) => event => {
  let fetchedRows = datalistState.getIn(["results", "data"]);
  fetchedRows = fetchedRows.filter(fetchedRow => {
    return (
      fetchedRow
        .get("id")
        .toString()
        .indexOf("new") < 0
    );
  });
  //update the editedRows
  let newListState = datalistState.set("editedRows", List());
  newListState = newListState.setIn(["results", "data"], fetchedRows);
  newListState = newListState.set("validations", Map());
  updateEditedRowsAction(newListState, name);
};

export const handleCheckRow = props => (checked, rowId) => {
  if (props.onCheckRowClick === noop) {
    handleCheckRowDefault(props)(checked, rowId);
  } else {
    props.onCheckRowClick(props)(checked, rowId);
  }
};

export const handleCheckRowDefault = ({
  datalistState,
  checkRowsAction,
  name
}) => (checked, rowId) => {
  let checkedRows = datalistState.get("checkedRows");
  checkedRows = checkedRows.filter(checkedRowId => {
    return checkedRowId !== rowId;
  });
  if (checked) {
    checkedRows = checkedRows.push(rowId);
  }
  checkRowsAction(checkedRows, name);
};

export const handleCheckAllRows = props => newValues => {
  if (props.onCheckAllClick === noop) {
    handleCheckAllRowsDefault(props)(newValues);
  } else {
    props.onCheckAllClick(props)(newValues);
  }
};

export const handleCheckAllRowsDefault = ({
  datalistState,
  checkRowsAction,
  name
}) => newValues => {
  const checked = newValues.length ? true : false;
  let checkedRows = List();

  if (checked) {
    let items = datalistState.getIn(["results", "data"]);
    items.map(item => {
      checkedRows = checkedRows.push(item.get("id").toString());
      return item;
    });
  }
  checkRowsAction(checkedRows, name);
};

export const handleDeleteAll = props => event => {
  if (props.onDeleteAllClick === noop) {
    handleDeleteAllDefault(props)(event);
  } else {
    props.onDeleteAllClick(props)(event);
  }
};

export const handleDeleteAllDefault = ({
  datalistState,
  deleteRowsInitiateAction,
  name
}) => event => {
  const toDeleteIds = datalistState.get("checkedRows");
  if (toDeleteIds.size > 0) {
    deleteRowsInitiateAction(toDeleteIds, name);
  }
};

export const handleConfirmDelete = props => event => {
  if (props.onDeleteConfirmClick === noop) {
    handleConfirmDeleteDefault(props)(event);
  } else {
    props.onDeleteConfirmClick(props)(event);
  }
};

export const handleConfirmDeleteDefault = ({
  datalistState,
  deleteRowsConfirmAction,
  name
}) => event => {
  const toDeleteIds = datalistState.get("toDeleteIds").toJS();
  const args = fromJS({
    toDeleteIds: toDeleteIds,
    endpoints: datalistState.get("endpoints").toJS()
  });
  deleteRowsConfirmAction(args, name);
};

export const handleCancelDelete = ({
  deleteRowsCancelAction,
  name
}) => event => {
  deleteRowsCancelAction(name);
};

export const handleAddNew = props => event => {
  if (props.onAddNewClick === noop) {
    handleAddNewDefault(props)(event);
  } else {
    props.onAddNewClick(props)(event);
  }
};

export const handleAddNewDefault = ({
  columns,
  name,
  primaryField,
  addNewRowsAction
}) => event => {
  let newRowItem = Map();
  for (let column of columns) {
    if (column.get("type") && column.get("type") === "edit") {
      newRowItem = newRowItem.set(
        column.get("field"),
        column.getIn(["editControl", "defaultValue"])
      );
    }
  }
  newRowItem = newRowItem.set(primaryField, "new-" + Date.now().toString());
  addNewRowsAction(newRowItem, name);
};
