import React from "react";
import {
  withHandlers,
  compose,
  lifecycle,
  branch,
  pure,
  renderComponent
} from "recompose";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ImmutablePropTypes from "react-immutable-proptypes";
import T from "prop-types";
import { noop } from "lodash";
import { fromJS } from "immutable";

import { datadetailActions, datadetailSelectors } from "./redux";
import DataDetailBody from "./DataDetailBody";
import DataDetailHeader from "./DataDetailHeader";
import ConfirmModalBox from "../ConfirmModalBox";
import Spinner from "../Spinner";
import {
  handleEdit,
  handleCancel,
  handleDelete,
  handleSave,
  handleConfirmDelete,
  handleCancelDelete,
  handleAddNew
} from "./utils/handlers";

import "./style/index.scss";

const renderDataDetail = ({
  primaryField,
  name,
  title,
  datadetailState,
  handleEdit,
  handleCancel,
  handleSave,
  handleDelete,
  handleAddNew,
  handleConfirmDelete,
  handleCancelDelete,
  showSaveButton,
  showCancelButton,
  showDeleteButton,
  showAddNewButton
}) => {
  return (
    <React.Fragment>
      <ConfirmModalBox
        id={`${name}-confrim-modal-box`}
        isOpen={datadetailState.get("showConfirmDelete")}
        onConfirmClick={handleConfirmDelete}
        onCancelClick={handleCancelDelete}
        onCloseClick={handleCancelDelete}
      />
      {datadetailState.get("loading") && <Spinner id={`${name}-spinner`} />}
      <div id={name} className="detail">
        <DataDetailHeader
          onSave={handleSave}
          onDelete={handleDelete}
          onCancel={handleCancel}
          onAddNew={handleAddNew}
          title={title}
          showSaveButton={showSaveButton}
          showCancelButton={showCancelButton}
          showDeleteButton={showDeleteButton}
          showAddNewButton={showAddNewButton}
        />
        <DataDetailBody
          fields={datadetailState.get("fields")}
          onEdit={handleEdit}
          editedData={datadetailState.get("editedData")}
          validations={datadetailState.get("validations")}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ dataDetails }, ownProps) => {
  const datadetailState = datadetailSelectors.getDetailState(
    dataDetails,
    ownProps.name,
    ownProps.fields
  );
  return {
    datadetailState
  };
};

const withConnect = connect(
  mapStateToProps,
  datadetailActions
);

const withEventHandlers = withHandlers({
  handleEdit,
  handleCancel,
  handleDelete,
  handleSave,
  handleConfirmDelete,
  handleCancelDelete,
  handleAddNew
});

const withLifeCycle = lifecycle({
  componentWillMount() {
    const {
      datadetailState,
      endpoints,
      fields,
      initAction,
      name,
      dataId,
      filters
    } = this.props;
    let newdatadetailState = datadetailSelectors.getInitState(fields);
    newdatadetailState = newdatadetailState.set("endpoints", endpoints);
    newdatadetailState = newdatadetailState.set("fields", fields);
    newdatadetailState = newdatadetailState.set("id", dataId.toString());
    if (filters) {
      newdatadetailState = newdatadetailState.set("filters", filters);
    } else {
      newdatadetailState = newdatadetailState.set(
        "filters",
        fromJS([{ field: "id", operator: "=", value: dataId.toString() }])
      );
    }
    initAction(newdatadetailState, name);
  }
});

const withBranch = compose(
  withRouter,
  branch(
    ({ datadetailState }) => datadetailState.get("redirectURL"),
    renderComponent(
      ({ location, datadetailState, updateRedirectURLAction, name }) => {
        const redirectURL = datadetailState.get("redirectURL");
        updateRedirectURLAction("", name);
        return (
          <Redirect
            to={{
              pathname: redirectURL,
              state: { from: location }
            }}
          />
        );
      }
    )
  )
);

const DataDetail = compose(
  withConnect,
  withEventHandlers,
  withLifeCycle,
  withBranch,
  pure
)(renderDataDetail);

DataDetail.propTypes = {
  dataId: T.string,
  name: T.string,
  primaryField: T.string,
  fields: ImmutablePropTypes.list,
  endpoints: ImmutablePropTypes.map,
  title: T.string,
  afterSaveURL: T.string,
  afterDeleteURL: T.string,
  addNewURL: T.string,
  showSaveButton: T.bool,
  showCancelButton: T.bool,
  showDeleteButton: T.bool,
  showAddNewButton: T.bool,
  onSaveClick: T.func,
  onDeleteClick: T.func,
  onDeleteConfirmClick: T.func,
  onCancelClick: T.func,
  onAddNewClick: T.func
};

DataDetail.defaultProps = {
  dataId: "0",
  primaryField: "id",
  title: "",
  afterSaveURL: "",
  afterDeleteURL: "",
  afterSaveNewURL: "",
  addNewURL: "",
  showSaveButton: true,
  showCancelButton: true,
  showDeleteButton: true,
  showAddNewButton: true,
  onSaveClick: noop,
  onDeleteClick: noop,
  onDeleteConfirmClick: noop,
  onCancelClick: noop,
  onAddNewClick: noop
};

export default DataDetail;
