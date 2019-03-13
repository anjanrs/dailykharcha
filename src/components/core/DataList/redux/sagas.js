import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { fromJS } from "immutable";
import _ from "lodash";
import types from "./actionTypes.js";
import datalistActions from "./actions";
import api from "../../../../utils/api";
import { toast } from "react-toastify";

// worker Saga: will be fired on LOGIN_REQUEST actions
function* fetchData(action) {
  yield put(datalistActions.fetchDataInProgressAction(action.listName));
  try {
    const payload = action.payload.toJS();
    const res = yield call(api.post, {
      params: action.payload.toJS(),
      endpoint: payload.endpoints.fetch
    });
    yield put(
      datalistActions.fetchDataSuccessAction(fromJS(res), action.listName)
    );
  } catch (e) {
    yield put(
      datalistActions.fetchDataFailAction(fromJS({ error: e }), action.listName)
    );
  }
}

//workder saga: will be fired on list init
function* initList(action) {
  yield put(datalistActions.initInProgressAction(action.listName));
  try {
    yield call(fetchData, action);
    // (datalistActions.fetchDataAction(action.payload, action.listName));
    yield put(
      datalistActions.initSuccessAction(action.payload, action.listName)
    );
  } catch (e) {
    yield put(datalistActions.initFailedAction(action.listName));
  }
}

function* saveRows(action) {
  yield put(datalistActions.saveRowsInProgressAction(action.listName));
  try {
    let itemsForSaveApi = [];
    const fields = action.payload
      .get("columns")
      .map(column => column.get("field"));
    const toSaveItems = action.payload.get("toSaveItems");
    const saveEndpoint = action.payload.getIn(["endpoints", "save"]);

    //for  save only send the items  fields that are defined in columns
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

    savedItems = getSavedItemsWithOrgIds(savedItems, toSaveItems, fields);
    console.log("savedItems", savedItems.toJS());
    yield put(
      datalistActions.saveRowsSuccessAction(savedItems, action.listName)
    );
    toast.success("Changes saved successfully !");
  } catch (e) {
    yield put(datalistActions.saveRowsFailedAction(action.listName));
    toast.error("Error occured while saving !");
  }
}

const getSavedItemsWithOrgIds = (savedItems, toSaveItems, fields) => {
  let savedIds = [];
  let toSaveIds = [];
  for (let objValue of savedItems) {
    savedIds.push(objValue.get("id").toString());
  }

  for (let objToSaveValue of toSaveItems) {
    toSaveIds.push(objToSaveValue.get("id").toString());
  }

  //loop through toSaveItems,
  //check if toSaveItems id in savedItems
  //if yes then add it to updated items
  // const updatedItems = toSaveItems.filter(item => {
  //   if (_.indexOf(savedIds, item.get("id").toString()) > -1) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });
  console.log("savedItems", savedItems.toJS());
  console.log("toSaveItems", toSaveItems.toJS());
  console.log("savedIds", savedIds);
  console.log("toSaveIds", toSaveIds);
  const updatedItems = savedItems.filter(item => {
    if (_.indexOf(toSaveIds, item.get("id").toString()) > -1) {
      return true;
    } else {
      return false;
    }
  });
  console.log("updatedItems", updatedItems.toJS());

  //loopthrought savedITems
  //check if savedItems in toSaveItem
  // if not then added it to added Items\

  let addedItems = savedItems.filter(item => {
    if (_.indexOf(toSaveIds, item.get("id").toString()) < 0) {
      return true;
    } else {
      return false;
    }
  });
  console.log("addedItems", addedItems.toJS());
  let matchedOrgIds = [];
  //compare added items with toSaved new itmes, to get the ids
  addedItems = addedItems.map(addedItem => {
    const matchetoSaveItem = toSaveItems.filter(toSaveItem => {
      const foundItem = false;
      const isNew =
        toSaveItem
          .get("id")
          .toString()
          .indexOf("new") > -1;
      const isAlreadyMatched =
        _.indexOf(matchedOrgIds, toSaveItem.get("id").toString()) > -1;
      if (isNew && !isAlreadyMatched) {
        //function not working if return field is different than that of edited one
        //e.g. password
        return isObjEqualWithoutId(toSaveItem, addedItem, fields);
      }
      return foundItem;
    });
    console.log("matchetoSaveItem", matchetoSaveItem.toJS());
    if (matchetoSaveItem && matchetoSaveItem.size > 0) {
      const matchedOrgId = matchetoSaveItem.first().get("id");
      matchedOrgIds.push(matchedOrgId);
      return addedItem.set("orgId", matchedOrgId);
    } else {
      return addedItem;
    }
  });
  console.log("addedItems after match", addedItems.toJS());
  //merget to arrays and passit
  return updatedItems.concat(addedItems);
};

function isObjEqualWithoutId(obj1, obj2, fields) {
  obj1 = obj1.toJS();
  obj2 = obj2.toJS();

  let isColumnValueEqual = true;

  for (let field of fields) {
    if (field.toString() !== "id") {
      let obj1Value =
        obj1[field] !== undefined && obj1[field] !== null
          ? obj1[field].toString().trim()
          : "";
      let obj2Value =
        obj2[field] !== undefined && obj2[field] !== null
          ? obj2[field].toString().trim()
          : "";

      if (obj1Value !== obj2Value) {
        isColumnValueEqual = false;
        break;
      }
    }
  }

  return isColumnValueEqual;
}

function* deleteRows(action) {
  const toDeleteIds = action.payload
    .get("toDeleteIds")
    .filter(deleteId => deleteId.toString().indexOf("new") < 0);
  yield put(datalistActions.deleteRowsInProgressAction(action.listName));
  try {
    if (toDeleteIds.size > 0) {
      yield call(api.post, {
        params: toDeleteIds.toJS(),
        endpoint: action.payload.getIn(["endpoints", "delete"])
      });
    }
    yield put(
      datalistActions.deleteRowsSuccessAction(
        action.payload.get("toDeleteIds"),
        action.listName
      )
    );
    toast.success("Delete successfull !");
  } catch (e) {
    yield put(datalistActions.deleteRowsFailedAction(action.listName));
    toast.error("Error occured while deleting rows !");
  }
}

export default function* listSaga() {
  yield takeEvery(types.LIST_FETCH_DATA_REQUEST, fetchData);
  yield takeLatest(types.LIST_CHANGE_PAGE_NUMBER, fetchData);
  yield takeEvery(types.LIST_CHANGE_ROWS_PER_PAGE, fetchData);
  yield takeEvery(types.LIST_INIT, initList);
  yield takeEvery(types.LIST_CHANGE_SORT, fetchData);
  yield takeEvery(types.LIST_CHANGE_FILTER, fetchData);
  yield takeEvery(types.LIST_SAVE_ROWS_INIT, saveRows);
  yield takeEvery(types.LIST_DELETE_ROWS_CONFIRMED, deleteRows);
}
