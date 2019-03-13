import React from "react";
import { Router, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Dashboard from "../Dashboard";
import browserHistory from "../../browserHistory";
import { compose } from "recompose";
import { connect } from "react-redux";

import ExpenseTypeListPage from "../ExpenseTypeListPage";
import LogoutPage from "../LogoutPage";
import UnitListPage from "../UnitListPage";
import StoreListPage from "../StoreListPage";
import DailyExpenseListPage from "../DailyExpenseListPage";
import ExpensesByExpenseTypeListPage from "../ExpensesByExpenseTypeListPage";
import ExpensesBySubExpenseTypeListPage from "../ExpensesBySubExpenseTypeListPage";
import ExpenseDetailPage from "../ExpenseDetailPage";
import DailyExpenseListToDetailPage from "../DailyExpenseListToDetailPage";
import UserListPage from "../UserListPage";
import UserGroupListPage from "../UserGroupListPage";
import MenuItemListPage from "../MenuItemListPage";

import { authActions } from "../../redux/modules/auth";
import withPermissions from "../../decorators/withPermissions";

import "./style.scss";

const renderMain = prop => {
  return (
    <Router history={browserHistory}>
      <div className="main">
        <Route path="/login" exact component={LoginPage} />
        <Route path="/logout" exact component={LogoutPage} />

        <Route path="/" exact component={DailyExpenseListPage} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/add-detail/expense" exact component={ExpenseDetailPage} />
        <Route
          path="/edit-detail/expense/:id"
          exact
          component={ExpenseDetailPage}
        />
        <Route
          path="/list/daily-expenses"
          exact
          component={DailyExpenseListPage}
        />
        <Route
          path="/list/daily-expense-detail"
          exact
          component={DailyExpenseListToDetailPage}
        />

        <Route
          path="/list/daily-expenses-by-type"
          exact
          component={ExpensesByExpenseTypeListPage}
        />
        <Route
          path="/list/daily-expenses-by-sub-type"
          exact
          component={ExpensesBySubExpenseTypeListPage}
        />
        <Route
          path="/list/expense-types"
          exact
          component={ExpenseTypeListPage}
        />
        <Route path="/list/stores" exact component={StoreListPage} />
        <Route path="/list/units" exact component={UnitListPage} />
        <Route path="/list/menuitems" exact component={MenuItemListPage} />
        <Route path="/list/users" exact component={UserListPage} />
        <Route path="/list/usergroups" exact component={UserGroupListPage} />
      </div>
    </Router>
  );
};
const mapStateToProps = state => ({ auth: state.auth });

const Main = compose(
  connect(
    mapStateToProps,
    authActions
  ),
  withPermissions
)(renderMain);

export default Main;
