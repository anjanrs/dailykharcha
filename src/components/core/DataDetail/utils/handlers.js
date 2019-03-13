import { fromJS, Map } from "immutable";
import { validateItem, hasInvalidMsgs } from "../../../../utils/dataValidation";
import { noop } from "lodash";

export const handleEdit = ({
  datadetailState,
  updateEditedDataAction,
  name
}) => (field, newValue) => {
  const newDatadetailState = datadetailState.setIn(
    ["editedData", field],
    newValue
  );
  updateEditedDataAction(newDatadetailState, name);
};

export const handleCancel = props => event => {
  if (props.onCancelClick === noop) {
    handleCancelDefault(props)(event);
  } else {
    props.onCancelClick(props)(event);
  }
};

export const handleCancelDefault = ({
  primaryField,
  datadetailState,
  updateEditedDataAction,
  name
}) => event => {
  const initData = datadetailState.get("data");
  let newdatadetailState = datadetailState.set("validations", Map());
  newdatadetailState = newdatadetailState.set("editedData", initData);

  updateEditedDataAction(newdatadetailState, name);
};

export const handleDelete = props => event => {
  if (props.onDeleteClick === noop) {
    handleDeleteDefault(props)(event);
  } else {
    props.onDeleteClick(props)(event);
  }
};

export const handleDeleteDefault = ({
  deleteInitiateAction,
  name,
  id
}) => event => {
  if (id.toString() !== "0") {
    deleteInitiateAction(id, name);
  }
};

export const handleSave = props => event => {
  if (props.onSaveClick === noop) {
    handleSaveDefault(props)(event);
  } else {
    props.onSaveClick(props)(event);
  }
};

export const handleSaveDefault = ({
  datadetailState,
  saveAction,
  validateItemsAction,
  fields,
  name,
  afterSaveURL,
  onSaveClick
}) => event => {
  const editedDataItem = datadetailState.get("editedData");
  const validationMsgs = validateItem(editedDataItem.toJS(), fields.toJS());
  //update validation state
  validateItemsAction(fromJS(validationMsgs), name);

  if (!hasInvalidMsgs(validationMsgs)) {
    const args = fromJS({
      toSaveItem: editedDataItem,
      fields: fields.toJS(),
      endpoints: datadetailState.get("endpoints").toJS(),
      afterSaveURL
    });
    saveAction(args, name);
  }
};

export const handleConfirmDelete = props => event => {
  if (props.onDeleteConfirmClick === noop) {
    handleConfirmDeleteDefault(props)(event);
  } else {
    props.onDeleteConfirmClick(props)(event);
  }
};

export const handleConfirmDeleteDefault = ({
  datadetailState,
  deleteConfirmAction,
  name,
  id,
  afterDeleteURL
}) => event => {
  const args = fromJS({
    toDeleteId: id,
    endpoints: datadetailState.get("endpoints").toJS(),
    fields: datadetailState.get("fields").toJS(),
    afterDeleteURL
  });
  deleteConfirmAction(args, name);
};

export const handleCancelDelete = ({ deleteCancelAction, name }) => event => {
  deleteCancelAction(name);
};

export const handleAddNew = props => event => {
  if (props.onAddNewClick === noop) {
    handleAddNewDefault(props)(event);
  } else {
    props.onAddNewClick(props)(event);
  }
};

export const handleAddNewDefault = ({
  name,
  addNewAction,
  addNewURL
}) => event => {
  addNewAction(fromJS({ addNewURL }), name);
};
