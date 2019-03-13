import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "../../components/core/DataList";
import ListColumns from "./ListColumns";
import ListFilters from "./ListFilters";
import withDataListPermissions from "../../components/core/DataList/decorators/withDataListPermissions";

const endpoints = fromJS({
  fetch: "getExpenses",
  delete: "deleteExpenses",
  save: "saveExpenses"
});

export default compose(
  withDataListPermissions,
  withProps({
    name: "daily-expense-list",
    columns: ListColumns,
    filters: ListFilters,
    endpoints
  })
)(DataList);
