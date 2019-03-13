import { withProps, compose } from "recompose";
import { withRouter } from "react-router";
import { fromJS } from "immutable";

import DataList from "../../components/core/DataList";
import ListColumns from "./ListColumns";
import ListFilters from "./ListFilters";

const endpoints = fromJS({
  fetch: "getExpenses",
  delete: "deleteExpenses",
  save: "saveExpenses"
});

export default compose(
  withRouter,
  withProps({
    title: "Expense List To Detail",
    name: "daily-expense-list",
    columns: ListColumns,
    filters: ListFilters,
    endpoints,
    showRowCancelButton: false,
    showRowSaveButton: false,
    showRowDeleteButton: false,
    showSaveAllButton: false,
    showCancelAllButton: false,
    showDeleteAllButton: false,
    showAddNewButton: false,
    onCellClick: ({ history }) => (item, column) => {
      let path = `/edit-detail/expense/${item.get("id")}`;
      history.push(path);
    }
  })
)(DataList);
