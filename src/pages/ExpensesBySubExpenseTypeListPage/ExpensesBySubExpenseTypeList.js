import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "../../components/core/DataList";
import ListColumns from "./ListColumns";
import ListFilters from "./ListFilters";
const endpoints = fromJS({
  fetch: "getExpensesBySubExpenseType"
});

export default compose(
  withProps({
    name: "expenses-by-sub-expense-type",
    columns: ListColumns,
    filters: ListFilters,
    endpoints,
    showRowCancelButton: false,
    showRowSaveButton: false,
    showRowDeleteButton: false,
    showSaveAllButton: false,
    showCancelAllButton: false,
    showDeleteAllButton: false,
    showAddNewButton: false
  })
)(DataList);
