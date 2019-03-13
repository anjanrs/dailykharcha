import { call, put, takeEvery } from "redux-saga/effects";
import { Map, fromJS } from "immutable";
import types from "./actionTypes.js";
import datadetailActions from "./actions";
import api from "../../../../utils/api";
import { toast } from "react-toastify";
import datadetailSelectors from "./selectors";
// worker Saga: will be fired on LOGIN_REQUEST actions
function* fetchData(action) {
  let payload = action.payload.toJS();

  yield put(datadetailActions.fetchDataInProgressAction(action.detailName));

  try {
    if (payload.id === "0") {
      const newItem = datadetailSelectors.getNewItemState();
      yield put(
        datadetailActions.fetchDataSuccessAction(newItem, action.detailName)
      );
    } else {
      // payload["filters"] = payload["filters"]
      //   ? payload["filters"]
      //   : [{ field: "id", operator: "=", value: payload.id }];

      const res = yield call(api.post, {
        params: payload,
        endpoint: payload.endpoints.fetch
      });
      yield put(
        datadetailActions.fetchDataSuccessAction(fromJS(res), action.detailName)
      );
    }
  } catch (e) {
    yield put(
      datadetailActions.fetchDataFailAction(
        fromJS({ error: e }),
        action.detailName
      )
    );
  }
}

//workder saga: will be fired on list init
function* initDetail(action) {
  yield put(datadetailActions.initInProgressAction(action.detailName));
  try {
    yield call(fetchData, action);
    // (datadetailActions.fetchDataAction(action.payload, action.detailName));
    yield put(
      datadetailActions.initSuccessAction(action.payload, action.detailName)
    );
  } catch (e) {
    yield put(datadetailActions.initFailedAction(action.detailName));
  }
}

function* saveDetail(action) {
  yield put(datadetailActions.saveInProgressAction(action.detailName));
  try {
    let itemsForSaveApi = [];
    const fields = action.payload
      .get("fields")
      .map(dataField => dataField.get("field"));
    const toSaveItem = action.payload.get("toSaveItem");
    const afterSaveURL = action.payload.get("afterSaveURL");
    // const afterSaveNewURL = action.payload.get("afterSaveNewURL");
    const toSaveItems = [toSaveItem];
    const saveEndpoint = action.payload.getIn(["endpoints", "save"]);
    //for  save only send the items  fields that are defined in fields
    for (let item of toSaveItems) {
      let saveApiItem = {};
      for (let field of fields) {
        if (item.get(field) !== null && item.get(field) !== undefined) {
          saveApiItem[field] = item.get(field);
        }
      }
      itemsForSaveApi.push(saveApiItem);
    }

    //call save api
    const ret = yield call(api.post, {
      params: itemsForSaveApi,
      endpoint: saveEndpoint
    });

    let savedItems = ret.results ? fromJS(ret.results) : [];
    let payload = Map();
    payload = payload.set("savedDetail", savedItems.first());

    // if (toSaveItem.get("id").toString() === "0") {
    //   payload = payload.set("redirectURL", afterSaveNewURL);
    // } else {
    payload = payload.set("redirectURL", afterSaveURL);
    // }

    yield put(datadetailActions.saveSuccessAction(payload, action.detailName));
    toast.success("Changes saved successfully !");
  } catch (e) {
    console.log(e);
    yield put(datadetailActions.saveFailedAction(action.detailName));
    toast.error("Error occured while saving !");
  }
}

function* deleteDetail(action) {
  const toDeleteId = action.payload.get("toDeleteId");

  yield put(datadetailActions.deleteInProgressAction(action.detailName));
  try {
    if (toDeleteId.toString() !== "0") {
      yield call(api.post, {
        params: [toDeleteId],
        endpoint: action.payload.getIn(["endpoints", "delete"])
      });
    }
    const newItem = datadetailSelectors.getNewItemState(
      action.payload.get("fields")
    );
    let payload = Map();
    payload = payload.set("newItem", newItem);
    payload = payload.set("redirectURL", action.payload.get("afterDeleteURL"));
    yield put(
      datadetailActions.deleteSuccessAction(payload, action.detailName)
    );
    toast.success("Delete successfull !");
  } catch (e) {
    console.log(e);
    yield put(datadetailActions.deleteFailedAction(action.detailName));
    toast.success("Error occured while deleting  !");
  }
}

function* addNewDetail(action) {
  console.log(action);
  const addNewURL = action.payload.get("addNewURL");
  yield put(
    datadetailActions.updateRedirectURLAction(addNewURL, action.detailName)
  );
}

export default function* detailSaga() {
  yield takeEvery(types.DETAIL_FETCH_DATA_REQUEST, fetchData);
  yield takeEvery(types.DETAIL_INIT, initDetail);
  yield takeEvery(types.DETAIL_SAVE_INIT, saveDetail);
  yield takeEvery(types.DETAIL_DELETE_CONFIRMED, deleteDetail);
  yield takeEvery(types.DETAIL_ADD_NEW, addNewDetail);
}
