import types from "./actionTypes.js";
import { fromJS } from "immutable";

export const PAGE_USERLIST_STATE_TEMPLATE = fromJS({
  showEditAccess: false,
  userId: "0"
});

export default function(state = PAGE_USERLIST_STATE_TEMPLATE, action) {
  switch (action.type) {
    case types.PAGE_USERLIST_SHOW_EDITACCESS:
      state = state.set("showEditAccess", true);
      state = state.set("userId", action.payload);
      return state;
    case types.PAGE_USERLIST_HIDE_EDITACCESS:
      return state.set("showEditAccess", false);
    default:
      break;
  }
  return state;
}
