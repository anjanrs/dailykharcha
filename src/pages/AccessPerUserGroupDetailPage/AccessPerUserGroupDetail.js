import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataDetail from "../../components/core/DataDetail";
import DetailFields from "./DetailFields";
import withDataDetailPermissions from "../../components/core/DataDetail/decorators/withDataDetailPermissions";

const endpoints = fromJS({
  fetch: "getUserGroupAccess",
  save: "saveUserGroupAccess"
});

export default compose(
  withDataDetailPermissions,
  withProps({
    name: "accessperusergroup-detail",
    fields: DetailFields,
    endpoints,
    title: "Expense",
    afterSaveURL: "/list/usergroups",
    showDeleteButton: false,
    showAddNewButton: false
  })
)(DataDetail);
