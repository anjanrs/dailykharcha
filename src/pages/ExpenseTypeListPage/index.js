import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import ExpenseTypeList from "./ExpenseTypeList";
import withNavigation from "../../decorators/withNavigation";

const ExpenseTypeListPage = props => {
  return (
    <div className="page-content">
      <ExpenseTypeList {...props} />
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
)(ExpenseTypeListPage);
