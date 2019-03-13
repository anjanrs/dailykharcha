import React from "react";
import { compose, withHandlers, pure } from "recompose";
import { noop } from "lodash";
import T from "prop-types";

const renderTextBox = ({
  id,
  name,
  handleOnKeyUp = noop,
  handleOnChange = noop,
  value,
  placeholder
}) => {
  return (
    <div id={id} className="control control_textbox">
      <input
        name={name}
        pattern="[0-9]*"
        value={value}
        onChange={handleOnChange}
        placeholder={placeholder}
        onKeyUp={handleOnKeyUp}
      />
    </div>
  );
};

const TextBox = compose(
  withHandlers({
    handleOnChange: ({ handleValueChange = noop }) => event => {
      handleValueChange(event.target.value);
    },
    handleOnKeyUp: ({ onKeyUp = noop }) => event => {
      if (event.keyCode === 13) {
        onKeyUp(event);
      }
    }
  }),
  pure
)(renderTextBox);

TextBox.propTypes = {
  id: T.string,
  name: T.string,
  placeholder: T.string,
  handleValueChange: T.func,
  onKeyUp: T.func,
  value: T.string
};

// Specifies the default values for props:
TextBox.defaultProps = {
  id: "",
  handleValueChange: noop,
  onKeyUp: noop,
  value: "",
  placeholder: ""
};

export default TextBox;
