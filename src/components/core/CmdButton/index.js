import React from "react";
import T from "prop-types";
import { noop } from "lodash";

const CmdButton = ({ id, children, active, type, onClickHandler }) => {
  const appendClass = active ? "active" : "inactive";
  const clickHandler = active ? onClickHandler : noop;

  return (
    <div
      id={id}
      className={`btn-cmd btn-cmd--${type} ${appendClass}`}
      onClick={clickHandler}
    >
      {children}
    </div>
  );
};

CmdButton.propTypes = {
  id: T.string,
  label: T.string,
  active: T.bool,
  type: T.string,
  onClickHandler: T.func
};

CmdButton.defaultProps = {
  id: "",
  label: "Button",
  active: false,
  type: "",
  onClickHandler: noop
};

export default CmdButton;
