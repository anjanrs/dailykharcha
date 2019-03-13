import { fromJS } from "immutable";

const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};
const expenseTypeColumn = {
  width: "15%",
  field: "sub_expense_type",
  title: "Sub Expense Type",
  allowSort: true
};

const totalSpendColumn = {
  width: "10%",
  field: "total_spend",
  title: "Total Spend",
  allowSort: true
};

const dummyColumn = {
  width: "75%",
  field: "dummy",
  title: ""
};
export default fromJS([
  idColumn,
  expenseTypeColumn,
  totalSpendColumn,
  dummyColumn
]);
