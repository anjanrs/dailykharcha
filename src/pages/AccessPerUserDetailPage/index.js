import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import withAuth from "../../decorators/withAuth";
import AccessPerUserDetail from "./AccessPerUserDetail";
import "./style.scss";

const AccessPerUserDetailPage = props => {
  return (
    <div className="page-content">
      <AccessPerUserDetail {...props} />
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
)(AccessPerUserDetailPage);
