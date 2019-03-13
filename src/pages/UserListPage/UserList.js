import React from "react";
import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import { noop } from "lodash";

import DataList from "../../components/core/DataList";
import ListColumns from "./ListColumns";
import ListFilters from "./ListFilters";
import EditAccessColumn from "./EditAccessColumn";
import withDataListPermissions from "../../components/core/DataList/decorators/withDataListPermissions";

const endpoints = fromJS({
  fetch: "getUsers",
  delete: "deleteUsers",
  save: "saveUsers"
});
// const customCom = ({ props }) => {
//   return <EditAccessColumn {...props} />;
// };

// const customCom = props => {
//   return <div>Edit Access</div>;
// };

export default compose(
  withDataListPermissions,
  withProps(({ onEditAccessClick = noop }) => {
    let listColumns = ListColumns.map(column => {
      if (column.get("field").toString() === "useraccess") {
        column = column.set("CustomCellComponent", ({ rowItem }) => {
          return (
            <EditAccessColumn
              rowItem={rowItem}
              onEditAccessClick={onEditAccessClick}
            />
          );
        });
      }
      return column;
    });

    return {
      name: "user-list",
      columns: listColumns,
      filters: ListFilters,
      endpoints
    };
  })
)(DataList);
