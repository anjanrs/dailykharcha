import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../redux/modules/auth";
import { lifecycle, compose } from "recompose";
import "./style.scss";

const Logout = props => {
  return (
    <div className="logout__wrapper">
      Your successfully loged out. <br />
      To login click <Link to="/login">here</Link>
    </div>
  );
};

const withConnect = connect(
  null,
  authActions
);

const withLifeCycle = lifecycle({
  componentDidMount() {
    this.props.logoutAction();
  }
});

export default compose(
  withConnect,
  withLifeCycle
)(Logout);
