import types from "./actionTypes.js";
import { fromJS } from "immutable";

export const PAGE_USERGROUPLIST_STATE_TEMPLATE = fromJS({
  showEditAccess: false,
  userId: "0"
});

export default function(state = PAGE_USERGROUPLIST_STATE_TEMPLATE, action) {
  switch (action.type) {
    case types.PAGE_USERGROUPLIST_SHOW_EDITACCESS:
      state = state.set("showEditAccess", true);
      state = state.set("userGroupId", action.payload);
      return state;
    case types.PAGE_USERGROUPLIST_HIDE_EDITACCESS:
      return state.set("showEditAccess", false);
    default:
      break;
  }
  return state;
}
