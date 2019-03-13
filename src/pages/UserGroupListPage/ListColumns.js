import React from "react";
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
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      minLength: 3,
      maxLength: 100
    }
  }
};

const descColumn = {
  field: "desc",
  title: "Description",
  editControl: {
    type: "textbox",
    validations: {
      minLength: 3,
      maxLength: 100
    }
  },
  width: "40%"
};

const editAccessComponent = prop => {
  return <div>Edit Access</div>;
};
const accessColumn = {
  width: "10%",
  field: "usergroupaccess",
  title: "Access",
  type: "custom",
  CustomCellComponent: editAccessComponent
};

export default fromJS([idColumn, nameColumn, descColumn, accessColumn]);
