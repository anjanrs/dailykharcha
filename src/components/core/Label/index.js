import React from "react";
import T from "prop-types";
import { noop } from "lodash";
import { withHandlers, pure, compose } from "recompose";

const renderLabel = ({ id, value, title, handleOnClick }) => {
  return (
    <div
      id={id}
      className="control control_label"
      title={title}
      onClick={handleOnClick}
    >
      {value}
    </div>
  );
};

const Label = compose(
  withHandlers({
    handleOnClick: ({ onClick = noop, value }) => event => {
      onClick(value);
    }
  }),
  pure
)(renderLabel);

Label.propTypes = {
  id: T.string,
  value: T.string,
  title: T.string,
  onClick: T.func
};

Label.defaultProps = {
  id: "",
  value: "",
  title: "",
  onClick: noop
};

export default Label;
