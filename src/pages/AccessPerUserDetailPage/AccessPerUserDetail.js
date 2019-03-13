import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataDetail from "../../components/core/DataDetail";
import DetailFields from "./DetailFields";
import withDataDetailPermissions from "../../components/core/DataDetail/decorators/withDataDetailPermissions";

const endpoints = fromJS({
  fetch: "getUserAccess",
  save: "saveUserAccess"
});

export default compose(
  withDataDetailPermissions,
  withProps({
    name: "accessperuser-detail",
    fields: DetailFields,
    endpoints,
    title: "Expense",
    afterSaveURL: "/list/users",
    showDeleteButton: false,
    showAddNewButton: false
  })
)(DataDetail);
