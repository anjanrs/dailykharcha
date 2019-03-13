import types from "./actionTypes.js";
import { fromJS, List, Map } from "immutable";

//change store to immutable js
const INITIAL_STATE = Map();
export const DATALIST_STATE_TEMPLATE = fromJS({
  loading: true,
  filters: [],
  sorts: [],
  pageNo: 1,
  columns: [],
  rowsPerPage: 25,
  results: {
    count: 0,
    data: []
  },
  editedRows: [],
  newRows: [],
  checkedRows: [],
  toDeleteRows: [],
  validations: {},
  endpoints: {},
  showConfirmDelete: false
});

export default function(state = INITIAL_STATE, action) {
  //only handle the action that belong to datalist
  if (action.namespace && action.namespace === "dataList") {
    let dataListState = state.get(action.listName);
    //initilize list state if its not yet set
    if (!dataListState) {
      dataListState = DATALIST_STATE_TEMPLATE;
    }
    return state.set(action.listName, dataListReducer(dataListState, action));
  } else {
    return state;
  }
}

const dataListReducer = function(state = DATALIST_STATE_TEMPLATE, action) {
  const editedRows = state.get("editedRows");
  const fetchedRows = state.getIn(["results", "data"]);
  const checkedRows = state.get("checkedRows");
  let validations = state.get("validations");
  let updatedFetchedRows = List();
  let newEditedRows = List();
  let newCheckedRows = List();

  switch (action.type) {
    case types.LIST_INIT:
      state = action.payload;

      let filters = state.get("filters");
      filters = filters.map(filter => {
        return filter.set("resetValue", filter.get("value"));
      });

      let columns = state.get("columns");
      columns = columns.map(column => {
        //set column type default to "label"
        if (!column.get("type")) {
          column = column.set("type", "label");
        }
        //set column type to editable if it has editControl
        if (column.get("editControl")) {
          column = column.set("type", "editable");
        }
        return column;
      });

      state = state.set("filters", filters);
      state = state.set("columns", columns);
      break;
    case types.LIST_INIT_FAILED:
      state = state.set("loading", false);
      break;
    case types.LIST_FETCH_DATA_IN_PROGRESS:
      state = state.set("loading", true);
      break;
    case types.LIST_FETCH_DATA_SUCCESS:
      state = state.set("results", action.payload.get("results"));
      state = state.set("loading", false);
      break;
    case types.LIST_FETCH_DATA_FAILED:
      state = state.set("loading", false);
      break;
    case types.LIST_CHANGE_PAGE_NUMBER:
      state = state.set("pageNo", action.payload.get("pageNo"));
      break;
    case types.LIST_CHANGE_ROWS_PER_PAGE:
      state = state.set("pageNo", action.payload.get("pageNo"));
      state = state.set("rowsPerPage", action.payload.get("rowsPerPage"));
      break;
    case types.LIST_CHANGE_SORT:
      state = state.set("sorts", action.payload.get("sorts"));
      break;
    case types.LIST_CHANGE_FILTER:
      state = state.set("filters", action.payload.get("filters"));
      state = state.set("pageNo", action.payload.get("pageNo"));
      break;
    case types.LIST_UPDATE_EDITED_ROWS:
      state = state.set("validations", action.payload.get("validations"));
      state = state.set("editedRows", action.payload.get("editedRows"));
      //remove the canceled new row
      state = state.setIn(
        ["results", "data"],
        action.payload.getIn(["results", "data"])
      );
      break;
    case types.LIST_SAVE_ROWS_IN_PROGRESS:
      state = state.set("loading", true);
      break;
    case types.LIST_SAVE_ROWS_SUCCESS:
      //update the fetched data with updated row field values
      //TODO: savedRows should only have the columns that need to be updated,
      // we need this so backend api only updates those columns that need to be updated
      const savedRows = action.payload;
      updatedFetchedRows = fetchedRows.map(fetchedRow => {
        const savedRow = savedRows.find(rowItem => {
          return (
            rowItem.get("id") === fetchedRow.get("id") ||
            rowItem.get("orgId") === fetchedRow.get("id")
          );
        });

        if (savedRow) {
          return savedRow;
        } else {
          return fetchedRow;
        }
      });

      //remove updated rows from edited rows
      newEditedRows = editedRows.filter(editedRow => {
        const savedRow = savedRows.find(rowItem => {
          return (
            rowItem.get("id") === editedRow.get("id") ||
            rowItem.get("orgId") === editedRow.get("id")
          );
        });
        if (savedRow) {
          return false;
        } else {
          return true;
        }
      });

      state = state.setIn(["results", "data"], updatedFetchedRows);
      state = state.set("editedRows", newEditedRows);
      state = state.set("loading", false);
      break;
    case types.LIST_SAVE_ROWS_FAILED:
      state = state.set("loading", false);
      break;
    case types.LIST_DELETE_ROWS_INIT:
      state = state.set("toDeleteIds", action.payload);
      state = state.set("showConfirmDelete", true);
      break;
    case types.LIST_DELETE_ROWS_CANCELED:
      state = state.set("toDeleteIds", List());
      state = state.set("showConfirmDelete", false);
      break;
    case types.LIST_DELETE_ROWS_CONFIRMED:
      state = state.set("showConfirmDelete", false);
      break;
    case types.LIST_DELETE_ROWS_IN_PROGRESS:
      state = state.set("loading", true);

      break;
    case types.LIST_DELETE_ROWS_SUCCESS:
      //remove the deleted rows from fetched rows
      //TODO: deletedRows can only be ids
      const deletedRowIds = action.payload;
      updatedFetchedRows = fetchedRows.filter(fetchedRow => {
        const deltedRow = deletedRowIds.find(id => {
          return id.toString() === fetchedRow.get("id").toString();
        });

        if (deltedRow) {
          return false;
        } else {
          return true;
        }
      });

      //remove updated rows from edited rows
      newEditedRows = editedRows.filter(editedRow => {
        const deltedRow = deletedRowIds.find(id => {
          return id.toString() === editedRow.get("id").toString();
        });
        if (deltedRow) {
          return false;
        } else {
          return true;
        }
      });

      //remove updated rows from edited rows
      newCheckedRows = checkedRows.filter(checkedRowId => {
        const deltedRow = deletedRowIds.find(id => {
          return id.toString() === checkedRowId.toString();
        });
        if (deltedRow) {
          return false;
        } else {
          return true;
        }
      });

      for (let deletedRowId of deletedRowIds) {
        validations = validations.delete(deletedRowId.toString());
      }

      state = state.set("validations", validations);
      state = state.setIn(["results", "data"], updatedFetchedRows);
      state = state.set("editedRows", newEditedRows);
      state = state.set("checkedRows", newCheckedRows);
      state = state.set("toDeleteIds", List());
      state = state.set("loading", false);

      break;
    case types.LIST_DELETE_ROWS_FAILED:
      state = state.set("loading", false);
      break;
    case types.LIST_CHECK_ROWS:
      state = state.set("checkedRows", action.payload);
      break;
    case types.LIST_ADD_NEW_ROW:
      updatedFetchedRows = state
        .getIn(["results", "data"])
        .unshift(action.payload);
      newEditedRows = state.get("editedRows").push(action.payload);
      state = state.setIn(["results", "data"], updatedFetchedRows);
      state = state.set("editedRows", newEditedRows);
      // state = state.set("newRows", action.payload);
      break;
    case types.LIST_VALIDATE:
      const newValidation = action.payload;
      newValidation.map((value, key) => {
        validations = validations.set(key, newValidation.get(key));
      });
      state = state.set("validations", validations);
      break;
    case types.LIST_CUSTOMIZE:
      return action.payload;

    default:
      break;
  }
  return state;
};
