import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import withNavigation from "../../decorators/withNavigation";
import DailyExpenseList from "./DailyExpenseList";
// import { withHandlers } from 'recompose';

const DailyExpenseListPage = ({ auth }) => {
  return (
    <div className="page-content">
      <h1>Daily Expense List Page</h1>
      <DailyExpenseList auth={auth} />
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
)(DailyExpenseListPage);