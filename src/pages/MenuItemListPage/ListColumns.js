import { fromJS } from "immutable";

const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const labelColumn = {
  width: "20%",
  field: "label",
  title: "Label",
  allowSort: true,
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true
    }
  }
};

const pathColumn = {
  width: "30%",
  field: "path",
  title: "Path",
  allowSort: true,
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      minLength: 3,
      maxLength: 100
    }
  }
};

const orderColumn = {
  width: "10%",
  field: "seq",
  title: "Order",
  allowSort: true,
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      isInteger: true
    }
  }
};

const parentMenuColumn = {
  width: "20%",
  field: "parent_id",
  displayField: "parent_menuitem",
  allowSort: true,
  title: "Parent Menu",
  type: "editable",
  editControl: {
    type: "selectbox"
  }
};

export default fromJS([
  idColumn,
  labelColumn,
  pathColumn,
  orderColumn,
  parentMenuColumn
]);
