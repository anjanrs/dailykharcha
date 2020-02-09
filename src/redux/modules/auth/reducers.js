import types from "./types.js";
import { fromJS } from "immutable";

const INITAIAL_STATE = fromJS({
  authenticated: localStorage.getItem("token"),
  errorMessage: "",
  processing: false,
  permissions: null,
  menuitems: []
});

export default function(state = INITAIAL_STATE, action) {
  
  state = state.set("processing", false);
  state = state.set("errorMessage", "");
  switch (action.type) {
    case types.LOGIN_IN_PROGRESS:
      state = state.set("authenticated", false);
      state = state.set("processing", true);
      break;
    case types.LOGIN_SUCCESS:
      state = state.set("authenticated", true);
      break;
    case types.LOGIN_FAILED:
      state = state.set("authenticated", false);
      state = state.set("errorMessage", "Login Failed");
      break;
    case types.LOGOUT_SUCCESS:
      state = state.set("authenticated", false);
      state = state.set("errorMessage", "");
      break;
    case types.FETCH_CURRENT_USER_PERMISSIONS_SUCCESS:
      //check the permissions returned from api
      //and set the state permissions accordingly
      const retrivedPermissions = action.payload;
      const permissions = {
        read: retrivedPermissions.some(
          permission => permission.get("type") === "READ"
        ),
        edit: retrivedPermissions.some(
          permission => permission.get("type") === "EDIT"
        ),
        add: retrivedPermissions.some(
          permission => permission.get("type") === "ADD"
        ),
        delete: retrivedPermissions.some(
          permission => permission.get("type") === "DELETE"
        )
      };
      state = state.set("permissions", fromJS(permissions));
      break;
    case types.FETCH_CURRENT_USER_MENUITEMS_SUCCESS:
      const logoutMenu = fromJS({
        id: "1000",
        label: "Log Out",
        parentId: "0",
        path: "/logout"
      });
      let menuitems = action.payload;
      // menuitems = menuitems.push(logoutMenu);
      state = state.set("menuitems", menuitems);

      break;
    default:
      break;
  }
  return state;
}
