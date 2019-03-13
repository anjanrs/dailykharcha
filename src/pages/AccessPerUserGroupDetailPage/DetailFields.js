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

const accessTypeField = {
  field: "usergroup_access",
  title: "Access",
  editControl: {
    type: "checkbox"
  }
};

export default fromJS([idField, menuAccessField, accessTypeField]);
