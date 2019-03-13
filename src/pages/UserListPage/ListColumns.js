import React from "react";
import { fromJS } from "immutable";

const idColumn = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const passwordColumn = {
  width: "10%",
  field: "password",
  displayField: "masked_password",
  title: "Password",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true
    }
  }
};

const userNameColumn = {
  width: "10%",
  field: "username",
  title: "User Name",
  allowSort: true,
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true,
      minLength: 3,
      maxLength: 100
    }
  }
};

const emailColumn = {
  width: "15%",
  field: "email",
  title: "Email",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      minLength: 3,
      maxLength: 500,
      isEmail: true
    }
  }
};

const firstNameColumn = {
  width: "10%",
  field: "first_name",
  allowSort: true,
  title: "First Name",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true
    }
  }
};

const lastNameColumn = {
  width: "10%",
  field: "last_name",
  allowSort: true,
  title: "Last Name",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      isRequired: true
    }
  }
};

const accessColumn = {
  width: "10%",
  field: "useraccess",
  title: "Access",
  type: "custom"
};

export default fromJS([
  idColumn,
  userNameColumn,
  passwordColumn,
  emailColumn,
  firstNameColumn,
  lastNameColumn,
  accessColumn
]);
