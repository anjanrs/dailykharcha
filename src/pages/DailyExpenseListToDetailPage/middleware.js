import { fromJS } from "immutable";

import { getMainExpenseTypeOptions } from "../../utils/commonFunctions";

import {
  datalistActions,
  datalistActionTypes
} from "../../components/core/DataList/redux";

const dailyExpenesePageMiddleWare = ({
  getState,
  dispatch
}) => next => action => {
  if (
    action.namespace &&
    action.namespace === "dataList" &&
    action.listName &&
    action.listName === "daily-expense-list" &&
    action.type === datalistActionTypes.LIST_INIT_SUCCESS
  ) {
    let newListState = getState();
    //set options for the parent Expense Type while editing the list
    newListState = newListState.dataLists.get(action.listName);
    let columns = newListState.get("columns");
    let filters = newListState.get("filters");
    Promise.all([getMainExpenseTypeOptions()]).then(function(results) {
      for (let result of results) {
        let filterOptions = [...result.options];
        filters = filters.map(filter => {
          if (filter.get("field") === result.optionsForField) {
            filterOptions.unshift({ value: "", displayValue: "All" });
            filter = filter.set("options", fromJS(filterOptions));
          }
          return filter;
        });
      }
      // update new state and dispatch custom list action
      newListState = newListState.set("columns", columns);
      newListState = newListState.set("filters", filters);
      dispatch(datalistActions.customizeAction(newListState, action.listName));
    });
  }

  next(action);
};

export default dailyExpenesePageMiddleWare;
