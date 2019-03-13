import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import withAuth from "../../decorators/withAuth";
import withNavigation from "../../decorators/withNavigation";
import DailyExpenseList from "./DailyExpenseList";

const DailyExpenseListPage = ({ auth }) => {
  return (
    <div className="page-content">
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
