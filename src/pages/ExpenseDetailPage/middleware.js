import { fromJS } from "immutable";

import {
  getMainExpenseTypeOptions,
  getSubExpenseTypeOptions,
  getUnitOptions,
  getStoreOptions
} from "../../utils/commonFunctions";

import {
  datadetailActions,
  datadetailActionTypes
} from "../../components/core/DataDetail/redux";

const expenseDetailPageMiddleware = ({
  getState,
  dispatch
}) => next => action => {
  if (
    action.namespace &&
    action.namespace === "dataDetail" &&
    action.detailName &&
    action.detailName === "expense-detail" &&
    action.type === datadetailActionTypes.DETAIL_INIT_SUCCESS
  ) {
    Promise.all([
      getMainExpenseTypeOptions(),
      getSubExpenseTypeOptions(),
      getUnitOptions(),
      getStoreOptions()
    ]).then(function(results) {
      const state = getState();
      //set options for the parent Expense Type while editing the list
      let newDetailState = state.dataDetails.get(action.detailName);
      let fields = newDetailState.get("fields");

      for (let result of results) {
        let options = [...result.options];

        fields = fields.map(field => {
          if (field.get("field") === result.optionsForField) {
            options.unshift({ value: "", displayValue: "---" });
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

export default expenseDetailPageMiddleware;
