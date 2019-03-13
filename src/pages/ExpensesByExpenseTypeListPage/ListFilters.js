import { fromJS } from "immutable";
// const sorts = fromJS([{ field: "id", orderBy: "DESC" }]);
export default fromJS([
  {
    label: "Expense Type",
    field: "expense_type_id",
    operator: "in",
    value: [""],
    type: "selectbox",
    multiSelect: true,
    options: []
  },
  {
    label: "From",
    field: "expense_date_from",
    operator: ">=",
    value: "",
    type: "datebox",
    placeholder: "dd-mm-yyyy"
  },
  {
    label: "To",
    field: "expense_date_to",
    operator: "<=",
    value: "",
    type: "datebox",
    placeholder: "dd-mm-yyyy"
  }
]);
