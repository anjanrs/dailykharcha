import { fromJS } from "immutable";
const linkOption = {
  path: "/edit/expenses/:id"
};
const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const nameColumn = {
  width: "20%",
  field: "item_name",
  title: "Item Name",
  allowSort: true
};

const descColumn = {
  width: "25%",
  field: "desc",
  title: "Description"
};

const dateColumn = {
  width: "10%",
  field: "expense_date",
  displayField: "expense_date_formatted",
  allowSort: true,
  title: "Date"
};

const storeColumn = {
  width: "10%",
  field: "store_id",
  displayField: "store",
  allowSort: true,
  title: "Store"
};

const expenseTypeColumn = {
  width: "10%",
  field: "expense_type_id",
  displayField: "expense_type",
  allowSort: true,
  title: "Expense Type"
};

const subExpenseTypeColumn = {
  width: "10%",
  field: "sub_expense_type_id",
  displayField: "sub_expense_type",
  allowSort: true,
  title: "Sub Expense Type"
};

const quantityColumn = {
  width: "5%",
  field: "quantity",
  allowSort: true,
  title: "Qty"
};

const unitColumn = {
  width: "5%",
  field: "unit_id",
  displayField: "unit",
  allowSort: true,
  title: "Unit"
};

const unitPriceColumn = {
  width: "5%",
  field: "unit_price",
  allowSort: true,
  title: "Unit Price"
};

const amountColumn = {
  width: "5%",
  field: "amount",
  allowSort: true,
  title: "Amount"
};

export default fromJS([
  idColumn,
  nameColumn,
  descColumn,
  dateColumn,
  storeColumn,
  expenseTypeColumn,
  subExpenseTypeColumn,
  quantityColumn,
  unitColumn,
  unitPriceColumn,
  amountColumn
]);
