import { fromJS } from "immutable";

import {
  getUserGroupsOptions,
  getAccessTypesOptions,
  getMenuItemOptions
} from "../../utils/commonFunctions";

import {
  datadetailActions,
  datadetailActionTypes
} from "../../components/core/DataDetail/redux";

const accessPerUserDetailPageMiddleware = ({
  getState,
  dispatch
}) => next => action => {
  if (
    action.namespace &&
    action.namespace === "dataDetail" &&
    action.detailName &&
    action.detailName === "accessperuser-detail" &&
    action.type === datadetailActionTypes.DETAIL_INIT_SUCCESS
  ) {
    Promise.all([
      getUserGroupsOptions("usergroups"),
      getAccessTypesOptions("user_access"),
      getMenuItemOptions("menu_access")
    ]).then(function(results) {
      const state = getState();
      //set options for the parent Expense Type while editing the list
      let newDetailState = state.dataDetails.get(action.detailName);
      let fields = newDetailState.get("fields");

      for (let result of results) {
        let options = [...result.options];
        fields = fields.map(field => {
          if (field.get("field") === result.optionsForField) {
            field = field.setIn(["editControl", "options"], fromJS(options));
          }
          return field;
        });
      }

      // update new state and dispatch custom list action
      newDetailState = newDetailState.set("fields", fields);
      dispatch(
        datadetailActions.customizeAction(newDetailState, action.detailName)
      );
    });
  }

  next(action);
};

export default accessPerUserDetailPageMiddleware;
