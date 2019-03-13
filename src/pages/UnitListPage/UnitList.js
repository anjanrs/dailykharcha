import { withProps, compose } from "recompose";
import { fromJS } from "immutable";
import DataList from "../../components/core/DataList";
import withDataListPermissions from "../../components/core/DataList/decorators/withDataListPermissions";

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
    validations: {
      isRequired: true,
      minLength: 2,
      maxLength: 100
    }
    // format: {
    //   date: "dd-mm-yyyy"
    // }
  }
};

const descColumn = {
  field: "desc",
  title: "Description",
  type: "editable",
  editControl: {
    type: "textbox",
    validations: {
      minLength: 3,
      maxLength: 500
    }
  },
  width: "40%"
};

const columns = fromJS([idColumn, nameColumn, descColumn]);

const endpoints = fromJS({
  fetch: "getUnits",
  delete: "deleteUnits",
  save: "saveUnits"
});

export default compose(
  withDataListPermissions,
  withProps({
    name: "unit-list",
    columns,
    endpoints
  })
)(DataList);
