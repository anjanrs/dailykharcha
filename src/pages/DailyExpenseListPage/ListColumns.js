import { fromJS } from "immutable";

const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const nameColumn = {
  width: "10%",
  field: "item_name",
  title: "Item Name",
  allowSort: true,
  type: "editable",
  editControl: {
    type: "textbox",
    // placeholder: "Item name",
    validations: {
      isRequired: true,
      minLength: 3,
      maxLength: 100
    }
    // format: {
    //   date: "dd-mm-yyyy"
    // }
  }
};

const descColumn = {
  width: "15%",
  field: "desc",
  title: "Description",
  type: "editable",
  editControl: {
    type: "textbox",
    // placeholder: "Item description",
    validations: {
      minLength: 3,
      maxLength: 500
    }
  }
};

const dateColumn = {
  width: "10%",
  field: "expense_date",
  displayField: "expense_date_formatted",
  allowSort: true,
  title: "Date",
  type: "editable",
  editControl: {
    type: "datebox",
    validations: {
      isRequired: true
    }
  }
};

const storeColumn = {
  width: "10%",
  field: "store_id",
  displayField: "store",
  allowSort: true,
  title: "Store",
  type: "editable",
  editControl: {
    type: "selectbox",
    validations: {
      isRequired: true
    }
  }
};

const expenseTypeColumn = {
  width: "10%",
  field: "expense_type_id",
  displayField: "expense_type",
  allowSort: true,
  title: "Expense Type",
  type: "editable",
  editControl: {
    type: "selectbox",
    validations: {
      isRequired: true
    }
  }
};

const subExpenseTypeColumn = {
  width: "10%",
  field: "sub_expense_type_id",
  displayField: "sub_expense_type",
  allowSort: true,
  title: "Sub Expense Type",
  type: "editable",
  editControl: {
    type: "selectbox"
  }
};

const quantityColumn = {
  width: "5%",
  field: "quantity",
  allowSort: true,
  title: "Qty",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      isInt: { allow_leading_zeroes: false }
    }
  }
};

const unitColumn = {
  width: "5%",
  field: "unit_id",
  displayField: "unit",
  allowSort: true,
  title: "Unit",
  type: "editable",
  editControl: {
    type: "selectbox",
    validations: {
      isRequired: true
    }
  }
};

const unitPriceColumn = {
  width: "5%",
  field: "unit_price",
  allowSort: true,
  title: "Unit Price",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      idDecimal: {
        decimal_digits: "1,2"
      }
    }
  }
};

const amountColumn = {
  width: "5%",
  field: "amount",
  allowSort: true,
  title: "Amount",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      isDecimal: {
        decimal_digits: "1,2"
      }
    }
  }
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
