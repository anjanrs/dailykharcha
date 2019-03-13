import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import withNavigation from "../decorators/withNavigation";

import TestList from "../components/TestList";

import withAuth from "../decorators/withAuth";

const Dashboard = props => {
  return (
    <div className="page-content">
      <TestList />
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withAuth,
  withNavigation
)(Dashboard);
