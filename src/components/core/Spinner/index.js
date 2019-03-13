import React from "react";
import T from "prop-types";
import { ClipLoader } from "react-spinners";
import "./style.scss";

const Spinner = ({ id }) => {
  return (
    <div id={id} className="spinner__wrapper">
      <div className="spinner">
        <ClipLoader sizeUnit={"px"} size={30} color={"#fff"} loading={true} />
      </div>
    </div>
  );
};

Spinner.propTypes = {
  id: T.string
};

Spinner.defaultProps = {
  id: ""
};

export default Spinner;
