import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "../../components/core/DataList";
import ListColumn from "./ListColumns";
import { handleCellClickDefault } from "../../components/core/DataList/utils/handlers";
import withDataListPermissions from "../../components/core/DataList/decorators/withDataListPermissions";

const endpoints = fromJS({
  fetch: "getUserGroups",
  delete: "deleteUserGroups",
  save: "saveUserGroups"
});

const onCellClick = onEditAccessClick => props => (item, column, editMode) => {
  if (column.get("field").toString() === "usergroupaccess") {
    onEditAccessClick(item);
  } else {
    handleCellClickDefault(props)(item, column, editMode);
  }
};

export default compose(
  withDataListPermissions,
  withProps(({ onEditAccessClick }) => {
    return {
      name: "usergroup-list",
      columns: ListColumn,
      endpoints,
      onCellClick: onCellClick(onEditAccessClick)
    };
  })
)(DataList);
