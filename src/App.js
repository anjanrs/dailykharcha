import React from "react";
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

export default ({ children }) => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={2000}
        transition={Flip}
      />
      {children}
    </div>
  );
};
