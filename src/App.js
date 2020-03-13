import React from "react";
import { compose, pure } from "recompose";
import { connect } from "react-redux";

import { authActions } from "./redux/modules/auth";
import withPermissions from "./decorators/withPermissions";


// import { ToastContainer } from "react-toastify";
// import logo from "./logo.svg";
// import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  faTrashAlt,
  faEdit,
  faSave,
  faUndo,
  faPlus,
  faSearch,
  faAngleRight,
  faAngleLeft,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTrashAlt,
  faEdit,
  faSave,
  faUndo,
  faPlus,
  faSearch,
  faAngleRight,
  faAngleLeft,
  faTimesCircle
);

const renderApp = ({ children, auth }) => {
  const initAuth = auth.toJS();
  return (
    initAuth.onloadAuthentication && (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={2000}
        transition={Flip}
      />
      {children}
    </div>)
  );
};


const mapStateToProps = state => ({ auth: state.auth });

const withConnect =  connect(
  mapStateToProps,
  authActions
);
const App = compose(
  withConnect,
  // withLifeCycle,
  withPermissions,
  pure
)(renderApp);

export default App;