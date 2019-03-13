import { combineReducers } from "redux";
import auth from "./modules/auth";
import { reducer as formReducer } from "redux-form";
import datalistReducer from "../components/core/DataList/redux";
import datadetaltReducer from "../components/core/DataDetail/redux";
import userlistPageReducer from "../pages/UserListPage/redux";
import userGroupListPageReducer from "../pages/UserGroupListPage/redux";

const rootReducer = combineReducers({
  auth,
  form: formReducer,
  dataLists: datalistReducer,
  dataDetails: datadetaltReducer,
  userlistPage: userlistPageReducer,
  userGroupListPage: userGroupListPageReducer
});

export default rootReducer;
