import { fromJS } from "immutable";

const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const nameColumn = {
  field: "name",
  title: "Name",
  allowSort: true,
  width: "20%",
  type: "editable",
  editControl: {
    type: "textbox",
    width: "150px",
    validations: {
      isRequired: true,
      minLength: 3
    }
    // format: {
    //   date: "dd-mm-yyyy"
    // }
  }
};

const descColumn = {
  field: "desc",
  title: "Description",
  allowSort: false,
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      minLength: 3
    }
  },
  width: "40%"
};

const parentIdColumn = {
  field: "parent_id",
  displayField: "parent_name",
  title: "Parent",
  allowSort: true,
  type: "editable",
  editControl: {
    type: "selectbox",
    defaultValue: ["0"],
    options: [],
    // validations: {
    //   isRequired: true
    // },
    format: {
      date: "dd-mm-yyyy"
    }
  },
  width: "20%"
};

export default fromJS([idColumn, nameColumn, descColumn, parentIdColumn]);
