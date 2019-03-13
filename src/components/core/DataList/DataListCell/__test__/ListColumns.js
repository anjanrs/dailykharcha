import React from "react";

export const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};

export const CustomCellComponent = rowItem => {
  return <div>Custom Component Access</div>;
};

export const nameColumn = {
  width: "10%",
  field: "item_name",
  title: "Item Name",
  type: "custom",
  CustomCellComponent: CustomCellComponent
};

export const descColumn = {
  width: "15%",
  field: "desc",
  title: "Description",
  type: "editable",
  editControl: {
    type: "textarea",
    // placeholder: "Item description",
    validations: {
      minLength: 3,
      maxLength: 500
    }
  }
};

export const dateColumn = {
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

export const storeColumn = {
  width: "10%",
  field: "store_id",
  displayField: "store",
  allowSort: true,
  title: "Store",
  type: "label"
};

export const subExpenseTypeColumn = {
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

export const quantityColumn = {
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
