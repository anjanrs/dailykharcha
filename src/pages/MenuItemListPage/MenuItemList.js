import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "../../components/core/DataList";
import ListColumns from "./ListColumns";
import ListFilters from "./ListFilters";
import withDataListPermissions from "../../components/core/DataList/decorators/withDataListPermissions";

const endpoints = fromJS({
  fetch: "getMenuItems",
  delete: "deleteMenuItems",
  save: "saveMenuItems"
});

export default compose(
  withDataListPermissions,
  withProps({
    name: "menuitem-list",
    columns: ListColumns,
    filters: ListFilters,
    endpoints
  })
)(DataList);
