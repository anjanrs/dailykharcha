import _ from "lodash";
import { DATALIST_STATE_TEMPLATE } from "./reducers";

const getListState = (state, listName) => {
  const dataListState = state.get(listName);
  if (dataListState) return dataListState;
  return DATALIST_STATE_TEMPLATE;
};
const getInitListState = () => {
  return DATALIST_STATE_TEMPLATE;
};
const islistEditMode = state => {
  if (state.get("editedRows").size > 0) {
    return true;
  } else {
    return false;
  }
};

const isAllRowsChecked = state => {
  let allCheckedItemsIds = state.get("checkedRows");
  allCheckedItemsIds = allCheckedItemsIds.toJS();
  let allItems = state.getIn(["results", "data"]);
  allItems = allItems.toJS();
  let isEqual = true;
  _.map(allItems, item => {
    if (isEqual) {
      isEqual =
        _.indexOf(allCheckedItemsIds, item.id.toString()) > -1 ? true : false;
    }
    return item.id;
  });
  return isEqual;
};

export default {
  islistEditMode,
  isAllRowsChecked,
  getListState,
  getInitListState
};
