import React from "react";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { withRouter } from "react-router";
import withAuth from "../../decorators/withAuth";
import withNavigation from "../../decorators/withNavigation";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseDetailPage = props => {
  return (
    <div className="page-content">
      <ExpenseDetail {...props} />
    </div>
  );
};

const mapStateToProps = state => ({ auth: state.auth });

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withRouter,
  withProps(({ match, location, history }) => {
    if (match.path === "/add/expense") {
      return { dataId: "0" };
    } else {
      return { dataId: match.params.id };
    }
  }),
  withAuth,
  withNavigation
)(ExpenseDetailPage);
