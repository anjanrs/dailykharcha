import { Map } from "immutable";
import { DATADETAIL_STATE_TEMPLATE } from "./reducers";

const getDetailState = (state, detailName, fields) => {
  let dataDetailState = state.get(detailName);
  if (dataDetailState) return dataDetailState;
  return getInitState(fields);
};
const getInitState = fields => {
  let initData = getNewItemState(fields);
  let initDetailState = DATADETAIL_STATE_TEMPLATE.set("data", initData);
  initDetailState = initDetailState.set("editedData", initData);
  return initDetailState;
};

const getNewItemState = fields => {
  let initData = Map();
  for (let detailField of fields) {
    initData = initData.set(detailField.get("field"), "");
  }
  initData = initData.set("id", "0");
  return initData;
};

export default {
  getInitState,
  getDetailState,
  getNewItemState
};
