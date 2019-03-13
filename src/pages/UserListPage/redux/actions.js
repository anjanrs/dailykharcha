import types from "./actionTypes.js";

const showEditAccessAction = userId => {
  return {
    type: types.PAGE_USERLIST_SHOW_EDITACCESS,
    payload: userId
  };
};

const hideEditAccessAction = () => {
  return {
    type: types.PAGE_USERLIST_HIDE_EDITACCESS
  };
};

export default {
  showEditAccessAction,
  hideEditAccessAction
};
