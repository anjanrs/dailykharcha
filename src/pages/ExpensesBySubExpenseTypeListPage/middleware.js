import { fromJS } from "immutable";
import { getSubExpenseTypeOptions } from "../../utils/commonFunctions";
import {
  datalistActions,
  datalistActionTypes
} from "../../components/core/DataList/redux";
const onListInit = (action, getState, dispatch) => {
  if (action.type === datalistActionTypes.LIST_INIT_SUCCESS) {
    Promise.all([getSubExpenseTypeOptions()]).then(function(results) {
      let newListState = getState();
      //set options for the parent Expense Type while editing the list
      newListState = newListState.dataLists.get(action.listName);
      let filters = newListState.get("filters");
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
      newListState = newListState.set("filters", filters);
      dispatch(datalistActions.customizeAction(newListState, action.listName));
    });
  }
};

const onDataFetchSuccessfull = action => {
  if (action.type === datalistActionTypes.LIST_FETCH_DATA_SUCCESS) {
    let dataRows = action.payload.getIn(["results", "data"]);
    let totalSpend = 0;
    for (let rowItem of dataRows) {
      totalSpend += rowItem.get("total_spend");
    }
    const summaryRow = fromJS({
      id: "summaryRow",
      sub_expense_type: "Total Expense",
      total_spend: totalSpend
    });
    dataRows = dataRows.push(summaryRow);
    action.payload = action.payload.setIn(["results", "data"], dataRows);
  }
};

const expenseBySubExpenseTypeMiddleWare = ({
  getState,
  dispatch
}) => next => action => {
  if (
    action.namespace &&
    action.namespace === "dataList" &&
    action.listName &&
    action.listName === "expenses-by-sub-expense-type"
  ) {
    onListInit(action, getState, dispatch);
    onDataFetchSuccessfull(action, getState, dispatch);
  }

  next(action);
};

export default expenseBySubExpenseTypeMiddleWare;
