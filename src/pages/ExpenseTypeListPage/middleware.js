import { fromJS } from "immutable";
import { getExpenseTypeOptions } from "../../utils/commonFunctions";

import {
  datalistActions,
  datalistActionTypes
} from "../../components/core/DataList/redux";

const expenseTypePageMiddleWare = ({
  getState,
  dispatch
}) => next => action => {
  if (
    action.namespace &&
    action.namespace === "dataList" &&
    action.listName &&
    action.listName === "expense-type-list" &&
    action.type === datalistActionTypes.LIST_INIT_SUCCESS
  ) {
    let newListState = getState();
    getExpenseTypeOptions("parent_id").then(result => {
      //set options for the parent Expense Type while editing the list
      newListState = newListState.dataLists.get(action.listName);
      let columns = newListState.get("columns");
      columns = columns.map(column => {
        if (column.get("field") === result.optionsForField) {
          let options = [...result.options];
          options.unshift({ value: "0", displayValue: "No Parent" });
          column = column.setIn(["editControl", "options"], fromJS(options));
        }
        return column;
      });
      newListState = newListState.set("columns", columns);
      dispatch(datalistActions.customizeAction(newListState, action.listName));
    });
  }

  next(action);
};

export default expenseTypePageMiddleWare;
