import { fromJS } from "immutable";

const idField = {
  field: "id",
  title: "Id",
  type: "hidden"
};

const menuAccessField = {
  field: "menu_access",
  title: "Menu Access",
  editControl: {
    type: "checkbox"
  }
};

const userGroupField = {
  field: "usergroups",
  title: "User Groups",
  editControl: {
    type: "checkbox"
  }
};

const accessTypeField = {
  field: "user_access",
  title: "Access",
  editControl: {
    type: "checkbox"
  }
};

export default fromJS([
  idField,
  menuAccessField,
  userGroupField,
  accessTypeField
]);
