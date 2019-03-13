import types from "./types.js";

const loginAction = ({ email, password }) => {
  return {
    type: types.LOGIN_REQUEST,
    payload: { email, password }
  };
};

const logoutAction = () => {
  return {
    type: types.LOGOUT_REQUEST
  };
};

const fetchPermissions = () => {
  return {
    type: types.FETCH_CURRENT_USER_PERMISSIONS_INIT
  };
};

const fetchMenuitems = () => {
  return {
    type: types.FETCH_CURRENT_USER_MENUITEMS_INIT
  };
};

export default {
  loginAction,
  logoutAction,
  fetchPermissions,
  fetchMenuitems
};

//
// // actions.js
// import { createActions } from 'reduxsauce';
//
// const { Creators, Types } = createActions({
//   increment: ['value'],
//   decrement: ['value'],
//   requestSubredditJson: ['subreddit'],
//   receiveSubredditJson: ['subredditData']
// });
//
