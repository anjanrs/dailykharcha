import types from "./actionTypes.js";
import { fromJS, Map } from "immutable";

//change store to immutable js
const INITIAL_STATE = Map();
export const DATADETAIL_STATE_TEMPLATE = fromJS({
  id: "0",
  loading: false,
  fields: [],
  data: {},
  editedData: {},
  validations: {},
  endpoints: {},
  showConfirmDelete: false,
  redirectURL: "",
  filters: []
});

export default function(state = INITIAL_STATE, action) {
  //only handle the action that belong to dataDetail
  if (action.namespace && action.namespace === "dataDetail") {
    let dataDetailState = state.get(action.detailName);
    //initilize detail state if its not yet set
    if (!dataDetailState) {
      dataDetailState = DATADETAIL_STATE_TEMPLATE;
    }
    return state.set(
      action.detailName,
      dataDetailReducer(dataDetailState, action)
    );
  } else {
    return state;
  }
}

const dataDetailReducer = function(state = DATADETAIL_STATE_TEMPLATE, action) {
  switch (action.type) {
    case types.DETAIL_INIT:
      // state = state.set("loading", true);
      // state = state.set("endpoints", action.payload.get("endpoints"));
      // state = state.set("fields", action.payload.get("fields"));
      // state = state.set("data", action.payload.get("data"));
      // state = state.set("editedData", action.payload.get("editedData"));
      state = action.payload;
      break;
    case types.DETAIL_INIT_FAILED:
      state = state.set("loading", false);
      break;
    case types.DETAIL_INIT_SUCCESS:
      state = state.set("loading", false);
      break;
    case types.DETAIL_FETCH_DATA_IN_PROGRESS:
      state = state.set("loading", true);
      break;
    case types.DETAIL_FETCH_DATA_SUCCESS:
      const data = action.payload.getIn(["results", "data"]).first();

      state = state.set("data", data);
      state = state.set("editedData", data);
      state = state.set("loading", false);
      break;

    case types.DETAIL_FETCH_DATA_FAILED:
      state = state.set("loading", false);
      break;

    case types.DETAIL_UPDATE_EDITED_DATA:
      //validations reset when cancel button clicked
      state = state.set("validations", action.payload.get("validations"));
      state = state.set("editedData", action.payload.get("editedData"));
      break;
    case types.DETAIL_SAVE_IN_PROGRESS:
      state = state.set("loading", true);
      break;
    case types.DETAIL_SAVE_SUCCESS:
      const savedDetail = action.payload.get("savedDetail");
      const afterSaveURL = action.payload.get("redirectURL");
      state = state.set("data", savedDetail);
      state = state.set("editedData", savedDetail);
      state = state.set("id", savedDetail.get("id"));
      state = state.set("redirectURL", afterSaveURL);
      state = state.set("loading", false);
      break;
    case types.DETAIL_SAVE_FAILED:
      state = state.set("loading", false);
      break;
    case types.DETAIL_DELETE_INIT:
      state = state.set("showConfirmDelete", true);
      break;
    case types.DETAIL_DELETE_CANCELED:
      state = state.set("showConfirmDelete", false);
      break;
    case types.DETAIL_DELETE_CONFIRMED:
      state = state.set("showConfirmDelete", false);
      break;
    case types.DETAIL_DELETE_IN_PROGRESS:
      state = state.set("loading", true);

      break;
    case types.DETAIL_DELETE_SUCCESS:
      //remove all validatin error after successfull delete if there is any
      const newItem = action.payload.get("newItem");
      const afterDeleteURL = action.payload.get("redirectURL");
      state = state.set("id", "0");
      state = state.set("data", newItem);
      state = state.set("editedData", newItem);
      state = state.set("redirectURL", afterDeleteURL);
      state = state.set("loading", false);
      break;
    case types.DETAIL_ADD_NEW_ROW:
      state = state.set("data", action.payload);
      state = state.set("editedData", action.payload);
      break;
    case types.DETAIL_VALIDATE:
      state = state.set("validations", action.payload);
      break;
    case types.DETAIL_CUSTOMIZE:
      state = action.payload;
      break;
    case types.DETAIL_UPDATE_REDIRECT_URL:
      state = state.set("redirectURL", action.payload);
      break;
    default:
      break;
  }
  return state;
};
