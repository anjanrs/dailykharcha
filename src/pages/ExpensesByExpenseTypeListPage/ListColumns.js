import { fromJS } from "immutable";

const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};
const expenseTypeColumn = {
  width: "10%",
  field: "expense_type",
  title: "Expense Type",
  allowSort: true
};

const totalSpendColumn = {
  width: "10%",
  field: "total_spend",
  title: "Total Spend",
  allowSort: true
};

const dummyColumn = {
  width: "80%",
  field: "dummy",
  title: ""
};

export default fromJS([
  idColumn,
  expenseTypeColumn,
  totalSpendColumn,
  dummyColumn
]);
