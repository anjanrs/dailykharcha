import { fromJS } from "immutable";

const idField = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const nameField = {
  field: "item_name",
  title: "Item Name",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      minLength: 3,
      maxLength: 100
    }
  }
};

const descField = {
  field: "desc",
  title: "Description",
  editControl: {
    type: "textbox",
    validations: {
      minLength: 3,
      maxLength: 500
    }
  }
};

const dateField = {
  field: "expense_date",
  title: "Date",
  editControl: {
    type: "datebox",
    validations: {
      isRequired: true
    }
  }
};

const storeField = {
  field: "store_id",
  title: "Store",
  editControl: {
    type: "selectbox",
    validations: {
      isRequired: true
    }
  }
};

const expenseTypeField = {
  field: "expense_type_id",
  title: "Expense Type",
  editControl: {
    type: "selectbox",
    validations: {
      isRequired: true
    }
  }
};

const subExpenseTypeField = {
  field: "sub_expense_type_id",
  title: "Sub Expense Type",
  editControl: {
    type: "selectbox"
  }
};

const quantityField = {
  field: "quantity",
  title: "Qty",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      isInt: { allow_leading_zeroes: false }
    }
  }
};

const unitField = {
  field: "unit_id",
  title: "Unit",
  editControl: {
    type: "selectbox",
    validations: {
      isRequired: true
    }
  }
};

const unitPriceField = {
  field: "unit_price",
  title: "Unit Price",
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

const amountField = {
  field: "amount",
  title: "Amount",
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
  idField,
  nameField,
  descField,
  dateField,
  storeField,
  expenseTypeField,
  subExpenseTypeField,
  quantityField,
  unitField,
  unitPriceField,
  amountField
]);
