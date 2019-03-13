import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "./core/DataList";

const columns = fromJS([
  {
    field: "id",
    title: "Id",
    controlType: "hidden",
    width: "20%"
  },
  {
    field: "item_name",
    title: "Item Name",
    allowSort: true,
    controlType: "textbox",
    width: "30%"
  }
]);

// const sorts = fromJS([{ field: "id", orderBy: "DESC" }]);
const filters = fromJS([
  { field: "item_name", operator: "like", value: "", controlType: "textbox" },
  // {
  //   field: "expense_type_id",
  //   operator: "=",
  //   value: "2",
  //   controlType: "selectbox",
  //   options: [
  //     { value: "1", displayValue: "Beauty Products" },
  //     { value: "2", displayValue: "Electricity" },
  //     { value: "3", displayValue: "Accomodation" }
  //   ]
  // },
  {
    field: "expense_type_id",
    operator: "in",
    value: ["1"],
    controlType: "radiobutton",
    multiselect: true,
    options: [
      { value: "1", displayValue: "Beauty Products" },
      { value: "2", displayValue: "Electricity" },
      { value: "3", displayValue: "Accomodation" }
    ]
  }
]);

const endpoints = fromJS({
  fetch: "getExpenses",
  delete: "deleteExpenses",
  save: "saveExpenses"
});

export default compose(
  withProps({
    name: "expenses-list",
    columns,
    filters,
    endpoints
  })
)(DataList);
