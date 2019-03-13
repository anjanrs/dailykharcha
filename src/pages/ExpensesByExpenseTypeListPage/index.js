import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import withNavigation from "../../decorators/withNavigation";
import ExpensesByExpenseTypeList from "./ExpensesByExpenseTypeList";

const ExpensesByExpenseTypeListPage = props => {
  return (
    <div className="page-content">
      <ExpensesByExpenseTypeList {...props} />
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
)(ExpensesByExpenseTypeListPage);
