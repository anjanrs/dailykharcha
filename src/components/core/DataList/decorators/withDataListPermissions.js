import { withPropsOnChange } from "recompose";

export default withPropsOnChange(["auth"], ({ auth }) => {
  //check the auth prop for permission and set the DataList component permissions add, edit, delete accordingly
  const permissions = auth.get("permissions");
  if (permissions === null) return {};
  return {
    showRowSaveButton: permissions.get("edit"),
    showRowDeleteButton: permissions.get("delete"),
    showSaveAllButton: permissions.get("edit"),
    showDeleteAllButton: permissions.get("delete"),
    showAddNewButton: permissions.get("add")
  };
});
