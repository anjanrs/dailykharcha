import types from "./actionTypes.js";

function makeActionCreator(type, ...argNames) {
  argNames.push("listName");
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    action["namespace"] = "dataList";
    return action;
  };
}

// initializes the store with the filters,
// sorts when the list is first mounted
const initAction = makeActionCreator(types.LIST_INIT, "payload");
const initInProgressAction = makeActionCreator(types.LIST_INIT_IN_PROGRESS);
const initSuccessAction = makeActionCreator(types.LIST_INIT_SUCCESS, "payload");
const initFailedAction = makeActionCreator(types.LIST_INIT_FAILED);

// triggered by all the actions
// its a side effect that is triggered by
// various other actions like sort, page no click, filter etc.
const fetchDataAction = makeActionCreator(
  types.LIST_FETCH_DATA_REQUEST,
  "payload"
);

const fetchDataInProgressAction = makeActionCreator(
  types.LIST_FETCH_DATA_IN_PROGRESS
);

const fetchDataSuccessAction = makeActionCreator(
  types.LIST_FETCH_DATA_SUCCESS,
  "payload"
);

const fetchDataFailAction = makeActionCreator(
  types.LIST_FETCH_DATA_FAILED,
  "payload"
);

const changePageNoAction = makeActionCreator(
  types.LIST_CHANGE_PAGE_NUMBER,
  "payload"
);

// triggered when the items per page is changed
const changeRowsPerPageAction = makeActionCreator(
  types.LIST_CHANGE_ROWS_PER_PAGE,
  "payload"
);
const changeFilterAction = makeActionCreator(
  types.LIST_CHANGE_FILTER,
  "payload"
);

//triggerd when the list headers are clicked
const changeSortAction = makeActionCreator(types.LIST_CHANGE_SORT, "payload");

//triggered when the list field values are edited
const updateEditedRowsAction = makeActionCreator(
  types.LIST_UPDATE_EDITED_ROWS,
  "payload"
);

//triggers when need to save no. of rows
const saveRowsAction = makeActionCreator(types.LIST_SAVE_ROWS_INIT, "payload");
const saveRowsInProgressAction = makeActionCreator(
  types.LIST_SAVE_ROWS_IN_PROGRESS
);
const saveRowsSuccessAction = makeActionCreator(
  types.LIST_SAVE_ROWS_SUCCESS,
  "payload"
);
const saveRowsFailedAction = makeActionCreator(types.LIST_SAVE_ROWS_FAILED);

//triggers when need to delete no. of rows
const deleteRowsConfirmAction = makeActionCreator(
  types.LIST_DELETE_ROWS_CONFIRMED,
  "payload"
);
const deleteRowsInitiateAction = makeActionCreator(
  types.LIST_DELETE_ROWS_INIT,
  "payload"
);
const deleteRowsCancelAction = makeActionCreator(
  types.LIST_DELETE_ROWS_CANCELED
);
const deleteRowsInProgressAction = makeActionCreator(
  types.LIST_DELETE_ROWS_IN_PROGRESS
);
const deleteRowsSuccessAction = makeActionCreator(
  types.LIST_DELETE_ROWS_SUCCESS,
  "payload"
);
const deleteRowsFailedAction = makeActionCreator(types.LIST_DELETE_ROWS_FAILED);

const checkRowsAction = makeActionCreator(types.LIST_CHECK_ROWS, "payload");

const addNewRowsAction = makeActionCreator(types.LIST_ADD_NEW_ROW, "payload");

const validateItemsAction = makeActionCreator(types.LIST_VALIDATE, "payload");

const customizeAction = makeActionCreator(types.LIST_CUSTOMIZE, "payload");

export default {
  fetchDataAction,
  fetchDataInProgressAction,
  fetchDataSuccessAction,
  fetchDataFailAction,
  changePageNoAction,
  initAction,
  initInProgressAction,
  initSuccessAction,
  initFailedAction,
  changeSortAction,
  changeFilterAction,
  changeRowsPerPageAction,
  updateEditedRowsAction,
  saveRowsAction,
  saveRowsInProgressAction,
  saveRowsSuccessAction,
  saveRowsFailedAction,

  deleteRowsInitiateAction,
  deleteRowsConfirmAction,
  deleteRowsCancelAction,
  deleteRowsInProgressAction,
  deleteRowsSuccessAction,
  deleteRowsFailedAction,
  checkRowsAction,
  addNewRowsAction,
  customizeAction,
  validateItemsAction
};
