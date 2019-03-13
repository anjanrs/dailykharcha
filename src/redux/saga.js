import { all } from "redux-saga/effects";
import { authSaga } from "./modules/auth";
import { datalistSaga } from "../components/core/DataList/redux";
import { datadetailSaga } from "../components/core/DataDetail/redux";

function* rootSaga() {
  yield all([authSaga(), datalistSaga(), datadetailSaga()]);
}

export default rootSaga;
