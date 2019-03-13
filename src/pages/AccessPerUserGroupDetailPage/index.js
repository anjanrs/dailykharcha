import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import withAuth from "../../decorators/withAuth";
import AccessPerUserGroupDetail from "./AccessPerUserGroupDetail";
import "./style.scss";

const AccessPerUserGroupDetailPage = props => {
  return (
    <div className="page-content">
      <AccessPerUserGroupDetail {...props} />
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuth
)(AccessPerUserGroupDetailPage);
