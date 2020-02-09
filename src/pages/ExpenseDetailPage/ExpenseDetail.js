import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataDetail from "../../components/core/DataDetail";
import DetailFields from "./DetailFields";
import withDataDetailPermissions from "../../components/core/DataDetail/decorators/withDataDetailPermissions";

const endpoints = fromJS({
  fetch: "getExpenses",
  delete: "deleteExpenses",
  save: "saveExpenses"
});

export default compose(
  withDataDetailPermissions,
  withProps(({ dataId }) => {
    return {
      name: "expense-detail",
      fields: DetailFields,
      endpoints,
      afterSaveURL: "/list/daily-expense-detail",
      afterDeleteURL: "/list/daily-expense-detail",
      addNewURL: "/add-detail/expense",
      filters: [{ field: "e.id", operator: "=", value: dataId }]
    };
  })
)(DataDetail);
