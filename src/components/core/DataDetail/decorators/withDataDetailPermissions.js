import { withPropsOnChange } from "recompose";

export default withPropsOnChange(["auth"], ({ auth }) => {
  //check the auth prop for permission and set the DataDetail component permissions
  // add, edit, delete   accordingly
  const permissions = auth.get("permissions");
  if (permissions === null) return {};
  return {
    showSaveButton: permissions.get("edit"),
    showDeleteButton: permissions.get("delete"),
    showAddNewButton: permissions.get("add")
  };
});
