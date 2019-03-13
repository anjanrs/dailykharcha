import React from "react";
import Menus from "../Menus";
import { fromJS } from "immutable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  withState,
  withHandlers,
  pure,
  compose,
  withPropsOnChange
} from "recompose";
import { connect } from "react-redux";
import { authActions } from "../../redux/modules/auth";

import "./style.scss";
import withMenuitems from "../../decorators/withMenuitems";

const renderNav = ({ handleNavHideShow, visibility, menuitems }) => {
  return (
    <aside className={`main__nav main_nav--${visibility} horizontal`}>
      <div className="main__nav--hide-show" onClick={handleNavHideShow}>
        {visibility === "maximized" && (
          <FontAwesomeIcon size="2x" title="cancel" icon="angle-left" />
        )}
        {visibility === "minimized" && (
          <FontAwesomeIcon size="2x" title="cancel" icon="angle-right" />
        )}
      </div>
      <Menus menuItems={menuitems} />
    </aside>
  );
};

const mapStateToProps = state => ({ auth: state.auth });
const Nav = compose(
  connect(
    mapStateToProps,
    authActions
  ),
  withMenuitems,
  withPropsOnChange(["auth"], ({ auth }) => {
    return { menuitems: auth.get("menuitems") };
  }),
  withState("visibility", "setVisibility", "maximized"),
  withHandlers({
    handleNavHideShow: props => event => {
      event.preventDefault();
      if (props.visibility === "maximized") {
        props.setVisibility("minimized");
      } else {
        props.setVisibility("maximized");
      }
    }
  }),
  pure
)(renderNav);

// const menuItems = fromJS([
//   {
//     id: "1",
//     label: "Add Expenses",
//     parentId: "0",
//     path: "/add-detail/expense"
//   },
//   {
//     id: "2",
//     label: "Daily Expenses",
//     parentId: "0",
//     path: "/list/daily-expenses"
//   },
//   {
//     id: "3",
//     label: "Daily Expenses By Type",
//     parentId: "0",
//     path: "/list/daily-expenses-by-type"
//   },
//   {
//     id: "4",
//     label: "Daily Expenses By Sub Type",
//     parentId: "0",
//     path: "/list/daily-expenses-by-sub-type"
//   },
//   {
//     id: "10",
//     label: "Daily Expenses List To Detail",
//     parentId: "0",
//     path: "/list/daily-expense-detail"
//   },
//   { id: "5", label: "Admin", parentId: "0", path: "/" },
//   {
//     id: "6",
//     label: "Expense Types",
//     parentId: "5",
//     path: "/list/expense-types"
//   },
//   { id: "7", label: "Stores", parentId: "5", path: "/list/stores" },
//   { id: "8", label: "Units", parentId: "5", path: "/list/units" },
//   { id: "12", label: "Menu Items", parentId: "5", path: "/list/menuitems" },
//   { id: "13", label: "User Groups", parentId: "5", path: "/list/usergroups" },
//   { id: "9", label: "Users", parentId: "5", path: "/list/users" },
//   { id: "11", label: "Log Out", parentId: "0", path: "/logout" }
// ]);

export default Nav;
