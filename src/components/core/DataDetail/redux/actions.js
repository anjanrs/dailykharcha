import types from "./actionTypes.js";

function makeActionCreator(type, ...argNames) {
  argNames.push("detailName");
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    action["namespace"] = "dataDetail";
    return action;
  };
}

// initializes the store with the filters,
// sorts when the list is first mounted
const initAction = makeActionCreator(types.DETAIL_INIT, "payload");
const initInProgressAction = makeActionCreator(types.DETAIL_INIT_IN_PROGRESS);
const initSuccessAction = makeActionCreator(
  types.DETAIL_INIT_SUCCESS,
  "payload"
);
const initFailedAction = makeActionCreator(types.DETAIL_INIT_FAILED);

// triggered by all the actions
// its a side effect that is triggered by
// various other actions like sort, page no click, filter etc.
const fetchDataAction = makeActionCreator(
  types.DETAIL_FETCH_DATA_REQUEST,
  "payload"
);

const fetchDataInProgressAction = makeActionCreator(
  types.DETAIL_FETCH_DATA_IN_PROGRESS
);

const fetchDataSuccessAction = makeActionCreator(
  types.DETAIL_FETCH_DATA_SUCCESS,
  "payload"
);

const fetchDataFailAction = makeActionCreator(
  types.DETAIL_FETCH_DATA_FAILED,
  "payload"
);

//triggered when the list field values are edited
const updateEditedDataAction = makeActionCreator(
  types.DETAIL_UPDATE_EDITED_DATA,
  "payload"
);

//triggers when need to save no. of rows
const saveAction = makeActionCreator(types.DETAIL_SAVE_INIT, "payload");
const saveInProgressAction = makeActionCreator(types.DETAIL_SAVE_IN_PROGRESS);
const saveSuccessAction = makeActionCreator(
  types.DETAIL_SAVE_SUCCESS,
  "payload"
);
const saveFailedAction = makeActionCreator(types.DETAIL_SAVE_FAILED);

//triggers when need to delete no. of rows
const deleteConfirmAction = makeActionCreator(
  types.DETAIL_DELETE_CONFIRMED,
  "payload"
);
const deleteInitiateAction = makeActionCreator(
  types.DETAIL_DELETE_INIT,
  "payload"
);
const deleteCancelAction = makeActionCreator(types.DETAIL_DELETE_CANCELED);
const deleteInProgressAction = makeActionCreator(
  types.DETAIL_DELETE_IN_PROGRESS
);
const deleteSuccessAction = makeActionCreator(
  types.DETAIL_DELETE_SUCCESS,
  "payload"
);
const deleteFailedAction = makeActionCreator(types.DETAIL_DELETE_FAILED);

const addNewAction = makeActionCreator(types.DETAIL_ADD_NEW, "payload");

const validateItemsAction = makeActionCreator(types.DETAIL_VALIDATE, "payload");

const customizeAction = makeActionCreator(types.DETAIL_CUSTOMIZE, "payload");
const updateRedirectURLAction = makeActionCreator(
  types.DETAIL_UPDATE_REDIRECT_URL,
  "payload"
);
export default {
  fetchDataAction,
  fetchDataInProgressAction,
  fetchDataSuccessAction,
  fetchDataFailAction,
  initAction,
  initInProgressAction,
  initSuccessAction,
  initFailedAction,
  updateEditedDataAction,
  saveAction,
  saveInProgressAction,
  saveSuccessAction,
  saveFailedAction,

  deleteInitiateAction,
  deleteConfirmAction,
  deleteCancelAction,
  deleteInProgressAction,
  deleteSuccessAction,
  deleteFailedAction,

  addNewAction,
  customizeAction,
  validateItemsAction,
  updateRedirectURLAction
};
