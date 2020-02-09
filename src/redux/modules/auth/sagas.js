import { call, put, takeLatest } from "redux-saga/effects";
import types from "./types.js";
import api from "../../../utils/api";
import { fromJS } from "immutable";
import browserHistory from "../../../browserHistory";

// worker Saga: will be fired on LOGIN_REQUEST actions
function* loginRequest(action) {
  yield put({ type: types.LOGIN_IN_PROGRESS });
  try {
    const res = yield call(api.post, {
      params: action.payload,
      endpoint: "signin"
    });
    // localStorage.setItem("token", res.token);
    yield put({ type: types.LOGIN_SUCCESS, payload: { data: res } });
    browserHistory.push("/dashboard");
  } catch (e) {
    yield put({ type: types.LOGIN_FAILED, payload: { error: e } });
  }
}

function* logoutRequest(action) {
  // localStorage.removeItem("token");
  const res = yield call(api.post, {
    params: action.payload,
    endpoint: "signout"
  });
  yield put({ type: types.LOGOUT_SUCCESS });
}

// worker Saga: will be fired on LOGIN_SUCCESS Actions
function* fetchCurrentUserPermissions(action) {
  yield put({ type: types.FETCH_CURRENT_USER_PERMISSIONS_IN_PROGRESS });
  try {
    const res = yield call(api.post, {
      params: {},
      endpoint: "getUserPermissions"
    });

    yield put({
      type: types.FETCH_CURRENT_USER_PERMISSIONS_SUCCESS,
      payload: fromJS(res.results)
    });
  } catch (e) {
    yield put({
      type: types.FETCH_CURRENT_USER_PERMISSIONS_FAILED,
      payload: { error: e }
    });
  }
}

// worker Saga: will be fired on LOGIN_SUCCESS Actions
function* fetchCurrentUserMenuitems(action) {
  yield put({ type: types.FETCH_CURRENT_USER_MENUITEMS_IN_PROGRESS });
  try {
    const res = yield call(api.post, {
      params: {},
      endpoint: "getUserMenuitems"
    });

    yield put({
      type: types.FETCH_CURRENT_USER_MENUITEMS_SUCCESS,
      payload: fromJS(res.results)
    });
  } catch (e) {
    yield put({
      type: types.FETCH_CURRENT_USER_MENUITEMS_FAILED,
      payload: { error: e }
    });
  }
}

export default function* authSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginRequest);
  yield takeLatest(types.LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(
    types.FETCH_CURRENT_USER_PERMISSIONS_INIT,
    fetchCurrentUserPermissions
  );
  yield takeLatest(
    types.FETCH_CURRENT_USER_MENUITEMS_INIT,
    fetchCurrentUserMenuitems
  );
}
