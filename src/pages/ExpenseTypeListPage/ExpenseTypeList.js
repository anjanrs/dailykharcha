import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "../../components/core/DataList";
import ListColumns from "./ListColumns";
import withDataListPermissions from "../../components/core/DataList/decorators/withDataListPermissions";

const endpoints = fromJS({
  fetch: "getExpenseTypes",
  delete: "deleteExpenseTypes",
  save: "saveExpenseTypes"
});

export default compose(
  withDataListPermissions,
  withProps({
    name: "expense-type-list",
    columns: ListColumns,
    endpoints
  })
)(DataList);
