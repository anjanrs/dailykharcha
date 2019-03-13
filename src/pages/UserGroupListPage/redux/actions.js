import types from "./actionTypes.js";

const showEditAccessAction = userGroupId => {
  return {
    type: types.PAGE_USERGROUPLIST_SHOW_EDITACCESS,
    payload: userGroupId
  };
};

const hideEditAccessAction = () => {
  return {
    type: types.PAGE_USERGROUPLIST_HIDE_EDITACCESS
  };
};

export default {
  showEditAccessAction,
  hideEditAccessAction
};
